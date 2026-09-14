import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSubmitSuccess?: (email: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onSubmitSuccess,
}) => {
  const { colors, isDark } = useTheme();
  const { sendPasswordReset } = useAuth();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Cooldown countdown timer for resending
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const validateEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

  const handleSubmit = async () => {
    if (!email.trim() || !validateEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await sendPasswordReset(email.trim());
      if (!result.success) {
        setError(result.error || 'Failed to send password reset instructions');
        return;
      }

      setIsSubmitted(true);
      setCooldown(60);
      onSubmitSuccess?.(email.trim());
    } catch (e: any) {
      setError(e.message || 'Failed to send password reset instructions');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || loading) return;
    setError('');
    setLoading(true);

    try {
      const result = await sendPasswordReset(email.trim());
      if (!result.success) {
        setError(result.error || 'Failed to resend reset link');
        return;
      }
      setCooldown(60);
    } catch (e: any) {
      setError(e.message || 'Failed to resend reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? '#111827' : '#F8FAFC',
            paddingTop: Math.max(insets.top, 20),
            paddingBottom: Math.max(insets.bottom, 20),
          },
        ]}
      >
        {/* Back navigation */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backRow}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>Back to Sign In</Text>
        </TouchableOpacity>

        {isSubmitted ? (
          /* ============================================================== */
          /* SUCCESS STATE: Reset Link Sent                                  */
          /* ============================================================== */
          <View style={styles.content}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(34, 197, 94, 0.15)' : '#DCFCE7' },
              ]}
            >
              <Text style={styles.iconEmoji}>📬</Text>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>
              Check Your Email
            </Text>

            <Text style={[styles.instructions, { color: colors.textSecondary }]}>
              We've sent a password reset link to:
            </Text>

            <View
              style={[
                styles.emailBadge,
                {
                  backgroundColor: isDark ? '#1F2937' : '#E2E8F0',
                  borderColor: isDark ? '#374151' : '#CBD5E1',
                },
              ]}
            >
              <Ionicons name="mail-outline" size={16} color="#FACC15" />
              <Text style={[styles.emailBadgeText, { color: colors.text }]}>
                {email}
              </Text>
            </View>

            <Text style={[styles.instructions, { color: colors.textMuted, fontSize: Typography.sizes.xs }]}>
              Click the link in the email to choose your new password. For security, the link can only be used once.
            </Text>

            {error ? (
              <View
                style={[
                  styles.errorCard,
                  {
                    backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2',
                    borderColor: isDark ? '#7F1D1D' : '#FCA5A5',
                  },
                ]}
              >
                <Ionicons name="alert-circle-outline" size={18} color="#EF4444" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Button
              title="Return to Sign In"
              onPress={onBack}
              size="lg"
              style={{ width: '100%', marginTop: Spacing.lg }}
            />

            {/* Resend Action */}
            <View style={styles.resendRow}>
              <Text style={[styles.resendText, { color: colors.textMuted }]}>
                Didn't receive the email?
              </Text>
              <TouchableOpacity
                onPress={handleResend}
                disabled={cooldown > 0 || loading}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.resendLink,
                    { color: cooldown > 0 ? colors.textMuted : '#FACC15' },
                  ]}
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Link'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* ============================================================== */
          /* INPUT STATE: Enter Email Form                                   */
          /* ============================================================== */
          <View style={styles.content}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(250, 204, 21, 0.15)' : '#FEF9C3' },
              ]}
            >
              <Text style={styles.iconEmoji}>🔑</Text>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>
              Forgot Password?
            </Text>
            <Text style={[styles.instructions, { color: colors.textSecondary }]}>
              Enter your registered email address below. We'll send you a secure link to reset your password.
            </Text>

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

            <Input
              label="Email Address"
              placeholder="your@email.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail-outline"
              containerStyle={{ width: '100%', marginTop: Spacing.sm }}
            />

            <Button
              title="Send Reset Link"
              onPress={handleSubmit}
              loading={loading}
              size="lg"
              style={{ width: '100%', marginTop: Spacing.sm }}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.screenPadding,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: Spacing.sm,
  },
  backText: {
    fontWeight: '700',
    fontSize: Typography.sizes.base,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    marginTop: -30,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  iconEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '800',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  instructions: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },
  emailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BorderRadius.pill,
    marginBottom: Spacing.md,
  },
  emailBadgeText: {
    fontSize: Typography.sizes.sm,
    fontWeight: '700',
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    width: '100%',
  },
  errorText: {
    color: '#EF4444',
    fontSize: Typography.sizes.xs,
    flex: 1,
    lineHeight: 18,
    fontWeight: '600',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.lg,
  },
  resendText: {
    fontSize: Typography.sizes.sm,
  },
  resendLink: {
    fontSize: Typography.sizes.sm,
    fontWeight: '700',
  },
});
