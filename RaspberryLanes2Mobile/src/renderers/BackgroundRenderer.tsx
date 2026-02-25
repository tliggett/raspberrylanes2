import React from 'react';
import { Image } from 'react-native';
import { backgroundImage } from '../sprites';
import { getScale } from '../scaling';
import { BG_DRAW_WIDTH, BG_DRAW_HEIGHT } from '../constants';

interface Props {
  x: number;
  y: number;
}

const BackgroundRenderer: React.FC<Props> = ({ x, y }) => {
  const { scale, offsetX, offsetY } = getScale();
  return (
    <Image
      source={backgroundImage}
      style={{
        position: 'absolute',
        left: x * scale + offsetX,
        top: y * scale + offsetY,
        width: BG_DRAW_WIDTH * scale,
        height: BG_DRAW_HEIGHT * scale,
      }}
    />
  );
};

export default BackgroundRenderer;
