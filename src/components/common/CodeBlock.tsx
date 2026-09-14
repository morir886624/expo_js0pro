import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface CodeBlockProps {
  code: string;
  language?: string;
  style?: StyleProp<ViewStyle>;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
          <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
          <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
        </View>
        <Text style={styles.languageText}>{language.toUpperCase()}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.codeText}>{code}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
    marginVertical: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  languageText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  content: {
    padding: Spacing.md,
  },
  codeText: {
    color: '#38BDF8', // Cyan/Yellow syntax look
    fontFamily: Typography.fontFamily.code,
    fontSize: Typography.sizes.sm + 0.5,
    lineHeight: 22,
  },
});
