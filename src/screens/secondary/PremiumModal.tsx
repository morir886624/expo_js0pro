import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const { colors, isDark } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

  const features = [
    { icon: '❤️', title: 'Infinite Lives', desc: 'Never run out of hearts in speed challenges' },
    { icon: '🎮', title: 'All Pro Games', desc: 'Access Array Master, Async Arena & Debugger Rush' },
    { icon: '🚀', title: 'Advanced Modules', desc: 'Async JavaScript, Objects, Classes & Web APIs' },
    { icon: '📜', title: 'Official Certificate', desc: 'Download your verified JavaScript Pro diploma' },
    { icon: '⚡', title: '2x XP Multiplier', desc: 'Level up faster and dominate the leaderboards' },
  ];

  const handleUpgrade = () => {
    onSuccess?.();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#4C1D95' : '#DDD6FE',
            },
          ]}
        >
          {/* Close button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            style={[
              styles.closeBtn,
              { backgroundColor: isDark ? '#374151' : '#F1F5F9' },
            ]}
          >
            <Ionicons name="close" size={20} color={colors.text} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Crown & Title */}
            <View style={styles.headerArea}>
              <View style={styles.crownCircle}>
                <Text style={{ fontSize: 44 }}>👑</Text>
              </View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                JS0pro Premium
              </Text>
              <Text
                style={[styles.modalSubtitle, { color: colors.textSecondary }]}
              >
                Supercharge your coding skills and learn without restrictions
              </Text>
            </View>

            {/* Feature List */}
            <View style={styles.featureList}>
              {features.map((item, index) => (
                <View key={index} style={styles.featureRow}>
                  <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text
                      style={[styles.featureTitle, { color: colors.text }]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.featureDesc,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {item.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Plan selection */}
            <View style={styles.plansRow}>
              {/* Yearly plan */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedPlan('yearly')}
                style={[
                  styles.planBox,
                  {
                    borderColor:
                      selectedPlan === 'yearly'
                        ? '#FACC15'
                        : isDark
                        ? '#374151'
                        : '#E2E8F0',
                    backgroundColor:
                      selectedPlan === 'yearly'
                        ? isDark
                          ? 'rgba(250, 204, 21, 0.1)'
                          : '#FEF9C3'
                        : isDark
                        ? '#111827'
                        : '#F8FAFC',
                  },
                ]}
              >
                <View style={styles.saveBadge}>
                  <Text style={styles.saveBadgeText}>SAVE 33%</Text>
                </View>
                <Text style={[styles.planPeriod, { color: colors.text }]}>
                  Annual
                </Text>
                <Text style={[styles.planPrice, { color: colors.text }]}>
                  $39.99
                </Text>
                <Text style={[styles.planSub, { color: colors.textSecondary }]}>
                  $3.33 / month
                </Text>
              </TouchableOpacity>

              {/* Monthly plan */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedPlan('monthly')}
                style={[
                  styles.planBox,
                  {
                    borderColor:
                      selectedPlan === 'monthly'
                        ? '#FACC15'
                        : isDark
                        ? '#374151'
                        : '#E2E8F0',
                    backgroundColor:
                      selectedPlan === 'monthly'
                        ? isDark
                          ? 'rgba(250, 204, 21, 0.1)'
                          : '#FEF9C3'
                        : isDark
                        ? '#111827'
                        : '#F8FAFC',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.planPeriod,
                    { color: colors.text, marginTop: 14 },
                  ]}
                >
                  Monthly
                </Text>
                <Text style={[styles.planPrice, { color: colors.text }]}>
                  $4.99
                </Text>
                <Text style={[styles.planSub, { color: colors.textSecondary }]}>
                  Billed monthly
                </Text>
              </TouchableOpacity>
            </View>

            {/* Upgrade Button */}
            <Button
              title="Unlock JS0pro Pro 👑"
              onPress={handleUpgrade}
              size="lg"
              style={{ width: '100%', marginVertical: Spacing.md }}
            />

            <Text style={[styles.guaranteeText, { color: colors.textMuted }]}>
              Cancel anytime. 7-day money-back guarantee.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    borderTopWidth: 1.5,
    padding: Spacing.xl,
    maxHeight: '90%',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  crownCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(147, 51, 234, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  modalTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: '900',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  featureList: {
    gap: 12,
    marginBottom: Spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: Typography.sizes.sm + 1,
    fontWeight: '800',
  },
  featureDesc: {
    fontSize: Typography.sizes.xs,
    marginTop: 1,
  },
  plansRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing.md,
  },
  planBox: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    padding: Spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  saveBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#9333EA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  saveBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  planPeriod: {
    fontSize: Typography.sizes.xs,
    fontWeight: '700',
  },
  planPrice: {
    fontSize: Typography.sizes.xl,
    fontWeight: '900',
    marginVertical: 2,
  },
  planSub: {
    fontSize: 10,
  },
  guaranteeText: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
});

