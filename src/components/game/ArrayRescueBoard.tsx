import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { ArrayRescueLevel, ArrayAnimal } from '../../data/animalGamesData';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { CodePillsBar } from './CodePillsBar';
import { Ionicons } from '@expo/vector-icons';

interface ArrayRescueBoardProps {
  level: ArrayRescueLevel;
  onSuccess: () => void;
  onShowHint: () => void;
  levelIndex: number;
  totalLevels: number;
}

export const ArrayRescueBoard: React.FC<ArrayRescueBoardProps> = ({
  level,
  onSuccess,
  onShowHint,
  levelIndex,
  totalLevels,
}) => {
  const [currentCode, setCurrentCode] = useState<string>('');
  const [resultingAnimals, setResultingAnimals] = useState<ArrayAnimal[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    setCurrentCode('');
    setResultingAnimals([]);
    setStatusMessage('');
    setIsSuccess(false);
  }, [level.id]);

  useEffect(() => {
    if (!currentCode.trim()) {
      setResultingAnimals([]);
      setStatusMessage('');
      return;
    }

    const res = level.validate(currentCode);
    setResultingAnimals(res.resultingAnimals);
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
              MISSION {levelIndex + 1} OF {totalLevels}
            </Text>
          </View>

          <View style={styles.methodBadge}>
            <Text style={styles.methodBadgeText}>
              .{level.taskType.toUpperCase()}()
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

      {/* Sanctuary Dispatch Field */}
      <View style={styles.sanctuaryField}>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldTitle}>1. Current Array (animals)</Text>
          <Text style={styles.itemCountTag}>{level.initialAnimals.length} items</Text>
        </View>

        {/* Animal Cards Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.animalsScroll}
        >
          {level.initialAnimals.map((animal) => (
            <View key={animal.id} style={styles.animalCard}>
              <View style={styles.animalCardEmojiBox}>
                <Text style={{ fontSize: 28 }}>{animal.emoji}</Text>
              </View>
              <Text style={styles.animalCardName}>{animal.name}</Text>
              <View style={styles.animalCardTraits}>
                <Text style={styles.animalTrait}>
                  {animal.hungry ? '🥩 hungry' : '🥗 full'}
                </Text>
                <Text style={styles.animalTrait}>❤️ {animal.health}%</Text>
                <Text style={styles.animalTrait}>⚡ {animal.speed} km/h</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Code Bar */}
      <CodePillsBar
        currentCode={currentCode}
        onChangeCode={setCurrentCode}
        tokens={level.suggestedTokens}
        prefix={level.initialCode}
        suffix={level.taskType === 'map' ? ')' : ')'}
        onReset={() => setCurrentCode('')}
        isCorrect={isSuccess}
      />

      {/* 2. Destination Enclosure / Resulting Array */}
      <View style={styles.destinationField}>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldTitle}>2. Transformed Result Array</Text>
          {isSuccess && (
            <View style={styles.successTag}>
              <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
              <Text style={styles.successTagText}>Goal Achieved!</Text>
            </View>
          )}
        </View>

        {resultingAnimals.length > 0 ? (
          <View style={styles.resultCardsRow}>
            {resultingAnimals.map((animal) => (
              <View key={`res_${animal.id}`} style={styles.rescuedBadge}>
                <Text style={{ fontSize: 24 }}>{animal.emoji}</Text>
                <Text style={styles.rescuedName}>{animal.name}</Text>
                <Ionicons name="checkmark" size={12} color="#22C55E" />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyEnclosure}>
            <Text style={styles.emptyEnclosureText}>
              Apply code above to dispatch matching animals here...
            </Text>
          </View>
        )}

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
    marginBottom: Spacing.sm,
  },
  topBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  levelBadgeText: {
    color: '#3B82F6',
    fontSize: 10,
    fontWeight: '900',
  },
  methodBadge: {
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  methodBadgeText: {
    color: '#FACC15',
    fontSize: 11,
    fontWeight: '900',
    fontFamily: Typography.fontFamily.code,
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
  sanctuaryField: {
    backgroundColor: '#1E293B',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#334155',
    marginVertical: Spacing.xs,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fieldTitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: Typography.fontFamily.code,
  },
  itemCountTag: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
  },
  animalsScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  animalCard: {
    backgroundColor: '#0F172A',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 10,
    alignItems: 'center',
    minWidth: 85,
  },
  animalCardEmojiBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  animalCardName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  animalCardTraits: {
    alignItems: 'center',
    gap: 2,
  },
  animalTrait: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
  },
  destinationField: {
    backgroundColor: '#1E293B',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: '#334155',
    marginTop: Spacing.xs,
  },
  successTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  successTagText: {
    color: '#22C55E',
    fontSize: 11,
    fontWeight: '800',
  },
  resultCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 4,
  },
  rescuedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#22C55E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
  },
  rescuedName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  emptyEnclosure: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyEnclosureText: {
    color: '#64748B',
    fontSize: 11,
    fontStyle: 'italic',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
});

