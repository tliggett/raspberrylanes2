import { ImageSourcePropType } from 'react-native';

export type ObstacleType = 'rattler' | 'vulture' | 'prairiedog' | 'tumbleweed';

export interface HorseEntity {
  x: number;
  y: number;
  width: number;
  height: number;
  frame: number;
  velocityY: number;
  accelerationY: number;
  inJump: boolean;
  renderer: React.ComponentType<any>;
}

export interface BackgroundEntity {
  x: number;
  y: number;
  renderer: React.ComponentType<any>;
}

export interface ObstacleEntity {
  type: ObstacleType;
  x: number;
  y: number;
  width: number;
  height: number;
  frame: number;
  frames?: number[]; // PrairieDog uses an array of frames
  renderer: React.ComponentType<any>;
}

export interface GameStateEntity {
  gameLive: boolean;
  gameOver: boolean;
  score: number;
  level: number;
  renderer: React.ComponentType<any>;
}

export interface Entities {
  horse: HorseEntity;
  background0: BackgroundEntity;
  background1: BackgroundEntity;
  obstacle0?: ObstacleEntity;
  obstacle1?: ObstacleEntity;
  obstacle2?: ObstacleEntity;
  gameState: GameStateEntity;
  [key: string]: any;
}

export interface TouchEvent {
  type: string;
  event: {
    pageX: number;
    pageY: number;
  };
}

export interface GameEvent {
  type: string;
}

export interface SystemArgs {
  touches: TouchEvent[];
  time: { delta: number };
  events: GameEvent[];
  dispatch: (event: GameEvent) => void;
}
