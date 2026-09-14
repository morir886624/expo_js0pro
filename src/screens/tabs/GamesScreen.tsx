import React, { useState } from 'react';
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
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { GAMES_DATA, Game } from '../../data/mockData';

interface GamesScreenProps {
  onPlayGame: (game: Game) => void;
  onOpenUpgradeModal: () => void;
}

const CATEGORIES = [
  { id: 'all', label: '🌟 All JS Games' },
  { id: 'froggy', label: '🐸 Froggy JS (Tier 1)' },
  { id: 'arrays', label: '🐾 Array Zoo (Tier 2/3)' },
  { id: 'objects', label: '🦁 Object Safari (Tier 2/3)' },
  { id: 'logic', label: '🥕 Conditionals (Tier 1)' },
  { id: 'loops', label: '🐝 Loops & Hive (Tier 1)' },
  { id: 'async', label: '⚡ Async Race (Tier 4)' },
  { id: 'quiz', label: '⏱️ Speed Blitz' },
];

export const GamesScreen: React.FC<GamesScreenProps> = ({
  onPlayGame,
  onOpenUpgradeModal,
}) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter games according to category
  const filteredGames = GAMES_DATA.filter((game) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'froggy') return game.gameType === 'froggy_js';
    if (activeCategory === 'arrays') return game.gameType === 'array_rescue';
    if (activeCategory === 'objects') return game.gameType === 'object_safari';
    if (activeCategory === 'logic') return game.gameType === 'conditional_quest';
    if (activeCategory === 'loops') return game.gameType === 'loop_hive';
    if (activeCategory === 'async') return game.gameType === 'async_race' || game.isPro;
    if (activeCategory === 'quiz') return game.gameType === 'quiz';
    return true;
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#0B1120' : '#F8FAFC',
          paddingTop: Math.max(insets.top, 16),
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>JS Coding Games 🎮</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Practice JavaScript from 0 to 100 with interactive animal puzzles
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Strip */}
        <Card
          style={[
            styles.statsCard,
            {
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>15</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Levels Done
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: isDark ? '#334155' : '#E2E8F0' },
            ]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#FACC15' }]}>1,450</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Best Score
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: isDark ? '#334155' : '#E2E8F0' },
            ]}
          />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>240 XP</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Earned
            </Text>
          </View>
        </Card>

        {/* Educational "Frog CSS & Animal Games" Hero Callout */}
        <View
          style={[
            styles.calloutCard,
            {
              backgroundColor: isDark
                ? 'rgba(34, 197, 94, 0.12)'
                : '#DCFCE7',
              borderColor: isDark ? '#15803D' : '#86EFAC',
            },
          ]}
        >
          <View style={styles.calloutTop}>
            <Text style={{ fontSize: 28 }}>🐸🐾✨</Text>
            <View style={styles.calloutTag}>
              <Text style={styles.calloutTagText}>100% PURE JAVASCRIPT</Text>
            </View>
          </View>
          <Text
            style={[
              styles.calloutTitle,
              { color: isDark ? '#86EFAC' : '#15803D' },
            ]}
          >
            Master JavaScript from Lesson 1 to 100!
          </Text>
          <Text
            style={[
              styles.calloutText,
              { color: isDark ? '#CBD5E1' : '#334155' },
            ]}
          >
            Guide frogs, ducks, pandas, bees, and cheetahs using pure JavaScript method calls, array methods, conditionals, loops, objects, and the event loop. Real-time visual coding!
          </Text>
        </View>

        {/* Category Filter Chips Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                activeOpacity={0.7}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: isSelected
                      ? '#FACC15'
                      : isDark
                      ? '#1E293B'
                      : '#FFFFFF',
                    borderColor: isSelected
                      ? '#EAB308'
                      : isDark
                      ? '#334155'
                      : '#E2E8F0',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    {
                      color: isSelected ? '#0F172A' : colors.text,
                      fontWeight: isSelected ? '900' : '600',
                    },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Games List */}
        <View style={styles.gamesList}>
          {filteredGames.map((game) => {
            const isProLocked = game.isPro;

            return (
              <Card
                key={game.id}
                style={[
                  styles.gameCard,
                  {
                    backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                    borderColor: isProLocked
                      ? isDark
                        ? '#7C3AED'
                        : '#DDD6FE'
                      : isDark
                      ? '#334155'
                      : '#E2E8F0',
                  },
                ]}
              >
                {/* Pro Badge if applicable */}
                {isProLocked && (
                  <View style={styles.proBadge}>
                    <Text style={styles.proBadgeText}>PRO 👑</Text>
                  </View>
                )}

                {/* Top Row: Mascot Icon + Titles */}
                <View style={styles.gameTopRow}>
                  <View
                    style={[
                      styles.gameIconBox,
                      {
                        backgroundColor: isDark
                          ? 'rgba(255, 255, 255, 0.06)'
                          : 'rgba(0, 0, 0, 0.04)',
                        borderColor: game.accentColor,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 32 }}>{game.icon}</Text>
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.gameBadgeRow}>
                      <Badge
                        label={game.badgeLabel || game.category.toUpperCase()}
                        variant={isProLocked ? 'info' : 'primary'}
                        size="sm"
                      />
                      <Text
                        style={[
                          styles.xpText,
                          { color: game.accentColor || '#FACC15' },
                        ]}
                      >
                        +{game.xpReward} XP
                      </Text>
                    </View>

                    <Text style={[styles.gameTitle, { color: colors.text }]}>
                      {game.title}
                    </Text>
                    <Text
                      style={[
                        styles.gameSubtitle,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {game.subtitle}
                    </Text>
                  </View>
                </View>

                {/* Animal Mascots Strip */}
                {game.mascots && game.mascots.length > 0 && (
                  <View style={styles.mascotsStrip}>
                    <Text style={styles.mascotsLabel}>Mascots:</Text>
                    <View style={styles.mascotsRow}>
                      {game.mascots.map((m, idx) => (
                        <Text key={idx} style={styles.mascotEmoji}>
                          {m}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}

                {/* Description */}
                <Text
                  style={[
                    styles.gameDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  {game.description}
                </Text>

                {/* Curriculum Tag */}
                {game.curriculumModulesTag ? (
                  <View
                    style={[
                      styles.curriculumTagBox,
                      { backgroundColor: isDark ? '#0F172A' : '#F1F5F9' },
                    ]}
                  >
                    <Ionicons name="school" size={12} color="#38BDF8" />
                    <Text style={styles.curriculumTagText}>
                      {game.curriculumModulesTag}
                    </Text>
                  </View>
                ) : null}

                {/* Footer: Level Count + Play Action */}
                <View style={styles.gameFooter}>
                  <View style={styles.scoreRow}>
                    <Ionicons
                      name="layers-outline"
                      size={14}
                      color={colors.textMuted}
                    />
                    <Text
                      style={[
                        styles.highScoreValue,
                        { color: colors.text, marginLeft: 4 },
                      ]}
                    >
                      {game.totalLevels || 5} Levels
                    </Text>
                  </View>

                  <Button
                    title={isProLocked ? 'Unlock with Pro 👑' : 'Play Level 1 ⚡'}
                    onPress={() => {
                      if (isProLocked) {
                        onOpenUpgradeModal();
                      } else {
                        onPlayGame(game);
                      }
                    }}
                    size="sm"
                    variant={isProLocked ? 'secondary' : 'primary'}
                    style={styles.playBtn}
                  />
                </View>
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
    paddingBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '900',
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
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Typography.sizes.lg,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  calloutCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  calloutTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  calloutTag: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  calloutTagText: {
    color: '#15803D',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  calloutTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '900',
    marginBottom: 4,
  },
  calloutText: {
    fontSize: Typography.sizes.xs,
    lineHeight: 18,
  },
  categoriesScroll: {
    gap: 8,
    paddingBottom: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12,
  },
  gamesList: {
    gap: 14,
    marginTop: 4,
  },
  gameCard: {
    padding: Spacing.base,
    position: 'relative',
    overflow: 'hidden',
  },
  proBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#9333EA',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderBottomLeftRadius: 10,
    zIndex: 10,
  },
  proBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  gameTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  xpText: {
    fontSize: 11,
    fontWeight: '800',
  },
  gameTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '900',
  },
  gameSubtitle: {
    fontSize: Typography.sizes.xs,
    marginTop: 1,
  },
  mascotsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    marginBottom: 2,
  },
  mascotsLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
  },
  mascotsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  mascotEmoji: {
    fontSize: 16,
  },
  gameDescription: {
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
    marginVertical: Spacing.xs,
  },
  curriculumTagBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: Spacing.sm,
  },
  curriculumTagText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '700',
  },
  gameFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highScoreValue: {
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
  },
  playBtn: {
    paddingHorizontal: 14,
  },
});
