import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
}) => {
  const { colors, isDark } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: isDark ? colors.card : colors.surface,
    borderColor: isDark ? colors.border : '#E2E8F0',
    borderWidth: variant === 'outlined' || isDark ? 1 : 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: variant === 'elevated' ? 4 : 1 },
    shadowOpacity: isDark ? 0.25 : 0.06,
    shadowRadius: variant === 'elevated' ? 8 : 3,
    elevation: variant === 'elevated' ? 4 : 1,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.base, cardStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.base, cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
  },
});
