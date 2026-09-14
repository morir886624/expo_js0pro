// Type definitions and complete level data for Animal Interactive Coding Games
// Aligned with Flexbox Froggy mechanics and the 20-Module JavaScript Curriculum

export type GameType =
  | 'flexbox'
  | 'array_rescue'
  | 'conditional_quest'
  | 'loop_hive'
  | 'async_race'
  | 'quiz';

export interface AnimalTarget {
  id: string;
  species: string; // e.g., 'frog', 'cat', 'monkey', 'penguin', 'fox', 'duck', 'bunny', 'dog'
  emoji: string;
  name: string;
  color: string;
  targetEmoji: string; // e.g., '🟢' (lilypad), '🟡' (cushion), '🌴' (tree), '❄️' (ice), '🌲' (burrow)
  targetLabel: string;
  targetAlignSelf?: string;
}

export interface FlexboxLevel {
  id: number;
  title: string;
  description: string;
  instructions: string;
  habitatType: 'pond' | 'savannah' | 'arctic' | 'forest';
  animals: AnimalTarget[];
  // Expected container styles for winning the level
  targetStyles: {
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: number;
  };
  // Pre-filled initial properties
  initialCode: string;
  // Available helper property token chips for mobile single-tap selection
  suggestedTokens: string[];
  // Curriculum module alignment & MDN explanation hint
  curriculumModule: string;
  hint: string;
  mdnDoc: string;
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
  flexboxLevels?: FlexboxLevel[];
  arrayRescueLevels?: ArrayRescueLevel[];
  conditionalLevels?: ConditionalLevel[];
  loopLevels?: LoopLevel[];
  asyncLevels?: AsyncLevel[];
  questions?: any[]; // For legacy or quiz modes
}

// --------------------------------------------------------------------------------
// 1. FLEXBOX SAFARI LEVELS (Identical mechanics to Flexbox Froggy with diverse animals)
// --------------------------------------------------------------------------------
export const FLEXBOX_SAFARI_LEVELS: FlexboxLevel[] = [
  {
    id: 1,
    title: 'Level 1: Frog to Lilypad',
    description: 'Guide the frog 🐸 to the lilypad on the right using justifyContent.',
    instructions: 'Use `justifyContent: flex-end` to align the frog to the right side of the pond.',
    habitatType: 'pond',
    animals: [
      { id: 'a1', species: 'frog', emoji: '🐸', name: 'Froggy', color: '#22C55E', targetEmoji: '🟢', targetLabel: 'Lilypad' },
    ],
    targetStyles: {
      justifyContent: 'flex-end',
    },
    initialCode: 'justifyContent: ',
    suggestedTokens: ['flex-end', 'center', 'flex-start', 'space-between'],
    curriculumModule: 'CSS & Flexbox Fundamentals (Web & React Native Layout)',
    hint: '`justifyContent: flex-end` aligns children along the main axis to the right (end) of the container.',
    mdnDoc: 'MDN: justify-content aligns flex items along the main axis.',
  },
  {
    id: 2,
    title: 'Level 2: Ducks to Center Pond',
    description: 'Guide the ducklings 🦆🦆 to their center ripples in the pond.',
    instructions: 'Use `justifyContent: center` to float the two ducks into the middle.',
    habitatType: 'pond',
    animals: [
      { id: 'a1', species: 'duck', emoji: '🦆', name: 'Duckling 1', color: '#EAB308', targetEmoji: '🟡', targetLabel: 'Puddle' },
      { id: 'a2', species: 'duck', emoji: '🦆', name: 'Duckling 2', color: '#EAB308', targetEmoji: '🟡', targetLabel: 'Puddle' },
    ],
    targetStyles: {
      justifyContent: 'center',
    },
    initialCode: 'justifyContent: ',
    suggestedTokens: ['center', 'flex-end', 'space-around', 'space-between'],
    curriculumModule: 'Flexbox Main Axis Alignment',
    hint: '`justifyContent: center` clusters all flex items at the exact horizontal center of the container.',
    mdnDoc: 'MDN: justify-content: center packs items around the center.',
  },
  {
    id: 3,
    title: 'Level 3: Kittens on Cushions',
    description: 'Help the kittens 🐱🐱🐱 spread out evenly on their cozy cushions.',
    instructions: 'Use `justifyContent: space-around` so each kitten has equal space on both sides.',
    habitatType: 'savannah',
    animals: [
      { id: 'a1', species: 'cat', emoji: '🐱', name: 'Cleo', color: '#F97316', targetEmoji: '🧶', targetLabel: 'Cushion' },
      { id: 'a2', species: 'cat', emoji: '🐱', name: 'Milo', color: '#FB923C', targetEmoji: '🧶', targetLabel: 'Cushion' },
      { id: 'a3', species: 'cat', emoji: '🐱', name: 'Luna', color: '#EA580C', targetEmoji: '🧶', targetLabel: 'Cushion' },
    ],
    targetStyles: {
      justifyContent: 'space-around',
    },
    initialCode: 'justifyContent: ',
    suggestedTokens: ['space-around', 'space-between', 'center', 'space-evenly'],
    curriculumModule: 'Flexbox Distribution: space-around vs space-between',
    hint: '`space-around` gives equal spacing around every item, leaving half-sized gaps at the outer edges.',
    mdnDoc: 'MDN: justify-content: space-around distributes items evenly with equal margins.',
  },
  {
    id: 4,
    title: 'Level 4: Penguins on Ice Floes',
    description: 'Place the penguins 🐧🐧🐧 at the opposite ends of the glacier.',
    instructions: 'Use `justifyContent: space-between` to push the outer penguins to the screen edges.',
    habitatType: 'arctic',
    animals: [
      { id: 'a1', species: 'penguin', emoji: '🐧', name: 'Pippin', color: '#38BDF8', targetEmoji: '❄️', targetLabel: 'Ice Floe' },
      { id: 'a2', species: 'penguin', emoji: '🐧', name: 'Percy', color: '#38BDF8', targetEmoji: '❄️', targetLabel: 'Ice Floe' },
      { id: 'a3', species: 'penguin', emoji: '🐧', name: 'Penny', color: '#38BDF8', targetEmoji: '❄️', targetLabel: 'Ice Floe' },
    ],
    targetStyles: {
      justifyContent: 'space-between',
    },
    initialCode: 'justifyContent: ',
    suggestedTokens: ['space-between', 'space-around', 'flex-start', 'center'],
    curriculumModule: 'Flexbox Edge Spacing',
    hint: '`space-between` places the first item flush at the start, the last item flush at the end, and distributes the rest evenly.',
    mdnDoc: 'MDN: justify-content: space-between leaves no margin at container edges.',
  },
  {
    id: 5,
    title: 'Level 5: Frogs to Bottom Lilypads',
    description: 'Move the frogs down to the lilypads at the bottom of the pond using cross-axis alignment.',
    instructions: 'Use `alignItems: flex-end` to align the frogs along the cross axis.',
    habitatType: 'pond',
    animals: [
      { id: 'a1', species: 'frog', emoji: '🐸', name: 'Hoppy', color: '#22C55E', targetEmoji: '🟢', targetLabel: 'Lilypad' },
      { id: 'a2', species: 'frog', emoji: '🐸', name: 'Leapy', color: '#22C55E', targetEmoji: '🟢', targetLabel: 'Lilypad' },
    ],
    targetStyles: {
      alignItems: 'flex-end',
    },
    initialCode: 'alignItems: ',
    suggestedTokens: ['flex-end', 'center', 'flex-start', 'stretch'],
    curriculumModule: 'Cross Axis: alignItems',
    hint: '`alignItems` controls alignment along the perpendicular cross axis (vertically in row layout).',
    mdnDoc: 'MDN: align-items defines the default behavior for how flex items are laid out along the cross axis.',
  },
  {
    id: 6,
    title: 'Level 6: Bunny in the Meadow Center',
    description: 'Position the bunny 🐰 in the absolute dead-center of the meadow.',
    instructions: 'Combine both `justifyContent: center` and `alignItems: center`.',
    habitatType: 'forest',
    animals: [
      { id: 'a1', species: 'bunny', emoji: '🐰', name: 'Cotton', color: '#EC4899', targetEmoji: '🥕', targetLabel: 'Carrot' },
    ],
    targetStyles: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    initialCode: 'justifyContent: center;\nalignItems: ',
    suggestedTokens: ['center', 'flex-end', 'flex-start', 'space-around'],
    curriculumModule: 'Centering in Modern CSS & React Native',
    hint: 'The holy grail of CSS alignment: `justifyContent: center` + `alignItems: center` creates perfect 2D centering.',
    mdnDoc: 'MDN: Centering in CSS requires aligning both main and cross axes.',
  },
  {
    id: 7,
    title: 'Level 7: Monkeys & Bananas',
    description: 'Spread the monkeys 🐵🐵 along the bottom of the palm canopy.',
    instructions: 'Use `justifyContent: space-around` and `alignItems: flex-end`.',
    habitatType: 'savannah',
    animals: [
      { id: 'a1', species: 'monkey', emoji: '🐵', name: 'Coco', color: '#F59E0B', targetEmoji: '🍌', targetLabel: 'Banana Tree' },
      { id: 'a2', species: 'monkey', emoji: '🐵', name: 'Kiki', color: '#F59E0B', targetEmoji: '🍌', targetLabel: 'Banana Tree' },
    ],
    targetStyles: {
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
    initialCode: 'justifyContent: space-around;\nalignItems: ',
    suggestedTokens: ['flex-end', 'center', 'flex-start', 'stretch'],
    curriculumModule: 'Combining 2D Flexbox Properties',
    hint: 'Use `alignItems: flex-end` to sink the items to the bottom, while `space-around` spreads them horizontally.',
    mdnDoc: 'MDN: Combining main and cross axis properties.',
  },
  {
    id: 8,
    title: 'Level 8: Reverse the Animal Lineup',
    description: 'Fox 🦊 and Puppy 🐶 need to switch their order to reach their burrows.',
    instructions: 'Use `flexDirection: row-reverse` to flip the main axis horizontally.',
    habitatType: 'forest',
    animals: [
      { id: 'a1', species: 'fox', emoji: '🦊', name: 'Rusty', color: '#EA580C', targetEmoji: '🌲', targetLabel: 'Burrow' },
      { id: 'a2', species: 'dog', emoji: '🐶', name: 'Barnaby', color: '#D97706', targetEmoji: '🦴', targetLabel: 'Doghouse' },
    ],
    targetStyles: {
      flexDirection: 'row-reverse',
    },
    initialCode: 'flexDirection: ',
    suggestedTokens: ['row-reverse', 'row', 'column', 'column-reverse'],
    curriculumModule: 'Flex Direction & Axis Reversal',
    hint: '`row-reverse` starts items from the right edge and reverses their DOM order.',
    mdnDoc: 'MDN: flex-direction sets how flex items are placed in the flex container.',
  },
  {
    id: 9,
    title: 'Level 9: Vertical Tree Climbing',
    description: 'Stack the animals vertically from top to bottom on the tree trunks.',
    instructions: 'Use `flexDirection: column` to make the main axis vertical.',
    habitatType: 'forest',
    animals: [
      { id: 'a1', species: 'cat', emoji: '🐱', name: 'Tiger', color: '#F97316', targetEmoji: '🌳', targetLabel: 'Branch Top' },
      { id: 'a2', species: 'monkey', emoji: '🐵', name: 'George', color: '#F59E0B', targetEmoji: '🌳', targetLabel: 'Branch Middle' },
      { id: 'a3', species: 'frog', emoji: '🐸', name: 'Toad', color: '#22C55E', targetEmoji: '🌳', targetLabel: 'Branch Base' },
    ],
    targetStyles: {
      flexDirection: 'column',
    },
    initialCode: 'flexDirection: ',
    suggestedTokens: ['column', 'row', 'column-reverse', 'row-reverse'],
    curriculumModule: 'Column Layout & The Vertical Main Axis',
    hint: 'In `flexDirection: column`, the main axis becomes vertical, and the cross axis becomes horizontal!',
    mdnDoc: 'MDN: flex-direction: column stacks items vertically.',
  },
  {
    id: 10,
    title: 'Level 10: Arctic Inversion',
    description: 'Stack the penguins 🐧🐧 from the bottom up in reverse order.',
    instructions: 'Use `flexDirection: column-reverse` to invert the vertical stack.',
    habitatType: 'arctic',
    animals: [
      { id: 'a1', species: 'penguin', emoji: '🐧', name: 'Chilly', color: '#0284C7', targetEmoji: '❄️', targetLabel: 'Low Ice' },
      { id: 'a2', species: 'penguin', emoji: '🐧', name: 'Frosty', color: '#0284C7', targetEmoji: '❄️', targetLabel: 'High Ice' },
    ],
    targetStyles: {
      flexDirection: 'column-reverse',
    },
    initialCode: 'flexDirection: ',
    suggestedTokens: ['column-reverse', 'column', 'row-reverse', 'flex-end'],
    curriculumModule: 'Inverted Column Axes',
    hint: '`column-reverse` lays out items from bottom to top!',
    mdnDoc: 'MDN: flex-direction: column-reverse starts from bottom-left.',
  },
  {
    id: 11,
    title: 'Level 11: Savannah Spacing Gap',
    description: 'Give the lion 🦁 and tiger 🐯 their own personal territory using modern gap.',
    instructions: 'Center the animals with `justifyContent: center` and separate them with `gap: 24`.',
    habitatType: 'savannah',
    animals: [
      { id: 'a1', species: 'lion', emoji: '🦁', name: 'Simba', color: '#EAB308', targetEmoji: '👑', targetLabel: 'Pride Rock' },
      { id: 'a2', species: 'tiger', emoji: '🐯', name: 'Rajah', color: '#F97316', targetEmoji: '🌿', targetLabel: 'Grassland' },
    ],
    targetStyles: {
      justifyContent: 'center',
      gap: 24,
    },
    initialCode: 'justifyContent: center;\ngap: ',
    suggestedTokens: ['24', '12', '32', '16'],
    curriculumModule: 'Modern CSS & React Native Gap Property',
    hint: '`gap` sets the distance between flex items without needing margin hacks on individual children!',
    mdnDoc: 'MDN: gap CSS property defines gutter between rows and columns.',
  },
  {
    id: 12,
    title: 'Level 12: Grand Safari Alignment',
    description: 'The master challenge! Align the animals in a column, spaced between, and centered horizontally.',
    instructions: 'Set `flexDirection: column`, `justifyContent: space-between`, and `alignItems: center`.',
    habitatType: 'savannah',
    animals: [
      { id: 'a1', species: 'frog', emoji: '🐸', name: 'Goliath', color: '#22C55E', targetEmoji: '🟢', targetLabel: 'North Lily' },
      { id: 'a2', species: 'fox', emoji: '🦊', name: 'Amber', color: '#EA580C', targetEmoji: '🌲', targetLabel: 'Center Grove' },
      { id: 'a3', species: 'duck', emoji: '🦆', name: 'Donald', color: '#EAB308', targetEmoji: '🟡', targetLabel: 'South Pond' },
    ],
    targetStyles: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    initialCode: 'flexDirection: column;\njustifyContent: space-between;\nalignItems: ',
    suggestedTokens: ['center', 'flex-start', 'flex-end', 'stretch'],
    curriculumModule: 'Full Multi-Axis Mastery',
    hint: 'Combine column direction with space-between main-axis and center cross-axis!',
    mdnDoc: 'MDN: Complete flexbox alignment overview.',
  },
];

// --------------------------------------------------------------------------------
// 2. ARRAY ZOO RESCUE LEVELS (Array Methods: filter, map, slice, find, sort)
// --------------------------------------------------------------------------------
export const ARRAY_RESCUE_LEVELS: ArrayRescueLevel[] = [
  {
    id: 1,
    title: 'Mission 1: Rescue the Hungry Critters',
    description: 'Filter the sanctuary to find animals that are hungry and need feeding immediately.',
    instructions: 'Complete the filter predicate to return animals with `hungry === true`.',
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
        message: isMatch ? 'Panda Bao 🐼 and Koala Kip 🐨 rescued for lunchtime!' : 'Check your condition: we need hungry animals!',
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
    title: 'Mission 3: Fast Explorers First',
    description: 'Take the first 2 animals from the front of the expedition lineup with slice.',
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
    title: 'Mission 4: Energy Booster Drink',
    description: 'Give all rescued animals a vitamin boost by increasing their health to 100 with map.',
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
    title: 'Mission 5: Speed Rank Tournament',
    description: 'Sort the animals from fastest to slowest speed using sort((a, b) => b.speed - a.speed).',
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
// 3. CONDITIONAL QUEST LEVELS (Conditionals, Boolean Logic & Operators)
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
// 4. LOOP HIVE LEVELS (Loops & Iteration: for, while, repeat)
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
// 5. ASYNC DERBY RACE LEVELS (Event Loop, Promises & Microtasks)
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
// MASTER LIST OF ALL ANIMAL CODING GAMES
// --------------------------------------------------------------------------------
export const ANIMAL_GAMES_COLLECTION: AnimalGame[] = [
  {
    id: 'game_flexbox_safari',
    gameType: 'flexbox',
    title: 'Flexbox Safari',
    subtitle: 'Frog CSS Replica · Visual Layout Game',
    description: 'Guide frogs 🐸, cats 🐱, monkeys 🐵, penguins 🐧 and foxes 🦊 to their matching pads with live CSS Flexbox code!',
    icon: '🐸',
    mascots: ['🐸', '🐱', '🐵', '🐧', '🦊', '🦆', '🐰', '🦁'],
    category: 'CSS & Layout',
    curriculumModulesTag: 'Supports: Layout & Flexbox (Web & React Native)',
    isPro: false,
    totalLevels: FLEXBOX_SAFARI_LEVELS.length,
    xpReward: 150,
    highScore: 1200,
    completedTimes: 5,
    accentColor: '#22C55E',
    badgeLabel: 'POPULAR ⭐',
    flexboxLevels: FLEXBOX_SAFARI_LEVELS,
  },
  {
    id: 'game_array_rescue',
    gameType: 'array_rescue',
    title: 'Array Zoo Rescue',
    subtitle: 'Data & Iteration · Sanctuary Dispatcher',
    description: 'Rescue pandas 🐼, lions 🦁, and koalas 🐨 using .filter(), .map(), .slice() and .sort() to sort them into sanctuaries!',
    icon: '🐾',
    mascots: ['🐼', '🦁', '🐨', '🐘', '🐯', '🦒'],
    category: 'Arrays & Data',
    curriculumModulesTag: 'Supports: Tier 2 Mod 7 & Tier 3 Mod 11 (Arrays & Methods)',
    isPro: false,
    totalLevels: ARRAY_RESCUE_LEVELS.length,
    xpReward: 120,
    highScore: 950,
    completedTimes: 2,
    accentColor: '#3B82F6',
    badgeLabel: 'HOT 🔥',
    arrayRescueLevels: ARRAY_RESCUE_LEVELS,
  },
  {
    id: 'game_conditional_quest',
    gameType: 'conditional_quest',
    title: 'Conditional Quest',
    subtitle: 'Logic & Flow · Bunny Run',
    description: 'Help Bunny 🐰 and Fox 🦊 navigate obstacle gates using if/else conditions, boolean logic (&&, ||) and ternaries!',
    icon: '🥕',
    mascots: ['🐰', '🦊', '🐻', '🦉', '🦘'],
    category: 'Logic & Gates',
    curriculumModulesTag: 'Supports: Tier 1 Mod 3 & 4 (Operators & Conditionals)',
    isPro: false,
    totalLevels: CONDITIONAL_QUEST_LEVELS.length,
    xpReward: 100,
    highScore: 800,
    completedTimes: 3,
    accentColor: '#F59E0B',
    badgeLabel: 'FREE',
    conditionalLevels: CONDITIONAL_QUEST_LEVELS,
  },
  {
    id: 'game_loop_hive',
    gameType: 'loop_hive',
    title: 'Loop Hive: Pollen Run',
    subtitle: 'Iteration · Bee Swarm',
    description: 'Guide worker bees 🐝 and ants 🐜 through flower meadows with for and while loops to fill the honeycomb with honey 🍯!',
    icon: '🐝',
    mascots: ['🐝', '🐜', '🦋'],
    category: 'Loops & Swarm',
    curriculumModulesTag: 'Supports: Tier 1 Mod 5 (Loops & Iterations)',
    isPro: false,
    totalLevels: LOOP_HIVE_LEVELS.length,
    xpReward: 110,
    highScore: 890,
    completedTimes: 1,
    accentColor: '#FACC15',
    badgeLabel: 'FUN 🍯',
    loopLevels: LOOP_HIVE_LEVELS,
  },
  {
    id: 'game_async_derby',
    gameType: 'async_race',
    title: 'Async Derby: Critter Race',
    subtitle: 'Event Loop & Promises · Grand Prix',
    description: 'Cheetah 🐆, Hare 🐇, Falcon 🦅 and Turtle 🐢 race on the track! Master microtasks, macrotasks and async execution order.',
    icon: '⚡',
    mascots: ['🐆', '🐇', '🦅', '🐢'],
    category: 'Async & Speed',
    curriculumModulesTag: 'Supports: Tier 4 Mod 16 & 17 (Promises, Timers, Event Loop)',
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
    title: 'Variables & Scope Blitz',
    subtitle: 'Fundamentals · Speed Challenge',
    description: 'Test your reflex knowledge on var, let, const, hoisting, and primitive types against the clock!',
    icon: '⚡',
    mascots: ['🦊', '🦉'],
    category: 'Speed Quizzes',
    curriculumModulesTag: 'Supports: Tier 1 Mod 2 (Variables, Types & Scope)',
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
    title: 'Bug Hunter Pro',
    subtitle: 'Debugging & Traps · Inspection',
    description: 'Spot subtle JavaScript runtime errors, floating point gotchas, and type coercion traps before time runs out!',
    icon: '🐛',
    mascots: ['🐛', '🕷️'],
    category: 'Speed Quizzes',
    curriculumModulesTag: 'Supports: Tier 2 Mod 10 (Error Handling & Debugging)',
    isPro: false,
    totalLevels: 5,
    xpReward: 60,
    highScore: 720,
    completedTimes: 2,
    accentColor: '#10B981',
    badgeLabel: 'DEBUG',
  },
];
