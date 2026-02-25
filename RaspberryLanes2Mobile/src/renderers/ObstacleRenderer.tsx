import React from 'react';
import { Image, View } from 'react-native';
import {
  rattlesnakeFrames,
  vultureFrames,
  prairiedogFrames,
  tumbleweedFrames,
} from '../sprites';
import { getScale } from '../scaling';
import { ObstacleType } from '../types';

interface Props {
  type: ObstacleType;
  x: number;
  y: number;
  width: number;
  height: number;
  frame: number;
  frames?: number[];
}

function getFrameSource(type: ObstacleType, frame: number) {
  const idx = Math.max(0, Math.round(frame));
  switch (type) {
    case 'rattler':
      return rattlesnakeFrames[idx % rattlesnakeFrames.length];
    case 'vulture':
      return vultureFrames[idx % vultureFrames.length];
    case 'prairiedog':
      return prairiedogFrames[idx % prairiedogFrames.length];
    case 'tumbleweed':
      return tumbleweedFrames[idx % tumbleweedFrames.length];
  }
}

const ObstacleRenderer: React.FC<Props> = ({
  type,
  x,
  y,
  width,
  height,
  frame,
  frames,
}) => {
  const { scale, offsetX, offsetY } = getScale();

  // PrairieDog renders multiple sprites side by side
  if (type === 'prairiedog' && frames) {
    return (
      <View style={{ position: 'absolute', left: 0, top: 0 }}>
        {frames.map((f, i) => (
          <Image
            key={i}
            source={getFrameSource('prairiedog', f)}
            style={{
              position: 'absolute',
              left: (x + width * i) * scale + offsetX,
              top: y * scale + offsetY,
              width: width * scale,
              height: height * scale,
            }}
          />
        ))}
      </View>
    );
  }

  return (
    <Image
      source={getFrameSource(type, frame)}
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

export default ObstacleRenderer;
