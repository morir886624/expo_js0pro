import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BorderRadius } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  color,
  style,
}) => {
  const { isDark } = useTheme();
  const clamped = Math.min(Math.max(progress, 0), 1);
  const barColor = color || '#FACC15';

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: isDark ? '#374151' : '#E2E8F0',
        },
        style,
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clamped * 100}%`,
            backgroundColor: barColor,
            height,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: BorderRadius.pill,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BorderRadius.pill,
  },
});
