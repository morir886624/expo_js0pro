import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useGameProgress } from '../../context/GameProgressContext';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/common/Card';
import { Badge as StatusBadge } from '../../components/common/Badge';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { Badge } from '../../context/GameProgressContext';

interface BadgesScreenProps {
  onBack: () => void;
}

export const BadgesScreen: React.FC<BadgesScreenProps> = ({ onBack }) => {
  const { colors, isDark } = useTheme();
  const { badges } = useGameProgress();
  const insets = useSafeAreaInsets();
  const [selectedBadge, setSelectedBadge] = useState<Badge>(badges[0]);

  const earnedCount = badges.filter((b) => b.isUnlocked).length;

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
        subtitle="ACHIEVEMENTS"
        title="Badges"
        rightAction={
          <StatusBadge
            label={`${earnedCount} / ${badges.length} Earned`}
            variant="primary"
            size="sm"
          />
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Selected Badge Hero Card */}
        {selectedBadge && (
          <Card
            style={[
              styles.heroCard,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <View
              style={[
                styles.heroIconBox,
                {
                  backgroundColor: selectedBadge.isUnlocked
                    ? 'rgba(250, 204, 21, 0.2)'
                    : isDark
                    ? '#374151'
                    : '#E2E8F0',
                },
              ]}
            >
              <Text style={{ fontSize: 44 }}>{selectedBadge.icon}</Text>
            </View>

            <Text style={[styles.heroTitle, { color: colors.text }]}>
              {selectedBadge.title}
            </Text>
            <Text
              style={[styles.heroDescription, { color: colors.textSecondary }]}
            >
              {selectedBadge.description}
            </Text>

            <View style={{ marginTop: 12 }}>
              {selectedBadge.isUnlocked ? (
                <StatusBadge
                  label={`UNLOCKED · ${selectedBadge.unlockedAt || 'Recently'}`}
                  variant="success"
                  size="sm"
                />
              ) : (
                <StatusBadge
                  label="LOCKED 🔒 · Keep practicing to unlock"
                  variant="neutral"
                  size="sm"
                />
              )}
            </View>
          </Card>
        )}

        <Text style={[styles.gridTitle, { color: colors.text }]}>
          All Badges
        </Text>

        {/* 3-column Badges Grid */}
        <View style={styles.grid}>
          {badges.map((item) => {
            const isSelected = selectedBadge.id === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => setSelectedBadge(item)}
                style={[
                  styles.gridItem,
                  {
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isSelected
                      ? '#FACC15'
                      : isDark
                      ? '#374151'
                      : '#E2E8F0',
                    opacity: item.isUnlocked ? 1 : 0.45,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconBox,
                    {
                      backgroundColor: item.isUnlocked
                        ? 'rgba(250, 204, 21, 0.15)'
                        : isDark
                        ? '#374151'
                        : '#E2E8F0',
                    },
                  ]}
                >
                  <Text style={{ fontSize: 28 }}>{item.icon}</Text>
                </View>
                <Text
                  style={[styles.itemTitle, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.statusText,
                    { color: item.isUnlocked ? '#22C55E' : colors.textMuted },
                  ]}
                >
                  {item.isUnlocked ? 'Earned' : 'Locked'}
                </Text>
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
  heroCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  heroIconBox: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: '800',
    marginBottom: 4,
  },
  heroDescription: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  gridTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '31%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});

