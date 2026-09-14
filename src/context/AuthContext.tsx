import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { signInWithGoogleOAuth } from '../services/googleAuth';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarLetter: string;
  isPro: boolean;
}

export interface AuthResult {
  success: boolean;
  requiresVerification?: boolean;
  email?: string;
  error?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  jwtToken: string | null;
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  register: (name: string, email: string, pass: string) => Promise<AuthResult>;
  verifyEmailOtp: (
    email: string,
    token: string,
    type?: 'signup' | 'recovery' | 'email'
  ) => Promise<{ success: boolean; error?: string }>;
  resendOtp: (
    email: string,
    type?: 'signup' | 'recovery'
  ) => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ONBOARDING_KEY = 'js0pro_has_seen_onboarding';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to format user profile from user object and db record
const buildProfile = (authUser: User, profileRecord?: any): UserProfile => {
  const metaName = authUser.user_metadata?.name;
  const name = profileRecord?.name || metaName || authUser.email?.split('@')[0] || 'Learner';
  const username =
    profileRecord?.username ||
    `@${name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9._]/g, '')}`;
  const avatarLetter =
    profileRecord?.avatar_letter || name.charAt(0).toUpperCase() || 'L';
  const isPro = profileRecord?.is_pro ?? false;

  return {
    id: authUser.id,
    name,
    username,
    email: authUser.email || '',
    avatarLetter,
    isPro,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch profile record from public.profiles table
  const fetchDbProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        return data;
      }
    } catch {
      // Ignore network/offline errors during profile fetch
    }
    return null;
  };

  // Sync state from Supabase auth session
  const syncSessionUser = async (currentSession: Session | null) => {
    if (currentSession?.user) {
      setSession(currentSession);
      setJwtToken(currentSession.access_token);
      setIsAuthenticated(true);

      const dbProfile = await fetchDbProfile(currentSession.user.id);
      const profile = buildProfile(currentSession.user, dbProfile);
      setUser(profile);
    } else {
      setSession(null);
      setJwtToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Initialize session and onboarding status on mount
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // 1. Check onboarding status
        let seenOnboarding = 'false';
        if (Platform.OS === 'web') {
          seenOnboarding =
            typeof localStorage !== 'undefined'
              ? localStorage.getItem(ONBOARDING_KEY) || 'false'
              : 'false';
        } else {
          try {
            seenOnboarding =
              (await SecureStore.getItemAsync(ONBOARDING_KEY)) || 'false';
          } catch {
            seenOnboarding = 'false';
          }
        }
        if (isMounted) {
          setHasSeenOnboarding(seenOnboarding === 'true');
        }

        // 2. Check existing Supabase session
        const { data: { session: initialSession }, error } =
          await supabase.auth.getSession();

        if (error) {
          console.log('Error retrieving session:', error.message);
        }

        if (isMounted) {
          await syncSessionUser(initialSession);
        }
      } catch (err) {
        console.log('Auth initialization error:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // 3. Listen to auth state changes (sign in, sign out, token refresh, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (isMounted) {
        await syncSessionUser(currentSession);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string): Promise<AuthResult> => {
    try {
      const cleanEmail = email.trim();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: pass,
      });

      if (error) {
        const errorMsg = error.message;
        // Check if email requires verification
        if (
          errorMsg.toLowerCase().includes('email not confirmed') ||
          errorMsg.toLowerCase().includes('not confirmed')
        ) {
          return {
            success: false,
            requiresVerification: true,
            email: cleanEmail,
            error: 'Your email is not verified yet. Please enter the verification code sent to your inbox.',
          };
        }
        return {
          success: false,
          error: errorMsg,
        };
      }

      if (data.session) {
        await syncSessionUser(data.session);
        return { success: true };
      }

      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        error: e.message || 'An unexpected error occurred during login.',
      };
    }
  };

  const loginWithGoogle = async (): Promise<AuthResult> => {
    setLoading(true);
    try {
      const result = await signInWithGoogleOAuth();
      if (!result.success) {
        return {
          success: false,
          error: result.error,
        };
      }
      if (result.session) {
        await syncSessionUser(result.session);
      }
      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        error: e.message || 'Google sign-in failed.',
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    pass: string
  ): Promise<AuthResult> => {
    try {
      const cleanName = name.trim();
      const cleanEmail = email.trim();

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: pass,
        options: {
          data: {
            name: cleanName,
          },
        },
      });

      if (error) {
        let msg = error.message;
        if (msg.toLowerCase().includes('gateway timeout') || (error as any).status === 504) {
          msg = 'Supabase email server timed out (504). Check your custom SMTP in Supabase or turn off "Confirm email" in Supabase Auth.';
        }
        return {
          success: false,
          error: msg,
        };
      }

      // If user exists but session is null, email confirmation is required
      if (data.user && !data.session) {
        return {
          success: true,
          requiresVerification: true,
          email: cleanEmail,
        };
      }

      // If email autoconfirm is enabled and session was returned immediately
      if (data.session) {
        await syncSessionUser(data.session);
        return {
          success: true,
          requiresVerification: false,
          email: cleanEmail,
        };
      }

      return {
        success: true,
        requiresVerification: true,
        email: cleanEmail,
      };
    } catch (e: any) {
      let msg = e.message || 'An unexpected error occurred during registration.';
      if (msg.toLowerCase().includes('gateway timeout') || e.status === 504) {
        msg = 'Supabase email server timed out (504). Check your custom SMTP in Supabase or turn off "Confirm email" in Supabase Auth.';
      }
      return {
        success: false,
        error: msg,
      };
    }
  };

  const verifyEmailOtp = async (
    email: string,
    token: string,
    type: 'signup' | 'recovery' | 'email' = 'signup'
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const cleanEmail = email.trim();
      const cleanToken = token.trim();

      const { data, error } = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: cleanToken,
        type,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      if (data.session) {
        await syncSessionUser(data.session);
      }

      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        error: e.message || 'Verification failed. Please try again.',
      };
    }
  };

  const resendOtp = async (
    email: string,
    type: 'signup' | 'recovery' = 'signup'
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const cleanEmail = email.trim();
      if (type === 'recovery') {
        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail);
        if (error) return { success: false, error: error.message };
        return { success: true };
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: cleanEmail,
      });

      if (error) {
        let msg = error.message;
        if (msg.toLowerCase().includes('gateway timeout') || (error as any).status === 504) {
          msg = 'Supabase email server timed out (504). Please check your custom SMTP in Supabase.';
        }
        return { success: false, error: msg };
      }

      return { success: true };
    } catch (e: any) {
      let msg = e.message || 'Failed to resend code.';
      if (msg.toLowerCase().includes('gateway timeout') || e.status === 504) {
        msg = 'Supabase email server timed out (504). Please check your custom SMTP in Supabase.';
      }
      return {
        success: false,
        error: msg,
      };
    }
  };

  const sendPasswordReset = async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const cleanEmail = email.trim();
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        error: e.message || 'Failed to send reset code.',
      };
    }
  };

  const resetPassword = async (
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        error: e.message || 'Failed to update password.',
      };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.log('Error signing out:', e);
    } finally {
      setSession(null);
      setJwtToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const completeOnboarding = async () => {
    setHasSeenOnboarding(true);
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(ONBOARDING_KEY, 'true');
        }
      } catch {}
    } else {
      try {
        await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
      } catch {}
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));

    if (user?.id) {
      try {
        const dbUpdates: any = {};
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.username !== undefined) dbUpdates.username = updates.username;
        if (updates.avatarLetter !== undefined)
          dbUpdates.avatar_letter = updates.avatarLetter;

        await supabase.from('profiles').update(dbUpdates).eq('id', user.id);
      } catch (e) {
        console.log('Failed to persist profile update to database:', e);
      }
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      const dbProfile = await fetchDbProfile(user.id);
      if (session?.user && dbProfile) {
        setUser(buildProfile(session.user, dbProfile));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        jwtToken,
        isAuthenticated,
        hasSeenOnboarding,
        loading,
        login,
        loginWithGoogle,
        register,
        verifyEmailOtp,
        resendOtp,
        sendPasswordReset,
        resetPassword,
        logout,
        completeOnboarding,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
