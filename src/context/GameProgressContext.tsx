import React, { createContext, useContext, useState } from 'react';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  category: 'streak' | 'xp' | 'lessons' | 'games';
}

interface GameProgressContextType {
  xp: number;
  level: number;
  streakDays: number;
  todayCompleted: boolean;
  completedLessons: string[];
  badges: Badge[];
  soundEnabled: boolean;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  toggleSound: () => void;
  claimDailyStreak: () => void;
}

const initialBadges: Badge[] = [
  { id: 'b1', title: 'First Step', description: 'Complete your first lesson', icon: '🎯', isUnlocked: true, unlockedAt: '2 days ago', category: 'lessons' },
  { id: 'b2', title: 'On Fire', description: 'Maintain a 7-day streak', icon: '🔥', isUnlocked: true, unlockedAt: 'Today', category: 'streak' },
  { id: 'b3', title: 'Code Rookie', description: 'Earn 500 XP total', icon: '⚡', isUnlocked: true, unlockedAt: '3 days ago', category: 'xp' },
  { id: 'b4', title: 'Century Club', description: 'Reach 1,000 XP in JS0pro', icon: '💯', isUnlocked: true, unlockedAt: 'Yesterday', category: 'xp' },
  { id: 'b5', title: 'Bug Hunter', description: 'Score 100% in a game challenge', icon: '🐛', isUnlocked: true, unlockedAt: '1 day ago', category: 'games' },
  { id: 'b6', title: 'Syntax Master', description: 'Complete 10 quizzes with no mistakes', icon: '✨', isUnlocked: false, category: 'lessons' },
  { id: 'b7', title: 'Night Owl', description: 'Complete a lesson after 10 PM', icon: '🦉', isUnlocked: false, category: 'lessons' },
  { id: 'b8', title: '30-Day Master', description: 'Maintain a 30-day learning streak', icon: '👑', isUnlocked: false, category: 'streak' },
  { id: 'b9', title: 'Speed Demon', description: 'Finish a speed challenge in under 60s', icon: '⚡', isUnlocked: false, category: 'games' },
  { id: 'b10', title: 'Level 10 Titan', description: 'Reach Level 10 mastery', icon: '🛡️', isUnlocked: false, category: 'xp' },
  { id: 'b11', title: 'Array Wizard', description: 'Master Array methods module', icon: '🔮', isUnlocked: false, category: 'lessons' },
  { id: 'b12', title: 'Async Guru', description: 'Complete Promises & Async/Await', icon: '🚀', isUnlocked: false, category: 'lessons' },
];

const GameProgressContext = createContext<GameProgressContextType | undefined>(undefined);

export const GameProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Matching Figma mockups: Level 4, 1,240 XP, 7-day streak
  const [xp, setXp] = useState<number>(1240);
  const [level, setLevel] = useState<number>(4);
  const [streakDays, setStreakDays] = useState<number>(7);
  const [todayCompleted, setTodayCompleted] = useState<boolean>(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['m1_l1', 'm1_l2', 'm1_l3', 'm2_l1', 'm2_l2']);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const addXp = (amount: number) => {
    setXp((prevXp) => {
      const newXp = prevXp + amount;
      // Each level requires 400 XP
      const newLevel = Math.floor(newXp / 400) + 1;
      if (newLevel !== level) {
        setLevel(newLevel);
      }
      return newXp;
    });
  };

  const completeLesson = (lessonId: string, xpReward: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
      addXp(xpReward);
      setTodayCompleted(true);
    }
  };

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  const claimDailyStreak = () => {
    if (!todayCompleted) {
      setTodayCompleted(true);
      setStreakDays((prev) => prev + 1);
      addXp(50);
    }
  };

  return (
    <GameProgressContext.Provider
      value={{
        xp,
        level,
        streakDays,
        todayCompleted,
        completedLessons,
        badges,
        soundEnabled,
        addXp,
        completeLesson,
        toggleSound,
        claimDailyStreak,
      }}
    >
      {children}
    </GameProgressContext.Provider>
  );
};

export const useGameProgress = () => {
  const context = useContext(GameProgressContext);
  if (!context) {
    throw new Error('useGameProgress must be used within a GameProgressProvider');
  }
  return context;
};

