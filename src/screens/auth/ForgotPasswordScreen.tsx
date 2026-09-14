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
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSubmitSuccess: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onSubmitSuccess,
}) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess();
    }, 800);
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
          <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>

        {/* Icon & Title */}
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
            Enter your registered email address below to receive password reset instructions and a verification code.
          </Text>

          <Input
            label="Email Address"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
            containerStyle={{ width: '100%', marginTop: Spacing.lg }}
          />

          <Button
            title="Send Reset Code"
            onPress={handleSubmit}
            loading={loading}
            size="lg"
            style={{ width: '100%', marginTop: Spacing.sm }}
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
    marginTop: -40,
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
  },
});

