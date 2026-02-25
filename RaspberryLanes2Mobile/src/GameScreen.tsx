import React, { useRef, useEffect } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { createEntities } from './entities/createEntities';
import { systems } from './systems';
import { resetAccumulator } from './systems/TickSystem';
import { playMusic } from './audio/AudioManager';

export default function GameScreen() {
  const engineRef = useRef<GameEngine>(null);

  useEffect(() => {
    playMusic();
    resetAccumulator();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <GameEngine
        ref={engineRef}
        style={styles.engine}
        systems={systems}
        entities={createEntities()}
        running={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  engine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
