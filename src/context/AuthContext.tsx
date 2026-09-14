import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarLetter: string;
  isPro: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  completeOnboarding: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const defaultUser: UserProfile = {
  id: 'usr_1',
  name: 'Abdul Moeid',
  username: '@abdul.moeid',
  email: 'abdul@example.com',
  avatarLetter: 'A',
  isPro: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize Supabase session on startup
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const name = u.user_metadata?.name || u.email?.split('@')[0] || 'Abdul Moeid';
        setUser({
          id: u.id,
          name,
          username: `@${name.toLowerCase().replace(/\s+/g, '.')}`,
          email: u.email || 'abdul@example.com',
          avatarLetter: name.charAt(0).toUpperCase() || 'A',
          isPro: false,
        });
        setIsAuthenticated(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        const name = u.user_metadata?.name || u.email?.split('@')[0] || 'Abdul Moeid';
        setUser({
          id: u.id,
          name,
          username: `@${name.toLowerCase().replace(/\s+/g, '.')}`,
          email: u.email || 'abdul@example.com',
          avatarLetter: name.charAt(0).toUpperCase() || 'A',
          isPro: false,
        });
        setIsAuthenticated(true);
      } else {
        // Keep default demo user if not logged into Supabase
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        // Fallback for development/offline testing
        console.log('Supabase signin notice:', error.message);
        setUser({
          ...defaultUser,
          email,
          name: email.split('@')[0] || 'Abdul Moeid',
        });
        setIsAuthenticated(true);
        return true;
      }

      if (data.user) {
        const name =
          data.user.user_metadata?.name || email.split('@')[0] || 'Abdul Moeid';
        setUser({
          id: data.user.id,
          name,
          username: `@${name.toLowerCase().replace(/\s+/g, '.')}`,
          email,
          avatarLetter: name.charAt(0).toUpperCase() || 'A',
          isPro: false,
        });
        setIsAuthenticated(true);
      }
      return true;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.log('Supabase signup notice:', error.message);
        setUser({
          ...defaultUser,
          name,
          email,
          avatarLetter: name.charAt(0).toUpperCase() || 'A',
        });
        setIsAuthenticated(true);
        return true;
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          name,
          username: `@${name.toLowerCase().replace(/\s+/g, '.')}`,
          email,
          avatarLetter: name.charAt(0).toUpperCase() || 'A',
          isPro: false,
        });
        setIsAuthenticated(true);
      }
      return true;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setUser(null);
    setIsAuthenticated(false);
  };

  const completeOnboarding = () => {
    setHasSeenOnboarding(true);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        hasSeenOnboarding,
        loading,
        login,
        register,
        logout,
        completeOnboarding,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
