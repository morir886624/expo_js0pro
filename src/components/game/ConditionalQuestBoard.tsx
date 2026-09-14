import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { ConditionalLevel } from '../../data/animalGamesData';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { CodePillsBar } from './CodePillsBar';
import { Ionicons } from '@expo/vector-icons';

interface ConditionalQuestBoardProps {
  level: ConditionalLevel;
  onSuccess: () => void;
  onShowHint: () => void;
  levelIndex: number;
  totalLevels: number;
}

export const ConditionalQuestBoard: React.FC<ConditionalQuestBoardProps> = ({
  level,
  onSuccess,
  onShowHint,
  levelIndex,
  totalLevels,
}) => {
  const [currentCode, setCurrentCode] = useState<string>('');
  const [isGateUnlocked, setIsGateUnlocked] = useState<boolean>(false);
  const [hopAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setCurrentCode('');
    setIsGateUnlocked(false);
    hopAnim.setValue(0);
  }, [level.id]);

  useEffect(() => {
    const trimmed = currentCode.trim();
    if (!trimmed) {
      setIsGateUnlocked(false);
      return;
    }

    // Check expression match
    const target = level.targetExpression.replace(/\s+/g, '');
    const userClean = trimmed.replace(/\s+/g, '');

    // Allow flexible matching for quotes or spacing
    const isMatched =
      userClean === target ||
      userClean === target.replace(/'/g, '"') ||
      userClean === target.replace(/"/g, "'") ||
      trimmed.includes(level.suggestedTokens[0]);

    if (isMatched && !isGateUnlocked) {
      setIsGateUnlocked(true);
      // Hop animation across the gate!
      Animated.timing(hopAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        onSuccess();
      });
    }
  }, [currentCode]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topBadgeRow}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>
              QUEST {levelIndex + 1} OF {totalLevels}
            </Text>
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
        <Text style={styles.description}>{level.scenarioDescription}</Text>
      </View>

      {/* Track & Obstacle Gate Visual Stage */}
      <View style={styles.trackStage}>
        {/* Context Variables Strip */}
        <View style={styles.variablesStrip}>
          <Text style={styles.varStripTitle}>WORLD STATE: </Text>
          {Object.entries(level.contextVariables).map(([k, v], i) => (
            <View key={k} style={styles.varBadge}>
              <Text style={styles.varKey}>{k}: </Text>
              <Text style={styles.varVal}>{JSON.stringify(v)}</Text>
            </View>
          ))}
        </View>

        {/* Visual Course */}
        <View style={styles.coursePath}>
          {/* Animal (Hops on victory) */}
          <Animated.View
            style={[
              styles.runnerContainer,
              {
                transform: [
                  {
                    translateX: hopAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 180],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.animalGlowBox}>
              <Text style={{ fontSize: 34 }}>{level.animal.emoji}</Text>
            </View>
            <Text style={styles.runnerName}>{level.animal.name}</Text>
          </Animated.View>

          {/* Sensor Gate */}
          <View
            style={[
              styles.sensorGate,
              isGateUnlocked ? styles.sensorGateOpen : styles.sensorGateClosed,
            ]}
          >
            <Ionicons
              name={isGateUnlocked ? 'lock-open' : 'lock-closed'}
              size={20}
              color={isGateUnlocked ? '#22C55E' : '#EF4444'}
            />
            <Text
              style={[
                styles.gateStatusLabel,
                { color: isGateUnlocked ? '#22C55E' : '#EF4444' },
              ]}
            >
              {isGateUnlocked ? 'GATE OPEN' : 'LOCKED'}
            </Text>
          </View>

          {/* Goal Trophy */}
          <View style={styles.goalContainer}>
            <View style={styles.goalGlowBox}>
              <Text style={{ fontSize: 34 }}>{level.goal.emoji}</Text>
            </View>
            <Text style={styles.goalName}>{level.goal.name}</Text>
          </View>
        </View>
      </View>

      {/* Code Bar */}
      <CodePillsBar
        currentCode={currentCode}
        onChangeCode={setCurrentCode}
        tokens={level.suggestedTokens}
        prefix={level.initialCode}
        suffix=") { hop(); }"
        onReset={() => setCurrentCode('')}
        isCorrect={isGateUnlocked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: Spacing.sm,
  },
  topBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  levelBadgeText: {
    color: '#F59E0B',
    fontSize: 10,
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
  trackStage: {
    backgroundColor: '#1E293B',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#334155',
    marginVertical: Spacing.xs,
  },
  variablesStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
    backgroundColor: '#0F172A',
    padding: 8,
    borderRadius: BorderRadius.md,
  },
  varStripTitle: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
  },
  varBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  varKey: {
    color: '#38BDF8',
    fontSize: 11,
    fontFamily: Typography.fontFamily.code,
    fontWeight: '700',
  },
  varVal: {
    color: '#FACC15',
    fontSize: 11,
    fontFamily: Typography.fontFamily.code,
    fontWeight: '700',
  },
  coursePath: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    position: 'relative',
    height: 100,
  },
  runnerContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  animalGlowBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  runnerName: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
  },
  sensorGate: {
    position: 'absolute',
    left: '50%',
    marginLeft: -25,
    width: 50,
    height: 70,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  sensorGateClosed: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: '#EF4444',
  },
  sensorGateOpen: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: '#22C55E',
  },
  gateStatusLabel: {
    fontSize: 8,
    fontWeight: '900',
    marginTop: 2,
  },
  goalContainer: {
    alignItems: 'center',
  },
  goalGlowBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalName: {
    color: '#22C55E',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
  },
});

