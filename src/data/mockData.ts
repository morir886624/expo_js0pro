export * from './curriculum';
export * from './animalGamesData';
import { ANIMAL_GAMES_COLLECTION, AnimalGame } from './animalGamesData';

export interface Game extends Partial<AnimalGame> {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  category: string;
  isPro: boolean;
  questionsCount?: number;
  xpReward: number;
  highScore: number;
  completedTimes: number;
  accentColor: string;
  questions?: {
    id: string;
    question: string;
    code?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  isRead: boolean;
  category: 'xp' | 'lesson' | 'streak' | 'achievement';
}

const VARIABLES_QUESTIONS = [
  {
    id: 'g1_q1',
    question: 'What is the output of: let a = 5; let b = a; b = 10; console.log(a)?',
    options: ['10', '5', 'undefined', 'NaN'],
    correctIndex: 1,
    explanation: 'Primitive numbers are copied by value, so changing b does not modify a.',
  },
  {
    id: 'g1_q2',
    question: 'Can you re-assign a variable declared with const?',
    options: ['Yes, always', 'No, never', 'Only in strict mode', 'Only inside functions'],
    correctIndex: 1,
    explanation: 'const identifiers cannot be reassigned.',
  },
  {
    id: 'g1_q3',
    question: 'Which keyword creates function-scoped variables?',
    options: ['let', 'const', 'var', 'static'],
    correctIndex: 2,
    explanation: 'var is function-scoped (or globally scoped), not block-scoped.',
  },
  {
    id: 'g1_q4',
    question: 'What will typeof NaN return?',
    options: ['"NaN"', '"undefined"', '"number"', '"object"'],
    correctIndex: 2,
    explanation: 'In JavaScript, NaN stands for Not-a-Number, but its type is technically "number"!',
  },
  {
    id: 'g1_q5',
    question: 'What is the value of Boolean("")?',
    options: ['true', 'false', 'null', 'undefined'],
    correctIndex: 1,
    explanation: 'An empty string is falsy in JavaScript.',
  },
];

const BUG_HUNTER_QUESTIONS = [
  {
    id: 'g2_q1',
    question: 'Find the bug in this snippet:',
    code: 'const count = 0;\ncount++;\nconsole.log(count);',
    options: [
      'console.log is misnamed',
      'Attempted reassignment of const variable',
      'Missing semicolon on line 1',
      'count++ is not valid in JS',
    ],
    correctIndex: 1,
    explanation: 'count++ attempts to reassign a const variable, causing a TypeError.',
  },
  {
    id: 'g2_q2',
    question: 'What does this expression return?',
    code: '[1, 2, 3] + [4, 5, 6]',
    options: ['[1, 2, 3, 4, 5, 6]', '"1,2,34,5,6"', 'NaN', 'TypeError'],
    correctIndex: 1,
    explanation: 'Arrays are coerced into strings when using the + operator: "1,2,3" + "4,5,6".',
  },
  {
    id: 'g2_q3',
    question: 'What is printed to the console?',
    code: 'console.log(0.1 + 0.2 === 0.3);',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctIndex: 1,
    explanation: 'Due to IEEE 754 floating point arithmetic, 0.1 + 0.2 equals 0.30000000000000004.',
  },
];

export const GAMES_DATA: Game[] = ANIMAL_GAMES_COLLECTION.map((g) => {
  if (g.id === 'game_variables_rush') {
    return { ...g, questions: VARIABLES_QUESTIONS, questionsCount: 5 };
  }
  if (g.id === 'game_bug_hunter') {
    return { ...g, questions: BUG_HUNTER_QUESTIONS, questionsCount: 3 };
  }
  return { ...g, questions: g.questions || [] };
});

export const NOTIFICATIONS_DATA: AppNotification[] = [
  {
    id: 'notif_1',
    title: '+50 XP earned!',
    message: 'You completed the daily challenge. Keep it up!',
    time: '5 minutes ago',
    icon: '🎉',
    isRead: false,
    category: 'xp',
  },
  {
    id: 'notif_2',
    title: 'New lesson unlocked!',
    message: 'Lesson 3 — Multiple conditions is now available in Module 2.',
    time: '1 hour ago',
    icon: '🔓',
    isRead: false,
    category: 'lesson',
  },
  {
    id: 'notif_3',
    title: '🔥 7-Day Streak!',
    message: 'You achieved the "On Fire" badge! Keep your momentum going.',
    time: 'Yesterday',
    icon: '🔥',
    isRead: true,
    category: 'streak',
  },
  {
    id: 'notif_4',
    title: 'Welcome to JS0pro',
    message: 'Start your journey to become a JavaScript pro today!',
    time: '3 days ago',
    icon: '👋',
    isRead: true,
    category: 'achievement',
  },
];

