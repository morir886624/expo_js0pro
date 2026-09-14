import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: (email: string, requiresVerification: boolean) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigateToLogin,
  onRegisterSuccess,
}) => {
  const { colors, isDark } = useTheme();
  const { register, loginWithGoogle } = useAuth();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleRegister = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const result = await loginWithGoogle();
      if (!result.success) {
        if (result.error && result.error !== 'Google sign-in was cancelled') {
          setError(result.error);
        }
        return;
      }
    } catch (e: any) {
      setError(e.message || 'Google registration failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const validateEmail = (val: string) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !validateEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Terms of Service & Privacy Policy');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await register(name, email, password);
      if (!result.success) {
        setError(result.error || 'Registration failed. Please try again.');
        return;
      }

      onRegisterSuccess(email.trim(), !!result.requiresVerification);
    } catch (e: any) {
      setError(e.message || 'Registration failed. Try again.');
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
          <Text style={[styles.welcomeTitle, { color: colors.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join thousands of JavaScript learners.
          </Text>
        </View>

        {/* Input Form */}
        <View style={styles.formContainer}>
          <Input
            label="Full Name"
            placeholder="e.g. Alex Morgan"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (error) setError('');
            }}
            leftIcon="person-outline"
          />

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
            placeholder="At least 6 characters"
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

          {/* Terms checkbox */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setAgreeTerms(!agreeTerms)}
            style={styles.termsRow}
          >
            <Ionicons
              name={agreeTerms ? 'checkbox' : 'square-outline'}
              size={20}
              color={agreeTerms ? '#FACC15' : colors.textMuted}
            />
            <Text style={[styles.termsText, { color: colors.textSecondary }]}>
              I agree to the Terms of Service & Privacy Policy
            </Text>
          </TouchableOpacity>

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            size="lg"
            style={styles.actionButton}
          />

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

          {/* Google Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={googleLoading || loading}
            onPress={handleGoogleRegister}
            style={[
              styles.socialButton,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
                opacity: googleLoading ? 0.7 : 1,
              },
            ]}
          >
            {googleLoading ? (
              <ActivityIndicator size="small" color="#FACC15" />
            ) : (
              <>
                <Ionicons name="logo-google" size={20} color={colors.text} />
                <Text style={[styles.socialButtonText, { color: colors.text }]}>
                  Continue with Google
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer Link to Login */}
        <View style={styles.footerRow}>
          <Text style={{ color: colors.textSecondary }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToLogin}>
            <Text style={styles.signInLink}>Sign In</Text>
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
  },
  brandJs: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.lg,
    paddingRight: Spacing.md,
  },
  termsText: {
    fontSize: Typography.sizes.xs,
    flex: 1,
    lineHeight: 18,
  },
  actionButton: {
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  signInLink: {
    color: '#FACC15',
    fontWeight: '800',
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
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  socialButtonText: {
    fontWeight: '700',
    fontSize: Typography.sizes.sm,
  },
});
