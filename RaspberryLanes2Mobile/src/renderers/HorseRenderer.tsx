import React from 'react';
import { Image } from 'react-native';
import { horseFrames } from '../sprites';
import { getScale } from '../scaling';

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  frame: number;
}

const HorseRenderer: React.FC<Props> = ({ x, y, width, height, frame }) => {
  const { scale, offsetX, offsetY } = getScale();
  const frameIndex = Math.round(frame) % horseFrames.length;
  return (
    <Image
      source={horseFrames[frameIndex]}
      style={{
        position: 'absolute',
        left: x * scale + offsetX,
        top: y * scale + offsetY,
        width: width * scale,
        height: height * scale,
      }}
    />
  );
};

export default HorseRenderer;
