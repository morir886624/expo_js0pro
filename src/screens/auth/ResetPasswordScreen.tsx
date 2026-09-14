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
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  const { colors, isDark } = useTheme();
  const { resetPassword } = useAuth();
  const insets = useSafeAreaInsets();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

      onSuccess();
    } catch (e: any) {
      setError(e.message || 'Failed to update password');
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
          <Text style={[styles.backText, { color: colors.text }]}>Cancel</Text>
        </TouchableOpacity>

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
            Your identity has been verified. Choose a strong new password for your account.
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
});

