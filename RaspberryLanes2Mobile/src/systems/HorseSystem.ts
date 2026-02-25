import { Entities, SystemArgs } from '../types';
import * as C from '../constants';
import { startGame } from '../entities/createEntities';

export default function HorseSystem(
  entities: Entities,
  { touches }: SystemArgs
): Entities {
  const ticks: number = (entities as any)._ticks || 0;
  const { horse, gameState } = entities;

  // Handle touch input
  const pressed = touches.some((t) => t.type === 'press');
  if (pressed) {
    if (gameState.gameLive) {
      // Jump
      if (!horse.inJump) {
        horse.inJump = true;
        horse.velocityY = C.HORSE_JUMP_VELOCITY;
        horse.accelerationY = C.HORSE_GRAVITY;
      }
    } else {
      // Start or restart
      startGame(entities);
      return entities;
    }
  }

  if (!gameState.gameLive) return entities;

  // Run horse logic for each tick
  for (let t = 0; t < ticks; t++) {
    // Animation
    horse.frame += C.HORSE_FRAME_SPEED;
    if (horse.frame > C.HORSE_MAX_FRAME) {
      horse.frame = 0;
    }

    // Jump physics
    if (horse.inJump) {
      horse.frame = C.HORSE_JUMP_FRAME;
      horse.velocityY += horse.accelerationY;
      horse.y += horse.velocityY;
      if (horse.y > C.HORSE_GROUND_Y) {
        horse.y = C.HORSE_GROUND_Y;
        horse.inJump = false;
      }
    }
  }

  return entities;
}
