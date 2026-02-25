import { Entities, SystemArgs } from '../types';
import { TICK_MS } from '../constants';

// Accumulator for delta-time pacing at 32 FPS
let accumulator = 0;

export function resetAccumulator() {
  accumulator = 0;
}

export default function TickSystem(
  entities: Entities,
  { time }: SystemArgs
): Entities {
  accumulator += time.delta;

  // Store how many ticks to process this frame
  let ticks = 0;
  while (accumulator >= TICK_MS) {
    accumulator -= TICK_MS;
    ticks++;
  }
  // Cap to prevent spiral of death
  if (ticks > 4) ticks = 4;

  // Store tick count for other systems to read
  (entities as any)._ticks = ticks;
  return entities;
}
