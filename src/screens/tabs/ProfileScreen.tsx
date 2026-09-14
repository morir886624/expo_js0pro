import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useGameProgress } from '../../context/GameProgressContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface ProfileScreenProps {
  onNavigateToBadges: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToPrivacy: () => void;
  onOpenUpgradeModal: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateToBadges,
  onNavigateToNotifications,
  onNavigateToPrivacy,
  onOpenUpgradeModal,
}) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, logout, deleteAccount } = useAuth();
  const { xp, level, streakDays, soundEnabled, toggleSound } = useGameProgress();
  const insets = useSafeAreaInsets();

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account & All Data',
      'Are you sure you want to permanently delete your account? All your XP, lessons completed, streaks, and badges will be permanently erased. This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Permanently',
          style: 'destructive',
          onPress: async () => {
            const res = await deleteAccount();
            if (!res.success && res.error) {
              Alert.alert('Account Deletion', res.error);
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#111827' : '#F8FAFC',
          paddingTop: Math.max(insets.top, 16),
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile 👤</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onOpenUpgradeModal}
          style={styles.proPill}
        >
          <Text style={styles.proPillText}>PRO 👑</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Card (Figma Style) */}
        <Card
          style={[
            styles.userCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.avatarRow}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarLetter}>
                  {user?.avatarLetter || 'A'}
                </Text>
              </View>
              <View style={styles.editBadge}>
                <Text style={{ fontSize: 10 }}>✏️</Text>
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {user?.name || 'JavaScript Learner'}
              </Text>
              <Text style={[styles.userHandle, { color: colors.textSecondary }]}>
                {user?.email || user?.username || '@learner'}
              </Text>
              <View style={styles.pillsRow}>
                <Badge label={`Level ${level}`} variant="primary" size="sm" icon="⚡" />
                <Badge label={`${streakDays}-Day Streak`} variant="warning" size="sm" icon="🔥" />
              </View>
            </View>
          </View>

          {/* 3 Metric counters */}
          <View
            style={[
              styles.metricsRow,
              { borderTopColor: isDark ? '#374151' : '#E2E8F0' },
            ]}
          >
            <View style={styles.metricItem}>
              <Text style={[styles.metricValue, { color: '#FACC15' }]}>
                {xp.toLocaleString()}
              </Text>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                Total XP
              </Text>
            </View>
            <View
              style={[
                styles.metricDivider,
                { backgroundColor: isDark ? '#374151' : '#E2E8F0' },
              ]}
            />
            <View style={styles.metricItem}>
              <Text style={[styles.metricValue, { color: colors.text }]}>12</Text>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                Lessons
              </Text>
            </View>
            <View
              style={[
                styles.metricDivider,
                { backgroundColor: isDark ? '#374151' : '#E2E8F0' },
              ]}
            />
            <View style={styles.metricItem}>
              <Text style={[styles.metricValue, { color: '#22C55E' }]}>94%</Text>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                Accuracy
              </Text>
            </View>
          </View>
        </Card>

        {/* Upgrade Pro Banner */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onOpenUpgradeModal}
          style={styles.proBanner}
        >
          <View style={styles.proBannerContent}>
            <Text style={{ fontSize: 24 }}>👑</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.proBannerTitle}>Upgrade to JS0pro Pro</Text>
              <Text style={styles.proBannerSubtitle}>
                Unlock all advanced courses, pro games & certificate
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Account & Security */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Account & Security
          </Text>
        </View>

        <Card
          style={[
            styles.settingsCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIcon,
                  { backgroundColor: isDark ? '#374151' : '#FEF9C3' },
                ]}
              >
                <Ionicons name="mail-outline" size={18} color="#FACC15" />
              </View>
              <View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {user?.email || 'Authenticated User'}
                </Text>
                <Text style={{ fontSize: 11, color: '#22C55E', fontWeight: '700' }}>
                  ✓ Email Verified
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIcon,
                  { backgroundColor: isDark ? '#374151' : '#DCFCE7' },
                ]}
              >
                <Ionicons name="shield-checkmark" size={18} color="#22C55E" />
              </View>
              <View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                   JWT Session
                </Text>
                <Text style={{ fontSize: 11, color: colors.textSecondary }}>
                  Encrypted in SecureStore
                </Text>
              </View>
            </View>
          </View>

          {/* Google Play Compliant Account Deletion Row */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={confirmDeleteAccount}
            style={[styles.settingRow, { borderBottomWidth: 0 }]}
          >
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIcon,
                  { backgroundColor: isDark ? '#451A1A' : '#FEE2E2' },
                ]}
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </View>
              <View>
                <Text style={[styles.settingLabel, { color: '#EF4444' }]}>
                  Delete Account & Data
                </Text>
                <Text style={{ fontSize: 11, color: colors.textSecondary }}>
                  Permanently erase all progress & account
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#EF4444" />
          </TouchableOpacity>
        </Card>

        {/* Settings List */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Preferences
          </Text>
        </View>

        <Card
          style={[
            styles.settingsCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          {/* Dark Mode Switch */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIcon,
                  { backgroundColor: isDark ? '#374151' : '#FEF9C3' },
                ]}
              >
                <Ionicons
                  name={isDark ? 'moon' : 'sunny'}
                  size={18}
                  color="#FACC15"
                />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#CBD5E1', true: '#FACC15' }}
              thumbColor={isDark ? '#0F172A' : '#FFFFFF'}
            />
          </View>

          {/* Sound Effects Switch */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIcon,
                  { backgroundColor: isDark ? '#374151' : '#DCFCE7' },
                ]}
              >
                <Ionicons
                  name={soundEnabled ? 'volume-high' : 'volume-mute'}
                  size={18}
                  color="#22C55E"
                />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Sound Effects
              </Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: '#CBD5E1', true: '#22C55E' }}
              thumbColor={soundEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          {/* Notifications link */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onNavigateToNotifications}
            style={styles.settingRow}
          >
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIcon,
                  { backgroundColor: isDark ? '#374151' : '#DBEAFE' },
                ]}
              >
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color="#3B82F6"
                />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Notifications
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          {/* Badges link */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onNavigateToBadges}
            style={styles.settingRow}
          >
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIcon,
                  { backgroundColor: isDark ? '#374151' : '#FEE2E2' },
                ]}
              >
                <Ionicons name="ribbon-outline" size={18} color="#EF4444" />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Badges & Achievements
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          {/* Privacy link */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onNavigateToPrivacy}
            style={[styles.settingRow, { borderBottomWidth: 0 }]}
          >
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIcon,
                  { backgroundColor: isDark ? '#374151' : '#F1F5F9' },
                ]}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color={colors.text}
                />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Privacy & Legal
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={logout}
          style={[
            styles.logoutButton,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#7F1D1D' : '#FEE2E2',
            },
          ]}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  proPill: {
    backgroundColor: '#9333EA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.pill,
  },
  proPillText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xs,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 40,
  },
  userCard: {
    marginVertical: Spacing.sm,
    padding: Spacing.base,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FACC15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userName: {
    fontSize: Typography.sizes.lg,
    fontWeight: '800',
  },
  userHandle: {
    fontSize: Typography.sizes.xs,
    marginTop: 1,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: Spacing.md,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: Typography.sizes.md,
    fontWeight: '900',
  },
  metricLabel: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 28,
  },
  proBanner: {
    backgroundColor: '#7C3AED',
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginVertical: Spacing.sm,
  },
  proBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proBannerTitle: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.base,
    fontWeight: '800',
  },
  proBannerSubtitle: {
    color: '#E9D5FF',
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  sectionHeader: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    fontSize: Typography.sizes.base,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.xl,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: Typography.sizes.base,
    fontWeight: '700',
  },
});

