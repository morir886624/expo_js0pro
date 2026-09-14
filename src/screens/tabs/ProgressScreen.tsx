import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useGameProgress } from '../../context/GameProgressContext';
import { Card } from '../../components/common/Card';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface ProgressScreenProps {
  onNavigateToBadges: () => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  onNavigateToBadges,
}) => {
  const { colors, isDark } = useTheme();
  const { xp, level, streakDays, badges } = useGameProgress();
  const insets = useSafeAreaInsets();

  const unlockedBadges = badges.filter((b) => b.isUnlocked);

  // Weekly XP history
  const weekData = [
    { day: 'Mon', xp: 120, height: 45 },
    { day: 'Tue', xp: 180, height: 65 },
    { day: 'Wed', xp: 90, height: 35 },
    { day: 'Thu', xp: 240, height: 85 },
    { day: 'Fri', xp: 150, height: 55 },
    { day: 'Sat', xp: 200, height: 75 },
    { day: 'Sun', xp: 260, height: 95 },
  ];

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
        <Text style={[styles.title, { color: colors.text }]}>Progress 🏆</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your JavaScript journey
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Level Overview Card (Figma Style) */}
        <Card
          style={[
            styles.levelCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.levelCardTop}>
            <View
              style={[
                styles.levelBigCircle,
                { backgroundColor: 'rgba(250, 204, 21, 0.15)' },
              ]}
            >
              <Text style={styles.levelBigNumber}>{level}</Text>
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.currentLevelTag}>CURRENT LEVEL</Text>
              <Text style={[styles.rankTitle, { color: colors.text }]}>
                Advanced Beginner
              </Text>
              <Text style={[styles.totalXpSub, { color: colors.textSecondary }]}>
                {xp.toLocaleString()} Total XP earned
              </Text>
            </View>
          </View>

          <View style={styles.levelProgressSection}>
            <View style={styles.progressRow}>
              <Text style={[styles.progressToNextText, { color: colors.textSecondary }]}>
                To Level {level + 1}
              </Text>
              <Text style={[styles.xpFraction, { color: '#FACC15' }]}>
                850 / 1,000 XP
              </Text>
            </View>
            <ProgressBar progress={0.85} height={10} color="#FACC15" />
            <Text style={[styles.xpLeftText, { color: colors.textMuted }]}>
              150 XP left to reach Level {level + 1}
            </Text>
          </View>
        </Card>

        {/* Statistics 4-Grid */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Statistics
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <Text style={{ fontSize: 24, marginBottom: 4 }}>🔥</Text>
            <Text style={[styles.statBoxValue, { color: colors.text }]}>
              {streakDays} Days
            </Text>
            <Text style={[styles.statBoxLabel, { color: colors.textSecondary }]}>
              Daily Streak
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <Text style={{ fontSize: 24, marginBottom: 4 }}>⏱</Text>
            <Text style={[styles.statBoxValue, { color: colors.text }]}>
              3.5 Hours
            </Text>
            <Text style={[styles.statBoxLabel, { color: colors.textSecondary }]}>
              Learning Time
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <Text style={{ fontSize: 24, marginBottom: 4 }}>🎯</Text>
            <Text style={[styles.statBoxValue, { color: colors.text }]}>
              94%
            </Text>
            <Text style={[styles.statBoxLabel, { color: colors.textSecondary }]}>
              Quiz Accuracy
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <Text style={{ fontSize: 24, marginBottom: 4 }}>📚</Text>
            <Text style={[styles.statBoxValue, { color: colors.text }]}>
              12
            </Text>
            <Text style={[styles.statBoxLabel, { color: colors.textSecondary }]}>
              Completed Lessons
            </Text>
          </View>
        </View>

        {/* Weekly Activity Chart (Figma Style) */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Weekly Activity
          </Text>
        </View>

        <Card
          style={[
            styles.chartCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.chartBarsRow}>
            {weekData.map((item, idx) => (
              <View key={idx} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: item.height,
                        backgroundColor:
                          idx === 6 ? '#FACC15' : isDark ? '#374151' : '#CBD5E1',
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.barDayText, { color: colors.textSecondary }]}>
                  {item.day}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.chartFooter}>
            <Text style={[styles.chartAverageText, { color: colors.textMuted }]}>
              Avg. 177 XP per day this week
            </Text>
          </View>
        </Card>

        {/* Achievements / Badges Preview Card */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Achievements
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToBadges}>
            <Text style={styles.viewBadgesLink}>View all ({unlockedBadges.length}/{badges.length})</Text>
          </TouchableOpacity>
        </View>

        <Card
          onPress={onNavigateToBadges}
          style={[
            styles.badgesPreviewCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.badgesRow}>
            {badges.slice(0, 5).map((b) => (
              <View
                key={b.id}
                style={[
                  styles.badgeCircle,
                  {
                    backgroundColor: b.isUnlocked
                      ? 'rgba(250, 204, 21, 0.15)'
                      : isDark
                      ? '#374151'
                      : '#E2E8F0',
                    opacity: b.isUnlocked ? 1 : 0.4,
                  },
                ]}
              >
                <Text style={{ fontSize: 24 }}>{b.icon}</Text>
              </View>
            ))}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 40,
  },
  levelCard: {
    marginVertical: Spacing.sm,
    padding: Spacing.base,
  },
  levelCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  levelBigCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBigNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FACC15',
  },
  currentLevelTag: {
    color: '#FACC15',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 2,
  },
  rankTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: '800',
  },
  totalXpSub: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  levelProgressSection: {
    gap: 6,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressToNextText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
  },
  xpFraction: {
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
  },
  xpLeftText: {
    fontSize: 11,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
  },
  viewBadgesLink: {
    color: '#FACC15',
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    width: '48%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  statBoxValue: {
    fontSize: Typography.sizes.base,
    fontWeight: '900',
  },
  statBoxLabel: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  chartCard: {
    padding: Spacing.base,
  },
  chartBarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
  },
  barCol: {
    alignItems: 'center',
    gap: 8,
  },
  barTrack: {
    height: 95,
    width: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barFill: {
    width: 14,
    borderRadius: 7,
  },
  barDayText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
  },
  chartFooter: {
    marginTop: Spacing.md,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: Spacing.sm,
  },
  chartAverageText: {
    fontSize: 11,
  },
  badgesPreviewCard: {
    padding: Spacing.base,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  badgeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

