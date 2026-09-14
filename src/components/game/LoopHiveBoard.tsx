import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LoopLevel } from '../../data/animalGamesData';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { CodePillsBar } from './CodePillsBar';
import { Ionicons } from '@expo/vector-icons';

interface LoopHiveBoardProps {
  level: LoopLevel;
  onSuccess: () => void;
  onShowHint: () => void;
  levelIndex: number;
  totalLevels: number;
}

export const LoopHiveBoard: React.FC<LoopHiveBoardProps> = ({
  level,
  onSuccess,
  onShowHint,
  levelIndex,
  totalLevels,
}) => {
  const [currentCode, setCurrentCode] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(-1);

  useEffect(() => {
    setCurrentCode('');
    setIsSuccess(false);
    setActiveStep(-1);
  }, [level.id]);

  useEffect(() => {
    const trimmed = currentCode.trim();
    if (!trimmed) {
      setIsSuccess(false);
      setActiveStep(-1);
      return;
    }

    const expectedToken = level.suggestedTokens[0];
    const isMatched = trimmed.includes(expectedToken);

    if (isMatched && !isSuccess) {
      setIsSuccess(true);
      // Run the loop animation sequence!
      let step = 0;
      const timer = setInterval(() => {
        if (step < level.count) {
          setActiveStep(step);
          step++;
        } else {
          clearInterval(timer);
          onSuccess();
        }
      }, 300);
    }
  }, [currentCode]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topBadgeRow}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>
              LOOP FLIGHT {levelIndex + 1} OF {totalLevels}
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
        <Text style={styles.description}>
          Iterate {level.count} times to gather nectar from each blossom into the hive 🍯!
        </Text>
      </View>

      {/* Meadow Visual Stage */}
      <View style={styles.meadowStage}>
        {/* Flower Grid */}
        <View style={styles.flowersRow}>
          {Array.from({ length: level.count }).map((_, idx) => {
            const isHarvested = activeStep >= idx;
            return (
              <View
                key={idx}
                style={[
                  styles.flowerNode,
                  isHarvested && styles.flowerNodeHarvested,
                ]}
              >
                <Text style={styles.flowerIndex}>#{idx + 1}</Text>
                <Text style={{ fontSize: 28 }}>
                  {isHarvested ? '✨' : level.targetItem.emoji}
                </Text>
                {activeStep === idx && (
                  <View style={styles.beeHoverBadge}>
                    <Text style={{ fontSize: 20 }}>{level.animal.emoji}</Text>
                  </View>
                )}
              </View>
            );
          })}

          {/* Hive at End */}
          <View
            style={[
              styles.hiveNode,
              activeStep >= level.count - 1 && styles.hiveNodeFilled,
            ]}
          >
            <Text style={{ fontSize: 32 }}>🍯</Text>
            <Text style={styles.hiveLabel}>Hive</Text>
          </View>
        </View>

        {isSuccess && (
          <View style={styles.loopCounterBar}>
            <Text style={styles.loopCounterText}>
              Loop iterations: {Math.max(0, activeStep + 1)} / {level.count} completed!
            </Text>
          </View>
        )}
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
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  levelBadgeText: {
    color: '#FACC15',
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
  meadowStage: {
    backgroundColor: '#1E293B',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#334155',
    marginVertical: Spacing.xs,
  },
  flowersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 10,
    minHeight: 90,
  },
  flowerNode: {
    width: 52,
    height: 64,
    borderRadius: BorderRadius.md,
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  flowerNodeHarvested: {
    borderColor: '#FACC15',
    backgroundColor: 'rgba(250, 204, 21, 0.1)',
  },
  flowerIndex: {
    fontSize: 8,
    color: '#64748B',
    fontWeight: '800',
    position: 'absolute',
    top: 3,
    left: 4,
  },
  beeHoverBadge: {
    position: 'absolute',
    top: -12,
    right: -8,
  },
  hiveNode: {
    width: 56,
    height: 64,
    borderRadius: BorderRadius.md,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: '#EAB308',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiveNodeFilled: {
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    borderColor: '#FACC15',
  },
  hiveLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FACC15',
    marginTop: 2,
  },
  loopCounterBar: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    alignItems: 'center',
  },
  loopCounterText: {
    color: '#22C55E',
    fontSize: 11,
    fontWeight: '800',
  },
});

