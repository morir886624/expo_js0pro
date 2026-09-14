import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface OtpVerificationScreenProps {
  email: string;
  flowType?: 'signup' | 'recovery';
  onBack: () => void;
  onVerifySuccess: () => void;
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  email,
  flowType = 'signup',
  onBack,
  onVerifySuccess,
}) => {
  const { colors, isDark } = useTheme();
  const { verifyEmailOtp, resendOtp } = useAuth();
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [cooldown, setCooldown] = useState(60);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Cooldown countdown timer for resending
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleDigitChange = (text: string, index: number) => {
    setError('');
    setInfoMessage('');

    // Handle full paste of 6 digits
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 1) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = cleaned[i] || '';
      }
      setCode(newCode);
      const nextFocus = Math.min(cleaned.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = cleaned.slice(-1);
    setCode(newCode);

    // Auto-advance to next input if digit entered
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('').trim();
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits of the verification code');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await verifyEmailOtp(email, fullCode, flowType);
      if (!result.success) {
        setError(result.error || 'Invalid or expired verification code');
        return;
      }

      onVerifySuccess();
    } catch (e: any) {
      setError(e.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setError('');
    setResending(true);

    try {
      const result = await resendOtp(email, flowType);
      if (!result.success) {
        setError(result.error || 'Failed to resend verification code');
        return;
      }

      setInfoMessage('A new verification code has been sent to your email.');
      setCooldown(60);
    } catch (e: any) {
      setError(e.message || 'Failed to resend verification code');
    } finally {
      setResending(false);
    }
  };

  const isSignup = flowType === 'signup';

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
          <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: isDark ? 'rgba(250, 204, 21, 0.15)' : '#FEF9C3' },
            ]}
          >
            <Text style={styles.iconEmoji}>{isSignup ? '📧' : '🔑'}</Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            {isSignup ? 'Verify Your Email' : 'Verification Code'}
          </Text>

          <Text style={[styles.instructions, { color: colors.textSecondary }]}>
            We've sent a 6-digit confirmation code to{' '}
            <Text style={{ fontWeight: '700', color: colors.text }}>
              {email || 'your email'}
            </Text>
            . Enter it below to proceed.
          </Text>

          {/* Error Banner */}
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

          {/* Info Banner */}
          {infoMessage ? (
            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: isDark
                    ? 'rgba(34, 197, 94, 0.15)'
                    : '#F0FDF4',
                  borderColor: isDark ? '#15803D' : '#86EFAC',
                },
              ]}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color="#22C55E"
              />
              <Text style={styles.infoText}>{infoMessage}</Text>
            </View>
          ) : null}

          {/* 6 Digit Input Boxes */}
          <View style={styles.otpRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(text) => handleDigitChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={6}
                selectTextOnFocus
                autoFocus={index === 0}
                style={[
                  styles.otpBox,
                  {
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: digit
                      ? '#FACC15'
                      : isDark
                      ? '#374151'
                      : '#E2E8F0',
                    color: colors.text,
                  },
                ]}
              />
            ))}
          </View>

          <Button
            title="Verify Code"
            onPress={handleVerify}
            loading={loading}
            size="lg"
            style={{ width: '100%', marginTop: Spacing.xl }}
          />

          <View style={styles.resendRow}>
            <Text style={{ color: colors.textSecondary }}>
              Didn't receive the code?{' '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleResend}
              disabled={cooldown > 0 || resending}
            >
              <Text
                style={[
                  styles.resendLink,
                  { color: cooldown > 0 ? colors.textMuted : '#FACC15' },
                ]}
              >
                {cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : resending
                  ? 'Sending...'
                  : 'Resend'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: Spacing.sm,
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
    marginBottom: Spacing.lg,
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
    width: '100%',
  },
  errorText: {
    color: '#EF4444',
    fontSize: Typography.sizes.xs,
    flex: 1,
    lineHeight: 18,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    width: '100%',
  },
  infoText: {
    color: '#16A34A',
    fontSize: Typography.sizes.xs,
    flex: 1,
    lineHeight: 18,
    fontWeight: '600',
  },
  otpRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    width: '100%',
  },
  otpBox: {
    width: 46,
    height: 54,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    textAlign: 'center',
    fontSize: Typography.sizes.xl,
    fontWeight: '800',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  resendLink: {
    fontWeight: '800',
  },
});
