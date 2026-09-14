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
import { useAuth } from '../../context/AuthContext';
import { useGameProgress } from '../../context/GameProgressContext';
import { Card } from '../../components/common/Card';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { MODULES_DATA } from '../../data/mockData';

interface HomeScreenProps {
  onStartLesson: (moduleId: string, lessonId: string) => void;
  onNavigateToNotifications: () => void;
  onNavigateToProgress: () => void;
  onNavigateToLearn: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartLesson,
  onNavigateToNotifications,
  onNavigateToProgress,
  onNavigateToLearn,
}) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { xp, level, streakDays } = useGameProgress();
  const insets = useSafeAreaInsets();

  // Progress to next level: each level is 400 XP
  const levelFloor = (level - 1) * 400;
  const currentLevelXp = xp - levelFloor;
  const neededXp = 400;
  const levelProgress = Math.min(Math.max(currentLevelXp / neededXp, 0), 1);
  const xpRemaining = Math.max(neededXp - currentLevelXp, 0);

  const activeModule = MODULES_DATA[1]; // Module 2 Conditions
  const nextLesson = activeModule.lessons[2]; // Lesson 3 Ternary

  const weekDays = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: true },
    { day: 'F', completed: true },
    { day: 'S', completed: true },
    { day: 'S', completed: true },
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
      {/* Top Header Bar */}
      <View style={styles.header}>
        <View style={styles.userRow}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: '#FACC15',
              },
            ]}
          >
            <Text style={styles.avatarLetter}>
              {user?.avatarLetter || 'A'}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.greetingText, { color: colors.textSecondary }]}>
              Hello 👋
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.name || 'Abdul'}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          {/* Theme Mode Toggle Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleTheme}
            style={[
              styles.headerIconButton,
              { backgroundColor: isDark ? '#1F2937' : '#FFFFFF', borderColor: isDark ? '#374151' : '#E2E8F0' },
            ]}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={18}
              color="#FACC15"
            />
          </TouchableOpacity>

          {/* Streak pill */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onNavigateToProgress}
            style={[
              styles.streakPill,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <Text style={styles.streakFire}>🔥</Text>
            <Text style={[styles.streakNumber, { color: colors.text }]}>
              {streakDays}
            </Text>
          </TouchableOpacity>

          {/* Notifications bell */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onNavigateToNotifications}
            style={[
              styles.headerIconButton,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.text}
            />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Level Banner Card (Figma Style) */}
        <Card
          variant="elevated"
          style={[
            styles.levelCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.levelCardHeader}>
            <View>
              <Text style={styles.levelLabel}>CURRENT LEVEL</Text>
              <Text style={[styles.levelValue, { color: colors.text }]}>
                Level {level}
              </Text>
            </View>
            <View style={styles.xpBox}>
              <Text style={styles.xpLabel}>TOTAL XP</Text>
              <Text style={styles.xpValue}>{xp.toLocaleString()} XP</Text>
            </View>
          </View>

          <View style={styles.levelProgressContainer}>
            <View style={styles.progressLabelRow}>
              <Text style={[styles.progressToNext, { color: colors.textSecondary }]}>
                Progress to Level {level + 1}
              </Text>
              <Text style={[styles.progressFraction, { color: '#FACC15' }]}>
                {Math.round(levelProgress * 100)}%
              </Text>
            </View>
            <ProgressBar progress={levelProgress} height={10} color="#FACC15" />
            <Text style={[styles.xpRemainingText, { color: colors.textMuted }]}>
              {xpRemaining} XP left to reach Level {level + 1}
            </Text>
          </View>
        </Card>

        {/* 7-Day Streak Row Card */}
        <Card
          style={[
            styles.streakCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.streakHeaderRow}>
            <View style={styles.streakIconCircle}>
              <Text style={{ fontSize: 20 }}>🔥</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.streakTitle, { color: colors.text }]}>
                {streakDays}-Day Learning Streak!
              </Text>
              <Text style={[styles.streakSubtitle, { color: colors.textSecondary }]}>
                You're on fire! Practice today to keep it going.
              </Text>
            </View>
          </View>

          <View style={styles.weekRow}>
            {weekDays.map((item, i) => (
              <View key={i} style={styles.dayCol}>
                <View
                  style={[
                    styles.dayCircle,
                    {
                      backgroundColor: item.completed
                        ? '#FACC15'
                        : isDark
                        ? '#374151'
                        : '#E2E8F0',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayStatusText,
                      { color: item.completed ? '#0F172A' : colors.textMuted },
                    ]}
                  >
                    {item.completed ? '✓' : ''}
                  </Text>
                </View>
                <Text style={[styles.dayLetter, { color: colors.textSecondary }]}>
                  {item.day}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Continue Learning Hero Card */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Continue Learning
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToLearn}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <Card
          style={[
            styles.continueCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.continueHeader}>
            <Badge label="MODULE 2 · LESSON 3" variant="primary" size="sm" />
            <Text style={[styles.durationText, { color: colors.textMuted }]}>
              ⏱ 5 min
            </Text>
          </View>

          <Text style={[styles.lessonTitle, { color: colors.text }]}>
            {nextLesson.title}
          </Text>
          <Text
            style={[styles.lessonDescription, { color: colors.textSecondary }]}
          >
            {nextLesson.description}
          </Text>

          <View style={styles.continueFooter}>
            <View style={styles.xpRewardTag}>
              <Text style={{ fontSize: 13 }}>⚡</Text>
              <Text style={styles.xpRewardText}>+{nextLesson.xp} XP</Text>
            </View>

            <Button
              title="Continue →"
              size="sm"
              onPress={() => onStartLesson(activeModule.id, nextLesson.id)}
              style={styles.continueButton}
            />
          </View>
        </Card>

        {/* Quick Access / Recommended Modules */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Explore Topics
          </Text>
        </View>

        <View style={styles.topicsGrid}>
          {MODULES_DATA.slice(0, 4).map((mod) => (
            <TouchableOpacity
              key={mod.id}
              activeOpacity={0.8}
              onPress={onNavigateToLearn}
              style={[
                styles.topicCard,
                {
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  borderColor: isDark ? '#374151' : '#E2E8F0',
                },
              ]}
            >
              <View
                style={[
                  styles.topicIconBox,
                  { backgroundColor: isDark ? '#374151' : '#FEF9C3' },
                ]}
              >
                <Text style={{ fontSize: 24 }}>{mod.icon}</Text>
              </View>
              <Text
                style={[styles.topicTitle, { color: colors.text }]}
                numberOfLines={1}
              >
                {mod.title}
              </Text>
              <Text
                style={[styles.topicLessonsCount, { color: colors.textMuted }]}
              >
                {mod.completedLessons} / {mod.totalLessons} lessons
              </Text>
              <ProgressBar
                progress={mod.completedLessons / mod.totalLessons}
                height={5}
                color="#FACC15"
                style={{ marginTop: 8 }}
              />
            </TouchableOpacity>
          ))}
        </View>
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
    paddingBottom: Spacing.md,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FACC15',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarLetter: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  nameContainer: {},
  greetingText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
  },
  userName: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.pill,
    borderWidth: 1.5,
    gap: 4,
  },
  streakFire: {
    fontSize: 14,
  },
  streakNumber: {
    fontWeight: '800',
    fontSize: Typography.sizes.sm,
  },
  headerIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 40,
  },
  levelCard: {
    marginVertical: Spacing.sm,
  },
  levelCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  levelLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FACC15',
    letterSpacing: 1,
  },
  levelValue: {
    fontSize: Typography.sizes.xl,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  xpBox: {
    alignItems: 'flex-end',
  },
  xpLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  xpValue: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
    color: '#FACC15',
  },
  levelProgressContainer: {
    gap: 6,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressToNext: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
  },
  progressFraction: {
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
  },
  xpRemainingText: {
    fontSize: 11,
    marginTop: 2,
  },
  streakCard: {
    marginVertical: Spacing.sm,
  },
  streakHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: Spacing.md,
  },
  streakIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '800',
  },
  streakSubtitle: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xs,
  },
  dayCol: {
    alignItems: 'center',
    gap: 4,
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayStatusText: {
    fontSize: 12,
    fontWeight: '900',
  },
  dayLetter: {
    fontSize: 11,
    fontWeight: '600',
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
    letterSpacing: -0.3,
  },
  viewAllText: {
    color: '#FACC15',
    fontSize: Typography.sizes.sm,
    fontWeight: '700',
  },
  continueCard: {
    padding: Spacing.base,
  },
  continueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  durationText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
  },
  lessonTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: '800',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  continueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xs,
  },
  xpRewardTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  xpRewardText: {
    color: '#FACC15',
    fontWeight: '800',
    fontSize: Typography.sizes.sm,
  },
  continueButton: {
    paddingHorizontal: 16,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: Spacing.xs,
  },
  topicCard: {
    width: '48%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
  },
  topicIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  topicTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: '800',
  },
  topicLessonsCount: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
});

