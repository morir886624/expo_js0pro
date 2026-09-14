import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface LinkExpiredModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  onSignIn: () => void;
  onRequestNewLink: () => void;
  onClose: () => void;
}

export const LinkExpiredModal: React.FC<LinkExpiredModalProps> = ({
  visible,
  title = 'Link Expired or Already Used',
  message = 'This email link has already been used or has expired. For your security, email verification and password reset links can only be clicked once.',
  onSignIn,
  onRequestNewLink,
  onClose,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          {/* Close button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            style={[
              styles.closeBtn,
              { backgroundColor: isDark ? '#334155' : '#F1F5F9' },
            ]}
          >
            <Ionicons name="close" size={18} color={colors.text} />
          </TouchableOpacity>

          {/* Warning / Clock Icon */}
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: isDark
                  ? 'rgba(234, 179, 8, 0.15)'
                  : '#FEF9C3',
                borderColor: isDark ? '#CA8A04' : '#FACC15',
              },
            ]}
          >
            <Text style={styles.iconEmoji}>⏳</Text>
          </View>

          {/* Title & Body */}
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

          <Text style={[styles.message, { color: colors.textSecondary }]}>
            {message}
          </Text>

          {/* Helpful Tip Card */}
          <View
            style={[
              styles.tipBox,
              {
                backgroundColor: isDark
                  ? 'rgba(59, 130, 246, 0.1)'
                  : '#EFF6FF',
                borderColor: isDark ? '#1E40AF' : '#BFDBFE',
              },
            ]}
          >
            <Ionicons name="information-circle-outline" size={16} color="#3B82F6" />
            <Text style={[styles.tipText, { color: isDark ? '#93C5FD' : '#1E40AF' }]}>
              If you already clicked this link earlier, your action may have already succeeded.
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.buttonGroup}>
            <Button
              title="Sign In to Your Account"
              onPress={onSignIn}
              size="md"
              style={{ width: '100%' }}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onRequestNewLink}
              style={[
                styles.secondaryBtn,
                {
                  borderColor: isDark ? '#475569' : '#CBD5E1',
                  backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                },
              ]}
            >
              <Ionicons name="refresh-outline" size={16} color={colors.text} />
              <Text style={[styles.secondaryBtnText, { color: colors.text }]}>
                Request a New Link
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.screenPadding,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.xl,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: Spacing.md,
    marginTop: Spacing.xs,
  },
  iconEmoji: {
    fontSize: 30,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  message: {
    fontSize: Typography.sizes.sm,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: Spacing.lg,
    width: '100%',
  },
  tipText: {
    fontSize: Typography.sizes.xs,
    lineHeight: 18,
    flex: 1,
    fontWeight: '500',
  },
  buttonGroup: {
    width: '100%',
    gap: 10,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    width: '100%',
  },
  secondaryBtnText: {
    fontWeight: '700',
    fontSize: Typography.sizes.sm,
  },
});

