// Type definitions and complete level data for 100% Pure JavaScript Animal Coding Games
// Covering the curriculum from Lesson 0 to 100 (Tier 1 to Tier 4)

export type GameType =
  | 'froggy_js'
  | 'array_rescue'
  | 'object_safari'
  | 'conditional_quest'
  | 'loop_hive'
  | 'async_race'
  | 'quiz';

export interface FroggyJSTarget {
  id: string;
  species: string; // e.g., 'frog', 'duck', 'turtle'
  emoji: string;
  name: string;
  targetIndex: number; // 0-indexed lilypad target position (0 to 4)
  targetEmoji: string;
  targetLabel: string;
}

export interface FroggyJSLevel {
  id: number;
  title: string;
  description: string;
  instructions: string;
  totalPads: number; // usually 5 lilypads across the pond
  animals: FroggyJSTarget[];
  contextVars: Record<string, any>;
  expectedSnippet: string; // The canonical JavaScript expression/call
  initialCode: string;
  suggestedTokens: string[];
  curriculumModule: string;
  hint: string;
  mdnDoc: string;
  validate: (code: string) => { isSuccess: boolean; targetPositions: number[]; message: string };
}

export interface ArrayAnimal {
  id: string;
  species: string;
  emoji: string;
  name: string;
  age: number;
  health: number;
  habitat: string;
  hungry: boolean;
  speed: number;
}

export interface ArrayRescueLevel {
  id: number;
  title: string;
  description: string;
  instructions: string;
  initialAnimals: ArrayAnimal[];
  taskType: 'filter' | 'map' | 'slice' | 'find' | 'sort';
  expectedMethod: string;
  initialCode: string;
  suggestedTokens: string[];
  validate: (code: string) => { isSuccess: boolean; resultingAnimals: ArrayAnimal[]; message: string };
  curriculumModule: string;
  hint: string;
}

export interface ObjectSafariLevel {
  id: number;
  title: string;
  description: string;
  instructions: string;
  animalObj: Record<string, any>;
  expectedSnippet: string;
  initialCode: string;
  suggestedTokens: string[];
  curriculumModule: string;
  hint: string;
  validate: (code: string) => { isSuccess: boolean; outputText: string; message: string };
}

export interface ConditionalLevel {
  id: number;
  title: string;
  animal: { emoji: string; name: string };
  goal: { emoji: string; name: string };
  scenarioDescription: string;
  contextVariables: Record<string, any>;
  targetExpression: string; // The correct boolean expression
  initialCode: string;
  suggestedTokens: string[];
  curriculumModule: string;
  hint: string;
}

export interface LoopLevel {
  id: number;
  title: string;
  animal: { emoji: string; name: string };
  targetItem: { emoji: string; name: string };
  count: number;
  initialCode: string;
  suggestedTokens: string[];
  correctLoopKind: 'for' | 'while' | 'repeat';
  curriculumModule: string;
  hint: string;
}

export interface AsyncLevel {
  id: number;
  title: string;
  description: string;
  racers: { emoji: string; name: string; type: 'sync' | 'microtask' | 'macrotask' | 'async_await' }[];
  expectedArrivalOrder: string[]; // e.g. ['Cheetah', 'Falcon', 'Hare', 'Turtle']
  snippet: string;
  options: string[][];
  correctIndex: number;
  curriculumModule: string;
  hint: string;
}

export interface AnimalGame {
  id: string;
  gameType: GameType;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  mascots: string[];
  category: string;
  curriculumModulesTag: string;
  isPro: boolean;
  totalLevels: number;
  xpReward: number;
  highScore: number;
  completedTimes: number;
  accentColor: string;
  badgeLabel: string;
  froggyLevels?: FroggyJSLevel[];
  arrayRescueLevels?: ArrayRescueLevel[];
  objectSafariLevels?: ObjectSafariLevel[];
  conditionalLevels?: ConditionalLevel[];
  loopLevels?: LoopLevel[];
  asyncLevels?: AsyncLevel[];
  questions?: any[]; // For rapid speed quiz mode
}

// --------------------------------------------------------------------------------
// 1. FROGGY JS LEVELS (Pure JavaScript Method Calls, Math, Coordinates & Arrays)
// --------------------------------------------------------------------------------
export const FROGGY_JS_LEVELS: FroggyJSLevel[] = [
  {
    id: 1,
    title: 'Leap 1: Method Call with Parameter',
    description: 'Call the frog method `hop(3)` to leap 3 lilypads forward onto pad #3.',
    instructions: 'Invoke the method `frog.hop(3)` to advance the frog to the target lilypad.',
    totalPads: 5,
    animals: [
      { id: 'f1', species: 'frog', emoji: '🐸', name: 'Froggy', targetIndex: 3, targetEmoji: '🟢', targetLabel: 'Pad #3' },
    ],
    contextVars: { startPad: 0, targetPad: 3 },
    expectedSnippet: 'frog.hop(3)',
    initialCode: 'frog.hop(',
    suggestedTokens: ['3)', '2)', '4)', '1)'],
    curriculumModule: 'Tier 1 Module 1: Calling Functions & Methods',
    hint: 'Methods are invoked using dot syntax followed by parentheses and arguments: `frog.hop(3)`.',
    mdnDoc: 'MDN: Calling functions and methods with parameters',
    validate: (code: string) => {
      const match = code.includes('3');
      return {
        isSuccess: match,
        targetPositions: match ? [3] : [0],
        message: match ? 'Froggy leaped 3 pads straight onto the green lilypad!' : 'Try frog.hop(3) to reach pad 3.',
      };
    },
  },
  {
    id: 2,
    title: 'Leap 2: 0-Indexed Lilypad Jump',
    description: 'In JavaScript, array indexing starts at 0. Send the duckling 🦆 to `lilypads[1]`.',
    instructions: 'Call `duck.jumpTo(lilypads[1])` to land on the second lilypad.',
    totalPads: 5,
    animals: [
      { id: 'd1', species: 'duck', emoji: '🦆', name: 'Duckling', targetIndex: 1, targetEmoji: '🟡', targetLabel: 'Pad #1' },
    ],
    contextVars: { lilypads: ['pad0', 'pad1', 'pad2', 'pad3', 'pad4'] },
    expectedSnippet: 'duck.jumpTo(lilypads[1])',
    initialCode: 'duck.jumpTo(lilypads[',
    suggestedTokens: ['1])', '2])', '0])', '3])'],
    curriculumModule: 'Tier 1 Module 2 & Tier 2 Module 7: Zero-Indexed Arrays',
    hint: 'The first element is at index 0, so the second element is at index 1: `lilypads[1]`.',
    mdnDoc: 'MDN: Accessing array elements using indices',
    validate: (code: string) => {
      const match = code.includes('1');
      return {
        isSuccess: match,
        targetPositions: match ? [1] : [0],
        message: match ? 'Duckling landed perfectly on lilypads[1]!' : 'Remember: 0 is first, 1 is second.',
      };
    },
  },
  {
    id: 3,
    title: 'Leap 3: Arithmetic Expression in Arguments',
    description: 'Calculate jump distance: Froggy has energy = 40. Calculate `frog.hop(energy / 10)`.',
    instructions: 'Use the expression `frog.hop(energy / 10)` which evaluates to 4.',
    totalPads: 5,
    animals: [
      { id: 'f1', species: 'frog', emoji: '🐸', name: 'Froggy', targetIndex: 4, targetEmoji: '🟢', targetLabel: 'Pad #4' },
    ],
    contextVars: { energy: 40 },
    expectedSnippet: 'frog.hop(energy / 10)',
    initialCode: 'frog.hop(energy ',
    suggestedTokens: ['/ 10)', '* 10)', '+ 10)', '- 10)'],
    curriculumModule: 'Tier 1 Module 3: Expressions & Arithmetic Operators',
    hint: 'You can pass any valid JavaScript math expression inside method arguments.',
    mdnDoc: 'MDN: Arithmetic division operator (/)',
    validate: (code: string) => {
      const match = code.includes('/ 10') || code.includes('/10');
      return {
        isSuccess: match,
        targetPositions: match ? [4] : [0],
        message: match ? '40 / 10 = 4! Froggy launched all the way to pad 4!' : 'Divide energy (40) by 10.',
      };
    },
  },
  {
    id: 4,
    title: 'Leap 4: Built-in Math.max()',
    description: 'Use the standard JavaScript `Math.max(2, 4)` function to calculate the highest leap.',
    instructions: 'Execute `frog.hop(Math.max(2, 4))` to land on pad #4.',
    totalPads: 5,
    animals: [
      { id: 'f1', species: 'frog', emoji: '🐸', name: 'Froggy', targetIndex: 4, targetEmoji: '🟢', targetLabel: 'Pad #4' },
    ],
    contextVars: { options: [2, 4] },
    expectedSnippet: 'frog.hop(Math.max(2, 4))',
    initialCode: 'frog.hop(Math.',
    suggestedTokens: ['max(2, 4))', 'min(2, 4))', 'round(2.4))', 'floor(4.9))'],
    curriculumModule: 'Tier 1 Module 3: The JavaScript Math Object',
    hint: '`Math.max(a, b)` returns the largest of zero or more numbers.',
    mdnDoc: 'MDN: Math.max() static method',
    validate: (code: string) => {
      const match = code.includes('max');
      return {
        isSuccess: match,
        targetPositions: match ? [4] : [0],
        message: match ? 'Math.max(2, 4) returned 4! Target reached!' : 'Use Math.max(2, 4) to get 4.',
      };
    },
  },
  {
    id: 5,
    title: 'Leap 5: Centering with Math.floor()',
    description: 'Calculate the middle lilypad index using `Math.floor(totalPads / 2)` (5 / 2 = 2.5 -> 2).',
    instructions: 'Call `turtle.jumpTo(lilypads[Math.floor(5 / 2)])`.',
    totalPads: 5,
    animals: [
      { id: 't1', species: 'turtle', emoji: '🐢', name: 'Shelly', targetIndex: 2, targetEmoji: '🏝️', targetLabel: 'Pad #2' },
    ],
    contextVars: { totalPads: 5 },
    expectedSnippet: 'turtle.jumpTo(lilypads[Math.floor(5 / 2)])',
    initialCode: 'turtle.jumpTo(lilypads[Math.',
    suggestedTokens: ['floor(5 / 2)])', 'ceil(5 / 2)])', 'round(5 / 3)])', 'abs(5)])'],
    curriculumModule: 'Tier 1 Module 3: Math.floor() & Rounding',
    hint: '`Math.floor()` rounds a number downward to the nearest whole integer.',
    mdnDoc: 'MDN: Math.floor()',
    validate: (code: string) => {
      const match = code.includes('floor');
      return {
        isSuccess: match,
        targetPositions: match ? [2] : [0],
        message: match ? 'Math.floor(2.5) evaluates to 2! Shelly reached the center pad!' : 'Use Math.floor.',
      };
    },
  },
  {
    id: 6,
    title: 'Leap 6: Arrow Function Callback',
    description: 'Define an arrow function `(step) => frog.hop(step * 2)` and invoke it with `2`.',
    instructions: 'Call `((step) => frog.hop(step * 2))(2)` to advance 4 pads.',
    totalPads: 5,
    animals: [
      { id: 'f1', species: 'frog', emoji: '🐸', name: 'Froggy', targetIndex: 4, targetEmoji: '🟢', targetLabel: 'Pad #4' },
    ],
    contextVars: {},
    expectedSnippet: '((step) => frog.hop(step * 2))(2)',
    initialCode: '((step) => frog.hop(',
    suggestedTokens: ['step * 2))(2)', 'step + 1))(2)', 'step * 1))(4)', '2))(2)'],
    curriculumModule: 'Tier 2 Module 6: ES6 Arrow Functions',
    hint: 'Arrow functions provide concise syntax: `(param) => expression`.',
    mdnDoc: 'MDN: Arrow function expressions',
    validate: (code: string) => {
      const match = code.includes('step * 2') || code.includes('step*2');
      return {
        isSuccess: match,
        targetPositions: match ? [4] : [0],
        message: match ? 'Arrow function executed: 2 * 2 = 4!' : 'Use step * 2 to calculate distance.',
      };
    },
  },
  {
    id: 7,
    title: 'Leap 7: Dynamic Last Index Access',
    description: 'In JavaScript arrays, access the last item with `array[array.length - 1]`.',
    instructions: 'Pass `lilypads[lilypads.length - 1]` to send Duckling to the last pad.',
    totalPads: 5,
    animals: [
      { id: 'd1', species: 'duck', emoji: '🦆', name: 'Duckling', targetIndex: 4, targetEmoji: '🟡', targetLabel: 'Pad #4' },
    ],
    contextVars: { length: 5 },
    expectedSnippet: 'duck.jumpTo(lilypads[lilypads.length - 1])',
    initialCode: 'duck.jumpTo(lilypads[lilypads.length - ',
    suggestedTokens: ['1])', '2])', '0])', '3])'],
    curriculumModule: 'Tier 2 Module 7: Array.prototype.length',
    hint: 'Since arrays are 0-indexed, the last element is always at `length - 1`.',
    mdnDoc: 'MDN: Accessing the last element of an array',
    validate: (code: string) => {
      const match = code.includes('1');
      return {
        isSuccess: match,
        targetPositions: match ? [4] : [0],
        message: match ? 'Duckling landed on the final pad using length - 1!' : 'Subtract 1 from length.',
      };
    },
  },
  {
    id: 8,
    title: 'Leap 8: Multi-Animal forEach Iteration',
    description: 'Iterate over an array of frogs using `frogs.forEach(f => f.hop(2))` so both leap to pad #2!',
    instructions: 'Apply `frogs.forEach(f => f.hop(2))` to leap all frogs at once.',
    totalPads: 5,
    animals: [
      { id: 'f1', species: 'frog', emoji: '🐸', name: 'Froggy A', targetIndex: 2, targetEmoji: '🟢', targetLabel: 'Pad #2' },
      { id: 'f2', species: 'frog', emoji: '🐸', name: 'Froggy B', targetIndex: 2, targetEmoji: '🟢', targetLabel: 'Pad #2' },
    ],
    contextVars: { count: 2 },
    expectedSnippet: 'frogs.forEach(f => f.hop(2))',
    initialCode: 'frogs.forEach(f => f.',
    suggestedTokens: ['hop(2))', 'hop(3))', 'jumpTo(1))', 'hop(4))'],
    curriculumModule: 'Tier 3 Module 11: Array.prototype.forEach()',
    hint: '`forEach()` executes a provided function once for each array element.',
    mdnDoc: 'MDN: Array.prototype.forEach()',
    validate: (code: string) => {
      const match = code.includes('hop(2)');
      return {
        isSuccess: match,
        targetPositions: match ? [2, 2] : [0, 0],
        message: match ? 'Both frogs executed f.hop(2) and landed together!' : 'Use f.hop(2).',
      };
    },
  },
  {
    id: 9,
    title: 'Leap 9: Array.prototype.find()',
    description: 'Find the target lilypad matching `{ color: "gold" }` using `lilypads.find(p => p.color === "gold")`.',
    instructions: 'Find the pad with `p.color === "gold"`.',
    totalPads: 5,
    animals: [
      { id: 't1', species: 'turtle', emoji: '🐢', name: 'Shelly', targetIndex: 3, targetEmoji: '⭐', targetLabel: 'Pad #3' },
    ],
    contextVars: { pads: ['green', 'green', 'green', 'gold', 'green'] },
    expectedSnippet: 'lilypads.find(p => p.color === "gold")',
    initialCode: 'lilypads.find(p => p.color === ',
    suggestedTokens: ['"gold")', '"green")', '"blue")', 'null)'],
    curriculumModule: 'Tier 3 Module 11: Array.prototype.find()',
    hint: '`find()` returns the first element that satisfies the provided testing function.',
    mdnDoc: 'MDN: Array.prototype.find()',
    validate: (code: string) => {
      const match = code.includes('gold');
      return {
        isSuccess: match,
        targetPositions: match ? [3] : [0],
        message: match ? 'Shelly found the gold pad and navigated directly to it!' : 'Search for "gold".',
      };
    },
  },
  {
    id: 10,
    title: 'Leap 10: Array Destructuring with Rest',
    description: 'Unpack the target pads array using rest syntax: `const [first, ...rest] = pads`. Jump to `rest[2]`.',
    instructions: 'Select `rest[2]` to jump to pad index 3.',
    totalPads: 5,
    animals: [
      { id: 'f1', species: 'frog', emoji: '🐸', name: 'Froggy', targetIndex: 3, targetEmoji: '🟢', targetLabel: 'Pad #3' },
    ],
    contextVars: {},
    expectedSnippet: 'frog.jumpTo(rest[2])',
    initialCode: 'frog.jumpTo(rest[',
    suggestedTokens: ['2])', '1])', '0])', '3])'],
    curriculumModule: 'Tier 2 Module 9: Array Destructuring & Rest Parameter',
    hint: 'The rest element `...rest` contains all elements after `first`. Index 2 in rest is index 3 in the original array.',
    mdnDoc: 'MDN: Destructuring assignment - Rest property',
    validate: (code: string) => {
      const match = code.includes('2');
      return {
        isSuccess: match,
        targetPositions: match ? [3] : [0],
        message: match ? 'Rest element rest[2] correctly resolved to pad 3!' : 'Select rest[2].',
      };
    },
  },
  {
    id: 11,
    title: 'Leap 11: Logical Nullish Coalescing (??)',
    description: 'Use the modern `??` operator: `frog.hop(frog.customStep ?? 3)`. Since customStep is null, fallback is 3!',
    instructions: 'Provide fallback value with `?? 3`.',
    totalPads: 5,
    animals: [
      { id: 'f1', species: 'frog', emoji: '🐸', name: 'Froggy', targetIndex: 3, targetEmoji: '🟢', targetLabel: 'Pad #3' },
    ],
    contextVars: { customStep: null },
    expectedSnippet: 'frog.hop(frog.customStep ?? 3)',
    initialCode: 'frog.hop(frog.customStep ?? ',
    suggestedTokens: ['3)', '2)', '0)', '1)'],
    curriculumModule: 'Tier 4 Module 20: Nullish Coalescing Operator (??)',
    hint: 'The `??` operator returns its right-hand operand when its left-hand operand is null or undefined.',
    mdnDoc: 'MDN: Nullish coalescing operator',
    validate: (code: string) => {
      const match = code.includes('3');
      return {
        isSuccess: match,
        targetPositions: match ? [3] : [0],
        message: match ? 'Nullish coalescing returned 3! Pad #3 reached!' : 'Use ?? 3 for fallback.',
      };
    },
  },
  {
    id: 12,
    title: 'Leap 12: Higher-Order Chaining Mastery',
    description: 'Filter awake frogs and map them to their target lilypads: `frogs.filter(f => f.awake).forEach(f => f.hop(4))`.',
    instructions: 'Chain `.filter(f => f.awake).forEach(f => f.hop(4))`.',
    totalPads: 5,
    animals: [
      { id: 'f1', species: 'frog', emoji: '🐸', name: 'Goliath', targetIndex: 4, targetEmoji: '🟢', targetLabel: 'Pad #4' },
    ],
    contextVars: { awake: true },
    expectedSnippet: 'frogs.filter(f => f.awake).forEach(f => f.hop(4))',
    initialCode: 'frogs.filter(f => f.awake).forEach(f => f.',
    suggestedTokens: ['hop(4))', 'hop(2))', 'sleep())', 'hop(1))'],
    curriculumModule: 'Tier 3 Module 11: Method Chaining in JavaScript',
    hint: 'Chaining array methods allows clean, readable data transformations.',
    mdnDoc: 'MDN: Method chaining in JavaScript',
    validate: (code: string) => {
      const match = code.includes('hop(4)');
      return {
        isSuccess: match,
        targetPositions: match ? [4] : [0],
        message: match ? 'Mastery! The filtered frog hopped 4 pads onto the golden lilypad! 🏆' : 'Use f.hop(4).',
      };
    },
  },
];

// --------------------------------------------------------------------------------
// 2. ARRAY ZOO RESCUE LEVELS (Array Methods: filter, map, slice, find, sort)
// --------------------------------------------------------------------------------
export const ARRAY_RESCUE_LEVELS: ArrayRescueLevel[] = [
  {
    id: 1,
    title: 'Mission 1: Rescue the Hungry Critters',
    description: 'Filter the sanctuary array to find animals where hungry is true.',
    instructions: 'Complete the filter predicate: `animals.filter(a => a.hungry)`.',
    initialAnimals: [
      { id: 'p1', species: 'panda', emoji: '🐼', name: 'Bao', age: 4, health: 90, habitat: 'jungle', hungry: true, speed: 20 },
      { id: 'l1', species: 'lion', emoji: '🦁', name: 'Leo', age: 7, health: 85, habitat: 'savannah', hungry: false, speed: 60 },
      { id: 'k1', species: 'koala', emoji: '🐨', name: 'Kip', age: 2, health: 95, habitat: 'jungle', hungry: true, speed: 10 },
      { id: 'e1', species: 'elephant', emoji: '🐘', name: 'Ellie', age: 12, health: 99, habitat: 'savannah', hungry: false, speed: 30 },
    ],
    taskType: 'filter',
    expectedMethod: 'filter',
    initialCode: 'animals.filter(a => a.',
    suggestedTokens: ['hungry', 'health > 80', 'age < 5', '!hungry'],
    validate: (code: string) => {
      const isMatch = code.includes('hungry') && !code.includes('!hungry') && !code.includes('false');
      const resulting = isMatch
        ? [
            { id: 'p1', species: 'panda', emoji: '🐼', name: 'Bao', age: 4, health: 90, habitat: 'jungle', hungry: true, speed: 20 },
            { id: 'k1', species: 'koala', emoji: '🐨', name: 'Kip', age: 2, health: 95, habitat: 'jungle', hungry: true, speed: 10 },
          ]
        : [];
      return {
        isSuccess: isMatch,
        resultingAnimals: resulting,
        message: isMatch ? 'Panda Bao 🐼 and Koala Kip 🐨 rescued for lunchtime!' : 'Check condition: we need hungry animals!',
      };
    },
    curriculumModule: 'Tier 3 Module 11: Array.prototype.filter()',
    hint: '`animals.filter(a => a.hungry)` tests each animal and keeps only those where hungry is true.',
  },
  {
    id: 2,
    title: 'Mission 2: Jungle Habitat Relocation',
    description: 'Select all animals that belong to the "jungle" habitat for tree planting.',
    instructions: 'Filter animals matching `habitat === "jungle"`.',
    initialAnimals: [
      { id: 'p1', species: 'panda', emoji: '🐼', name: 'Bao', age: 4, health: 90, habitat: 'jungle', hungry: false, speed: 20 },
      { id: 't1', species: 'tiger', emoji: '🐯', name: 'Shere', age: 5, health: 88, habitat: 'jungle', hungry: true, speed: 55 },
      { id: 'l1', species: 'lion', emoji: '🦁', name: 'Leo', age: 7, health: 85, habitat: 'savannah', hungry: false, speed: 60 },
      { id: 'g1', species: 'giraffe', emoji: '🦒', name: 'Gerry', age: 6, health: 92, habitat: 'savannah', hungry: false, speed: 45 },
    ],
    taskType: 'filter',
    expectedMethod: 'filter',
    initialCode: 'animals.filter(a => a.habitat === ',
    suggestedTokens: ['"jungle"', '"savannah"', '"arctic"', 'a.age > 3'],
    validate: (code: string) => {
      const isMatch = code.includes('jungle');
      const resulting = isMatch
        ? [
            { id: 'p1', species: 'panda', emoji: '🐼', name: 'Bao', age: 4, health: 90, habitat: 'jungle', hungry: false, speed: 20 },
            { id: 't1', species: 'tiger', emoji: '🐯', name: 'Shere', age: 5, health: 88, habitat: 'jungle', hungry: true, speed: 55 },
          ]
        : [];
      return {
        isSuccess: isMatch,
        resultingAnimals: resulting,
        message: isMatch ? 'Bao 🐼 and Shere 🐯 moved into the lush jungle!' : 'Check habitat: select "jungle".',
      };
    },
    curriculumModule: 'Tier 2 Module 7: Array Filtering',
    hint: 'Use `a.habitat === "jungle"` inside the filter callback.',
  },
  {
    id: 3,
    title: 'Mission 3: Fast Explorers First with .slice()',
    description: 'Take the first 2 animals from the front of the lineup using slice.',
    instructions: 'Use `animals.slice(0, 2)` to extract the scouting pair.',
    initialAnimals: [
      { id: 't1', species: 'tiger', emoji: '🐯', name: 'Shere', age: 5, health: 88, habitat: 'jungle', hungry: false, speed: 55 },
      { id: 'l1', species: 'lion', emoji: '🦁', name: 'Leo', age: 7, health: 85, habitat: 'savannah', hungry: false, speed: 60 },
      { id: 'p1', species: 'panda', emoji: '🐼', name: 'Bao', age: 4, health: 90, habitat: 'jungle', hungry: false, speed: 20 },
      { id: 'e1', species: 'elephant', emoji: '🐘', name: 'Ellie', age: 12, health: 99, habitat: 'savannah', hungry: false, speed: 30 },
    ],
    taskType: 'slice',
    expectedMethod: 'slice',
    initialCode: 'animals.slice(',
    suggestedTokens: ['0, 2', '1, 3', '2', '0, 1'],
    validate: (code: string) => {
      const isMatch = code.includes('0, 2') || code.includes('0,2');
      const resulting = isMatch
        ? [
            { id: 't1', species: 'tiger', emoji: '🐯', name: 'Shere', age: 5, health: 88, habitat: 'jungle', hungry: false, speed: 55 },
            { id: 'l1', species: 'lion', emoji: '🦁', name: 'Leo', age: 7, health: 85, habitat: 'savannah', hungry: false, speed: 60 },
          ]
        : [];
      return {
        isSuccess: isMatch,
        resultingAnimals: resulting,
        message: isMatch ? 'Scout pair Shere 🐯 and Leo 🦁 are ready for the trail!' : 'Use slice(0, 2) to pick the first 2 animals.',
      };
    },
    curriculumModule: 'Tier 2 Module 7: Array.prototype.slice()',
    hint: '`slice(start, end)` returns a shallow copy of a portion of an array up to, but not including, end.',
  },
  {
    id: 4,
    title: 'Mission 4: Energy Booster with .map()',
    description: 'Give all rescued animals a boost by mapping their health to 100.',
    instructions: 'Use `animals.map(a => ({ ...a, health: 100 }))`.',
    initialAnimals: [
      { id: 'p1', species: 'panda', emoji: '🐼', name: 'Bao', age: 4, health: 70, habitat: 'jungle', hungry: false, speed: 20 },
      { id: 'k1', species: 'koala', emoji: '🐨', name: 'Kip', age: 2, health: 65, habitat: 'jungle', hungry: false, speed: 10 },
      { id: 'l1', species: 'lion', emoji: '🦁', name: 'Leo', age: 7, health: 80, habitat: 'savannah', hungry: false, speed: 60 },
    ],
    taskType: 'map',
    expectedMethod: 'map',
    initialCode: 'animals.map(a => ({ ...a, health: ',
    suggestedTokens: ['100', 'a.health + 20', '95', 'a.health'],
    validate: (code: string) => {
      const isMatch = code.includes('100');
      const resulting = [
        { id: 'p1', species: 'panda', emoji: '🐼', name: 'Bao', age: 4, health: 100, habitat: 'jungle', hungry: false, speed: 20 },
        { id: 'k1', species: 'koala', emoji: '🐨', name: 'Kip', age: 2, health: 100, habitat: 'jungle', hungry: false, speed: 10 },
        { id: 'l1', species: 'lion', emoji: '🦁', name: 'Leo', age: 7, health: 100, habitat: 'savannah', hungry: false, speed: 60 },
      ];
      return {
        isSuccess: isMatch,
        resultingAnimals: isMatch ? resulting : [],
        message: isMatch ? 'All animals reached maximum 100% health! 🌟' : 'Boost health to 100 with map.',
      };
    },
    curriculumModule: 'Tier 3 Module 11: Array.prototype.map()',
    hint: '`map()` transforms every element and returns a new array of the same length.',
  },
  {
    id: 5,
    title: 'Mission 5: Speed Rank Tournament with .sort()',
    description: 'Sort animals from fastest to slowest speed using sort((a, b) => b.speed - a.speed).',
    instructions: 'Sort by speed in descending order: `(a, b) => b.speed - a.speed`.',
    initialAnimals: [
      { id: 'p1', species: 'panda', emoji: '🐼', name: 'Bao', age: 4, health: 100, habitat: 'jungle', hungry: false, speed: 25 },
      { id: 'l1', species: 'lion', emoji: '🦁', name: 'Leo', age: 7, health: 100, habitat: 'savannah', hungry: false, speed: 80 },
      { id: 'g1', species: 'giraffe', emoji: '🦒', name: 'Gerry', age: 6, health: 100, habitat: 'savannah', hungry: false, speed: 50 },
    ],
    taskType: 'sort',
    expectedMethod: 'sort',
    initialCode: 'animals.sort((a, b) => ',
    suggestedTokens: ['b.speed - a.speed', 'a.speed - b.speed', 'b.age - a.age', 'a.health'],
    validate: (code: string) => {
      const isMatch = code.includes('b.speed - a.speed');
      const resulting = isMatch
        ? [
            { id: 'l1', species: 'lion', emoji: '🦁', name: 'Leo', age: 7, health: 100, habitat: 'savannah', hungry: false, speed: 80 },
            { id: 'g1', species: 'giraffe', emoji: '🦒', name: 'Gerry', age: 6, health: 100, habitat: 'savannah', hungry: false, speed: 50 },
            { id: 'p1', species: 'panda', emoji: '🐼', name: 'Bao', age: 4, health: 100, habitat: 'jungle', hungry: false, speed: 25 },
          ]
        : [];
      return {
        isSuccess: isMatch,
        resultingAnimals: resulting,
        message: isMatch ? 'Leaderboard sorted! Lion Leo takes gold 🥇!' : 'Use `b.speed - a.speed` for descending order.',
      };
    },
    curriculumModule: 'Tier 3 Module 11: Array.prototype.sort()',
    hint: 'To sort descending: return `b - a`. To sort ascending: return `a - b`.',
  },
];

// --------------------------------------------------------------------------------
// 3. OBJECT SAFARI LEVELS (Objects, Destructuring, Spread, Methods, this)
// --------------------------------------------------------------------------------
export const OBJECT_SAFARI_LEVELS: ObjectSafariLevel[] = [
  {
    id: 1,
    title: 'Passport 1: Object Destructuring',
    description: 'Extract `name` and `species` from the animal passport object.',
    instructions: 'Use destructuring syntax: `const { name, species } = animal;`.',
    animalObj: { name: 'Simba', species: 'Lion', habitat: 'Savannah', age: 5 },
    expectedSnippet: 'const { name, species } = animal;',
    initialCode: 'const { ',
    suggestedTokens: ['name, species } = animal;', 'name } = animal;', 'species, age } = animal;', 'habitat } = animal;'],
    curriculumModule: 'Tier 2 Module 9 & Tier 3 Module 12: Object Destructuring',
    hint: '`const { prop1, prop2 } = object;` unpacks properties into matching variables.',
    validate: (code: string) => {
      const match = code.includes('name') && code.includes('species');
      return {
        isSuccess: match,
        outputText: 'name: "Simba", species: "Lion"',
        message: match ? 'Properties unpacked cleanly! Passport verified! 🦁' : 'Extract both name and species.',
      };
    },
  },
  {
    id: 2,
    title: 'Passport 2: Object Spread & Immutability',
    description: 'Clone the critter profile and add `vaccinated: true` without mutating the original object.',
    instructions: 'Use the spread operator: `{ ...animal, vaccinated: true }`.',
    animalObj: { name: 'Bao', species: 'Panda', vaccinated: false },
    expectedSnippet: '{ ...animal, vaccinated: true }',
    initialCode: 'const updated = { ...animal, ',
    suggestedTokens: ['vaccinated: true }', 'vaccinated: false }', 'health: 100 }', 'age: 4 }'],
    curriculumModule: 'Tier 2 Module 9 & Tier 3 Module 12: Object Spread Syntax ({ ...obj })',
    hint: '`{ ...obj, key: newVal }` creates a shallow copy with overridden or added properties.',
    validate: (code: string) => {
      const match = code.includes('vaccinated: true') || code.includes('vaccinated:true');
      return {
        isSuccess: match,
        outputText: '{ name: "Bao", species: "Panda", vaccinated: true }',
        message: match ? 'Panda Bao is vaccinated and safe! 🐼💉' : 'Set vaccinated: true.',
      };
    },
  },
  {
    id: 3,
    title: 'Passport 3: Object.keys() Inspection',
    description: 'Inspect all attribute names of the animal registry with `Object.keys(animal)`.',
    instructions: 'Call `Object.keys(animal)` to retrieve an array of property names.',
    animalObj: { name: 'Kip', diet: 'Eucalyptus', sleepHours: 18 },
    expectedSnippet: 'Object.keys(animal)',
    initialCode: 'Object.',
    suggestedTokens: ['keys(animal)', 'values(animal)', 'entries(animal)', 'assign(animal)'],
    curriculumModule: 'Tier 3 Module 12: Object.keys, values & entries',
    hint: '`Object.keys(obj)` returns an array of a given object\'s own enumerable property names.',
    validate: (code: string) => {
      const match = code.includes('keys(animal)');
      return {
        isSuccess: match,
        outputText: '["name", "diet", "sleepHours"]',
        message: match ? 'Registry keys inspected successfully! 🐨' : 'Use Object.keys(animal).',
      };
    },
  },
  {
    id: 4,
    title: 'Passport 4: Invoking Object Methods',
    description: 'Trigger the animal sound method: `falcon.screech()`.',
    instructions: 'Call `falcon.screech()` to make the mascot take flight.',
    animalObj: { name: 'Apollo', species: 'Falcon', sound: 'Screeech!' },
    expectedSnippet: 'falcon.screech()',
    initialCode: 'falcon.',
    suggestedTokens: ['screech()', 'fly()', 'rest()', 'sound'],
    curriculumModule: 'Tier 2 Module 8 & Tier 3 Module 13: Object Methods',
    hint: 'Functions stored on object properties are methods, invoked with `object.methodName()`.',
    validate: (code: string) => {
      const match = code.includes('screech()');
      return {
        isSuccess: match,
        outputText: '"Screeech!"',
        message: match ? 'Apollo the Falcon took flight across the sky! 🦅' : 'Invoke falcon.screech().',
      };
    },
  },
  {
    id: 5,
    title: 'Passport 5: Context Binding with .call()',
    description: 'Explicitly bind `this` to lion: `animal.roar.call(lion, "Loud")`.',
    instructions: 'Use `.call(lion, "Loud")` to invoke the roar with the lion\'s name.',
    animalObj: { name: 'Simba' },
    expectedSnippet: 'animal.roar.call(lion, "Loud")',
    initialCode: 'animal.roar.',
    suggestedTokens: ['call(lion, "Loud")', 'apply(lion)', 'bind(lion)', 'call(null)'],
    curriculumModule: 'Tier 3 Module 13: Function.prototype.call() & this Context',
    hint: '`.call()` calls a function with a given `this` value and arguments provided individually.',
    validate: (code: string) => {
      const match = code.includes('call(lion');
      return {
        isSuccess: match,
        outputText: '"Simba roars Loud!"',
        message: match ? 'Simba\'s mighty roar echoes across the savannah! 🦁👑' : 'Use .call(lion, "Loud").',
      };
    },
  },
];

// --------------------------------------------------------------------------------
// 4. CONDITIONAL QUEST LEVELS (Conditionals, Boolean Logic & Operators)
// --------------------------------------------------------------------------------
export const CONDITIONAL_QUEST_LEVELS: ConditionalLevel[] = [
  {
    id: 1,
    title: 'Level 1: Bunny & The River Bridge',
    animal: { emoji: '🐰', name: 'Bunny' },
    goal: { emoji: '🥕', name: 'Carrot Patch' },
    scenarioDescription: 'The river bridge opens only if Bunny has enough energy and has a key.',
    contextVariables: { energy: 35, hasKey: true, isRaining: false },
    targetExpression: 'energy > 20 && hasKey',
    initialCode: 'if (',
    suggestedTokens: ['energy > 20 && hasKey', 'energy < 20', '!hasKey', 'isRaining'],
    curriculumModule: 'Tier 1 Module 4: Conditionals & Logical AND (&&)',
    hint: 'Use `&&` (logical AND) to check if both `energy > 20` and `hasKey` are true.',
  },
  {
    id: 2,
    title: 'Level 2: Fox & The Orchard Gate',
    animal: { emoji: '🦊', name: 'Fox' },
    goal: { emoji: '🍇', name: 'Juicy Vineyard' },
    scenarioDescription: 'The orchard gate opens if the weather is sunny OR Fox has an umbrella.',
    contextVariables: { weather: 'sunny', hasUmbrella: false, guardAsleep: true },
    targetExpression: "weather === 'sunny' || hasUmbrella",
    initialCode: 'if (',
    suggestedTokens: ["weather === 'sunny' || hasUmbrella", "weather === 'rainy'", "!guardAsleep", 'hasUmbrella && guardAsleep'],
    curriculumModule: 'Tier 1 Module 3 & 4: Logical OR (||) Expressions',
    hint: 'Logical OR (`||`) evaluates to true if AT LEAST ONE side is true.',
  },
  {
    id: 3,
    title: 'Level 3: Bear & Honey Tree',
    animal: { emoji: '🐻', name: 'Barnaby Bear' },
    goal: { emoji: '🍯', name: 'Honey Pot' },
    scenarioDescription: 'Barnaby can climb safely if the bees are sleeping and there is no smoke.',
    contextVariables: { beesAsleep: true, hasSmoke: false },
    targetExpression: 'beesAsleep && !hasSmoke',
    initialCode: 'if (',
    suggestedTokens: ['beesAsleep && !hasSmoke', '!beesAsleep', 'hasSmoke', 'beesAsleep || hasSmoke'],
    curriculumModule: 'Tier 1 Module 3: Logical NOT (!) Operator',
    hint: '`!hasSmoke` inverts false to true, verifying that there is no smoke.',
  },
  {
    id: 4,
    title: 'Level 4: Owl & The Night Flight',
    animal: { emoji: '🦉', name: 'Athena Owl' },
    goal: { emoji: '⭐', name: 'Starlight Perch' },
    scenarioDescription: 'Athena sets out if hour >= 20 (nighttime) or if storm === false.',
    contextVariables: { hour: 22, isStormy: false },
    targetExpression: 'hour >= 20 && !isStormy',
    initialCode: 'if (',
    suggestedTokens: ['hour >= 20 && !isStormy', 'hour < 20', 'isStormy', 'hour === 12'],
    curriculumModule: 'Tier 1 Module 4: Comparison & Relational Operators',
    hint: 'Use `>=` for greater than or equal to 20.',
  },
  {
    id: 5,
    title: 'Level 5: Ternary Quick Hop',
    animal: { emoji: '🦘', name: 'Kangaroo' },
    goal: { emoji: '🏆', name: 'Golden Oasis' },
    scenarioDescription: 'Use a ternary operator to decide action: stamina > 50 ? "jump" : "rest".',
    contextVariables: { stamina: 75 },
    targetExpression: 'stamina > 50 ? "jump" : "rest"',
    initialCode: 'const action = stamina > 50 ? ',
    suggestedTokens: ['"jump" : "rest"', '"rest" : "jump"', '"wait" : "run"', 'true : false'],
    curriculumModule: 'Tier 1 Module 4: The Ternary Operator (condition ? a : b)',
    hint: 'Ternary syntax: `condition ? valueIfTrue : valueIfFalse`.',
  },
];

// --------------------------------------------------------------------------------
// 5. LOOP HIVE LEVELS (Loops & Iteration: for, while, repeat)
// --------------------------------------------------------------------------------
export const LOOP_HIVE_LEVELS: LoopLevel[] = [
  {
    id: 1,
    title: 'Flight 1: The 4-Flower Meadow',
    animal: { emoji: '🐝', name: 'Buzz the Bee' },
    targetItem: { emoji: '🌸', name: 'Nectar Flower' },
    count: 4,
    initialCode: 'for (let i = 0; i < ',
    suggestedTokens: ['4; i++)', '3; i++)', '5; i++)', 'i <= 4; i++)'],
    correctLoopKind: 'for',
    curriculumModule: 'Tier 1 Module 5: The Classic for Loop',
    hint: '`for (let i = 0; i < 4; i++)` runs exactly 4 times (for indices 0, 1, 2, 3).',
  },
  {
    id: 2,
    title: 'Flight 2: Ant Colony Seed Storage',
    animal: { emoji: '🐜', name: 'Andy the Ant' },
    targetItem: { emoji: '🌾', name: 'Wheat Seed' },
    count: 5,
    initialCode: 'for (let i = 0; i < ',
    suggestedTokens: ['5; i++)', '6; i++)', '4; i++)', 'i < 10; i+=2)'],
    correctLoopKind: 'for',
    curriculumModule: 'Tier 1 Module 5: Loop Counters & Iteration Steps',
    hint: 'Iterate 5 times from 0 to 4 to collect all 5 seeds into the anthill.',
  },
  {
    id: 3,
    title: 'Flight 3: While Nectar Fills the Jar',
    animal: { emoji: '🐝', name: 'Maya Bee' },
    targetItem: { emoji: '🍯', name: 'Honey Pot' },
    count: 6,
    initialCode: 'while (nectar < ',
    suggestedTokens: ['6) { nectar++; }', '5) { nectar++; }', '10) { nectar++; }', '0) { nectar++; }'],
    correctLoopKind: 'while',
    curriculumModule: 'Tier 1 Module 5: while Loops & Break Conditions',
    hint: 'A while loop continues as long as its condition remains truthy.',
  },
  {
    id: 4,
    title: 'Flight 4: Butterfly Garden Flutter',
    animal: { emoji: '🦋', name: 'Bella Butterfly' },
    targetItem: { emoji: '🌺', name: 'Tropical Hibiscus' },
    count: 3,
    initialCode: 'for (let step = 1; step <= ',
    suggestedTokens: ['3; step++)', '4; step++)', '2; step++)', 'step < 3; step++)'],
    correctLoopKind: 'for',
    curriculumModule: 'Tier 1 Module 5: 1-Indexed Iteration Boundaries',
    hint: 'Notice starting at step = 1: `step <= 3` executes for 1, 2, and 3 (3 iterations).',
  },
  {
    id: 5,
    title: 'Flight 5: Honeycomb Matrix Builder',
    animal: { emoji: '🐝', name: 'Queen Bee' },
    targetItem: { emoji: '✨', name: 'Royal Comb Cell' },
    count: 6,
    initialCode: 'for (let cell = 0; cell < ',
    suggestedTokens: ['6; cell++)', '8; cell++)', '12; cell++)', 'cell <= 6; cell++)'],
    correctLoopKind: 'for',
    curriculumModule: 'Tier 1 Module 5: Iteration Accumulation',
    hint: 'Iterate 6 times to complete the hexagonal honeycomb perimeter!',
  },
];

// --------------------------------------------------------------------------------
// 6. ASYNC DERBY RACE LEVELS (Event Loop, Promises & Microtasks)
// --------------------------------------------------------------------------------
export const ASYNC_DERBY_LEVELS: AsyncLevel[] = [
  {
    id: 1,
    title: 'Race 1: Sync Cheetah vs setTimeout Snail',
    description: 'Predict who crosses the finish line first in JavaScript execution order!',
    racers: [
      { emoji: '🐆', name: 'Sync Cheetah', type: 'sync' },
      { emoji: '🐌', name: 'Macro Snail (setTimeout 0)', type: 'macrotask' },
    ],
    expectedArrivalOrder: ['Sync Cheetah', 'Macro Snail (setTimeout 0)'],
    snippet: `console.log("🐆 Cheetah");
setTimeout(() => {
  console.log("🐌 Snail");
}, 0);`,
    options: [
      ['🐆 Cheetah', '🐌 Snail'],
      ['🐌 Snail', '🐆 Cheetah'],
      ['Both at the same instant', 'Depends on CPU speed'],
    ],
    correctIndex: 0,
    curriculumModule: 'Tier 4 Module 16: The Call Stack vs Task Queue',
    hint: 'Synchronous code on the call stack ALWAYS executes completely before timers in the macrotask queue run!',
  },
  {
    id: 2,
    title: 'Race 2: Microtask Hare vs Macrotask Turtle',
    description: 'Promises (microtasks) vs setTimeout (macrotasks): who gets scheduled first?',
    racers: [
      { emoji: '🐇', name: 'Promise Hare (Microtask)', type: 'microtask' },
      { emoji: '🐢', name: 'Timeout Turtle (Macrotask)', type: 'macrotask' },
    ],
    expectedArrivalOrder: ['Promise Hare (Microtask)', 'Timeout Turtle (Macrotask)'],
    snippet: `setTimeout(() => console.log("🐢 Turtle"), 0);
Promise.resolve().then(() => console.log("🐇 Hare"));`,
    options: [
      ['🐇 Hare', '🐢 Turtle'],
      ['🐢 Turtle', '🐇 Hare'],
      ['Neither finishes', 'Random order'],
    ],
    correctIndex: 0,
    curriculumModule: 'Tier 4 Module 16: Microtask Priority in the Event Loop',
    hint: 'The microtask queue has higher priority than the macrotask queue: promise callbacks run before setTimeout!',
  },
  {
    id: 3,
    title: 'Race 3: The 3-Animal Grand Prix',
    description: 'Sync Falcon, Promise Hare, and Timer Turtle line up!',
    racers: [
      { emoji: '🦅', name: 'Sync Falcon', type: 'sync' },
      { emoji: '🐇', name: 'Promise Hare', type: 'microtask' },
      { emoji: '🐢', name: 'Timer Turtle', type: 'macrotask' },
    ],
    expectedArrivalOrder: ['🦅 Falcon', '🐇 Hare', '🐢 Turtle'],
    snippet: `setTimeout(() => console.log("🐢 Turtle"), 0);
console.log("🦅 Falcon");
Promise.resolve().then(() => console.log("🐇 Hare"));`,
    options: [
      ['🦅 Falcon → 🐇 Hare → 🐢 Turtle'],
      ['🐢 Turtle → 🦅 Falcon → 🐇 Hare'],
      ['🐇 Hare → 🦅 Falcon → 🐢 Turtle'],
      ['🦅 Falcon → 🐢 Turtle → 🐇 Hare'],
    ],
    correctIndex: 0,
    curriculumModule: 'Tier 4 Module 16: Full Event Loop Sequencing',
    hint: 'Golden Rule of the Event Loop: 1) Synchronous code, 2) Microtasks (Promises), 3) Macrotasks (Timers).',
  },
  {
    id: 4,
    title: 'Race 4: async / await Runner',
    description: 'When `await` pauses an async function, what happens to the remaining sync code?',
    racers: [
      { emoji: '🐆', name: 'Sync Cheetah', type: 'sync' },
      { emoji: '🦅', name: 'Async Falcon', type: 'async_await' },
    ],
    expectedArrivalOrder: ['Sync Cheetah', 'Async Falcon'],
    snippet: `async function race() {
  await null;
  console.log("🦅 Falcon");
}
race();
console.log("🐆 Cheetah");`,
    options: [
      ['🐆 Cheetah → 🦅 Falcon'],
      ['🦅 Falcon → 🐆 Cheetah'],
      ['Both simultaneous', 'Throws TypeError'],
    ],
    correctIndex: 0,
    curriculumModule: 'Tier 4 Module 17: async / await Desugaring to Microtasks',
    hint: '`await` yields control back to the event loop, allowing synchronous code below to finish first!',
  },
  {
    id: 5,
    title: 'Race 5: Promise Chaining Sprint',
    description: 'Two chained .then() calls: how do they interleave with other tasks?',
    racers: [
      { emoji: '🐕', name: 'Dog Step 1', type: 'microtask' },
      { emoji: '🐩', name: 'Poodle Step 2', type: 'microtask' },
      { emoji: '🐢', name: 'Snail Timer', type: 'macrotask' },
    ],
    expectedArrivalOrder: ['🐕 Dog Step 1', '🐩 Poodle Step 2', '🐢 Snail Timer'],
    snippet: `setTimeout(() => console.log("🐢 Snail"), 0);
Promise.resolve()
  .then(() => console.log("🐕 Dog Step 1"))
  .then(() => console.log("🐩 Poodle Step 2"));`,
    options: [
      ['🐕 Dog Step 1 → 🐩 Poodle Step 2 → 🐢 Snail'],
      ['🐕 Dog Step 1 → 🐢 Snail → 🐩 Poodle Step 2'],
      ['🐢 Snail → 🐕 Dog Step 1 → 🐩 Poodle Step 2'],
      ['All 3 at once'],
    ],
    correctIndex: 0,
    curriculumModule: 'Tier 4 Module 16 & 17: Chained Microtask Queuing',
    hint: 'The second `.then()` is queued into the microtask queue and runs before any macrotask (timer) can execute!',
  },
];

// --------------------------------------------------------------------------------
// MASTER LIST OF 100% PURE JAVASCRIPT CODING GAMES (LESSONS 0 TO 100)
// --------------------------------------------------------------------------------
export const ANIMAL_GAMES_COLLECTION: AnimalGame[] = [
  {
    id: 'game_froggy_js',
    gameType: 'froggy_js',
    title: 'Froggy JS: Function Jump',
    subtitle: 'Methods & Coordinates · Visual JS Puzzles',
    description: 'Guide frogs 🐸, ducks 🦆, and turtles 🐢 across the pond using pure JavaScript function calls, array indexing, Math, and expressions!',
    icon: '🐸',
    mascots: ['🐸', '🦆', '🐢'],
    category: 'Functions & Math',
    curriculumModulesTag: 'Tier 1 (Lessons 1–25): Syntax, Functions & Arrays',
    isPro: false,
    totalLevels: FROGGY_JS_LEVELS.length,
    xpReward: 150,
    highScore: 1250,
    completedTimes: 6,
    accentColor: '#22C55E',
    badgeLabel: 'POPULAR ⭐',
    froggyLevels: FROGGY_JS_LEVELS,
  },
  {
    id: 'game_array_rescue',
    gameType: 'array_rescue',
    title: 'Array Zoo Sanctuary',
    subtitle: 'Transformations · Data Dispatcher',
    description: 'Rescue pandas 🐼, lions 🦁, and koalas 🐨 using pure JavaScript array methods: .filter(), .map(), .slice() and .sort()!',
    icon: '🐾',
    mascots: ['🐼', '🦁', '🐨', '🐘', '🐯', '🦒'],
    category: 'Arrays & Data',
    curriculumModulesTag: 'Tier 2 (Mod 7) & Tier 3 (Mod 11): Array Methods',
    isPro: false,
    totalLevels: ARRAY_RESCUE_LEVELS.length,
    xpReward: 120,
    highScore: 980,
    completedTimes: 3,
    accentColor: '#3B82F6',
    badgeLabel: 'HOT 🔥',
    arrayRescueLevels: ARRAY_RESCUE_LEVELS,
  },
  {
    id: 'game_object_safari',
    gameType: 'object_safari',
    title: 'Object Safari: Critter Registry',
    subtitle: 'Objects & Context · Passports & Methods',
    description: 'Inspect animal passports, practice object destructuring { name }, spread cloning { ...critter }, and bind `this` with .call()!',
    icon: '🦁',
    mascots: ['🦁', '🐼', '🐨', '🦅'],
    category: 'Objects & OOP',
    curriculumModulesTag: 'Tier 2 (Mod 8) & Tier 3 (Mod 12-13): Objects & this',
    isPro: false,
    totalLevels: OBJECT_SAFARI_LEVELS.length,
    xpReward: 130,
    highScore: 890,
    completedTimes: 1,
    accentColor: '#A855F7',
    badgeLabel: 'OBJECTS 💎',
    objectSafariLevels: OBJECT_SAFARI_LEVELS,
  },
  {
    id: 'game_conditional_quest',
    gameType: 'conditional_quest',
    title: 'Conditional Quest',
    subtitle: 'Logic & Flow · Bunny Run',
    description: 'Help Bunny 🐰 and Fox 🦊 unlock gates using pure JavaScript boolean expressions (&&, ||, !), if/else, and ternaries!',
    icon: '🥕',
    mascots: ['🐰', '🦊', '🐻', '🦉', '🦘'],
    category: 'Logic & Flow',
    curriculumModulesTag: 'Tier 1 (Mod 3 & 4): Operators & Conditionals',
    isPro: false,
    totalLevels: CONDITIONAL_QUEST_LEVELS.length,
    xpReward: 100,
    highScore: 820,
    completedTimes: 4,
    accentColor: '#F59E0B',
    badgeLabel: 'FREE',
    conditionalLevels: CONDITIONAL_QUEST_LEVELS,
  },
  {
    id: 'game_loop_hive',
    gameType: 'loop_hive',
    title: 'Loop Hive: Pollen Run',
    subtitle: 'Loops & Iteration · Bee Swarm',
    description: 'Guide worker bees 🐝 and ants 🐜 through meadow arrays with for and while loops to fill the honeycomb with honey 🍯!',
    icon: '🐝',
    mascots: ['🐝', '🐜', '🦋'],
    category: 'Loops & Iteration',
    curriculumModulesTag: 'Tier 1 (Mod 5): Loops, While & Iteration',
    isPro: false,
    totalLevels: LOOP_HIVE_LEVELS.length,
    xpReward: 110,
    highScore: 910,
    completedTimes: 2,
    accentColor: '#FACC15',
    badgeLabel: 'FUN 🍯',
    loopLevels: LOOP_HIVE_LEVELS,
  },
  {
    id: 'game_async_derby',
    gameType: 'async_race',
    title: 'Async Grand Prix',
    subtitle: 'Event Loop & Promises · Speed Track',
    description: 'Cheetah 🐆, Hare 🐇, Falcon 🦅, and Turtle 🐢 race! Master microtasks (Promise.then), macrotasks (setTimeout), and async/await.',
    icon: '⚡',
    mascots: ['🐆', '🐇', '🦅', '🐢'],
    category: 'Async & Modern JS',
    curriculumModulesTag: 'Tier 4 (Mod 16 & 17): Promises, Timers, Event Loop',
    isPro: true,
    totalLevels: ASYNC_DERBY_LEVELS.length,
    xpReward: 160,
    highScore: 0,
    completedTimes: 0,
    accentColor: '#EC4899',
    badgeLabel: 'PRO 👑',
    asyncLevels: ASYNC_DERBY_LEVELS,
  },
  {
    id: 'game_variables_rush',
    gameType: 'quiz',
    title: 'JS Variables & Scope Blitz',
    subtitle: 'Fundamentals · Speed Challenge',
    description: 'Test your knowledge on var vs let vs const, hoisting, primitives, and scope under time pressure!',
    icon: '⚡',
    mascots: ['🦊', '🦉'],
    category: 'Speed Quizzes',
    curriculumModulesTag: 'Tier 1 (Mod 2): Variables, Types & Scope',
    isPro: false,
    totalLevels: 5,
    xpReward: 50,
    highScore: 850,
    completedTimes: 4,
    accentColor: '#EAB308',
    badgeLabel: 'SPEED ⏱️',
  },
  {
    id: 'game_bug_hunter',
    gameType: 'quiz',
    title: 'JS Trap Detector (Bug Hunter)',
    subtitle: 'Traps & Debugging · Code Inspection',
    description: 'Spot subtle JavaScript traps (0.1 + 0.2 === 0.3, typeof NaN, closure mutations, coercion) before the timer runs out!',
    icon: '🐛',
    mascots: ['🐛', '🕷️'],
    category: 'Speed Quizzes',
    curriculumModulesTag: 'Tier 2 (Mod 10) & Tier 4: Traps & Debugging',
    isPro: false,
    totalLevels: 3,
    xpReward: 60,
    highScore: 720,
    completedTimes: 2,
    accentColor: '#10B981',
    badgeLabel: 'DEBUG',
  },
];
