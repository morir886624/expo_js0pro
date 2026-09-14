import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import { supabase } from './supabase';

// Tells WebBrowser to dismiss any pending auth popup on web
WebBrowser.maybeCompleteAuthSession();

/**
 * Initiates Google OAuth via Supabase and system browser (ASWebAuthenticationSession/Chrome Custom Tabs).
 */
export const signInWithGoogleOAuth = async (): Promise<{
  success: boolean;
  session?: any;
  error?: string;
}> => {
  try {
    const isWeb = Platform.OS === 'web';
    const redirectUrl = isWeb
      ? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8081')
      : makeRedirectUri({
          scheme: 'js0pro',
          path: 'auth/callback',
        });
    console.log('🔗 Google OAuth Redirect URI:', redirectUrl);

    // 2. Request OAuth authorization URL from Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: !isWeb,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });

    if (error) throw error;
    if (!data?.url) throw new Error('No authorization URL returned by Supabase.');

    // On web, redirect the browser to the Google OAuth URL
    if (isWeb) {
      if (typeof window !== 'undefined') {
        window.location.assign(data.url);
      }
      return { success: true };
    }

    // 3. Open in secure system browser
    const authResponse = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUrl
    );

    // 4. Handle returned authorization
    if (authResponse.type === 'success' && authResponse.url) {
      const parsed = Linking.parse(authResponse.url);

      // Handle PKCE authorization code flow
      const code = parsed.queryParams?.code;
      if (typeof code === 'string') {
        const { data: sessionData, error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) throw exchangeError;
        return { success: true, session: sessionData.session };
      }

      // Handle direct tokens if returned in URL parameters/fragments
      const accessToken = parsed.queryParams?.access_token as string | undefined;
      const refreshToken = parsed.queryParams?.refresh_token as string | undefined;
      if (accessToken && refreshToken) {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        if (sessionError) throw sessionError;
        return { success: true, session: sessionData.session };
      }

      return { success: true };
    }

    if (authResponse.type === 'cancel' || authResponse.type === 'dismiss') {
      return { success: false, error: 'Google sign-in was cancelled' };
    }

    return { success: false, error: 'Unable to complete Google sign-in.' };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'An error occurred during Google sign-in.',
    };
  }
};

