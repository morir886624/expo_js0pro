import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { supabase } from '../../services/supabase';

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
  const { resendOtp } = useAuth();
  const insets = useSafeAreaInsets();

  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [cooldown, setCooldown] = useState(60);

  // Cooldown countdown timer for resending
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleCheckEmailVerified = async () => {
    setChecking(true);
    setError('');
    setInfoMessage('');

    try {
      // 1. Refresh or check active session
      const { data, error: sessionErr } = await supabase.auth.getSession();
      if (data.session) {
        onVerifySuccess();
        return;
      }

      // 2. If signup flow and user clicked link in external browser, check user confirmation
      if (flowType !== 'recovery') {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user?.confirmed_at) {
          onVerifySuccess();
          return;
        }
      }

      setInfoMessage(
        flowType === 'recovery'
          ? 'Please open the password reset link from your email on this device to set a new password.'
          : 'Please make sure you click the verification link in the email before continuing.'
      );
    } catch {
      setError('Please click the confirmation link in your email to activate your account.');
    } finally {
      setChecking(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setError('');
    setResending(true);

    try {
      const result = await resendOtp(email, flowType);
      if (!result.success) {
        setError(result.error || 'Failed to resend verification email');
        return;
      }

      setInfoMessage('A fresh verification email has been sent to your inbox.');
      setCooldown(60);
    } catch (e: any) {
      setError(e.message || 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  const isSignup = flowType === 'signup';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#0B1120' : '#F8FAFC',
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, 24),
        },
      ]}
    >
      {/* Top Back Row */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onBack}
        style={styles.backRow}
      >
        <Ionicons name="arrow-back" size={20} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Verification Card */}
        <View style={styles.contentCard}>
          {/* Big Floating Email Icon */}
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: isDark
                  ? 'rgba(250, 204, 21, 0.15)'
                  : '#FEF9C3',
                borderColor: isDark ? '#EAB308' : '#FACC15',
              },
            ]}
          >
            <Text style={styles.iconEmoji}>{isSignup ? '📬' : '🔑'}</Text>
          </View>

          {/* User Requested Header & Message */}
          <Text style={[styles.title, { color: colors.text }]}>
            {isSignup ? 'Verify Your Email' : 'Reset Your Password'}
          </Text>

          <Text style={[styles.mainNotice, { color: isDark ? '#F1F5F9' : '#1E293B' }]}>
            We sent you a verification email, please verify your email.
          </Text>

          {/* Target Email Address Badge */}
          <View
            style={[
              styles.emailBadge,
              {
                backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
                borderColor: isDark ? '#334155' : '#CBD5E1',
              },
            ]}
          >
            <Ionicons name="mail-outline" size={16} color="#FACC15" />
            <Text style={[styles.emailBadgeText, { color: colors.text }]}>
              {email || 'your email'}
            </Text>
          </View>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Please check your inbox and click the verification link to activate your account.
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

          {/* Primary Action: I've Clicked the Link */}
          <TouchableOpacity
            style={styles.primaryVerifiedBtn}
            onPress={handleCheckEmailVerified}
            activeOpacity={0.8}
            disabled={checking}
          >
            {checking ? (
              <ActivityIndicator size="small" color="#0F172A" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#0F172A" />
                <Text style={styles.primaryVerifiedBtnText}>
                  I've Clicked the Link in My Email ✓
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Resend & Help Section */}
          <View style={styles.helpSection}>
            <Text style={[styles.helpHeading, { color: colors.textSecondary }]}>
              Didn't receive the email?
            </Text>
            <Text style={[styles.helpTip, { color: colors.textMuted }]}>
              • Check your <Text style={{ fontWeight: '800' }}>Spam or Junk</Text> folder.
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleResend}
              disabled={cooldown > 0 || resending}
              style={styles.resendBtn}
            >
              <Ionicons
                name="refresh-outline"
                size={14}
                color={cooldown > 0 ? colors.textMuted : '#FACC15'}
              />
              <Text
                style={[
                  styles.resendText,
                  { color: cooldown > 0 ? colors.textMuted : '#FACC15' },
                ]}
              >
                {cooldown > 0
                  ? `Resend email in ${cooldown}s`
                  : resending
                  ? 'Sending email...'
                  : 'Resend verification email'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onBack}
              style={{ marginTop: Spacing.lg }}
              activeOpacity={0.7}
            >
              <Text style={[styles.changeEmailText, { color: colors.textSecondary }]}>
                Wrong email address? <Text style={{ color: '#38BDF8', fontWeight: '800' }}>Change email</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  backText: {
    fontWeight: '700',
    fontSize: Typography.sizes.base,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.md,
  },
  contentCard: {
    alignItems: 'center',
  },
  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: Spacing.lg,
  },
  iconEmoji: {
    fontSize: 46,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  mainNotice: {
    fontSize: Typography.sizes.base,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.md,
    paddingHorizontal: 12,
  },
  emailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  emailBadgeText: {
    fontSize: Typography.sizes.sm,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
    paddingHorizontal: 16,
  },
  primaryVerifiedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FACC15',
    paddingVertical: 16,
    borderRadius: BorderRadius.md,
    width: '100%',
    marginBottom: Spacing.xl,
    shadowColor: '#FACC15',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryVerifiedBtnText: {
    color: '#0F172A',
    fontSize: Typography.sizes.base,
    fontWeight: '900',
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
    fontWeight: '700',
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
    fontWeight: '700',
  },
  helpSection: {
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    width: '100%',
  },
  helpHeading: {
    fontSize: Typography.sizes.sm,
    fontWeight: '700',
    marginBottom: 4,
  },
  helpTip: {
    fontSize: Typography.sizes.xs,
    marginBottom: Spacing.md,
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  resendText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
  },
  changeEmailText: {
    fontSize: Typography.sizes.xs,
  },
});
