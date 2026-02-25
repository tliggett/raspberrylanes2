import { Entities } from '../types';
import * as C from '../constants';
import BackgroundRenderer from '../renderers/BackgroundRenderer';
import HorseRenderer from '../renderers/HorseRenderer';
import HudRenderer from '../renderers/HudRenderer';
import { createRattler } from './obstacleFactory';

export function createEntities(): Entities {
  return {
    background0: {
      x: 0,
      y: 0,
      renderer: BackgroundRenderer,
    },
    background1: {
      x: C.GAME_WIDTH,
      y: 0,
      renderer: BackgroundRenderer,
    },
    horse: {
      x: C.HORSE_START_X,
      y: C.HORSE_START_Y,
      width: C.HORSE_WIDTH,
      height: C.HORSE_HEIGHT,
      frame: 0,
      velocityY: 0,
      accelerationY: 0,
      inJump: false,
      renderer: HorseRenderer,
    },
    gameState: {
      gameLive: false,
      gameOver: false,
      score: 0,
      level: 1,
      renderer: HudRenderer,
    },
  };
}

export function startGame(entities: Entities): void {
  entities.gameState.gameLive = true;
  entities.gameState.gameOver = false;
  entities.gameState.score = 0;
  entities.gameState.level = 1;

  // Reset horse
  entities.horse.x = C.HORSE_START_X;
  entities.horse.y = C.HORSE_START_Y;
  entities.horse.frame = 0;
  entities.horse.velocityY = 0;
  entities.horse.accelerationY = 0;
  entities.horse.inJump = false;

  // Reset backgrounds
  entities.background0.x = 0;
  entities.background0.y = 0;
  entities.background1.x = C.GAME_WIDTH;
  entities.background1.y = 0;

  // Start with one rattler
  entities.obstacle0 = createRattler();
  delete entities.obstacle1;
  delete entities.obstacle2;
}
