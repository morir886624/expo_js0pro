import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BorderRadius, Typography } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'info';
  icon?: string;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  icon,
  size = 'md',
  style,
}) => {
  const { colors, isDark } = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: isDark ? 'rgba(250, 204, 21, 0.2)' : '#FEF9C3',
          text: isDark ? '#FACC15' : '#854D0E',
          border: isDark ? 'rgba(250, 204, 21, 0.4)' : '#FDE047',
        };
      case 'success':
        return {
          bg: isDark ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7',
          text: isDark ? '#4ADE80' : '#15803D',
          border: isDark ? 'rgba(34, 197, 94, 0.4)' : '#86EFAC',
        };
      case 'warning':
        return {
          bg: isDark ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7',
          text: isDark ? '#FBBF24' : '#B45309',
          border: isDark ? 'rgba(245, 158, 11, 0.4)' : '#FCD34D',
        };
      case 'danger':
        return {
          bg: isDark ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2',
          text: isDark ? '#F87171' : '#B91C1C',
          border: isDark ? 'rgba(239, 68, 68, 0.4)' : '#FCA5A5',
        };
      case 'info':
        return {
          bg: isDark ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE',
          text: isDark ? '#60A5FA' : '#1D4ED8',
          border: isDark ? 'rgba(59, 130, 246, 0.4)' : '#93C5FD',
        };
      default:
        return {
          bg: isDark ? '#374151' : '#F1F5F9',
          text: colors.textSecondary,
          border: isDark ? '#4B5563' : '#E2E8F0',
        };
    }
  };

  const c = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: c.bg,
          borderColor: c.border,
          paddingVertical: size === 'sm' ? 2 : 4,
          paddingHorizontal: size === 'sm' ? 8 : 10,
        },
        style,
      ]}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text
        style={[
          styles.text,
          {
            color: c.text,
            fontSize: size === 'sm' ? Typography.sizes.xs : Typography.sizes.sm,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
    fontSize: 12,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
