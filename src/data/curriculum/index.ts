import { Module, Lesson } from './types';
import { TIER1_MODULES } from './tier1_fundamentals';
import { TIER2_MODULES } from './tier2_intermediate';
import { TIER3_MODULES } from './tier3_oop_data';
import { TIER4_MODULES } from './tier4_async_modern';

export * from './types';

// The complete 20 modules (100 lessons total)
export const MODULES_DATA: Module[] = [
  ...TIER1_MODULES,
  ...TIER2_MODULES,
  ...TIER3_MODULES,
  ...TIER4_MODULES,
];

// Flat list of all 100 lessons from Lesson 1 to Lesson 100
export const ALL_LESSONS: Lesson[] = MODULES_DATA.flatMap((mod) => mod.lessons);

// Quick lookup helpers
export const getLessonById = (lessonId: string): Lesson | undefined => {
  return ALL_LESSONS.find((l) => l.id === lessonId);
};

export const getLessonByGlobalNumber = (num: number): Lesson | undefined => {
  return ALL_LESSONS.find((l) => l.globalNumber === num);
};

export const getModuleById = (moduleId: string): Module | undefined => {
  return MODULES_DATA.find((m) => m.id === moduleId);
};

export const searchCurriculum = (query: string): Lesson[] => {
  if (!query.trim()) return ALL_LESSONS;
  const q = query.toLowerCase();
  return ALL_LESSONS.filter(
    (l) =>
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q)
  );
};

