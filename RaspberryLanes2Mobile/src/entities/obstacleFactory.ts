import { ObstacleEntity, ObstacleType } from '../types';
import * as C from '../constants';
import ObstacleRenderer from '../renderers/ObstacleRenderer';

export function createRattler(): ObstacleEntity {
  return {
    type: 'rattler',
    x: C.RATTLER_START_X,
    y: C.RATTLER_START_Y,
    width: C.RATTLER_WIDTH,
    height: C.RATTLER_HEIGHT,
    frame: 0,
    renderer: ObstacleRenderer,
  };
}

export function createVulture(): ObstacleEntity {
  return {
    type: 'vulture',
    x: C.VULTURE_START_X,
    y: C.VULTURE_START_Y,
    width: C.VULTURE_WIDTH,
    height: C.VULTURE_HEIGHT,
    frame: 0,
    renderer: ObstacleRenderer,
  };
}

export function createPrairieDog(): ObstacleEntity {
  return {
    type: 'prairiedog',
    x: C.PRAIRIE_START_X,
    y: C.PRAIRIE_START_Y,
    width: C.PRAIRIE_WIDTH,
    height: C.PRAIRIE_HEIGHT,
    frame: 0,
    frames: [Math.random() * C.PRAIRIE_FRAME_COUNT],
    renderer: ObstacleRenderer,
  };
}

export function createTumbleweed(): ObstacleEntity {
  return {
    type: 'tumbleweed',
    x: C.TUMBLE_START_X,
    y: C.TUMBLE_START_Y,
    width: C.TUMBLE_INIT_SIZE,
    height: C.TUMBLE_INIT_SIZE,
    frame: 0,
    renderer: ObstacleRenderer,
  };
}

export function randomObstacle(level: number): ObstacleEntity {
  if (level === 1) {
    return createRattler();
  }
  if (level === 2) {
    const r = Math.random() * 2;
    return r > 1 ? createVulture() : createRattler();
  }
  if (level === 3) {
    const r = Math.random() * 3;
    if (r > 2) return createVulture();
    if (r > 1) return createRattler();
    return createPrairieDog();
  }
  // level > 3
  const r = Math.random() * 4;
  if (r > 3) return createVulture();
  if (r > 2) return createRattler();
  if (r > 1) return createTumbleweed();
  return createPrairieDog();
}
