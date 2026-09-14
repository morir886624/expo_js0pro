import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface OtpVerificationScreenProps {
  onBack: () => void;
  onVerifySuccess: () => void;
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  onBack,
  onVerifySuccess,
}) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleDigitChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerifySuccess();
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

        <View style={styles.content}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: isDark ? 'rgba(250, 204, 21, 0.15)' : '#FEF9C3' },
            ]}
          >
            <Text style={styles.iconEmoji}>📧</Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Check your email
          </Text>
          <Text style={[styles.instructions, { color: colors.textSecondary }]}>
            We've sent a 6-digit verification code to your email address. Enter it below to proceed.
          </Text>

          {/* 6 Digit Input Boxes */}
          <View style={styles.otpRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(text) => handleDigitChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={[
                  styles.otpBox,
                  {
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: digit ? '#FACC15' : isDark ? '#374151' : '#E2E8F0',
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
            <Text style={{ color: colors.textSecondary }}>Didn't receive the code? </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.resendLink}>Resend</Text>
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
    marginBottom: Spacing.xl,
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
    color: '#FACC15',
    fontWeight: '800',
  },
});

