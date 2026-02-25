import { Dimensions } from 'react-native';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';

export function getScale() {
  const { width, height } = Dimensions.get('window');
  // Use the larger dimension as width (landscape)
  const screenW = Math.max(width, height);
  const screenH = Math.min(width, height);
  const scaleX = screenW / GAME_WIDTH;
  const scaleY = screenH / GAME_HEIGHT;
  // Use uniform scale (fit-to-screen)
  const scale = Math.min(scaleX, scaleY);
  return {
    scale,
    screenW,
    screenH,
    offsetX: (screenW - GAME_WIDTH * scale) / 2,
    offsetY: (screenH - GAME_HEIGHT * scale) / 2,
  };
}
