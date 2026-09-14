import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { GameProgressProvider } from './src/context/GameProgressContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <GameProgressProvider>
            <RootNavigator />
          </GameProgressProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
