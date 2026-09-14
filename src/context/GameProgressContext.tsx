import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './AuthContext';

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
  syncWithSupabase: () => Promise<void>;
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
  const { user } = useAuth();

  // Initial state matching Figma designs
  const [xp, setXp] = useState<number>(1240);
  const [level, setLevel] = useState<number>(4);
  const [streakDays, setStreakDays] = useState<number>(7);
  const [todayCompleted, setTodayCompleted] = useState<boolean>(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['m1_l1', 'm1_l2', 'm1_l3', 'm2_l1', 'm2_l2']);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync state from Supabase when user changes
  useEffect(() => {
    if (user?.id && user.id !== 'usr_1') {
      syncWithSupabase();
    }
  }, [user?.id]);

  const syncWithSupabase = async () => {
    if (!user?.id || user.id === 'usr_1') return;

    try {
      // 1. Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (progressData) {
        if (progressData.xp !== undefined) setXp(progressData.xp);
        if (progressData.level !== undefined) setLevel(progressData.level);
        if (progressData.streak_days !== undefined) setStreakDays(progressData.streak_days);
        if (progressData.sound_enabled !== undefined) setSoundEnabled(progressData.sound_enabled);
      }

      // 2. Fetch completed lessons
      const { data: lessonsData } = await supabase
        .from('user_lessons')
        .select('lesson_id')
        .eq('user_id', user.id);

      if (lessonsData && lessonsData.length > 0) {
        setCompletedLessons(lessonsData.map((l) => l.lesson_id));
      }

      // 3. Fetch badges
      const { data: badgesData } = await supabase
        .from('user_badges')
        .select('badge_id, unlocked_at')
        .eq('user_id', user.id);

      if (badgesData && badgesData.length > 0) {
        const unlockedIds = new Map(badgesData.map((b) => [b.badge_id, b.unlocked_at]));
        setBadges((prev) =>
          prev.map((badge) => ({
            ...badge,
            isUnlocked: unlockedIds.has(badge.id) || badge.isUnlocked,
            unlockedAt: unlockedIds.get(badge.id) || badge.unlockedAt,
          }))
        );
      }
    } catch (e) {
      console.log('Supabase sync notice:', e);
    }
  };

  const addXp = (amount: number) => {
    setXp((prevXp) => {
      const newXp = prevXp + amount;
      const newLevel = Math.floor(newXp / 400) + 1;
      if (newLevel !== level) {
        setLevel(newLevel);
      }

      // Persist to Supabase if logged in
      if (user?.id && user.id !== 'usr_1') {
        supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            xp: newXp,
            level: newLevel,
            updated_at: new Date().toISOString(),
          })
          .then();
      }

      return newXp;
    });
  };

  const completeLesson = (lessonId: string, xpReward: number) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      addXp(xpReward);
      setTodayCompleted(true);

      // Persist to Supabase
      if (user?.id && user.id !== 'usr_1') {
        supabase
          .from('user_lessons')
          .insert({
            user_id: user.id,
            lesson_id: lessonId,
            completed_at: new Date().toISOString(),
          })
          .then();
      }
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const nextVal = !prev;
      if (user?.id && user.id !== 'usr_1') {
        supabase
          .from('user_progress')
          .update({ sound_enabled: nextVal })
          .eq('user_id', user.id)
          .then();
      }
      return nextVal;
    });
  };

  const claimDailyStreak = () => {
    if (!todayCompleted) {
      setTodayCompleted(true);
      const nextStreak = streakDays + 1;
      setStreakDays(nextStreak);
      addXp(50);

      if (user?.id && user.id !== 'usr_1') {
        supabase
          .from('user_progress')
          .update({
            streak_days: nextStreak,
            last_active_date: new Date().toISOString().split('T')[0],
          })
          .eq('user_id', user.id)
          .then();
      }
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
        syncWithSupabase,
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
