import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { BottomTabBar, TabName } from '../components/navigation/BottomTabBar';

// Screens
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { OtpVerificationScreen } from '../screens/auth/OtpVerificationScreen';

import { HomeScreen } from '../screens/tabs/HomeScreen';
import { LearnScreen } from '../screens/tabs/LearnScreen';
import { GamesScreen } from '../screens/tabs/GamesScreen';
import { ProgressScreen } from '../screens/tabs/ProgressScreen';
import { ProfileScreen } from '../screens/tabs/ProfileScreen';

import { ModuleDetailScreen } from '../screens/lesson/ModuleDetailScreen';
import { LessonPlayerScreen } from '../screens/lesson/LessonPlayerScreen';
import { GamePlayScreen } from '../screens/game/GamePlayScreen';
import { BadgesScreen } from '../screens/secondary/BadgesScreen';
import { NotificationsScreen } from '../screens/secondary/NotificationsScreen';
import { PrivacyPolicyScreen } from '../screens/secondary/PrivacyPolicyScreen';
import { PremiumModal } from '../screens/secondary/PremiumModal';

import { MODULES_DATA, Module, Lesson, Game } from '../data/mockData';

type AuthScreenType = 'login' | 'register' | 'forgot_password' | 'otp';
type ActiveModalType =
  | 'none'
  | 'module_detail'
  | 'lesson_player'
  | 'game_play'
  | 'badges'
  | 'notifications'
  | 'privacy';

export const RootNavigator: React.FC = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, hasSeenOnboarding } = useAuth();

  // Navigation states
  const [currentTab, setCurrentTab] = useState<TabName>('home');
  const [authScreen, setAuthScreen] = useState<AuthScreenType>('login');
  const [activeModal, setActiveModal] = useState<ActiveModalType>('none');
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);

  // Payload states for active items
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // 1. Onboarding flow
  if (!hasSeenOnboarding) {
    return <OnboardingScreen onFinish={() => setAuthScreen('login')} />;
  }

  // 2. Auth flow
  if (!isAuthenticated) {
    if (authScreen === 'register') {
      return (
        <RegisterScreen
          onNavigateToLogin={() => setAuthScreen('login')}
          onRegisterSuccess={() => {}}
        />
      );
    }
    if (authScreen === 'forgot_password') {
      return (
        <ForgotPasswordScreen
          onBack={() => setAuthScreen('login')}
          onSubmitSuccess={() => setAuthScreen('otp')}
        />
      );
    }
    if (authScreen === 'otp') {
      return (
        <OtpVerificationScreen
          onBack={() => setAuthScreen('forgot_password')}
          onVerifySuccess={() => setAuthScreen('login')}
        />
      );
    }
    return (
      <LoginScreen
        onNavigateToRegister={() => setAuthScreen('register')}
        onNavigateToForgotPassword={() => setAuthScreen('forgot_password')}
        onLoginSuccess={() => {}}
      />
    );
  }

  // Handlers for modal screens
  const handleOpenModule = (mod: Module) => {
    setSelectedModule(mod);
    setActiveModal('module_detail');
  };

  const handleStartLessonFromHome = (moduleId: string, lessonId: string) => {
    const mod = MODULES_DATA.find((m) => m.id === moduleId);
    const les = mod?.lessons.find((l) => l.id === lessonId);
    if (les) {
      setSelectedLesson(les);
      setActiveModal('lesson_player');
    }
  };

  const handleSelectLessonFromModule = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setActiveModal('lesson_player');
  };

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
    setActiveModal('game_play');
  };

  // 3. Modal views
  if (activeModal === 'lesson_player' && selectedLesson) {
    return (
      <LessonPlayerScreen
        lesson={selectedLesson}
        onClose={() => setActiveModal('none')}
      />
    );
  }

  if (activeModal === 'module_detail' && selectedModule) {
    return (
      <ModuleDetailScreen
        module={selectedModule}
        onBack={() => setActiveModal('none')}
        onSelectLesson={handleSelectLessonFromModule}
      />
    );
  }

  if (activeModal === 'game_play' && selectedGame) {
    return (
      <GamePlayScreen
        game={selectedGame}
        onClose={() => setActiveModal('none')}
        onReviewLesson={() => {
          const mod = MODULES_DATA[0];
          setSelectedModule(mod);
          setActiveModal('module_detail');
        }}
      />
    );
  }

  if (activeModal === 'badges') {
    return <BadgesScreen onBack={() => setActiveModal('none')} />;
  }

  if (activeModal === 'notifications') {
    return <NotificationsScreen onBack={() => setActiveModal('none')} />;
  }

  if (activeModal === 'privacy') {
    return <PrivacyPolicyScreen onBack={() => setActiveModal('none')} />;
  }

  // 4. Main Tab Navigation
  return (
    <View style={styles.root}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#111827' : '#F8FAFC'}
      />

      <View style={styles.tabContent}>
        {currentTab === 'home' && (
          <HomeScreen
            onStartLesson={handleStartLessonFromHome}
            onNavigateToNotifications={() => setActiveModal('notifications')}
            onNavigateToProgress={() => setCurrentTab('progress')}
            onNavigateToLearn={() => setCurrentTab('learn')}
          />
        )}

        {currentTab === 'learn' && (
          <LearnScreen
            onSelectModule={handleOpenModule}
            onOpenUpgradeModal={() => setShowPremiumModal(true)}
          />
        )}

        {currentTab === 'games' && (
          <GamesScreen
            onPlayGame={handlePlayGame}
            onOpenUpgradeModal={() => setShowPremiumModal(true)}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressScreen
            onNavigateToBadges={() => setActiveModal('badges')}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen
            onNavigateToBadges={() => setActiveModal('badges')}
            onNavigateToNotifications={() => setActiveModal('notifications')}
            onNavigateToPrivacy={() => setActiveModal('privacy')}
            onOpenUpgradeModal={() => setShowPremiumModal(true)}
          />
        )}
      </View>

      {/* Bottom Tab Bar */}
      <BottomTabBar currentTab={currentTab} onTabSelect={setCurrentTab} />

      {/* Pro / Premium Modal */}
      <PremiumModal
        visible={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
  },
});

