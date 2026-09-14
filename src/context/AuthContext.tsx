import React, { createContext, useContext, useState } from 'react';

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
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
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

  const login = async (email: string, _pass: string) => {
    setUser({
      ...defaultUser,
      email,
      name: email.split('@')[0] || 'Abdul Moeid',
    });
    setIsAuthenticated(true);
    return true;
  };

  const register = async (name: string, email: string, _pass: string) => {
    setUser({
      ...defaultUser,
      name,
      email,
      avatarLetter: name.charAt(0).toUpperCase() || 'A',
    });
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
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

