import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface LoginScreenProps {
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
  onNavigateToOtp: (email: string) => void;
  onLoginSuccess?: () => void;
  initialEmail?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToRegister,
  onNavigateToForgotPassword,
  onNavigateToOtp,
  onLoginSuccess,
  initialEmail = '',
}) => {
  const { colors, isDark } = useTheme();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Please fill in both email and password');
      return;
    }
    setError('');
    setUnverifiedEmail(null);
    setLoading(true);

    try {
      const result = await login(email.trim(), password);
      if (!result.success) {
        if (result.requiresVerification && result.email) {
          setUnverifiedEmail(result.email);
          setError(
            result.error ||
              'Your email is not verified. Please verify your email with the 6-digit code sent to your inbox.'
          );
        } else {
          setError(result.error || 'Invalid credentials. Please check your email and password.');
        }
        return;
      }
      onLoginSuccess?.();
    } catch (e: any) {
      setError(e.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: isDark ? '#111827' : '#F8FAFC',
            paddingTop: Math.max(insets.top, 24),
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <View style={styles.brandLogo}>
            <Text style={styles.brandJs}>JS</Text>
          </View>
          <Text style={[styles.appTitle, { color: colors.text }]}>JS0pro</Text>
          <Text style={[styles.welcomeTitle, { color: colors.text }]}>
            Sign In
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Learn JavaScript differently.
          </Text>
        </View>

        {/* Input Form */}
        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            leftIcon="mail-outline"
          />

          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError('');
            }}
            isPassword
            leftIcon="lock-closed-outline"
          />

          {error ? (
            <View
              style={[
                styles.errorCard,
                {
                  backgroundColor: isDark
                    ? 'rgba(239, 68, 68, 0.15)'
                    : '#FEF2F2',
                  borderColor: isDark ? '#7F1D1D' : '#FCA5A5',
                },
              ]}
            >
              <Ionicons name="alert-circle-outline" size={18} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {unverifiedEmail ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onNavigateToOtp(unverifiedEmail)}
              style={styles.verifyPromptBanner}
            >
              <View style={styles.verifyPromptLeft}>
                <Ionicons name="mail-unread-outline" size={20} color="#0F172A" />
                <Text style={styles.verifyPromptText}>
                  Verify email with OTP code now
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={18} color="#0F172A" />
            </TouchableOpacity>
          ) : null}

          {/* Remember me & Forgot password */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.rememberMe}
            >
              <Ionicons
                name={rememberMe ? 'checkbox' : 'square-outline'}
                size={20}
                color={rememberMe ? '#FACC15' : colors.textMuted}
              />
              <Text
                style={[styles.rememberMeText, { color: colors.textSecondary }]}
              >
                Remember me
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onNavigateToForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            size="lg"
            style={styles.signInButton}
          />
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View
            style={[
              styles.dividerLine,
              { backgroundColor: isDark ? '#374151' : '#E2E8F0' },
            ]}
          />
          <Text style={[styles.dividerText, { color: colors.textMuted }]}>
            OR CONTINUE WITH
          </Text>
          <View
            style={[
              styles.dividerLine,
              { backgroundColor: isDark ? '#374151' : '#E2E8F0' },
            ]}
          />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialButtonsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setError('Google login requires OAuth setup in Supabase dashboard.');
            }}
            style={[
              styles.socialButton,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <Ionicons name="logo-google" size={20} color={colors.text} />
            <Text style={[styles.socialButtonText, { color: colors.text }]}>
              Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setError('Apple login requires Apple Developer setup in Supabase dashboard.');
            }}
            style={[
              styles.socialButton,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <Ionicons name="logo-apple" size={20} color={colors.text} />
            <Text style={[styles.socialButtonText, { color: colors.text }]}>
              Apple
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Link to Register */}
        <View style={styles.footerRow}>
          <Text style={{ color: colors.textSecondary }}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToRegister}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPadding,
    justifyContent: 'center',
    flexGrow: 1,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  brandLogo: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FACC15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    shadowColor: '#FACC15',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  brandJs: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
  },
  appTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  welcomeTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    marginTop: 4,
  },
  formContainer: {
    marginBottom: Spacing.base,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  errorText: {
    color: '#EF4444',
    fontSize: Typography.sizes.xs,
    flex: 1,
    lineHeight: 18,
    fontWeight: '600',
  },
  verifyPromptBanner: {
    backgroundColor: '#FACC15',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  verifyPromptLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  verifyPromptText: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: Typography.sizes.xs,
    flex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rememberMeText: {
    fontSize: Typography.sizes.sm,
  },
  forgotPasswordText: {
    color: '#FACC15',
    fontSize: Typography.sizes.sm,
    fontWeight: '700',
  },
  signInButton: {
    marginTop: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    marginHorizontal: Spacing.md,
    letterSpacing: 1,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  socialButtonText: {
    fontWeight: '700',
    fontSize: Typography.sizes.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  signUpLink: {
    color: '#FACC15',
    fontWeight: '800',
  },
});
