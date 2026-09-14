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
import { Badge } from '../../components/common/Badge';
import { Header } from '../../components/common/Header';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { Module, Lesson } from '../../data/mockData';

interface ModuleDetailScreenProps {
  module: Module;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}

export const ModuleDetailScreen: React.FC<ModuleDetailScreenProps> = ({
  module,
  onBack,
  onSelectLesson,
}) => {
  const { colors, isDark } = useTheme();
  const { completedLessons } = useGameProgress();
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
      <Header
        showBack
        onBack={onBack}
        subtitle={`MODULE ${module.number}`}
        title={module.title}
        rightAction={
          <Badge
            label={`${module.completedLessons}/${module.totalLessons} Done`}
            variant="primary"
            size="sm"
          />
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Module Header Overview Card */}
        <Card
          style={[
            styles.bannerCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.bannerRow}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: isDark ? '#374151' : '#FEF9C3' },
              ]}
            >
              <Text style={{ fontSize: 32 }}>{module.icon}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={[styles.bannerTitle, { color: colors.text }]}>
                {module.title}
              </Text>
              <Text
                style={[styles.bannerDesc, { color: colors.textSecondary }]}
              >
                {module.description}
              </Text>
            </View>
          </View>
        </Card>

        {/* Section title */}
        <Text style={[styles.lessonsHeader, { color: colors.text }]}>
          Lessons in this module
        </Text>

        {/* Lessons List */}
        <View style={styles.lessonsList}>
          {module.lessons.map((lesson, idx) => {
            const isCompleted =
              completedLessons.includes(lesson.id) || lesson.isCompleted;
            const isCurrent = !isCompleted && (idx === 0 || completedLessons.includes(module.lessons[idx - 1]?.id));
            const isLocked = !isCompleted && !isCurrent;

            return (
              <TouchableOpacity
                key={lesson.id}
                disabled={isLocked}
                activeOpacity={0.8}
                onPress={() => onSelectLesson(lesson)}
                style={[
                  styles.lessonCard,
                  {
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isCurrent
                      ? '#FACC15'
                      : isDark
                      ? '#374151'
                      : '#E2E8F0',
                    opacity: isLocked ? 0.6 : 1,
                  },
                ]}
              >
                {/* Number / Status Circle */}
                <View
                  style={[
                    styles.statusCircle,
                    {
                      backgroundColor: isCompleted
                        ? '#22C55E'
                        : isCurrent
                        ? '#FACC15'
                        : isDark
                        ? '#374151'
                        : '#E2E8F0',
                    },
                  ]}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                  ) : isLocked ? (
                    <Ionicons
                      name="lock-closed"
                      size={14}
                      color={colors.textMuted}
                    />
                  ) : (
                    <Text style={styles.currentNumberText}>{lesson.number}</Text>
                  )}
                </View>

                {/* Lesson Info */}
                <View style={styles.lessonInfo}>
                  <View style={styles.lessonMetaRow}>
                    <Text
                      style={[
                        styles.lessonStepText,
                        { color: colors.textMuted },
                      ]}
                    >
                      LESSON {lesson.number} · ⏱ {lesson.durationMinutes} MIN
                    </Text>
                    <View style={styles.xpPill}>
                      <Text style={styles.xpPillText}>+{lesson.xp} XP</Text>
                    </View>
                  </View>

                  <Text
                    style={[styles.lessonItemTitle, { color: colors.text }]}
                  >
                    {lesson.title}
                  </Text>
                  <Text
                    style={[
                      styles.lessonItemDesc,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {lesson.description}
                  </Text>
                </View>

                {/* Arrow / Play Action */}
                <View style={styles.actionIcon}>
                  <Ionicons
                    name={
                      isCompleted
                        ? 'reload-circle-outline'
                        : isCurrent
                        ? 'play-circle'
                        : 'chevron-forward'
                    }
                    size={24}
                    color={isCurrent ? '#FACC15' : colors.textMuted}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
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
  bannerCard: {
    marginBottom: Spacing.lg,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: '800',
  },
  bannerDesc: {
    fontSize: Typography.sizes.sm,
    marginTop: 4,
    lineHeight: 20,
  },
  lessonsHeader: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  lessonsList: {
    gap: 12,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
  },
  statusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  currentNumberText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  lessonStepText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  xpPill: {
    backgroundColor: 'rgba(250, 204, 21, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  xpPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FACC15',
  },
  lessonItemTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '800',
    marginBottom: 2,
  },
  lessonItemDesc: {
    fontSize: Typography.sizes.xs,
    lineHeight: 18,
  },
  actionIcon: {
    marginLeft: 8,
  },
});

