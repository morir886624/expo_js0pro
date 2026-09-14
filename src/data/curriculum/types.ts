export interface LessonStep {
  id: string;
  type: 'theory' | 'quiz';
  title: string;
  subtitle?: string;
  content?: string;
  codeSnippet?: string;
  explanation?: string;
  question?: string;
  options?: string[];
  correctAnswerIndex?: number;
  xpReward: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  number: number;
  globalNumber: number; // 1 to 100
  title: string;
  description: string;
  durationMinutes: number;
  xp: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  steps: LessonStep[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  totalLessons: number;
  completedLessons: number;
  isLocked: boolean;
  badgeColor: string;
  tier: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  lessons: Lesson[];
}

