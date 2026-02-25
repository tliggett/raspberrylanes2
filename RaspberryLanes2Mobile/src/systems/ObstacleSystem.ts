import { Entities, ObstacleEntity, SystemArgs } from '../types';
import * as C from '../constants';
import { randomObstacle } from '../entities/obstacleFactory';

function moveObstacle(obs: ObstacleEntity): void {
  switch (obs.type) {
    case 'rattler':
      obs.x -= C.RATTLER_SPEED;
      obs.frame += C.RATTLER_FRAME_SPEED;
      if (obs.frame > C.RATTLER_MAX_FRAME) {
        obs.frame = 0;
      }
      break;

    case 'vulture':
      obs.x -= C.VULTURE_SPEED; // 25 + 3
      obs.frame += C.VULTURE_FRAME_SPEED;
      if (obs.frame > C.VULTURE_MAX_FRAME) {
        obs.frame = 0;
      }
      break;

    case 'prairiedog':
      obs.x -= C.PRAIRIE_SPEED;
      if (obs.frames) {
        for (let i = 0; i < obs.frames.length; i++) {
          obs.frames[i] += C.PRAIRIE_FRAME_SPEED;
          if (obs.frames[i] > C.PRAIRIE_FRAME_COUNT - 1) {
            obs.frames[i] = 0;
          }
        }
      }
      break;

    case 'tumbleweed':
      obs.x -= C.TUMBLE_SPEED; // 25 + 3
      obs.width += C.TUMBLE_GROW_RATE;
      obs.height += C.TUMBLE_GROW_RATE;
      obs.frame += C.TUMBLE_FRAME_SPEED;
      if (obs.frame > C.TUMBLE_MAX_FRAME) {
        obs.frame = 0;
      }
      break;
  }
}

function isGone(obs: ObstacleEntity): boolean {
  switch (obs.type) {
    case 'prairiedog':
      return obs.x < -obs.width * 5;
    default:
      return obs.x < -obs.width;
  }
}

export default function ObstacleSystem(
  entities: Entities,
  _args: SystemArgs
): Entities {
  const ticks: number = (entities as any)._ticks || 0;
  if (!entities.gameState.gameLive) return entities;

  const level = entities.gameState.level;

  for (let t = 0; t < ticks; t++) {
    for (const key of ['obstacle0', 'obstacle1', 'obstacle2'] as const) {
      const obs = entities[key];
      if (!obs) continue;

      moveObstacle(obs);

      if (isGone(obs)) {
        entities[key] = randomObstacle(level);
      }
    }
  }

  return entities;
}
