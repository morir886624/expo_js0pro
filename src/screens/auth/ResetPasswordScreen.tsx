import React, { useState } from 'react';
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

interface ResetPasswordScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  onRequestNewLink?: () => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onBack,
  onSuccess,
  onRequestNewLink,
}) => {
  const { colors, isDark } = useTheme();
  const { resetPassword } = useAuth();
  const insets = useSafeAreaInsets();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await resetPassword(password);
      if (!result.success) {
        setError(result.error || 'Failed to update password');
        return;
      }

      setIsSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const isSessionError =
    error.toLowerCase().includes('session') ||
    error.toLowerCase().includes('expired') ||
    error.toLowerCase().includes('invalid');

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
          <Text style={[styles.backText, { color: colors.text }]}>
            {isSuccess ? 'Back to Sign In' : 'Cancel'}
          </Text>
        </TouchableOpacity>

        {isSuccess ? (
          /* ============================================================== */
          /* SUCCESS STATE: Password Updated                                 */
          /* ============================================================== */
          <View style={styles.content}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(34, 197, 94, 0.15)' : '#DCFCE7' },
              ]}
            >
              <Text style={styles.iconEmoji}>✅</Text>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>
              Password Updated!
            </Text>

            <Text style={[styles.instructions, { color: colors.textSecondary }]}>
              Your account password has been changed successfully. You can now use your new password to sign in.
            </Text>

            <Button
              title="Sign In to Your Account"
              onPress={onSuccess}
              size="lg"
              style={{ width: '100%', marginTop: Spacing.lg }}
            />
          </View>
        ) : (
          /* ============================================================== */
          /* INPUT STATE: Standard 2-Input Reset Form                        */
          /* ============================================================== */
          <View style={styles.content}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(250, 204, 21, 0.15)' : '#FEF9C3' },
              ]}
            >
              <Text style={styles.iconEmoji}>🛡️</Text>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>
              Set New Password
            </Text>
            <Text style={[styles.instructions, { color: colors.textSecondary }]}>
              Choose a strong new password for your account.
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
                <View style={{ flex: 1 }}>
                  <Text style={styles.errorText}>{error}</Text>
                  {isSessionError ? (
                    <TouchableOpacity
                      onPress={onRequestNewLink || onBack}
                      activeOpacity={0.7}
                      style={{ marginTop: 6 }}
                    >
                      <Text style={styles.requestNewLinkText}>
                        Request a New Reset Link →
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            ) : null}

            {/* Input 1: New Password */}
            <Input
              label="New Password"
              placeholder="At least 6 characters"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (error) setError('');
              }}
              isPassword
              leftIcon="lock-closed-outline"
              containerStyle={{ width: '100%', marginTop: Spacing.sm }}
            />

            {/* Input 2: Confirm New Password */}
            <Input
              label="Confirm New Password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                if (error) setError('');
              }}
              isPassword
              leftIcon="shield-checkmark-outline"
              containerStyle={{ width: '100%', marginTop: Spacing.sm }}
            />

            <Button
              title="Update Password"
              onPress={handleSubmit}
              loading={loading}
              size="lg"
              style={{ width: '100%', marginTop: Spacing.lg }}
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
  errorCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    lineHeight: 18,
    fontWeight: '600',
  },
  requestNewLinkText: {
    color: '#FACC15',
    fontSize: Typography.sizes.xs,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
