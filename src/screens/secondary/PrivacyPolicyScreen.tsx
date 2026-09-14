import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/common/Card';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({
  onBack,
}) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#111827' : '#F8FAFC',
          paddingTop: Math.max(insets.top, 10),
        },
      ]}
    >
      <Header showBack onBack={onBack} title="Privacy & Security" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Protection Hero Card (Figma Style) */}
        <Card
          style={[
            styles.shieldCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.shieldIconCircle}>
            <Text style={{ fontSize: 44 }}>🛡️</Text>
          </View>
          <Text style={[styles.shieldTitle, { color: colors.text }]}>
            Your data is protected
          </Text>
          <Text
            style={[styles.shieldSubtitle, { color: colors.textSecondary }]}
          >
            JS0pro is fully GDPR-compliant. We never sell your personal data or track your learning activity across third-party networks.
          </Text>
        </Card>

        {/* Legal Documents Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Legal Documents
        </Text>

        <Card
          style={[
            styles.legalCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.legalRow}
            onPress={() => Alert.alert('Privacy Policy', 'JS0pro respects your privacy and stores all progress locally.')}
          >
            <View style={styles.legalLeft}>
              <Text style={{ fontSize: 20 }}>📜</Text>
              <View>
                <Text style={[styles.docTitle, { color: colors.text }]}>
                  Privacy Policy
                </Text>
                <Text style={[styles.docSub, { color: colors.textSecondary }]}>
                  Last updated: August 2026
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.legalRow}
            onPress={() => Alert.alert('Terms of Service', 'By using JS0pro, you agree to our fair-use educational guidelines.')}
          >
            <View style={styles.legalLeft}>
              <Text style={{ fontSize: 20 }}>⚖️</Text>
              <View>
                <Text style={[styles.docTitle, { color: colors.text }]}>
                  Terms of Service
                </Text>
                <Text style={[styles.docSub, { color: colors.textSecondary }]}>
                  User agreement & licensing
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.legalRow, { borderBottomWidth: 0 }]}
            onPress={() => Alert.alert('Data Management', 'You can export or reset your local progress at any time.')}
          >
            <View style={styles.legalLeft}>
              <Text style={{ fontSize: 20 }}>🗑️</Text>
              <View>
                <Text style={[styles.docTitle, { color: '#EF4444' }]}>
                  Request Data Deletion
                </Text>
                <Text style={[styles.docSub, { color: colors.textSecondary }]}>
                  Permanently erase learning history
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 40,
  },
  shieldCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    marginVertical: Spacing.md,
  },
  shieldIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  shieldTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: '800',
    marginBottom: 6,
  },
  shieldSubtitle: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  legalCard: {
    padding: 0,
    overflow: 'hidden',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  legalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  docTitle: {
    fontSize: Typography.sizes.sm + 1,
    fontWeight: '700',
  },
  docSub: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
});

