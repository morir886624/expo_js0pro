import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { FroggyJSLevel } from '../../data/animalGamesData';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { CodePillsBar } from './CodePillsBar';
import { Ionicons } from '@expo/vector-icons';

interface FroggyJSBoardProps {
  level: FroggyJSLevel;
  onSuccess: () => void;
  onShowHint: () => void;
  levelIndex: number;
  totalLevels: number;
}

export const FroggyJSBoard: React.FC<FroggyJSBoardProps> = ({
  level,
  onSuccess,
  onShowHint,
  levelIndex,
  totalLevels,
}) => {
  const [currentCode, setCurrentCode] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [animalPadIndices, setAnimalPadIndices] = useState<number[]>([0]);

  // Hop animation values for up to 2 animals
  const [jumpAnimX] = useState(() => new Animated.Value(0));
  const [jumpAnimY] = useState(() => new Animated.Value(0));

  useEffect(() => {
    setCurrentCode('');
    setIsSuccess(false);
    setStatusMessage('');
    setAnimalPadIndices(level.animals.map(() => 0));
    jumpAnimX.setValue(0);
    jumpAnimY.setValue(0);
  }, [level.id]);

  useEffect(() => {
    const trimmed = currentCode.trim();
    if (!trimmed) {
      setAnimalPadIndices(level.animals.map(() => 0));
      setStatusMessage('');
      return;
    }

    const res = level.validate(trimmed);
    setStatusMessage(res.message);

    if (res.isSuccess && !isSuccess) {
      setIsSuccess(true);
      setAnimalPadIndices(res.targetPositions);

      // Animate hop arc across to target pad!
      const targetPad = res.targetPositions[0] || 0;
      // 5 pads distributed across width (roughly 52px each gap)
      const targetX = targetPad * 54;

      Animated.parallel([
        Animated.spring(jumpAnimX, {
          toValue: targetX,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(jumpAnimY, {
            toValue: -28,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.spring(jumpAnimY, {
            toValue: 0,
            friction: 4,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
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
              LEAP {levelIndex + 1} OF {totalLevels}
            </Text>
          </View>

          <View style={styles.jsTag}>
            <Text style={styles.jsTagText}>PURE JAVASCRIPT</Text>
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

      {/* THE POND STAGE: Visual Lilypads & Animating Animals */}
      <View style={styles.pondStage}>
        {/* Pond Water Details */}
        <View style={styles.waterDetails}>
          <Text style={styles.waterRipple}>🌊</Text>
          <Text style={styles.waterRippleRight}>🌊</Text>
        </View>

        {/* 5 Horizontal Lilypads (#0 to #4) */}
        <View style={styles.lilypadsRow}>
          {Array.from({ length: level.totalPads }).map((_, padIdx) => {
            const isTargetPad = level.animals.some((a) => a.targetIndex === padIdx);

            return (
              <View key={padIdx} style={styles.lilypadSlot}>
                <View
                  style={[
                    styles.lilypadDisc,
                    isTargetPad && styles.targetLilypadDisc,
                  ]}
                >
                  <Text style={{ fontSize: 30 }}>
                    {isTargetPad ? level.animals[0].targetEmoji : '🟢'}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.padIndexText,
                    isTargetPad && styles.targetPadIndexText,
                  ]}
                >
                  [{padIdx}]
                </Text>
              </View>
            );
          })}
        </View>

        {/* The Animated Animals Layer */}
        <View style={styles.animalsLayer} pointerEvents="none">
          {level.animals.map((animal, idx) => (
            <Animated.View
              key={animal.id}
              style={[
                styles.animalActor,
                {
                  transform: [
                    { translateX: jumpAnimX },
                    { translateY: jumpAnimY },
                  ],
                },
              ]}
            >
              <View
                style={[
                  styles.animalGlowBox,
                  isSuccess && styles.animalSuccessGlow,
                ]}
              >
                <Text style={{ fontSize: 32 }}>{animal.emoji}</Text>
              </View>
              <Text style={styles.animalNameLabel}>{animal.name}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Success Banner */}
        {isSuccess && (
          <View style={styles.successBanner}>
            <Text style={{ fontSize: 16 }}>✨</Text>
            <Text style={styles.successBannerText}>
              Target Reached with JavaScript!
            </Text>
          </View>
        )}
      </View>

      {/* Variables Context HUD */}
      {Object.keys(level.contextVars).length > 0 && (
        <View style={styles.contextVarsStrip}>
          <Text style={styles.contextVarsTitle}>SCOPE VARIABLES: </Text>
          {Object.entries(level.contextVars).map(([k, v]) => (
            <View key={k} style={styles.varPill}>
              <Text style={styles.varKey}>{k}: </Text>
              <Text style={styles.varVal}>{JSON.stringify(v)}</Text>
            </View>
          ))}
        </View>
      )}

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

      {/* Instructions Guidance */}
      <Text style={styles.guidanceNote}>💡 {level.instructions}</Text>

      {statusMessage ? (
        <Text
          style={[
            styles.statusMessage,
            { color: isSuccess ? '#22C55E' : '#F59E0B' },
          ]}
        >
          {statusMessage}
        </Text>
      ) : null}
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
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  levelBadgeText: {
    color: '#22C55E',
    fontSize: 10,
    fontWeight: '900',
  },
  jsTag: {
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  jsTagText: {
    color: '#FACC15',
    fontSize: 9,
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
  pondStage: {
    width: '100%',
    height: 180,
    backgroundColor: '#0284C7',
    borderRadius: BorderRadius.xl,
    borderWidth: 2.5,
    borderColor: '#0369A1',
    position: 'relative',
    marginVertical: Spacing.xs,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  waterDetails: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    opacity: 0.2,
  },
  waterRipple: {
    fontSize: 32,
  },
  waterRippleRight: {
    fontSize: 32,
    alignSelf: 'flex-end',
  },
  lilypadsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  lilypadSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
  },
  lilypadDisc: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetLilypadDisc: {
    backgroundColor: 'rgba(250, 204, 21, 0.35)',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FACC15',
  },
  padIndexText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: Typography.fontFamily.code,
    marginTop: 4,
  },
  targetPadIndexText: {
    color: '#FACC15',
    fontWeight: '900',
  },
  animalsLayer: {
    position: 'absolute',
    left: 14,
    top: 50,
    zIndex: 10,
  },
  animalActor: {
    alignItems: 'center',
    width: 52,
  },
  animalGlowBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  animalSuccessGlow: {
    backgroundColor: '#DCFCE7',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  animalNameLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
  },
  successBanner: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    borderRadius: BorderRadius.pill,
  },
  successBannerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  contextVarsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    backgroundColor: '#1E293B',
    padding: 8,
    borderRadius: BorderRadius.md,
    marginTop: 2,
  },
  contextVarsTitle: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
  },
  varPill: {
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
  guidanceNote: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 18,
    marginHorizontal: 4,
    marginTop: 2,
  },
  statusMessage: {
    fontSize: 11,
    fontWeight: '800',
    marginHorizontal: 4,
    marginTop: 2,
  },
});

