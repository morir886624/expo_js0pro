import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useGameProgress } from '../../context/GameProgressContext';
import { CodeBlock } from '../../components/common/CodeBlock';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { Game } from '../../data/mockData';

interface GamePlayScreenProps {
  game: Game;
  onClose: () => void;
  onReviewLesson?: () => void;
}

export const GamePlayScreen: React.FC<GamePlayScreenProps> = ({
  game,
  onClose,
  onReviewLesson,
}) => {
  const { colors, isDark } = useTheme();
  const { addXp } = useGameProgress();
  const insets = useSafeAreaInsets();

  const questions = game.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(450);
  const [timer, setTimer] = useState(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [evalState, setEvalState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const currentQ = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (gameOver || victory || evalState !== 'idle') return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Time expired! Lose a life
          handleWrongAnswer();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, evalState, gameOver, victory, lives]);

  const handleWrongAnswer = () => {
    const nextLives = lives - 1;
    setLives(nextLives);
    setEvalState('wrong');

    if (nextLives <= 0) {
      setTimeout(() => setGameOver(true), 600);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (evalState !== 'idle' || !currentQ) return;
    setSelectedOption(idx);

    if (idx === currentQ.correctIndex) {
      setEvalState('correct');
      setScore((s) => s + 100);
    } else {
      handleWrongAnswer();
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setEvalState('idle');
    setTimer(15);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Victory!
      addXp(game.xpReward);
      setVictory(true);
    }
  };

  const handleRetry = () => {
    setLives(3);
    setScore(450);
    setCurrentIndex(0);
    setTimer(15);
    setSelectedOption(null);
    setEvalState('idle');
    setGameOver(false);
    setVictory(false);
  };

  if (!currentQ && !gameOver && !victory) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#111827' : '#F8FAFC',
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, 16),
        },
      ]}
    >
      {/* Top HUD: Game Title, Close */}
      <View style={styles.topHud}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onClose}
          style={[
            styles.hudCloseBtn,
            { backgroundColor: isDark ? '#1F2937' : '#E2E8F0' },
          ]}
        >
          <Ionicons name="close" size={20} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.gameHudTitle, { color: colors.text }]}>
          {game.title}
        </Text>

        {/* Lives (Hearts ❤️) */}
        <View style={styles.livesRow}>
          {[1, 2, 3].map((heart) => (
            <Text
              key={heart}
              style={[
                styles.heartIcon,
                { opacity: heart <= lives ? 1 : 0.25 },
              ]}
            >
              ❤️
            </Text>
          ))}
        </View>
      </View>

      {/* Stats Bar: Score, Question #, Timer */}
      <View
        style={[
          styles.statsBar,
          {
            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
            borderColor: isDark ? '#374151' : '#E2E8F0',
          },
        ]}
      >
        <View style={styles.statChip}>
          <Text style={{ fontSize: 13 }}>⚡</Text>
          <Text style={styles.scoreText}>{score}</Text>
        </View>

        <Text style={[styles.qCounterText, { color: colors.textSecondary }]}>
          Question {currentIndex + 1} / {questions.length}
        </Text>

        <View
          style={[
            styles.timerChip,
            {
              backgroundColor:
                timer <= 5
                  ? 'rgba(239, 68, 68, 0.2)'
                  : isDark
                  ? '#374151'
                  : '#F1F5F9',
            },
          ]}
        >
          <Ionicons
            name="time-outline"
            size={14}
            color={timer <= 5 ? '#EF4444' : colors.text}
          />
          <Text
            style={[
              styles.timerText,
              { color: timer <= 5 ? '#EF4444' : colors.text },
            ]}
          >
            {timer}s
          </Text>
        </View>
      </View>

      {/* Question Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.promptHeader}>
          <Text style={styles.promptLabel}>FIND THE RIGHT ANSWER</Text>
        </View>

        <Text style={[styles.questionText, { color: colors.text }]}>
          {currentQ?.question}
        </Text>

        {currentQ?.code && <CodeBlock code={currentQ.code} />}

        {/* Option Cards */}
        <View style={styles.optionsList}>
          {currentQ?.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            let optBorder = isDark ? '#374151' : '#E2E8F0';
            let optBg = isDark ? '#1F2937' : '#FFFFFF';

            if (evalState !== 'idle') {
              if (i === currentQ.correctIndex) {
                optBorder = '#22C55E';
                optBg = isDark ? 'rgba(34, 197, 94, 0.15)' : '#DCFCE7';
              } else if (isSelected && evalState === 'wrong') {
                optBorder = '#EF4444';
                optBg = isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2';
              }
            } else if (isSelected) {
              optBorder = '#FACC15';
              optBg = isDark ? 'rgba(250, 204, 21, 0.1)' : '#FEF9C3';
            }

            return (
              <TouchableOpacity
                key={i}
                disabled={evalState !== 'idle'}
                activeOpacity={0.8}
                onPress={() => handleSelectOption(i)}
                style={[
                  styles.optionCard,
                  {
                    borderColor: optBorder,
                    backgroundColor: optBg,
                  },
                ]}
              >
                <View
                  style={[
                    styles.optionLetterBox,
                    {
                      backgroundColor: isSelected
                        ? '#FACC15'
                        : isDark
                        ? '#374151'
                        : '#E2E8F0',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLetter,
                      {
                        color: isSelected ? '#0F172A' : colors.textSecondary,
                      },
                    ]}
                  >
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.optionText,
                    {
                      color: colors.text,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Continue Button when Answer is Evaluated */}
      {evalState !== 'idle' && !gameOver && (
        <View style={styles.bottomBar}>
          <Button
            title={
              currentIndex === questions.length - 1
                ? 'Claim Victory 🏆'
                : 'Next Question →'
            }
            onPress={handleNextQuestion}
            size="lg"
            style={{ width: '100%' }}
          />
        </View>
      )}

      {/* GAME OVER MODAL (Figma Style) */}
      <Modal visible={gameOver} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.statusModalCard,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.gameOverCircle}>
              <Text style={{ fontSize: 50 }}>💔</Text>
            </View>

            <Text style={[styles.modalTitle, { color: colors.text }]}>
              You lost!
            </Text>
            <Text
              style={[styles.modalSubtitle, { color: colors.textSecondary }]}
            >
              You used all your lives. Try again or review the lesson to brush up on this topic!
            </Text>

            <View style={styles.modalButtons}>
              <Button
                title="Try Again 🔄"
                onPress={handleRetry}
                size="lg"
                style={{ width: '100%', marginBottom: Spacing.sm }}
              />
              {onReviewLesson && (
                <Button
                  title="Review Lesson 📖"
                  variant="secondary"
                  onPress={() => {
                    setGameOver(false);
                    onClose();
                    onReviewLesson();
                  }}
                  size="md"
                  style={{ width: '100%', marginBottom: Spacing.sm }}
                />
              )}
              <Button
                title="Exit Game"
                variant="ghost"
                onPress={() => {
                  setGameOver(false);
                  onClose();
                }}
                size="sm"
                style={{ width: '100%' }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* GAME VICTORY MODAL (Figma Style) */}
      <Modal visible={victory} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.statusModalCard,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.victoryCircle}>
              <Text style={{ fontSize: 50 }}>🏆</Text>
            </View>

            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Well done!
            </Text>
            <Text
              style={[styles.modalSubtitle, { color: colors.textSecondary }]}
            >
              You completed the {game.title} game with a score of {score} points!
            </Text>

            <View style={styles.victoryRewardBadge}>
              <Text style={{ fontSize: 20 }}>⚡</Text>
              <Text style={styles.victoryRewardText}>+{game.xpReward} XP Earned</Text>
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Play Again 🔄"
                onPress={handleRetry}
                size="lg"
                style={{ width: '100%', marginBottom: Spacing.sm }}
              />
              <Button
                title="Back to Games"
                variant="secondary"
                onPress={() => {
                  setVictory(false);
                  onClose();
                }}
                size="md"
                style={{ width: '100%' }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topHud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.sm,
  },
  hudCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameHudTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '800',
  },
  livesRow: {
    flexDirection: 'row',
    gap: 4,
  },
  heartIcon: {
    fontSize: 18,
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.screenPadding,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    marginBottom: Spacing.md,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreText: {
    color: '#FACC15',
    fontSize: Typography.sizes.sm,
    fontWeight: '900',
  },
  qCounterText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '700',
  },
  timerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  timerText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 24,
  },
  promptHeader: {
    marginBottom: 6,
  },
  promptLabel: {
    color: '#FACC15',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  questionText: {
    fontSize: Typography.sizes.lg,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: Spacing.md,
  },
  optionsList: {
    gap: 10,
    marginTop: Spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  optionLetterBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetter: {
    fontWeight: '900',
    fontSize: Typography.sizes.sm,
  },
  optionText: {
    fontSize: Typography.sizes.base,
    flex: 1,
  },
  bottomBar: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xs,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.screenPadding,
  },
  statusModalCard: {
    width: '100%',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  gameOverCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  victoryCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(250, 204, 21, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  modalTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },
  victoryRewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.pill,
    marginBottom: Spacing.xl,
  },
  victoryRewardText: {
    fontSize: Typography.sizes.base,
    fontWeight: '900',
    color: '#FACC15',
  },
  modalButtons: {
    width: '100%',
  },
});

