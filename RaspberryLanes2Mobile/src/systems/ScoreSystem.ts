import { Entities, SystemArgs } from '../types';
import { SCORE_PER_TICK, LEVEL_UP_SCORE } from '../constants';
import { randomObstacle } from '../entities/obstacleFactory';

export default function ScoreSystem(
  entities: Entities,
  _args: SystemArgs
): Entities {
  const ticks: number = (entities as any)._ticks || 0;
  if (!entities.gameState.gameLive) return entities;

  for (let t = 0; t < ticks; t++) {
    entities.gameState.score += SCORE_PER_TICK;

    if (entities.gameState.score > LEVEL_UP_SCORE) {
      entities.gameState.score = 0;
      entities.gameState.level++;

      // Add new obstacle slot on level-up
      if (!entities.obstacle1) {
        entities.obstacle1 = randomObstacle(entities.gameState.level);
      } else if (!entities.obstacle2) {
        entities.obstacle2 = randomObstacle(entities.gameState.level);
      }
    }
  }

  return entities;
}
