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
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToRegister,
  onNavigateToForgotPassword,
  onLoginSuccess,
}) => {
  const { colors, isDark } = useTheme();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('abdul@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      onLoginSuccess();
    } catch (e) {
      setError('Invalid credentials');
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
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            leftIcon="mail-outline"
          />

          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isPassword
            leftIcon="lock-closed-outline"
          />

          {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

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
            onPress={handleLogin}
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
            onPress={handleLogin}
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
  errorBanner: {
    color: '#EF4444',
    fontSize: Typography.sizes.xs,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    fontWeight: '600',
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

