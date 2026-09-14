# JS0pro — Mobile Application (React Native + Expo)

JS0pro is a mobile learning app built with React Native and Expo (SDK 57) in TypeScript, converted directly from the official Figma design mockups.

---

## 🚀 Features & Screens Implemented

- **Onboarding Flow (4 slides)**:
  - 📚 Learn JavaScript with interactive theory & examples
  - 🎮 Practice with code challenge mini-games
  - ⚡ Track XP, levels, and daily streak milestones
  - 🚀 Quick start & skip controls
- **Authentication**:
  - Sign in & Sign up with password toggle and field validation
  - Google & Apple OAuth buttons
  - Forgot Password & 6-digit OTP verification screen
- **Home Dashboard**:
  - Header with user avatar, streak badge (🔥 7), notifications bell, and Light/Dark mode switcher
  - Level 4 progress card (850 / 1,000 XP) with remaining XP calculation
  - 7-day streak tracker with checkmarks
  - Continue Learning card with module & lesson shortcut
  - Topic exploration cards (Variables, Functions, Loops, Arrays)
- **Learn / Courses**:
  - Full module catalogue with search & category filters (All, In progress, Completed, Locked)
  - Course progress banner (38% overall completed)
  - Module Detail screen with step-by-step lesson breakdown (Completed, Current, Locked)
- **Lesson Player**:
  - Step counter & progress bar with XP rewards
  - Theory step with syntax-styled code blocks
  - Quiz step with single-choice selection & instant answer validation
  - Correct & Wrong answer bottom cards with detailed explanations
  - Lesson Complete celebration modal with XP reward payout
- **Games & Challenges**:
  - Stats card (3 Completed, 850 High Score, 90 XP Earned)
  - Free games: Variables Rush & Bug Hunter
  - Interactive Game Play screen:
    - 3 Lives (❤️❤️❤️) with heart loss on wrong answers
    - 15-second countdown timer
    - Live score counter
    - Game Over modal (lives depleted) with retry option
    - Victory modal with trophy and XP payout
  - Pro Games with locked badges (Array Master, Async Arena)
- **Progress & Analytics**:
  - Current level breakdown & title ("Advanced Beginner")
  - 4-metric statistics grid (Streak, Hours spent, Accuracy, Completed lessons)
  - Weekly XP activity bar chart (Mon - Sun)
  - Achievements / Badges preview
- **User Profile & Settings**:
  - Avatar, handle, and rank badges
  - Real-time Light / Dark mode toggle
  - Sound effects toggle
  - Badges screen with 12 achievements (Earned vs Locked)
  - Notifications screen with "Mark all as read"
  - Privacy policy & GDPR compliance details
  - Pro subscription modal ($4.99/mo or $39.99/yr)
  - Sign Out action

---

## 🛠️ Tech Stack & Design System

- **Framework**: Expo SDK 57 (React Native 0.86, React 19)
- **Language**: TypeScript with strict typing
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Colors & Tokens**:
  - Primary Brand Yellow: `#FACC15` / `#EAB308` / `#FEF9C3`
  - Dark Theme: `#111827` (Gray 900) & `#1F2937` (Gray 800)
  - Light Theme: `#F8FAFC` & `#FFFFFF`
  - Success: `#22C55E` / `#DCFCE7`
  - Danger: `#EF4444` / `#FEE2E2`

---

## 🏃 Running the Application

### Start Development Server
```bash
npm start
```

### Run on Web (Browser)
```bash
npm run web
```

### Run on iOS / Android
- Install the **Expo Go** app on your phone.
- Run `npm start` and scan the QR code displayed in your terminal.

