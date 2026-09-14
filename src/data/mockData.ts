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
  lessons: Lesson[];
}

export interface Game {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  category: string;
  isPro: boolean;
  questionsCount: number;
  xpReward: number;
  highScore: number;
  completedTimes: number;
  accentColor: string;
  questions: {
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

export const MODULES_DATA: Module[] = [
  {
    id: 'mod_1',
    number: 1,
    title: 'JavaScript Basics',
    description: 'Master variables, values, and primitive data types',
    icon: '⚡',
    totalLessons: 3,
    completedLessons: 3,
    isLocked: false,
    badgeColor: '#FACC15',
    lessons: [
      {
        id: 'm1_l1',
        moduleId: 'mod_1',
        number: 1,
        title: 'Welcome to JavaScript',
        description: 'What JavaScript is and how it runs in modern engines',
        durationMinutes: 3,
        xp: 20,
        isCompleted: true,
        isLocked: false,
        steps: [
          {
            id: 'm1_l1_s1',
            type: 'theory',
            title: 'What is JavaScript?',
            subtitle: 'THE FOUNDATION OF THE WEB',
            content: 'JavaScript is a high-level, dynamic programming language that powers interactive web pages, mobile apps, and servers.',
            codeSnippet: 'console.log("Hello, World!");',
            xpReward: 10,
          },
          {
            id: 'm1_l1_s2',
            type: 'quiz',
            title: 'Quick Check',
            question: 'Which method prints messages to the developer console?',
            options: ['print()', 'console.log()', 'echo()', 'display()'],
            correctAnswerIndex: 1,
            explanation: 'console.log() is used in JavaScript to print output to the debugging console.',
            xpReward: 10,
          },
        ],
      },
      {
        id: 'm1_l2',
        moduleId: 'mod_1',
        number: 2,
        title: 'Variables: let, const & var',
        description: 'How to declare and store data in containers',
        durationMinutes: 4,
        xp: 20,
        isCompleted: true,
        isLocked: false,
        steps: [
          {
            id: 'm1_l2_s1',
            type: 'theory',
            title: 'Variables in JavaScript',
            subtitle: 'MODULE 1 · LESSON 2',
            content: 'A variable is a container that stores a value. In modern JavaScript, we use let for reassignable values and const for immutable references.',
            codeSnippet: 'let score = 100;\nconst playerName = "Abdul";\nscore = 150; // Valid!\n// playerName = "Ali"; // Error!',
            xpReward: 10,
          },
          {
            id: 'm1_l2_s2',
            type: 'quiz',
            title: 'Variable Declaration Quiz',
            question: 'Which keyword should you use for values that will never change?',
            options: ['var', 'let', 'const', 'immutable'],
            correctAnswerIndex: 2,
            explanation: 'const creates a block-scoped constant whose value reference cannot be reassigned.',
            xpReward: 10,
          },
        ],
      },
      {
        id: 'm1_l3',
        moduleId: 'mod_1',
        number: 3,
        title: 'Data Types & Numbers',
        description: 'Strings, numbers, booleans, null and undefined',
        durationMinutes: 5,
        xp: 25,
        isCompleted: true,
        isLocked: false,
        steps: [
          {
            id: 'm1_l3_s1',
            type: 'theory',
            title: 'Primitive Types',
            subtitle: 'STRINGS & NUMBERS',
            content: 'JavaScript has 7 primitive data types. The most common are String, Number, Boolean, Null, and Undefined.',
            codeSnippet: 'const name = "JS0pro"; // string\nconst level = 4;        // number\nconst isAwesome = true; // boolean',
            xpReward: 15,
          },
          {
            id: 'm1_l3_s2',
            type: 'quiz',
            title: 'Type Checking Quiz',
            question: 'What is typeof "42" in JavaScript?',
            options: ['"number"', '"string"', '"integer"', '"boolean"'],
            correctAnswerIndex: 1,
            explanation: 'Values wrapped in quotes are always strings, even if they contain numbers.',
            xpReward: 10,
          },
        ],
      },
    ],
  },
  {
    id: 'mod_2',
    number: 2,
    title: 'Conditions & Control Flow',
    description: 'Branching logic with if/else, ternary and comparison operators',
    icon: '🔀',
    totalLessons: 4,
    completedLessons: 2,
    isLocked: false,
    badgeColor: '#3B82F6',
    lessons: [
      {
        id: 'm2_l1',
        moduleId: 'mod_2',
        number: 1,
        title: 'Comparison & Equality',
        description: 'Difference between == and === (strict equality)',
        durationMinutes: 4,
        xp: 20,
        isCompleted: true,
        isLocked: false,
        steps: [
          {
            id: 'm2_l1_s1',
            type: 'theory',
            title: 'Strict vs Loose Equality',
            subtitle: 'MODULE 2 · LESSON 1',
            content: 'Always prefer === (strict equality) because it checks both the value and the type, avoiding unexpected coercion bugs.',
            codeSnippet: '5 == "5"   // true  (type coerced)\n5 === "5"  // false (strictly typed)',
            xpReward: 10,
          },
          {
            id: 'm2_l1_s2',
            type: 'quiz',
            title: 'Equality Question',
            question: 'What does 10 === "10" evaluate to?',
            options: ['true', 'false', 'undefined', 'NaN'],
            correctAnswerIndex: 1,
            explanation: 'Because 10 is a number and "10" is a string, strict equality evaluates to false.',
            xpReward: 10,
          },
        ],
      },
      {
        id: 'm2_l2',
        moduleId: 'mod_2',
        number: 2,
        title: 'If, Else If & Else',
        description: 'Executing conditional code blocks based on truthy checks',
        durationMinutes: 5,
        xp: 25,
        isCompleted: true,
        isLocked: false,
        steps: [
          {
            id: 'm2_l2_s1',
            type: 'theory',
            title: 'Conditional Branching',
            subtitle: 'MODULE 2 · LESSON 2',
            content: 'Use if statements to run code when a condition evaluates to truthy. Use else as fallback.',
            codeSnippet: 'const xp = 1240;\nif (xp >= 1000) {\n  console.log("Level 4 Reached!");\n} else {\n  console.log("Keep practicing!");\n}',
            xpReward: 15,
          },
          {
            id: 'm2_l2_s2',
            type: 'quiz',
            title: 'Condition Quiz',
            question: 'Which value is considered falsy in JavaScript?',
            options: ['"0"', '[]', '0', '{}'],
            correctAnswerIndex: 2,
            explanation: 'The number 0 is falsy, while non-empty strings and objects/arrays are truthy.',
            xpReward: 10,
          },
        ],
      },
      {
        id: 'm2_l3',
        moduleId: 'mod_2',
        number: 3,
        title: 'Ternary Operator & Shortcuts',
        description: 'Clean inline conditionals with ? : and logical operators',
        durationMinutes: 5,
        xp: 25,
        isCompleted: false,
        isLocked: false,
        steps: [
          {
            id: 'm2_l3_s1',
            type: 'theory',
            title: 'The Ternary Operator',
            subtitle: 'MODULE 2 · LESSON 3',
            content: 'The conditional (ternary) operator is the only JavaScript operator that takes three operands: condition ? exprIfTrue : exprIfFalse.',
            codeSnippet: 'const isMember = true;\nconst discount = isMember ? 20 : 0;\nconsole.log(discount); // 20',
            xpReward: 15,
          },
          {
            id: 'm2_l3_s2',
            type: 'quiz',
            title: 'Ternary Challenge',
            question: 'What is the output of: const x = 5 > 3 ? "yes" : "no"?',
            options: ['"no"', '"yes"', 'true', 'undefined'],
            correctAnswerIndex: 1,
            explanation: '5 > 3 evaluates to true, so "yes" is returned.',
            xpReward: 10,
          },
        ],
      },
      {
        id: 'm2_l4',
        moduleId: 'mod_2',
        number: 4,
        title: 'Switch Statements',
        description: 'Handling multiple discrete branches gracefully',
        durationMinutes: 4,
        xp: 20,
        isCompleted: false,
        isLocked: false,
        steps: [
          {
            id: 'm2_l4_s1',
            type: 'theory',
            title: 'Switch Case',
            subtitle: 'MODULE 2 · LESSON 4',
            content: 'A switch statement evaluates an expression and matches against multiple case clauses.',
            codeSnippet: 'switch (role) {\n  case "admin": grantAll(); break;\n  default: grantUser();\n}',
            xpReward: 10,
          },
          {
            id: 'm2_l4_s2',
            type: 'quiz',
            title: 'Switch Keyword',
            question: 'What statement is required to prevent falling through to subsequent cases?',
            options: ['stop', 'exit', 'break', 'return'],
            correctAnswerIndex: 2,
            explanation: 'The break statement prevents execution from running into the next case.',
            xpReward: 10,
          },
        ],
      },
    ],
  },
  {
    id: 'mod_3',
    number: 3,
    title: 'Functions & Arrow Syntax',
    description: 'Reusable code blocks, parameters, return values & arrow functions',
    icon: '🚀',
    totalLessons: 4,
    completedLessons: 0,
    isLocked: false,
    badgeColor: '#10B981',
    lessons: [
      {
        id: 'm3_l1',
        moduleId: 'mod_3',
        number: 1,
        title: 'Declaring Functions',
        description: 'Function declarations vs expressions',
        durationMinutes: 5,
        xp: 25,
        isCompleted: false,
        isLocked: false,
        steps: [
          {
            id: 'm3_l1_s1',
            type: 'theory',
            title: 'Function Syntax',
            subtitle: 'MODULE 3 · LESSON 1',
            content: 'Functions allow you to bundle reusable logic and call it anywhere.',
            codeSnippet: 'function add(a, b) {\n  return a + b;\n}\nconst sum = add(4, 5); // 9',
            xpReward: 15,
          },
          {
            id: 'm3_l1_s2',
            type: 'quiz',
            title: 'Return Value',
            question: 'What does a function return if no return statement is specified?',
            options: ['null', '0', 'undefined', 'false'],
            correctAnswerIndex: 2,
            explanation: 'Functions return undefined by default if they finish without an explicit return statement.',
            xpReward: 10,
          },
        ],
      },
      {
        id: 'm3_l2',
        moduleId: 'mod_3',
        number: 2,
        title: 'Arrow Functions =>',
        description: 'Modern concise syntax for writing functions',
        durationMinutes: 4,
        xp: 20,
        isCompleted: false,
        isLocked: false,
        steps: [],
      },
    ],
  },
  {
    id: 'mod_4',
    number: 4,
    title: 'Arrays & Modern Methods',
    description: 'map, filter, reduce, find, and array destruction',
    icon: '📊',
    totalLessons: 5,
    completedLessons: 0,
    isLocked: true,
    badgeColor: '#8B5CF6',
    lessons: [],
  },
  {
    id: 'mod_5',
    number: 5,
    title: 'Objects & Prototypal Magic',
    description: 'Key-value maps, methods, this context, and classes',
    icon: '🔮',
    totalLessons: 4,
    completedLessons: 0,
    isLocked: true,
    badgeColor: '#EC4899',
    lessons: [],
  },
];

export const GAMES_DATA: Game[] = [
  {
    id: 'game_1',
    title: 'Variables Rush',
    subtitle: 'Free Game · Speed Quiz',
    description: 'Match variable keywords, types and scope under time pressure!',
    icon: '⚡',
    category: 'Fundamentals',
    isPro: false,
    questionsCount: 5,
    xpReward: 50,
    highScore: 850,
    completedTimes: 3,
    accentColor: '#FACC15',
    questions: [
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
    ],
  },
  {
    id: 'game_2',
    title: 'Bug Hunter',
    subtitle: 'Free Game · Code Inspection',
    description: 'Spot syntax errors and logical traps before the timer runs out.',
    icon: '🐛',
    category: 'Debugging',
    isPro: false,
    questionsCount: 5,
    xpReward: 60,
    highScore: 720,
    completedTimes: 1,
    accentColor: '#22C55E',
    questions: [
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
    ],
  },
  {
    id: 'game_3',
    title: 'Array Master',
    subtitle: 'Pro Game · Transformations',
    description: 'Chain map, filter, and reduce to solve high-intensity code puzzles.',
    icon: '👑',
    category: 'Algorithms',
    isPro: true,
    questionsCount: 10,
    xpReward: 120,
    highScore: 0,
    completedTimes: 0,
    accentColor: '#A855F7',
    questions: [],
  },
  {
    id: 'game_4',
    title: 'Async Arena',
    subtitle: 'Pro Game · Event Loop',
    description: 'Master microtasks, macrotasks, Promises, and the JavaScript Event Loop.',
    icon: '⚡',
    category: 'Advanced',
    isPro: true,
    questionsCount: 10,
    xpReward: 150,
    highScore: 0,
    completedTimes: 0,
    accentColor: '#EC4899',
    questions: [],
  },
];

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

