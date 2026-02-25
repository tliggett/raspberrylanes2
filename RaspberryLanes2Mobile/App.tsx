import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import GameScreen from './src/GameScreen';

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    ).catch(() => {
      // Orientation lock may not be supported on all platforms
    });
  }, []);

  return <GameScreen />;
}
