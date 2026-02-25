import { Entities, SystemArgs } from '../types';
import { BG_SCROLL_SPEED, GAME_WIDTH } from '../constants';

export default function BackgroundSystem(
  entities: Entities,
  _args: SystemArgs
): Entities {
  const ticks: number = (entities as any)._ticks || 0;
  if (!entities.gameState.gameLive) return entities;

  for (let t = 0; t < ticks; t++) {
    entities.background0.x -= BG_SCROLL_SPEED;
    if (entities.background0.x < -GAME_WIDTH) {
      entities.background0.x = GAME_WIDTH;
    }

    entities.background1.x -= BG_SCROLL_SPEED;
    if (entities.background1.x < -GAME_WIDTH) {
      entities.background1.x = GAME_WIDTH;
    }
  }

  return entities;
}
