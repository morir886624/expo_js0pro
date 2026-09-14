import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { Typography } from '../../constants/theme';

export type TabName = 'home' | 'learn' | 'games' | 'progress' | 'profile';

interface BottomTabBarProps {
  currentTab: TabName;
  onTabSelect: (tab: TabName) => void;
}

interface TabItem {
  id: TabName;
  label: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}

const TABS: TabItem[] = [
  { id: 'home', label: 'Home', activeIcon: 'home', inactiveIcon: 'home-outline' },
  { id: 'learn', label: 'Learn', activeIcon: 'book', inactiveIcon: 'book-outline' },
  { id: 'games', label: 'Games', activeIcon: 'game-controller', inactiveIcon: 'game-controller-outline' },
  { id: 'progress', label: 'Progress', activeIcon: 'trophy', inactiveIcon: 'trophy-outline' },
  { id: 'profile', label: 'Profile', activeIcon: 'person', inactiveIcon: 'person-outline' },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ currentTab, onTabSelect }) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
          borderTopColor: isDark ? '#374151' : '#E2E8F0',
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      {TABS.map((tab) => {
        const isActive = currentTab === tab.id;
        const iconColor = isActive ? '#FACC15' : colors.textMuted;

        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => onTabSelect(tab.id)}
            style={styles.tabButton}
          >
            <View style={[styles.iconWrapper, isActive && styles.activeIconWrapper]}>
              <Ionicons
                name={isActive ? tab.activeIcon : tab.inactiveIcon}
                size={22}
                color={iconColor}
              />
            </View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isActive ? '#FACC15' : colors.textMuted,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  iconWrapper: {
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
    letterSpacing: 0.1,
  },
});

