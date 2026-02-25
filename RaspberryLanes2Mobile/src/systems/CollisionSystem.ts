import { Entities, ObstacleEntity, SystemArgs } from '../types';
import { GAME_HEIGHT } from '../constants';

function checkKill(obs: ObstacleEntity, horseX: number, horseY: number, horseSizeX: number, horseSizeY: number): boolean {
  switch (obs.type) {
    case 'rattler':
      // abs(x - (horse.x + horse.sizeX - 100)) < 10 && horse.y > height-300
      return (
        Math.abs(obs.x - (horseX + horseSizeX - 100)) < 10 &&
        horseY > GAME_HEIGHT - 300
      );

    case 'vulture':
      // abs(x - (horse.x + horse.sizeX - 100)) < 10 && horse.y < height-350
      return (
        Math.abs(obs.x - (horseX + horseSizeX - 100)) < 10 &&
        horseY < GAME_HEIGHT - 350
      );

    case 'prairiedog':
      if (!obs.frames) return false;
      for (let i = 0; i < obs.frames.length; i++) {
        // abs((x + sizeX*i + sizeX/2) - (horse.x + horse.sizeX/2)) < 50
        // && horse.y > height-275 && frame[i] >= 3 && frame[0] <= 7
        if (
          Math.abs(
            obs.x + obs.width * i + obs.width / 2 -
            (horseX + horseSizeX / 2)
          ) < 50 &&
          horseY > GAME_HEIGHT - 275 &&
          obs.frames[i] >= 3 &&
          obs.frames[0] <= 7
        ) {
          return true;
        }
      }
      return false;

    case 'tumbleweed':
      // Same collision as rattler
      return (
        Math.abs(obs.x - (horseX + horseSizeX - 100)) < 10 &&
        horseY > GAME_HEIGHT - 300
      );
  }
}

export default function CollisionSystem(
  entities: Entities,
  _args: SystemArgs
): Entities {
  if (!entities.gameState.gameLive) return entities;

  const { horse } = entities;

  for (const key of ['obstacle0', 'obstacle1', 'obstacle2'] as const) {
    const obs = entities[key];
    if (!obs) continue;

    if (checkKill(obs, horse.x, horse.y, horse.width, horse.height)) {
      entities.gameState.gameLive = false;
      entities.gameState.gameOver = true;
      return entities;
    }
  }

  return entities;
}
