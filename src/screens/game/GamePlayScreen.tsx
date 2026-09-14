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

// Animal Interactive Game Boards
import { FlexboxSafariBoard } from '../../components/game/FlexboxSafariBoard';
import { ArrayRescueBoard } from '../../components/game/ArrayRescueBoard';
import { ConditionalQuestBoard } from '../../components/game/ConditionalQuestBoard';
import { LoopHiveBoard } from '../../components/game/LoopHiveBoard';
import { AsyncCritterRaceBoard } from '../../components/game/AsyncCritterRaceBoard';

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

  // General state
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(450);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);

  // Level state for Animal Coding Games
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);

  // Quiz state (for legacy speed quiz mode)
  const isQuizMode = game.gameType === 'quiz' || (!game.gameType && !!game.questions?.length);
  const questions = game.questions || [];
  const [quizTimer, setQuizTimer] = useState(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [evalState, setEvalState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Determine total levels for active animal game
  const totalLevels =
    game.gameType === 'flexbox'
      ? game.flexboxLevels?.length || 12
      : game.gameType === 'array_rescue'
      ? game.arrayRescueLevels?.length || 5
      : game.gameType === 'conditional_quest'
      ? game.conditionalLevels?.length || 5
      : game.gameType === 'loop_hive'
      ? game.loopLevels?.length || 5
      : game.gameType === 'async_race'
      ? game.asyncLevels?.length || 5
      : questions.length || 5;

  // Timer countdown for quiz mode
  useEffect(() => {
    if (!isQuizMode || gameOver || victory || evalState !== 'idle') return;

    const interval = setInterval(() => {
      setQuizTimer((prev) => {
        if (prev <= 1) {
          handleQuizWrongAnswer();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isQuizMode, currentLevelIndex, evalState, gameOver, victory, lives]);

  const handleQuizWrongAnswer = () => {
    const nextLives = lives - 1;
    setLives(nextLives);
    setEvalState('wrong');

    if (nextLives <= 0) {
      setTimeout(() => setGameOver(true), 600);
    }
  };

  const handleSelectQuizOption = (idx: number) => {
    const currentQ = questions[currentLevelIndex];
    if (evalState !== 'idle' || !currentQ) return;
    setSelectedOption(idx);

    if (idx === currentQ.correctIndex) {
      setEvalState('correct');
      setScore((s) => s + 100);
    } else {
      handleQuizWrongAnswer();
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    setEvalState('idle');
    setQuizTimer(15);

    if (currentLevelIndex < questions.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      addXp(game.xpReward);
      setVictory(true);
    }
  };

  // Animal Game Level Success Handler
  const handleAnimalLevelSuccess = () => {
    setScore((s) => s + 50);
    addXp(15);
    setLevelCompleted(true);
  };

  const handleAdvanceAnimalLevel = () => {
    setLevelCompleted(false);
    if (currentLevelIndex < totalLevels - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      // Finished all levels in this game!
      addXp(game.xpReward);
      setVictory(true);
    }
  };

  const handleRetry = () => {
    setLives(3);
    setScore(450);
    setCurrentLevelIndex(0);
    setLevelCompleted(false);
    setQuizTimer(15);
    setSelectedOption(null);
    setEvalState('idle');
    setGameOver(false);
    setVictory(false);
  };

  // Concept Hint Content
  const getActiveHint = () => {
    if (game.gameType === 'flexbox' && game.flexboxLevels) {
      const lvl = game.flexboxLevels[currentLevelIndex];
      return {
        module: lvl?.curriculumModule || 'CSS & Flexbox',
        hint: lvl?.hint || 'Check property spelling and values.',
        doc: lvl?.mdnDoc || 'MDN Web Docs: Flexbox Layout',
      };
    }
    if (game.gameType === 'array_rescue' && game.arrayRescueLevels) {
      const lvl = game.arrayRescueLevels[currentLevelIndex];
      return {
        module: lvl?.curriculumModule || 'Arrays & Iteration',
        hint: lvl?.hint || 'Review the array method signature.',
        doc: 'MDN: Array.prototype methods',
      };
    }
    if (game.gameType === 'conditional_quest' && game.conditionalLevels) {
      const lvl = game.conditionalLevels[currentLevelIndex];
      return {
        module: lvl?.curriculumModule || 'Conditionals & Logic',
        hint: lvl?.hint || 'Ensure both conditions evaluate to true with &&.',
        doc: 'MDN: Expressions and operators',
      };
    }
    if (game.gameType === 'loop_hive' && game.loopLevels) {
      const lvl = game.loopLevels[currentLevelIndex];
      return {
        module: lvl?.curriculumModule || 'Loops & Iteration',
        hint: lvl?.hint || 'Check your loop counter bounds.',
        doc: 'MDN: Loops and iteration',
      };
    }
    if (game.gameType === 'async_race' && game.asyncLevels) {
      const lvl = game.asyncLevels[currentLevelIndex];
      return {
        module: lvl?.curriculumModule || 'Async & Event Loop',
        hint: lvl?.hint || 'Microtasks run before macrotasks.',
        doc: 'MDN: Concurrency model and event loop',
      };
    }
    return {
      module: game.curriculumModulesTag || 'JavaScript Fundamentals',
      hint: 'Read the question carefully and look for syntax details.',
      doc: 'MDN JavaScript Guide',
    };
  };

  const activeHint = getActiveHint();
  const currentQuizQ = questions[currentLevelIndex];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#0B1120' : '#F8FAFC',
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, 16),
        },
      ]}
    >
      {/* Top HUD */}
      <View style={styles.topHud}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onClose}
          style={[
            styles.hudCloseBtn,
            { backgroundColor: isDark ? '#1E293B' : '#E2E8F0' },
          ]}
        >
          <Ionicons name="close" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.gameTitleRow}>
          <Text style={{ fontSize: 18 }}>{game.icon}</Text>
          <Text style={[styles.gameHudTitle, { color: colors.text }]}>
            {game.title}
          </Text>
        </View>

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

      {/* Stats Bar */}
      <View
        style={[
          styles.statsBar,
          {
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            borderColor: isDark ? '#334155' : '#E2E8F0',
          },
        ]}
      >
        <View style={styles.statChip}>
          <Text style={{ fontSize: 13 }}>⚡</Text>
          <Text style={styles.scoreText}>{score}</Text>
        </View>

        <Text style={[styles.qCounterText, { color: colors.textSecondary }]}>
          Level {currentLevelIndex + 1} / {totalLevels}
        </Text>

        <TouchableOpacity
          style={styles.hintPill}
          onPress={() => setShowHintModal(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="school-outline" size={13} color="#FACC15" />
          <Text style={styles.hintPillText}>Lesson Info</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Render Specialized Animal Game Boards */}
        {game.gameType === 'flexbox' && game.flexboxLevels && (
          <FlexboxSafariBoard
            level={game.flexboxLevels[currentLevelIndex]}
            onSuccess={handleAnimalLevelSuccess}
            onShowHint={() => setShowHintModal(true)}
            levelIndex={currentLevelIndex}
            totalLevels={totalLevels}
          />
        )}

        {game.gameType === 'array_rescue' && game.arrayRescueLevels && (
          <ArrayRescueBoard
            level={game.arrayRescueLevels[currentLevelIndex]}
            onSuccess={handleAnimalLevelSuccess}
            onShowHint={() => setShowHintModal(true)}
            levelIndex={currentLevelIndex}
            totalLevels={totalLevels}
          />
        )}

        {game.gameType === 'conditional_quest' && game.conditionalLevels && (
          <ConditionalQuestBoard
            level={game.conditionalLevels[currentLevelIndex]}
            onSuccess={handleAnimalLevelSuccess}
            onShowHint={() => setShowHintModal(true)}
            levelIndex={currentLevelIndex}
            totalLevels={totalLevels}
          />
        )}

        {game.gameType === 'loop_hive' && game.loopLevels && (
          <LoopHiveBoard
            level={game.loopLevels[currentLevelIndex]}
            onSuccess={handleAnimalLevelSuccess}
            onShowHint={() => setShowHintModal(true)}
            levelIndex={currentLevelIndex}
            totalLevels={totalLevels}
          />
        )}

        {game.gameType === 'async_race' && game.asyncLevels && (
          <AsyncCritterRaceBoard
            level={game.asyncLevels[currentLevelIndex]}
            onSuccess={handleAnimalLevelSuccess}
            onShowHint={() => setShowHintModal(true)}
            levelIndex={currentLevelIndex}
            totalLevels={totalLevels}
          />
        )}

        {/* Fallback Quiz Mode */}
        {isQuizMode && currentQuizQ && (
          <View style={{ width: '100%' }}>
            <View style={styles.promptHeader}>
              <Text style={styles.promptLabel}>RAPID KNOWLEDGE CHECK</Text>
            </View>

            <Text style={[styles.questionText, { color: colors.text }]}>
              {currentQuizQ.question}
            </Text>

            {currentQuizQ.code && <CodeBlock code={currentQuizQ.code} />}

            <View style={styles.optionsList}>
              {currentQuizQ.options.map((opt: string, i: number) => {
                const isSelected = selectedOption === i;
                let optBorder = isDark ? '#374151' : '#E2E8F0';
                let optBg = isDark ? '#1F2937' : '#FFFFFF';

                if (evalState !== 'idle') {
                  if (i === currentQuizQ.correctIndex) {
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
                    onPress={() => handleSelectQuizOption(i)}
                    style={[
                      styles.optionCard,
                      { borderColor: optBorder, backgroundColor: optBg },
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
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Bar for Level Completed / Quiz Next */}
      {levelCompleted && !victory && !gameOver && (
        <View style={styles.bottomBar}>
          <Button
            title={
              currentLevelIndex === totalLevels - 1
                ? 'Claim Master Trophy 🏆'
                : 'Next Level →'
            }
            onPress={handleAdvanceAnimalLevel}
            size="lg"
            style={{ width: '100%' }}
          />
        </View>
      )}

      {isQuizMode && evalState !== 'idle' && !gameOver && (
        <View style={styles.bottomBar}>
          <Button
            title={
              currentLevelIndex === questions.length - 1
                ? 'Claim Victory 🏆'
                : 'Next Question →'
            }
            onPress={handleNextQuizQuestion}
            size="lg"
            style={{ width: '100%' }}
          />
        </View>
      )}

      {/* LESSON HINT / DOCS MODAL */}
      <Modal visible={showHintModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.statusModalCard,
              {
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                borderColor: isDark ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.hintIconCircle}>
              <Text style={{ fontSize: 36 }}>💡</Text>
            </View>

            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Lesson Concept
            </Text>

            <View style={styles.curriculumTag}>
              <Text style={styles.curriculumTagText}>{activeHint.module}</Text>
            </View>

            <Text style={[styles.hintContentText, { color: colors.text }]}>
              {activeHint.hint}
            </Text>

            <View
              style={[
                styles.docBox,
                { backgroundColor: isDark ? '#0F172A' : '#F1F5F9' },
              ]}
            >
              <Ionicons name="book-outline" size={14} color="#38BDF8" />
              <Text style={styles.docBoxText}>{activeHint.doc}</Text>
            </View>

            <Button
              title="Got it, Back to Game! 🚀"
              onPress={() => setShowHintModal(false)}
              size="md"
              style={{ width: '100%', marginTop: Spacing.md }}
            />
          </View>
        </View>
      </Modal>

      {/* GAME OVER MODAL */}
      <Modal visible={gameOver} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.statusModalCard,
              {
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                borderColor: isDark ? '#334155' : '#E2E8F0',
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
              Try again to guide your animal friends to safety!
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

      {/* FINAL VICTORY MODAL */}
      <Modal visible={victory} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.statusModalCard,
              {
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                borderColor: isDark ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.victoryCircle}>
              <Text style={{ fontSize: 50 }}>🏆</Text>
            </View>

            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Challenge Mastered!
            </Text>
            <Text
              style={[styles.modalSubtitle, { color: colors.textSecondary }]}
            >
              You guided all animals home and mastered every level in{' '}
              {game.title}!
            </Text>

            <View style={styles.victoryRewardBadge}>
              <Text style={{ fontSize: 20 }}>⚡</Text>
              <Text style={styles.victoryRewardText}>
                +{game.xpReward} XP Earned
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Play Again 🔄"
                onPress={handleRetry}
                size="lg"
                style={{ width: '100%', marginBottom: Spacing.sm }}
              />
              <Button
                title="Back to Games Section"
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
  },
  topHud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.xs,
  },
  hudCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gameHudTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '900',
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
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    marginBottom: Spacing.sm,
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
  hintPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  hintPillText: {
    color: '#FACC15',
    fontSize: 10,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 40,
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
    backgroundColor: 'rgba(0,0,0,0.8)',
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
  hintIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  curriculumTag: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.pill,
    marginVertical: 6,
  },
  curriculumTagText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
  },
  hintContentText: {
    fontSize: Typography.sizes.sm,
    lineHeight: 22,
    textAlign: 'center',
    marginVertical: Spacing.sm,
  },
  docBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    width: '100%',
    marginTop: 4,
  },
  docBoxText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
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
