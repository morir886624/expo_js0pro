import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FlexboxLevel, AnimalTarget } from '../../data/animalGamesData';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { CodePillsBar } from './CodePillsBar';
import { Ionicons } from '@expo/vector-icons';

interface FlexboxSafariBoardProps {
  level: FlexboxLevel;
  onSuccess: () => void;
  onShowHint: () => void;
  levelIndex: number;
  totalLevels: number;
}

export const FlexboxSafariBoard: React.FC<FlexboxSafariBoardProps> = ({
  level,
  onSuccess,
  onShowHint,
  levelIndex,
  totalLevels,
}) => {
  // Parsing target styles
  const requiredTarget = level.targetStyles;

  // Active user code state
  // We can track individual properties or a quick value
  const initialValue = level.suggestedTokens[0] || 'flex-start';
  const [activeCodeValue, setActiveCodeValue] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bounceAnim] = useState(() => new Animated.Value(0));

  // Determine which property this level is focusing on:
  const primaryProperty = requiredTarget.flexDirection
    ? 'flexDirection'
    : requiredTarget.alignItems && !requiredTarget.justifyContent
    ? 'alignItems'
    : requiredTarget.gap
    ? 'gap'
    : 'justifyContent';

  useEffect(() => {
    // Reset for new level
    setActiveCodeValue('');
    setIsSuccess(false);
  }, [level.id]);

  // Compute the live style container for the animal layer
  const computeActiveAnimalStyle = () => {
    const val = activeCodeValue.trim().toLowerCase();

    // Start with default or partial styles
    const stylesObj: any = {
      flexDirection: requiredTarget.flexDirection ? 'row' : 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    };

    // If level has fixed prerequisites (e.g. justifyContent: 'center' while user enters alignItems)
    if (requiredTarget.justifyContent && primaryProperty !== 'justifyContent') {
      stylesObj.justifyContent = requiredTarget.justifyContent;
    }
    if (requiredTarget.flexDirection && primaryProperty !== 'flexDirection') {
      stylesObj.flexDirection = requiredTarget.flexDirection;
    }
    if (requiredTarget.alignItems && primaryProperty !== 'alignItems') {
      stylesObj.alignItems = requiredTarget.alignItems;
    }
    if (requiredTarget.gap && primaryProperty !== 'gap') {
      stylesObj.gap = requiredTarget.gap;
    }

    // Apply the active property value entered by user
    if (primaryProperty === 'justifyContent') {
      if (['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].includes(val)) {
        stylesObj.justifyContent = val;
      }
    } else if (primaryProperty === 'alignItems') {
      if (['flex-start', 'flex-end', 'center', 'stretch', 'baseline'].includes(val)) {
        stylesObj.alignItems = val;
      }
    } else if (primaryProperty === 'flexDirection') {
      if (['row', 'row-reverse', 'column', 'column-reverse'].includes(val)) {
        stylesObj.flexDirection = val;
      }
    } else if (primaryProperty === 'gap') {
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        stylesObj.gap = num;
      }
    }

    return stylesObj;
  };

  // Check victory condition
  useEffect(() => {
    const val = activeCodeValue.trim().toLowerCase();
    let matches = false;

    if (primaryProperty === 'justifyContent') {
      matches = val === requiredTarget.justifyContent?.toLowerCase();
    } else if (primaryProperty === 'alignItems') {
      matches = val === requiredTarget.alignItems?.toLowerCase();
    } else if (primaryProperty === 'flexDirection') {
      matches = val === requiredTarget.flexDirection?.toLowerCase();
    } else if (primaryProperty === 'gap') {
      matches = parseInt(val, 10) === requiredTarget.gap;
    }

    if (matches && !isSuccess) {
      setIsSuccess(true);
      // Trigger animal bounce animation
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -15, duration: 250, useNativeDriver: true }),
        Animated.spring(bounceAnim, { toValue: 0, friction: 3, useNativeDriver: true }),
      ]).start();

      onSuccess();
    }
  }, [activeCodeValue]);

  // Habitat background styling
  const getHabitatTheme = () => {
    switch (level.habitatType) {
      case 'savannah':
        return {
          bg: '#FEF3C7',
          borderColor: '#F59E0B',
          patternIcon: '🌾',
          waterColor: '#FDE68A',
        };
      case 'arctic':
        return {
          bg: '#E0F2FE',
          borderColor: '#38BDF8',
          patternIcon: '❄️',
          waterColor: '#BAE6FD',
        };
      case 'forest':
        return {
          bg: '#DCFCE7',
          borderColor: '#22C55E',
          patternIcon: '🌲',
          waterColor: '#BBF7D0',
        };
      case 'pond':
      default:
        return {
          bg: '#0284C7',
          borderColor: '#0369A1',
          patternIcon: '🌊',
          waterColor: '#0EA5E9',
        };
    }
  };

  const habitatTheme = getHabitatTheme();
  const animalContainerStyle = computeActiveAnimalStyle();

  return (
    <View style={styles.boardContainer}>
      {/* Level Title & Instructions */}
      <View style={styles.instructionsHeader}>
        <View style={styles.levelBadgeRow}>
          <View style={styles.levelPill}>
            <Text style={styles.levelPillText}>
              LEVEL {levelIndex + 1} OF {totalLevels}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.hintBtn}
            onPress={onShowHint}
            activeOpacity={0.7}
          >
            <Ionicons name="bulb-outline" size={16} color="#FACC15" />
            <Text style={styles.hintBtnText}>Hint</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.levelTitle}>{level.title}</Text>
        <Text style={styles.levelDescription}>{level.description}</Text>
      </View>

      {/* THE PLAYGROUND: Live Interactive Pond & Targets */}
      <View
        style={[
          styles.playgroundPond,
          {
            backgroundColor: habitatTheme.bg,
            borderColor: habitatTheme.borderColor,
          },
        ]}
      >
        {/* Habitat Backdrop Details */}
        <View style={styles.pondBackdropDetails}>
          <Text style={styles.backdropWatermark}>{habitatTheme.patternIcon}</Text>
          <Text style={styles.backdropWatermarkRight}>{habitatTheme.patternIcon}</Text>
        </View>

        {/* LAYER 1: Target Homes (Lilypads, Cushions, Burrows, Ice Floes) */}
        <View
          style={[
            styles.targetsLayer,
            {
              flexDirection: requiredTarget.flexDirection || 'row',
              justifyContent: requiredTarget.justifyContent || 'flex-start',
              alignItems: requiredTarget.alignItems || 'flex-start',
              gap: requiredTarget.gap || 0,
            },
          ]}
          pointerEvents="none"
        >
          {level.animals.map((animal, idx) => (
            <View key={`target_${animal.id}_${idx}`} style={styles.targetSpot}>
              <View style={styles.targetRippleRing} />
              <Text style={styles.targetEmoji}>{animal.targetEmoji}</Text>
              <Text style={styles.targetLabel}>{animal.targetLabel}</Text>
            </View>
          ))}
        </View>

        {/* LAYER 2: Animals (Reacting Live to User Flexbox Styles) */}
        <View
          style={[
            styles.animalsLayer,
            animalContainerStyle,
          ]}
        >
          {level.animals.map((animal, idx) => (
            <Animated.View
              key={`animal_${animal.id}_${idx}`}
              style={[
                styles.animalActor,
                {
                  transform: [{ translateY: bounceAnim }],
                },
              ]}
            >
              <View
                style={[
                  styles.animalGlowCircle,
                  isSuccess && styles.animalSuccessGlow,
                ]}
              >
                <Text style={styles.animalEmoji}>{animal.emoji}</Text>
              </View>
              <Text style={styles.animalNameTag}>{animal.name}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Success Overlay Banner on Match */}
        {isSuccess && (
          <View style={styles.successBanner}>
            <Text style={styles.successBannerEmoji}>🎉</Text>
            <Text style={styles.successBannerText}>
              All animals reached their homes!
            </Text>
          </View>
        )}
      </View>

      {/* Live Code Input & Suggested Token Chips */}
      <CodePillsBar
        currentCode={activeCodeValue}
        onChangeCode={setActiveCodeValue}
        tokens={level.suggestedTokens}
        prefix={`#pond {\n  display: flex;\n  ${primaryProperty}: `}
        suffix=";"
        onReset={() => setActiveCodeValue('')}
        isCorrect={isSuccess}
      />

      {/* Guidance Note */}
      <Text style={styles.guidanceNote}>
        💡 {level.instructions}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    width: '100%',
  },
  instructionsHeader: {
    marginBottom: Spacing.sm,
  },
  levelBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelPill: {
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  levelPillText: {
    color: '#FACC15',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
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
  levelTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  levelDescription: {
    fontSize: Typography.sizes.xs,
    color: '#94A3B8',
    marginTop: 2,
    lineHeight: 18,
  },
  playgroundPond: {
    width: '100%',
    height: 230,
    borderRadius: BorderRadius.xl,
    borderWidth: 3,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: Spacing.xs,
  },
  pondBackdropDetails: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
    opacity: 0.15,
  },
  backdropWatermark: {
    fontSize: 48,
  },
  backdropWatermarkRight: {
    fontSize: 48,
    alignSelf: 'flex-end',
  },
  targetsLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
  },
  targetSpot: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  targetRippleRing: {
    position: 'absolute',
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  targetEmoji: {
    fontSize: 32,
  },
  targetLabel: {
    position: 'absolute',
    bottom: -4,
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: '800',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  animalsLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    zIndex: 10,
  },
  animalActor: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animalGlowCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  animalSuccessGlow: {
    backgroundColor: '#DCFCE7',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  animalEmoji: {
    fontSize: 32,
  },
  animalNameTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
    marginTop: 2,
    overflow: 'hidden',
  },
  successBanner: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    borderRadius: BorderRadius.pill,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
  },
  successBannerEmoji: {
    fontSize: 16,
  },
  successBannerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  guidanceNote: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    marginHorizontal: 4,
    marginTop: 2,
  },
});
