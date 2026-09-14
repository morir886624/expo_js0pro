import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  step: string;
  icon: string;
  badge: string;
  title: string;
  description: string;
  accentColor: string;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    step: 'Onboarding 1 / 4',
    icon: '📚',
    badge: 'LESSONS',
    title: 'Learn JavaScript',
    description: 'Simple, interactive lessons crafted to help you progress step by step from complete beginner to pro.',
    accentColor: '#FACC15',
  },
  {
    id: '2',
    step: 'Onboarding 2 / 4',
    icon: '🎮',
    badge: 'GAMES',
    title: 'Practice with Fun',
    description: 'Mini-games, speed quizzes, and bug-hunting puzzles to test and consolidate your coding instincts.',
    accentColor: '#22C55E',
  },
  {
    id: '3',
    step: 'Onboarding 3 / 4',
    icon: '⚡',
    badge: 'XP & REWARDS',
    title: 'Track Your Progress',
    description: 'Earn XP, unlock achievement badges, and keep your daily learning streak burning bright.',
    accentColor: '#3B82F6',
  },
  {
    id: '4',
    step: 'Onboarding 4 / 4',
    icon: '🚀',
    badge: 'COMMUNITY',
    title: 'Ready to start?',
    description: 'Join thousands of learners mastering modern JavaScript today with JS0pro.',
    accentColor: '#EC4899',
  },
];

interface OnboardingScreenProps {
  onFinish: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const { colors, isDark } = useTheme();
  const { completeOnboarding } = useAuth();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = SLIDES[currentIndex];
  const isLast = currentIndex === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
      onFinish();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    onFinish();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#111827' : '#F8FAFC',
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
        },
      ]}
    >
      {/* Top Bar with Step & Skip */}
      <View style={styles.topBar}>
        <View style={styles.brandBadge}>
          <Text style={styles.brandJs}>JS</Text>
          <Text style={[styles.brandText, { color: colors.text }]}>0pro</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.textSecondary }]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Card */}
      <View style={styles.centerContent}>
        {/* Animated illustration container */}
        <View
          style={[
            styles.illustrationBox,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: isDark ? 'rgba(250, 204, 21, 0.15)' : '#FEF9C3' },
            ]}
          >
            <Text style={styles.iconEmoji}>{currentSlide.icon}</Text>
          </View>

          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>{currentSlide.badge}</Text>
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={[styles.stepIndicator, { color: '#FACC15' }]}>
            {currentSlide.step}
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {currentSlide.title}
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {currentSlide.description}
          </Text>
        </View>
      </View>

      {/* Bottom Bar: Dots & Next button */}
      <View style={styles.bottomBar}>
        <View style={styles.dotsContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentIndex === index
                      ? '#FACC15'
                      : isDark
                      ? '#374151'
                      : '#CBD5E1',
                  width: currentIndex === index ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        <Button
          title={isLast ? 'Get Started 🚀' : 'Next →'}
          onPress={handleNext}
          size="lg"
          style={styles.actionButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.screenPadding,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  brandJs: {
    backgroundColor: '#FACC15',
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  brandText: {
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: -0.5,
  },
  skipText: {
    fontSize: Typography.sizes.sm,
    fontWeight: '600',
  },
  centerContent: {
    alignItems: 'center',
    marginVertical: Spacing.base,
  },
  illustrationBox: {
    width: width * 0.78,
    height: width * 0.78,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 60,
  },
  tagBadge: {
    position: 'absolute',
    bottom: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.pill,
  },
  tagBadgeText: {
    color: '#FACC15',
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  stepIndicator: {
    fontSize: Typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: Typography.sizes.base,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomBar: {
    gap: Spacing.lg,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actionButton: {
    width: '100%',
  },
});

