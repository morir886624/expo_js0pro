import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ObjectSafariLevel } from '../../data/animalGamesData';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { CodePillsBar } from './CodePillsBar';
import { Ionicons } from '@expo/vector-icons';

interface ObjectSafariBoardProps {
  level: ObjectSafariLevel;
  onSuccess: () => void;
  onShowHint: () => void;
  levelIndex: number;
  totalLevels: number;
}

export const ObjectSafariBoard: React.FC<ObjectSafariBoardProps> = ({
  level,
  onSuccess,
  onShowHint,
  levelIndex,
  totalLevels,
}) => {
  const [currentCode, setCurrentCode] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [outputText, setOutputText] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    setCurrentCode('');
    setIsSuccess(false);
    setOutputText('');
    setStatusMessage('');
  }, [level.id]);

  useEffect(() => {
    const trimmed = currentCode.trim();
    if (!trimmed) {
      setIsSuccess(false);
      setOutputText('');
      setStatusMessage('');
      return;
    }

    const res = level.validate(trimmed);
    setOutputText(res.outputText);
    setStatusMessage(res.message);

    if (res.isSuccess && !isSuccess) {
      setIsSuccess(true);
      onSuccess();
    }
  }, [currentCode]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topBadgeRow}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>
              PASSPORT {levelIndex + 1} OF {totalLevels}
            </Text>
          </View>

          <View style={styles.objBadge}>
            <Text style={styles.objBadgeText}>JS OBJECTS & CONTEXT</Text>
          </View>

          <TouchableOpacity
            style={styles.hintBtn}
            onPress={onShowHint}
            activeOpacity={0.7}
          >
            <Ionicons name="bulb-outline" size={15} color="#FACC15" />
            <Text style={styles.hintBtnText}>Hint</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{level.title}</Text>
        <Text style={styles.description}>{level.description}</Text>
      </View>

      {/* Animal Object Card */}
      <View style={styles.passportCard}>
        <View style={styles.passportHeader}>
          <Ionicons name="id-card-outline" size={16} color="#A855F7" />
          <Text style={styles.passportHeaderText}>const animal = </Text>
        </View>

        <View style={styles.jsonBox}>
          <Text style={styles.jsonContent}>
            {JSON.stringify(level.animalObj, null, 2)}
          </Text>
        </View>
      </View>

      {/* Code Bar */}
      <CodePillsBar
        currentCode={currentCode}
        onChangeCode={setCurrentCode}
        tokens={level.suggestedTokens}
        prefix={level.initialCode}
        suffix=""
        onReset={() => setCurrentCode('')}
        isCorrect={isSuccess}
      />

      {/* Output / Result Evaluator */}
      <View style={styles.outputBox}>
        <View style={styles.outputHeader}>
          <Text style={styles.outputLabel}>EVALUATED JAVASCRIPT OUTPUT:</Text>
          {isSuccess && (
            <View style={styles.successTag}>
              <Ionicons name="checkmark-circle" size={13} color="#22C55E" />
              <Text style={styles.successTagText}>Valid!</Text>
            </View>
          )}
        </View>

        <Text style={styles.outputText}>
          {outputText || '// Output appears here after running code...'}
        </Text>

        {statusMessage ? (
          <Text
            style={[
              styles.statusText,
              { color: isSuccess ? '#22C55E' : '#F59E0B' },
            ]}
          >
            {statusMessage}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: Spacing.xs,
  },
  topBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  levelBadgeText: {
    color: '#A855F7',
    fontSize: 10,
    fontWeight: '900',
  },
  objBadge: {
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  objBadgeText: {
    color: '#FACC15',
    fontSize: 9,
    fontWeight: '900',
  },
  hintBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  hintBtnText: {
    color: '#FACC15',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  description: {
    fontSize: Typography.sizes.xs,
    color: '#94A3B8',
    marginTop: 2,
    lineHeight: 18,
  },
  passportCard: {
    backgroundColor: '#1E293B',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#334155',
    marginVertical: Spacing.xs,
  },
  passportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  passportHeaderText: {
    color: '#A855F7',
    fontSize: 12,
    fontFamily: Typography.fontFamily.code,
    fontWeight: '700',
  },
  jsonBox: {
    backgroundColor: '#0F172A',
    borderRadius: BorderRadius.md,
    padding: 10,
  },
  jsonContent: {
    color: '#38BDF8',
    fontSize: 11,
    fontFamily: Typography.fontFamily.code,
    lineHeight: 18,
  },
  outputBox: {
    backgroundColor: '#1E293B',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#334155',
    marginTop: Spacing.xs,
  },
  outputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  outputLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
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
  outputText: {
    color: '#FACC15',
    fontSize: 12,
    fontFamily: Typography.fontFamily.code,
    fontWeight: '700',
    marginVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
});

