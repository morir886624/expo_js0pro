import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface CodePillsBarProps {
  currentCode: string;
  onChangeCode: (newCode: string) => void;
  tokens: string[];
  prefix?: string;
  suffix?: string;
  onReset?: () => void;
  onSubmit?: () => void;
  isCorrect?: boolean;
}

export const CodePillsBar: React.FC<CodePillsBarProps> = ({
  currentCode,
  onChangeCode,
  tokens,
  prefix = '',
  suffix = '',
  onReset,
  onSubmit,
  isCorrect,
}) => {
  const { colors, isDark } = useTheme();

  const handleSelectToken = (token: string) => {
    onChangeCode(token);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#1E293B' : '#0F172A',
          borderColor: isCorrect ? '#22C55E' : isDark ? '#334155' : '#1E293B',
        },
      ]}
    >
      {/* Code Editor Header */}
      <View style={styles.editorHeader}>
        <View style={styles.macButtons}>
          <View style={[styles.macDot, { backgroundColor: '#EF4444' }]} />
          <View style={[styles.macDot, { backgroundColor: '#FACC15' }]} />
          <View style={[styles.macDot, { backgroundColor: '#22C55E' }]} />
          <Text style={styles.editorFileText}>styles.css / code.js</Text>
        </View>

        {onReset && (
          <TouchableOpacity
            onPress={onReset}
            style={styles.resetBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh-outline" size={14} color="#94A3B8" />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Code Block / Live Input Line */}
      <View style={styles.codeLineWrapper}>
        <View style={styles.lineNumberCol}>
          <Text style={styles.lineNumber}>1</Text>
          <Text style={styles.lineNumber}>2</Text>
          <Text style={styles.lineNumber}>3</Text>
        </View>

        <View style={styles.codeLinesContent}>
          <Text style={styles.codeComment}>/* Enter or tap property values */</Text>
          <View style={styles.activeCodeRow}>
            {prefix ? <Text style={styles.codePrefix}>{prefix}</Text> : null}
            <TextInput
              style={[
                styles.codeTextInput,
                { color: isCorrect ? '#4ADE80' : '#FACC15' },
              ]}
              value={currentCode}
              onChangeText={onChangeCode}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="property value..."
              placeholderTextColor="#64748B"
            />
            {suffix ? <Text style={styles.codeSuffix}>{suffix}</Text> : null}
          </View>
          <Text style={styles.closingBrace}>{'}'}</Text>
        </View>
      </View>

      {/* Suggested Quick-Tap Pills Bar for Mobile Ergonomics */}
      <View style={styles.pillsContainer}>
        <View style={styles.pillsLabelRow}>
          <Text style={styles.pillsLabel}>TAP TO INSERT QUICK VALUE:</Text>
          {isCorrect && (
            <View style={styles.successTag}>
              <Ionicons name="checkmark-circle" size={13} color="#22C55E" />
              <Text style={styles.successTagText}>Matched!</Text>
            </View>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsScroll}
        >
          {tokens.map((token, index) => {
            const isSelected = currentCode.trim() === token.trim();
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => handleSelectToken(token)}
                style={[
                  styles.pillButton,
                  isSelected && styles.pillButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.pillText,
                    isSelected && styles.pillTextSelected,
                  ]}
                >
                  {token}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginVertical: Spacing.sm,
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0B1120',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  macButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  macDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  editorFileText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Typography.fontFamily.code,
    marginLeft: 8,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  resetText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  codeLineWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#0F172A',
  },
  lineNumberCol: {
    width: 20,
    marginRight: 8,
    alignItems: 'flex-end',
  },
  lineNumber: {
    color: '#475569',
    fontSize: 12,
    lineHeight: 22,
    fontFamily: Typography.fontFamily.code,
    fontWeight: '600',
  },
  codeLinesContent: {
    flex: 1,
  },
  codeComment: {
    color: '#64748B',
    fontSize: 11,
    lineHeight: 22,
    fontStyle: 'italic',
    fontFamily: Typography.fontFamily.code,
  },
  activeCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 24,
  },
  codePrefix: {
    color: '#38BDF8',
    fontSize: 13,
    fontFamily: Typography.fontFamily.code,
    fontWeight: '700',
  },
  codeTextInput: {
    minWidth: 80,
    fontSize: 13,
    fontFamily: Typography.fontFamily.code,
    fontWeight: '700',
    paddingVertical: 0,
    paddingHorizontal: 4,
    margin: 0,
  },
  codeSuffix: {
    color: '#E2E8F0',
    fontSize: 13,
    fontFamily: Typography.fontFamily.code,
    fontWeight: '700',
  },
  closingBrace: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 22,
    fontFamily: Typography.fontFamily.code,
    fontWeight: '700',
  },
  pillsContainer: {
    backgroundColor: '#0B1120',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  pillsLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  pillsLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  successTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  successTagText: {
    color: '#22C55E',
    fontSize: 11,
    fontWeight: '800',
  },
  pillsScroll: {
    gap: 8,
    paddingBottom: 2,
  },
  pillButton: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.pill,
  },
  pillButtonSelected: {
    backgroundColor: 'rgba(250, 204, 21, 0.2)',
    borderColor: '#FACC15',
  },
  pillText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Typography.fontFamily.code,
  },
  pillTextSelected: {
    color: '#FACC15',
    fontWeight: '800',
  },
});

