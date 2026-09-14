import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { BottomTabBar, TabName } from '../components/navigation/BottomTabBar';

// Auth & Onboarding Screens
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { OtpVerificationScreen } from '../screens/auth/OtpVerificationScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';

// Tab Screens
import { HomeScreen } from '../screens/tabs/HomeScreen';
import { LearnScreen } from '../screens/tabs/LearnScreen';
import { GamesScreen } from '../screens/tabs/GamesScreen';
import { ProgressScreen } from '../screens/tabs/ProgressScreen';
import { ProfileScreen } from '../screens/tabs/ProfileScreen';

// Modal & Secondary Screens
import { ModuleDetailScreen } from '../screens/lesson/ModuleDetailScreen';
import { LessonPlayerScreen } from '../screens/lesson/LessonPlayerScreen';
import { GamePlayScreen } from '../screens/game/GamePlayScreen';
import { BadgesScreen } from '../screens/secondary/BadgesScreen';
import { NotificationsScreen } from '../screens/secondary/NotificationsScreen';
import { PrivacyPolicyScreen } from '../screens/secondary/PrivacyPolicyScreen';
import { PremiumModal } from '../screens/secondary/PremiumModal';

import { MODULES_DATA, Module, Lesson, Game } from '../data/mockData';

type AuthScreenType =
  | 'login'
  | 'register'
  | 'forgot_password'
  | 'otp'
  | 'reset_password';

type ActiveModalType =
  | 'none'
  | 'module_detail'
  | 'lesson_player'
  | 'game_play'
  | 'badges'
  | 'notifications'
  | 'privacy';

export const RootNavigator: React.FC = () => {
  const { isDark, colors } = useTheme();
  const { isAuthenticated, hasSeenOnboarding, loading } = useAuth();

  // Navigation states
  const [currentTab, setCurrentTab] = useState<TabName>('home');
  const [authScreen, setAuthScreen] = useState<AuthScreenType>('login');
  const [authEmail, setAuthEmail] = useState<string>('');
  const [otpFlowType, setOtpFlowType] = useState<'signup' | 'recovery'>('signup');

  const [activeModal, setActiveModal] = useState<ActiveModalType>('none');
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);

  // Payload states for active items
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // 1. Initial Loading Splash Screen (Restoring JWT session from SecureStore)
  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: isDark ? '#111827' : '#F8FAFC' },
        ]}
      >
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? '#111827' : '#F8FAFC'}
        />
        <View style={styles.splashBrand}>
          <View style={styles.splashLogo}>
            <Text style={styles.splashJs}>JS</Text>
          </View>
          <Text style={[styles.splashTitle, { color: colors.text }]}>
            JS0pro
          </Text>
        </View>
        <ActivityIndicator
          size="large"
          color="#FACC15"
          style={{ marginTop: 24 }}
        />
        <Text style={[styles.splashSub, { color: colors.textSecondary }]}>
          Restoring session...
        </Text>
      </View>
    );
  }

  // 2. Onboarding flow
  if (!hasSeenOnboarding) {
    return <OnboardingScreen onFinish={() => setAuthScreen('login')} />;
  }

  // 3. Auth flow (when not authenticated)
  if (!isAuthenticated) {
    if (authScreen === 'register') {
      return (
        <RegisterScreen
          onNavigateToLogin={() => setAuthScreen('login')}
          onRegisterSuccess={(email, requiresVerification) => {
            setAuthEmail(email);
            if (requiresVerification) {
              setOtpFlowType('signup');
              setAuthScreen('otp');
            }
          }}
        />
      );
    }

    if (authScreen === 'forgot_password') {
      return (
        <ForgotPasswordScreen
          onBack={() => setAuthScreen('login')}
          onSubmitSuccess={(email) => {
            setAuthEmail(email);
            setOtpFlowType('recovery');
            setAuthScreen('otp');
          }}
        />
      );
    }

    if (authScreen === 'otp') {
      return (
        <OtpVerificationScreen
          email={authEmail}
          flowType={otpFlowType}
          onBack={() => {
            if (otpFlowType === 'recovery') {
              setAuthScreen('forgot_password');
            } else {
              setAuthScreen('register');
            }
          }}
          onVerifySuccess={() => {
            if (otpFlowType === 'recovery') {
              setAuthScreen('reset_password');
            } else {
              // For signup, Supabase verifyOtp signs the user in automatically,
              // triggering onAuthStateChange and setting isAuthenticated=true!
            }
          }}
        />
      );
    }

    if (authScreen === 'reset_password') {
      return (
        <ResetPasswordScreen
          onBack={() => setAuthScreen('login')}
          onSuccess={() => setAuthScreen('login')}
        />
      );
    }

    return (
      <LoginScreen
        initialEmail={authEmail}
        onNavigateToRegister={() => setAuthScreen('register')}
        onNavigateToForgotPassword={() => setAuthScreen('forgot_password')}
        onNavigateToOtp={(email) => {
          setAuthEmail(email);
          setOtpFlowType('signup');
          setAuthScreen('otp');
        }}
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

  // 4. Modal views
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

  // 5. Main Tab Navigation (Authenticated)
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashBrand: {
    alignItems: 'center',
  },
  splashLogo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#FACC15',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FACC15',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  splashJs: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0F172A',
  },
  splashTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 12,
    letterSpacing: -0.5,
  },
  splashSub: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
  },
});
