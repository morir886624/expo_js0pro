import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Storage adapter compatible with iOS, Android (via SecureStore), and Web (via localStorage)
// Implements chunking to protect against Android's 2048-byte SharedPreferences limit
const CHUNK_SIZE = 1800;

const SecureStorageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try {
        return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
      } catch {
        return null;
      }
    }
    try {
      const initialValue = await SecureStore.getItemAsync(key);
      if (!initialValue) return null;

      // Check if value was chunked
      if (initialValue.startsWith('__chunked__:')) {
        const count = parseInt(initialValue.replace('__chunked__:', ''), 10);
        if (isNaN(count)) return null;

        let fullValue = '';
        for (let i = 0; i < count; i++) {
          const chunk = await SecureStore.getItemAsync(`${key}_chunk_${i}`);
          if (chunk === null) return null;
          fullValue += chunk;
        }
        return fullValue;
      }

      return initialValue;
    } catch {
      return null;
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
      } catch {}
      return;
    }
    try {
      if (value.length > CHUNK_SIZE) {
        const chunkCount = Math.ceil(value.length / CHUNK_SIZE);
        // Store chunks
        for (let i = 0; i < chunkCount; i++) {
          const chunk = value.substring(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
          await SecureStore.setItemAsync(`${key}_chunk_${i}`, chunk);
        }
        // Store manifest
        await SecureStore.setItemAsync(key, `__chunked__:${chunkCount}`);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch {}
  },

  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
      } catch {}
      return;
    }
    try {
      const initialValue = await SecureStore.getItemAsync(key);
      if (initialValue && initialValue.startsWith('__chunked__:')) {
        const count = parseInt(initialValue.replace('__chunked__:', ''), 10);
        if (!isNaN(count)) {
          for (let i = 0; i < count; i++) {
            await SecureStore.deleteItemAsync(`${key}_chunk_${i}`);
          }
        }
      }
      await SecureStore.deleteItemAsync(key);
    } catch {}
  },
};

export const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://ibcqcxeanwnauxaaifjs.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_5A4XftgLq0utFmHLYMzaDg_fNnmDA79';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: SecureStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
});

/**
 * Helper to get the current JWT access token from Supabase session
 */
export const getJwtToken = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || null;
};

/**
 * Helper to safely decode a JWT token's payload without external dependencies
 */
export const decodeJwtPayload = (token: string): Record<string, any> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

