import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { AsyncLevel } from '../../data/animalGamesData';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { CodeBlock } from '../common/CodeBlock';
import { Ionicons } from '@expo/vector-icons';

interface AsyncCritterRaceBoardProps {
  level: AsyncLevel;
  onSuccess: () => void;
  onShowHint: () => void;
  levelIndex: number;
  totalLevels: number;
}

export const AsyncCritterRaceBoard: React.FC<AsyncCritterRaceBoardProps> = ({
  level,
  onSuccess,
  onShowHint,
  levelIndex,
  totalLevels,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [raceTrackProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    setSelectedOption(null);
    setIsSuccess(false);
    setIsWrong(false);
    raceTrackProgress.setValue(0);
  }, [level.id]);

  const handleSelect = (idx: number) => {
    if (isSuccess) return;
    setSelectedOption(idx);

    if (idx === level.correctIndex) {
      setIsSuccess(true);
      setIsWrong(false);
      Animated.timing(raceTrackProgress, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }).start(() => {
        onSuccess();
      });
    } else {
      setIsWrong(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topBadgeRow}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>
              RACE {levelIndex + 1} OF {totalLevels}
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
        <Text style={styles.description}>{level.description}</Text>
      </View>

      {/* Code Snippet */}
      <View style={styles.snippetCard}>
        <Text style={styles.snippetLabel}>EVENT LOOP SCRIPT:</Text>
        <CodeBlock code={level.snippet} />
      </View>

      {/* Race Track Visual Stage */}
      <View style={styles.trackStage}>
        <View style={styles.finishLine}>
          <Text style={styles.finishLineText}>🏁 FINISH LINE</Text>
        </View>

        {level.racers.map((racer, idx) => {
          // Delay or stagger based on correct arrival order
          const isWinner = idx === 0;
          return (
            <View key={racer.name} style={styles.racerLane}>
              <Animated.View
                style={[
                  styles.racerBox,
                  {
                    transform: [
                      {
                        translateX: raceTrackProgress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, isWinner ? 210 : 210 - (idx + 1) * 35],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={{ fontSize: 24 }}>{racer.emoji}</Text>
                <Text style={styles.racerName}>{racer.name}</Text>
              </Animated.View>
            </View>
          );
        })}
      </View>

      {/* Options: Predict Arrival Order */}
      <Text style={styles.optionsPrompt}>PREDICT THE WINNING EXECUTION ORDER:</Text>
      <View style={styles.optionsList}>
        {level.options.map((optGroup, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrectChoice = isSuccess && isSelected;
          const isWrongChoice = isWrong && isSelected;

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              onPress={() => handleSelect(idx)}
              style={[
                styles.optionCard,
                isCorrectChoice && styles.optionCardCorrect,
                isWrongChoice && styles.optionCardWrong,
              ]}
            >
              <Text style={styles.optionLetter}>{String.fromCharCode(65 + idx)}</Text>
              <Text
                style={[
                  styles.optionText,
                  isCorrectChoice && { color: '#22C55E' },
                  isWrongChoice && { color: '#EF4444' },
                ]}
              >
                {Array.isArray(optGroup) ? optGroup.join('  →  ') : optGroup}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  levelBadgeText: {
    color: '#EC4899',
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
  snippetCard: {
    marginVertical: Spacing.xs,
  },
  snippetLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  trackStage: {
    backgroundColor: '#1E293B',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#334155',
    marginVertical: Spacing.xs,
    position: 'relative',
    gap: 6,
  },
  finishLine: {
    position: 'absolute',
    right: 12,
    top: 6,
    bottom: 6,
    width: 2,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  finishLineText: {
    fontSize: 8,
    color: '#EF4444',
    fontWeight: '900',
    transform: [{ rotate: '90deg' }],
    width: 70,
    marginTop: 30,
  },
  racerLane: {
    backgroundColor: '#0F172A',
    borderRadius: BorderRadius.md,
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: 38,
    justifyContent: 'center',
  },
  racerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 2,
  },
  racerName: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  optionsPrompt: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 6,
  },
  optionsList: {
    gap: 8,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderWidth: 1.5,
    borderColor: '#334155',
    borderRadius: BorderRadius.md,
    padding: 10,
  },
  optionCardCorrect: {
    borderColor: '#22C55E',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  optionCardWrong: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  optionLetter: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#0F172A',
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 11,
    fontWeight: '900',
    marginRight: 10,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
});

