import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useGameProgress } from '../../context/GameProgressContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { CodeBlock } from '../../components/common/CodeBlock';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { Lesson, LessonStep } from '../../data/mockData';

interface LessonPlayerScreenProps {
  lesson: Lesson;
  onClose: () => void;
  onNextLesson?: () => void;
}

export const LessonPlayerScreen: React.FC<LessonPlayerScreenProps> = ({
  lesson,
  onClose,
  onNextLesson,
}) => {
  const { colors, isDark } = useTheme();
  const { completeLesson } = useGameProgress();
  const insets = useSafeAreaInsets();

  const steps = lesson.steps;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showCelebration, setShowCelebration] = useState(false);

  const currentStep: LessonStep | undefined = steps[currentStepIndex];
  const isTheory = currentStep?.type === 'theory';
  const progress = steps.length > 0 ? (currentStepIndex + 1) / steps.length : 1;

  const handleNextStep = () => {
    setSelectedOption(null);
    setAnswerState('idle');

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Lesson Complete!
      completeLesson(lesson.id, lesson.xp);
      setShowCelebration(true);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentStep) return;

    if (selectedOption === currentStep.correctAnswerIndex) {
      setAnswerState('correct');
    } else {
      setAnswerState('wrong');
    }
  };

  if (!currentStep) {
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
      {/* Top Header Bar with Close, Step Counter, and XP */}
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onClose}
          style={[
            styles.closeBtn,
            { backgroundColor: isDark ? '#1F2937' : '#E2E8F0' },
          ]}
        >
          <Ionicons name="close" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.progressBarWrapper}>
          <ProgressBar progress={progress} height={8} color="#FACC15" />
          <Text style={[styles.stepText, { color: colors.textMuted }]}>
            Step {currentStepIndex + 1} / {steps.length}
          </Text>
        </View>

        <View style={styles.xpBadge}>
          <Text style={styles.xpBadgeText}>+{currentStep.xpReward} XP</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isTheory ? (
          /* THEORY STEP */
          <View style={styles.theoryContainer}>
            {currentStep.subtitle && (
              <Text style={styles.theorySubtitle}>
                {currentStep.subtitle}
              </Text>
            )}
            <Text style={[styles.theoryTitle, { color: colors.text }]}>
              {currentStep.title}
            </Text>

            {currentStep.content && (
              <Text
                style={[
                  styles.theoryBodyText,
                  { color: colors.textSecondary },
                ]}
              >
                {currentStep.content}
              </Text>
            )}

            {currentStep.codeSnippet && (
              <CodeBlock code={currentStep.codeSnippet} />
            )}
          </View>
        ) : (
          /* QUIZ STEP */
          <View style={styles.quizContainer}>
            <View style={styles.quizHeaderBadge}>
              <Text style={styles.quizBadgeText}>QUESTION</Text>
            </View>

            <Text style={[styles.questionText, { color: colors.text }]}>
              {currentStep.question}
            </Text>

            {currentStep.codeSnippet && (
              <CodeBlock code={currentStep.codeSnippet} />
            )}

            <View style={styles.optionsList}>
              {currentStep.options?.map((option, index) => {
                const isSelected = selectedOption === index;
                let optionBorder = isDark ? '#374151' : '#E2E8F0';
                let optionBg = isDark ? '#1F2937' : '#FFFFFF';

                if (answerState !== 'idle') {
                  if (index === currentStep.correctAnswerIndex) {
                    optionBorder = '#22C55E';
                    optionBg = isDark ? 'rgba(34, 197, 94, 0.15)' : '#DCFCE7';
                  } else if (isSelected && answerState === 'wrong') {
                    optionBorder = '#EF4444';
                    optionBg = isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2';
                  }
                } else if (isSelected) {
                  optionBorder = '#FACC15';
                  optionBg = isDark ? 'rgba(250, 204, 21, 0.1)' : '#FEF9C3';
                }

                return (
                  <TouchableOpacity
                    key={index}
                    disabled={answerState !== 'idle'}
                    activeOpacity={0.8}
                    onPress={() => setSelectedOption(index)}
                    style={[
                      styles.optionCard,
                      {
                        borderColor: optionBorder,
                        backgroundColor: optionBg,
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
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.optionTitle,
                        {
                          color: colors.text,
                          fontWeight: isSelected ? '700' : '500',
                        },
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Answer Feedback Banner (Figma Bottom Card) */}
      {answerState !== 'idle' && (
        <View
          style={[
            styles.feedbackBanner,
            {
              backgroundColor:
                answerState === 'correct'
                  ? isDark
                    ? '#064E3B'
                    : '#DCFCE7'
                  : isDark
                  ? '#7F1D1D'
                  : '#FEE2E2',
              borderColor:
                answerState === 'correct' ? '#22C55E' : '#EF4444',
            },
          ]}
        >
          <View style={styles.feedbackHeader}>
            <Text style={{ fontSize: 20 }}>
              {answerState === 'correct' ? '🎉' : '❌'}
            </Text>
            <Text
              style={[
                styles.feedbackTitle,
                {
                  color:
                    answerState === 'correct'
                      ? '#22C55E'
                      : isDark
                      ? '#FCA5A5'
                      : '#B91C1C',
                },
              ]}
            >
              {answerState === 'correct'
                ? 'Correct! Well done.'
                : 'Incorrect Answer'}
            </Text>
          </View>

          {currentStep.explanation && (
            <Text
              style={[
                styles.feedbackExplanation,
                {
                  color: isDark ? '#F3F4F6' : '#374151',
                },
              ]}
            >
              {currentStep.explanation}
            </Text>
          )}
        </View>
      )}

      {/* Bottom Action Button */}
      <View style={styles.bottomBar}>
        {isTheory ? (
          <Button
            title={currentStepIndex === steps.length - 1 ? 'Finish Lesson 🎉' : 'Continue →'}
            onPress={handleNextStep}
            size="lg"
            style={{ width: '100%' }}
          />
        ) : answerState === 'idle' ? (
          <Button
            title="Check Answer"
            onPress={handleCheckAnswer}
            disabled={selectedOption === null}
            size="lg"
            style={{ width: '100%' }}
          />
        ) : (
          <Button
            title={currentStepIndex === steps.length - 1 ? 'Finish Lesson 🎉' : 'Continue →'}
            onPress={handleNextStep}
            size="lg"
            style={{ width: '100%' }}
          />
        )}
      </View>

      {/* Lesson Complete Modal (Celebration) */}
      <Modal visible={showCelebration} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.celebrationCard,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                borderColor: isDark ? '#374151' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.trophyCircle}>
              <Text style={{ fontSize: 50 }}>🎉</Text>
            </View>

            <Text style={[styles.celebrationTitle, { color: colors.text }]}>
              Lesson Complete!
            </Text>
            <Text
              style={[
                styles.celebrationSubtitle,
                { color: colors.textSecondary },
              ]}
            >
              Great work! You have completed "{lesson.title}".
            </Text>

            <View style={styles.celebrationXpRow}>
              <Text style={{ fontSize: 22 }}>⚡</Text>
              <Text style={styles.celebrationXpText}>+{lesson.xp} XP Earned</Text>
            </View>

            <View style={styles.modalButtonsRow}>
              {onNextLesson && (
                <Button
                  title="Next Lesson →"
                  onPress={() => {
                    setShowCelebration(false);
                    onNextLesson();
                  }}
                  size="lg"
                  style={{ width: '100%', marginBottom: Spacing.sm }}
                />
              )}
              <Button
                title="Back to Home"
                variant="secondary"
                onPress={() => {
                  setShowCelebration(false);
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    gap: 12,
    marginBottom: Spacing.md,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarWrapper: {
    flex: 1,
    gap: 4,
  },
  stepText: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  xpBadge: {
    backgroundColor: 'rgba(250, 204, 21, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.pill,
  },
  xpBadgeText: {
    color: '#FACC15',
    fontSize: 11,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 24,
  },
  theoryContainer: {
    paddingVertical: Spacing.sm,
  },
  theorySubtitle: {
    color: '#FACC15',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  theoryTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: Spacing.md,
  },
  theoryBodyText: {
    fontSize: Typography.sizes.base,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  quizContainer: {
    paddingVertical: Spacing.sm,
  },
  quizHeaderBadge: {
    backgroundColor: '#3B82F6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  quizBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
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
  optionTitle: {
    fontSize: Typography.sizes.base,
    flex: 1,
  },
  feedbackBanner: {
    marginHorizontal: Spacing.screenPadding,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    marginBottom: Spacing.sm,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  feedbackTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: '800',
  },
  feedbackExplanation: {
    fontSize: Typography.sizes.xs,
    lineHeight: 18,
  },
  bottomBar: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xs,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.screenPadding,
  },
  celebrationCard: {
    width: '100%',
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  trophyCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(250, 204, 21, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  celebrationTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
  },
  celebrationSubtitle: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.base,
  },
  celebrationXpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.pill,
    marginBottom: Spacing.xl,
  },
  celebrationXpText: {
    fontSize: Typography.sizes.base,
    fontWeight: '900',
    color: '#FACC15',
  },
  modalButtonsRow: {
    width: '100%',
  },
});

