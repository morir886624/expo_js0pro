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

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigateToLogin,
  onRegisterSuccess,
}) => {
  const { colors, isDark } = useTheme();
  const { register } = useAuth();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept terms of service');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      onRegisterSuccess();
    } catch (e) {
      setError('Registration failed. Try again.');
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
            placeholder="Abdul Moeid"
            value={name}
            onChangeText={setName}
            leftIcon="person-outline"
          />

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
  errorBanner: {
    color: '#EF4444',
    fontSize: Typography.sizes.xs,
    marginBottom: Spacing.sm,
    textAlign: 'center',
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
});

