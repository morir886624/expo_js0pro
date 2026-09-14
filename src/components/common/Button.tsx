import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const { colors, isDark } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return isDark ? '#374151' : '#E2E8F0';
    switch (variant) {
      case 'primary':
        return '#FACC15'; // Brand Yellow
      case 'secondary':
        return isDark ? '#1F2937' : '#F1F5F9';
      case 'outline':
        return 'transparent';
      case 'ghost':
        return 'transparent';
      case 'danger':
        return colors.danger;
      default:
        return '#FACC15';
    }
  };

  const getTextColor = () => {
    if (disabled) return isDark ? '#6B7280' : '#94A3B8';
    switch (variant) {
      case 'primary':
        return '#0F172A'; // Black text on yellow button like Figma
      case 'secondary':
        return colors.text;
      case 'outline':
        return isDark ? '#FACC15' : '#CA8A04';
      case 'ghost':
        return colors.textSecondary;
      case 'danger':
        return '#FFFFFF';
      default:
        return '#0F172A';
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') {
      return isDark ? '#FACC15' : '#CA8A04';
    }
    if (variant === 'secondary') {
      return isDark ? '#374151' : '#E2E8F0';
    }
    return 'transparent';
  };

  const getPaddingVertical = () => {
    switch (size) {
      case 'sm':
        return 8;
      case 'lg':
        return 16;
      default:
        return 13;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' || variant === 'secondary' ? 1.5 : 0,
          paddingVertical: getPaddingVertical(),
          paddingHorizontal: size === 'sm' ? 12 : 20,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#0F172A' : colors.primary}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: size === 'sm' ? Typography.sizes.sm : Typography.sizes.base,
                fontWeight: '700',
                marginLeft: icon ? 8 : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  text: {
    letterSpacing: 0.2,
  },
});
