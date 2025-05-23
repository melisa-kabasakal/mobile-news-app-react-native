import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { ThemeProvider } from './src/context/ThemeProvider';
import { SearchProvider } from './src/context/SearchContext';

import BottomTabs from './src/navigation/BottomTabs';

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <SearchProvider>
          <BottomTabs />
        </SearchProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
