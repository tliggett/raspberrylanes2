import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getScale } from '../scaling';
import { TITLE_TEXT } from '../constants';

interface Props {
  gameLive: boolean;
  gameOver: boolean;
  score: number;
  level: number;
}

const HudRenderer: React.FC<Props> = ({ gameLive, gameOver, score, level }) => {
  const { scale, offsetX, offsetY } = getScale();
  const fontSize = 32 * scale;

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Title - always shown, matching original */}
      <Text
        style={[
          styles.title,
          {
            fontSize,
            left: offsetX,
            top: 8 * scale + offsetY,
          },
        ]}
      >
        {TITLE_TEXT}
      </Text>

      {gameLive && (
        <>
          <Text
            style={[
              styles.score,
              {
                fontSize: fontSize * 0.75,
                right: 10 * scale + offsetX,
                top: 8 * scale + offsetY,
              },
            ]}
          >
            Score: {Math.floor(score)}  Level: {level}
          </Text>
        </>
      )}

      {gameOver && (
        <View style={styles.overlay}>
          <Text style={[styles.gameOver, { fontSize: fontSize * 2 }]}>
            GAME OVER
          </Text>
          <Text style={[styles.tapText, { fontSize }]}>Tap to play again</Text>
        </View>
      )}

      {!gameLive && !gameOver && (
        <View style={styles.overlay}>
          <Text style={[styles.tapText, { fontSize }]}>Tap to start</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    position: 'absolute',
    color: 'rgb(255, 0, 0)',
    fontWeight: 'bold',
  },
  score: {
    position: 'absolute',
    color: 'rgb(255, 0, 0)',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOver: {
    color: 'rgb(255, 0, 0)',
    fontWeight: 'bold',
  },
  tapText: {
    color: 'rgb(255, 255, 255)',
    marginTop: 20,
  },
});

export default HudRenderer;
