import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ActivityIndicator, BackHandler } from 'react-native';
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
import { LinkExpiredModal } from '../components/common/LinkExpiredModal';

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
  const {
    isAuthenticated,
    hasSeenOnboarding,
    loading,
    isPasswordRecovery,
    setIsPasswordRecovery,
    linkError,
    clearLinkError,
  } = useAuth();

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

  // Android Hardware Back Button handling for Google Play standard UX
  useEffect(() => {
    const onBackPress = () => {
      // 1. If link expired / error modal is showing, dismiss it
      if (linkError) {
        clearLinkError();
        return true;
      }

      // 2. If Premium modal is open, close it
      if (showPremiumModal) {
        setShowPremiumModal(false);
        return true;
      }

      // 3. If any secondary/content modal is open, close it
      if (activeModal !== 'none') {
        setActiveModal('none');
        return true;
      }

      // 4. If in unauthenticated flow
      if (!isAuthenticated) {
        if (authScreen === 'register' || authScreen === 'forgot_password') {
          setAuthScreen('login');
          return true;
        }
        if (authScreen === 'otp') {
          if (otpFlowType === 'recovery') {
            setAuthScreen('forgot_password');
          } else {
            setAuthScreen('register');
          }
          return true;
        }
        if (authScreen === 'reset_password' || isPasswordRecovery) {
          setIsPasswordRecovery(false);
          setAuthScreen('login');
          return true;
        }
        // At login screen, allow app to exit normally
        return false;
      }

      // 5. If in authenticated tabs, navigating back from another tab returns to home tab
      if (currentTab !== 'home') {
        setCurrentTab('home');
        return true;
      }

      // 6. When already at home root, allow default system exit
      return false;
    };

    const backSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => backSubscription.remove();
  }, [
    linkError,
    showPremiumModal,
    activeModal,
    isAuthenticated,
    authScreen,
    otpFlowType,
    isPasswordRecovery,
    currentTab,
    clearLinkError,
    setIsPasswordRecovery,
  ]);

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

  // 3. Password recovery flow (triggered when clicking reset link in email)
  if (isPasswordRecovery || authScreen === 'reset_password') {
    return (
      <View style={{ flex: 1 }}>
        <ResetPasswordScreen
          onBack={() => {
            setIsPasswordRecovery(false);
            setAuthScreen('login');
          }}
          onSuccess={() => {
            setIsPasswordRecovery(false);
            setAuthScreen('login');
          }}
          onRequestNewLink={() => {
            setIsPasswordRecovery(false);
            setAuthScreen('forgot_password');
          }}
        />
        <LinkExpiredModal
          visible={!!linkError}
          title={linkError?.title}
          message={linkError?.message}
          onSignIn={() => {
            clearLinkError();
            setIsPasswordRecovery(false);
            setAuthScreen('login');
          }}
          onRequestNewLink={() => {
            clearLinkError();
            setIsPasswordRecovery(false);
            setAuthScreen('forgot_password');
          }}
          onClose={clearLinkError}
        />
      </View>
    );
  }

  // 4. Auth flow (when not authenticated)
  if (!isAuthenticated) {
    let authScreenView = null;

    if (authScreen === 'register') {
      authScreenView = (
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
    } else if (authScreen === 'forgot_password') {
      authScreenView = (
        <ForgotPasswordScreen
          onBack={() => setAuthScreen('login')}
          onSubmitSuccess={(email) => {
            setAuthEmail(email);
          }}
        />
      );
    } else if (authScreen === 'otp') {
      authScreenView = (
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
            }
          }}
        />
      );
    } else {
      authScreenView = (
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

    return (
      <View style={{ flex: 1 }}>
        {authScreenView}
        <LinkExpiredModal
          visible={!!linkError}
          title={linkError?.title}
          message={linkError?.message}
          onSignIn={() => {
            clearLinkError();
            setAuthScreen('login');
          }}
          onRequestNewLink={() => {
            clearLinkError();
            setAuthScreen('forgot_password');
          }}
          onClose={clearLinkError}
        />
      </View>
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
          let mod = MODULES_DATA[0];
          if (selectedGame.gameType === 'array_rescue') {
            mod = MODULES_DATA[6] || MODULES_DATA[0];
          } else if (selectedGame.gameType === 'object_safari') {
            mod = MODULES_DATA[7] || MODULES_DATA[0];
          } else if (selectedGame.gameType === 'conditional_quest') {
            mod = MODULES_DATA[3] || MODULES_DATA[0];
          } else if (selectedGame.gameType === 'loop_hive') {
            mod = MODULES_DATA[4] || MODULES_DATA[0];
          } else if (selectedGame.gameType === 'async_race') {
            mod = MODULES_DATA[15] || MODULES_DATA[0];
          }
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

      {/* Global Link Expired / Status Modal */}
      <LinkExpiredModal
        visible={!!linkError}
        title={linkError?.title}
        message={linkError?.message}
        onSignIn={() => {
          clearLinkError();
          setAuthScreen('login');
        }}
        onRequestNewLink={() => {
          clearLinkError();
          setAuthScreen('forgot_password');
        }}
        onClose={clearLinkError}
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
