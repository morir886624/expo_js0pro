import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/common/Card';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { MODULES_DATA, Module } from '../../data/mockData';

interface LearnScreenProps {
  onSelectModule: (module: Module) => void;
  onOpenUpgradeModal: () => void;
}

type FilterType = 'all' | 'in_progress' | 'completed' | 'locked';

export const LearnScreen: React.FC<LearnScreenProps> = ({
  onSelectModule,
  onOpenUpgradeModal,
}) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'in_progress', label: 'In progress' },
    { id: 'completed', label: 'Completed' },
    { id: 'locked', label: 'Locked' },
  ];

  const totalLessons = MODULES_DATA.reduce((acc, m) => acc + m.totalLessons, 0);
  const completedLessonsCount = MODULES_DATA.reduce(
    (acc, m) => acc + m.completedLessons,
    0
  );
  const overallPercentage = Math.round(
    (completedLessonsCount / totalLessons) * 100
  );

  const filteredModules = MODULES_DATA.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'completed') return m.completedLessons === m.totalLessons;
    if (activeFilter === 'in_progress')
      return m.completedLessons > 0 && m.completedLessons < m.totalLessons;
    if (activeFilter === 'locked') return m.isLocked;
    return true;
  });

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
      {/* Title Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Learn 📚</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          JavaScript from beginner to advanced
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.textMuted}
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="Search a lesson or topic…"
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            style={[styles.searchInput, { color: colors.text }]}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filters.map((f) => {
            const isSelected = activeFilter === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                activeOpacity={0.8}
                onPress={() => setActiveFilter(f.id)}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isSelected
                      ? '#FACC15'
                      : isDark
                      ? '#1F2937'
                      : '#FFFFFF',
                    borderColor: isSelected
                      ? '#FACC15'
                      : isDark
                      ? '#374151'
                      : '#E2E8F0',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: isSelected ? '#0F172A' : colors.textSecondary,
                      fontWeight: isSelected ? '800' : '600',
                    },
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Overall Progress Banner */}
        <Card
          style={[
            styles.progressBanner,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.progressRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.progressTitle, { color: colors.text }]}>
                Overall Course Progress
              </Text>
              <Text
                style={[styles.progressSubtitle, { color: colors.textSecondary }]}
              >
                {completedLessonsCount} of {totalLessons} lessons completed
              </Text>
            </View>
            <Text style={styles.percentageText}>{overallPercentage}%</Text>
          </View>
          <ProgressBar
            progress={overallPercentage / 100}
            height={8}
            color="#FACC15"
            style={{ marginTop: Spacing.md }}
          />
        </Card>

        {/* Modules List */}
        <View style={styles.modulesList}>
          {filteredModules.map((mod) => {
            const isCompleted = mod.completedLessons === mod.totalLessons;
            const inProgress = mod.completedLessons > 0 && !isCompleted;
            const progressRatio = mod.completedLessons / mod.totalLessons;

            return (
              <Card
                key={mod.id}
                onPress={() => {
                  if (mod.isLocked) {
                    onOpenUpgradeModal();
                  } else {
                    onSelectModule(mod);
                  }
                }}
                style={[
                  styles.moduleCard,
                  {
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#E2E8F0',
                    opacity: mod.isLocked ? 0.75 : 1,
                  },
                ]}
              >
                <View style={styles.moduleTop}>
                  <View
                    style={[
                      styles.moduleIconBox,
                      {
                        backgroundColor: isDark
                          ? '#374151'
                          : 'rgba(250, 204, 21, 0.15)',
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 28 }}>{mod.icon}</Text>
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.moduleBadgeRow}>
                      <Text
                        style={[
                          styles.moduleNumber,
                          { color: colors.textMuted },
                        ]}
                      >
                        MODULE {mod.number}
                      </Text>

                      {isCompleted ? (
                        <Badge label="COMPLETED" variant="success" size="sm" />
                      ) : inProgress ? (
                        <Badge label="IN PROGRESS" variant="primary" size="sm" />
                      ) : mod.isLocked ? (
                        <Badge label="LOCKED 🔒" variant="neutral" size="sm" />
                      ) : (
                        <Badge label="READY" variant="info" size="sm" />
                      )}
                    </View>

                    <Text
                      style={[styles.moduleTitleText, { color: colors.text }]}
                    >
                      {mod.title}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.moduleDescriptionText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {mod.description}
                </Text>

                <View style={styles.moduleFooter}>
                  <Text
                    style={[
                      styles.lessonsCountText,
                      { color: colors.textMuted },
                    ]}
                  >
                    {mod.completedLessons} / {mod.totalLessons} lessons
                  </Text>

                  <Text
                    style={[
                      styles.viewModuleAction,
                      { color: mod.isLocked ? colors.textMuted : '#FACC15' },
                    ]}
                  >
                    {mod.isLocked ? 'Unlock with Pro →' : 'View Lessons →'}
                  </Text>
                </View>

                {!mod.isLocked && (
                  <ProgressBar
                    progress={progressRatio}
                    height={4}
                    color="#FACC15"
                    style={{ marginTop: 8 }}
                  />
                )}
              </Card>
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
  searchContainer: {
    paddingHorizontal: Spacing.screenPadding,
    marginVertical: Spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.sizes.base,
    height: '100%',
  },
  filtersWrapper: {
    marginVertical: Spacing.sm,
  },
  filtersScroll: {
    paddingHorizontal: Spacing.screenPadding,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BorderRadius.pill,
    borderWidth: 1.5,
  },
  filterText: {
    fontSize: Typography.sizes.xs,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 40,
  },
  progressBanner: {
    marginBottom: Spacing.base,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '800',
  },
  progressSubtitle: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  percentageText: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '900',
    color: '#FACC15',
  },
  modulesList: {
    gap: 12,
  },
  moduleCard: {
    padding: Spacing.base,
  },
  moduleTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  moduleNumber: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  moduleTitleText: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  moduleDescriptionText: {
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
    marginVertical: Spacing.sm,
  },
  moduleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  lessonsCountText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
  },
  viewModuleAction: {
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
  },
});

