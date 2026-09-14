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
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { GAMES_DATA, Game } from '../../data/mockData';

interface GamesScreenProps {
  onPlayGame: (game: Game) => void;
  onOpenUpgradeModal: () => void;
}

export const GamesScreen: React.FC<GamesScreenProps> = ({
  onPlayGame,
  onOpenUpgradeModal,
}) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const freeGames = GAMES_DATA.filter((g) => !g.isPro);
  const proGames = GAMES_DATA.filter((g) => g.isPro);

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
        <Text style={[styles.title, { color: colors.text }]}>Games 🎮</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Learn JavaScript while having fun
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Strip (Figma Style) */}
        <Card
          style={[
            styles.statsCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Completed
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: isDark ? '#374151' : '#E2E8F0' },
            ]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#FACC15' }]}>850</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Best score
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: isDark ? '#374151' : '#E2E8F0' },
            ]}
          />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>90 XP</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Earned
            </Text>
          </View>
        </Card>

        {/* Free Games Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🆓 Free Games
          </Text>
        </View>

        <View style={styles.gamesList}>
          {freeGames.map((game) => (
            <Card
              key={game.id}
              style={[
                styles.gameCard,
                {
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  borderColor: isDark ? '#374151' : '#E2E8F0',
                },
              ]}
            >
              <View style={styles.gameTopRow}>
                <View
                  style={[
                    styles.gameIconBox,
                    { backgroundColor: 'rgba(250, 204, 21, 0.15)' },
                  ]}
                >
                  <Text style={{ fontSize: 32 }}>{game.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={styles.gameBadgeRow}>
                    <Badge label={game.category.toUpperCase()} variant="primary" size="sm" />
                    <Text style={[styles.xpText, { color: '#FACC15' }]}>
                      +{game.xpReward} XP
                    </Text>
                  </View>
                  <Text style={[styles.gameTitle, { color: colors.text }]}>
                    {game.title}
                  </Text>
                  <Text
                    style={[styles.gameSubtitle, { color: colors.textSecondary }]}
                  >
                    {game.subtitle}
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.gameDescription, { color: colors.textSecondary }]}
              >
                {game.description}
              </Text>

              <View style={styles.gameFooter}>
                <View style={styles.scoreRow}>
                  <Text style={[styles.highScoreLabel, { color: colors.textMuted }]}>
                    High Score:
                  </Text>
                  <Text style={[styles.highScoreValue, { color: colors.text }]}>
                    {' '}{game.highScore}
                  </Text>
                </View>

                <Button
                  title="Play Now ⚡"
                  onPress={() => onPlayGame(game)}
                  size="sm"
                  style={styles.playBtn}
                />
              </View>
            </Card>
          ))}
        </View>

        {/* Premium Games Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            👑 Pro Games
          </Text>
        </View>

        <View style={styles.gamesList}>
          {proGames.map((game) => (
            <TouchableOpacity
              key={game.id}
              activeOpacity={0.8}
              onPress={onOpenUpgradeModal}
              style={[
                styles.proGameCard,
                {
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  borderColor: isDark ? '#4C1D95' : '#DDD6FE',
                },
              ]}
            >
              <View style={styles.proCardBadge}>
                <Text style={styles.proCardBadgeText}>PRO ONLY 👑</Text>
              </View>

              <View style={styles.gameTopRow}>
                <View
                  style={[
                    styles.gameIconBox,
                    { backgroundColor: 'rgba(168, 85, 247, 0.15)' },
                  ]}
                >
                  <Text style={{ fontSize: 32 }}>{game.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.gameTitle, { color: colors.text }]}>
                    {game.title}
                  </Text>
                  <Text
                    style={[styles.gameSubtitle, { color: colors.textSecondary }]}
                  >
                    {game.description}
                  </Text>
                </View>
              </View>

              <View style={styles.unlockProRow}>
                <Text style={styles.unlockProText}>
                  Upgrade to JS0pro to unlock all pro challenges
                </Text>
                <Ionicons name="lock-closed" size={16} color="#A855F7" />
              </View>
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
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.base,
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
  sectionHeader: {
    marginVertical: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
  },
  gamesList: {
    gap: 12,
  },
  gameCard: {
    padding: Spacing.base,
  },
  gameTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameIconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
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
    fontWeight: '800',
  },
  gameSubtitle: {
    fontSize: Typography.sizes.xs,
    marginTop: 1,
  },
  gameDescription: {
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
    marginVertical: Spacing.sm,
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
  highScoreLabel: {
    fontSize: Typography.sizes.xs,
  },
  highScoreValue: {
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
  },
  playBtn: {
    paddingHorizontal: 16,
  },
  proGameCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    padding: Spacing.base,
    position: 'relative',
    overflow: 'hidden',
  },
  proCardBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#9333EA',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderBottomLeftRadius: 10,
  },
  proCardBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  unlockProRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(168, 85, 247, 0.2)',
  },
  unlockProText: {
    color: '#A855F7',
    fontSize: Typography.sizes.xs,
    fontWeight: '700',
  },
});

