import TickSystem from './TickSystem';
import HorseSystem from './HorseSystem';
import BackgroundSystem from './BackgroundSystem';
import ObstacleSystem from './ObstacleSystem';
import CollisionSystem from './CollisionSystem';
import ScoreSystem from './ScoreSystem';

// Order matters: tick first, then input/movement, then collision, then scoring
export const systems = [
  TickSystem,
  HorseSystem,
  BackgroundSystem,
  ObstacleSystem,
  CollisionSystem,
  ScoreSystem,
];
