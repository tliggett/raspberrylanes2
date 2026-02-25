// Original game canvas dimensions
export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 450;
export const FRAME_RATE = 32;
export const TICK_MS = 1000 / FRAME_RATE; // ~31.25ms

// Horse
export const HORSE_START_X = 30;
export const HORSE_START_Y = GAME_HEIGHT - 250; // 200
export const HORSE_WIDTH = 200;
export const HORSE_HEIGHT = 125;
export const HORSE_FRAME_ACC = 1.25;
export const HORSE_FRAME_SPEED = HORSE_FRAME_ACC * 0.5; // 0.625
export const HORSE_MAX_FRAME = 6; // 7 frames: 0-6
export const HORSE_JUMP_FRAME = 3;
export const HORSE_JUMP_VELOCITY = -30;
export const HORSE_GRAVITY = 3;
export const HORSE_GROUND_Y = GAME_HEIGHT - 250; // 200

// Background
export const BG_SCROLL_SPEED = 25;
export const BG_DRAW_WIDTH = GAME_WIDTH + 25; // 1225
export const BG_DRAW_HEIGHT = GAME_HEIGHT;

// Rattlesnake
export const RATTLER_START_X = GAME_WIDTH;
export const RATTLER_START_Y = GAME_HEIGHT - 200; // 250
export const RATTLER_WIDTH = 200;
export const RATTLER_HEIGHT = 150;
export const RATTLER_SPEED = 25;
export const RATTLER_MAX_FRAME = 4; // 5 frames: 0-4
export const RATTLER_FRAME_SPEED = 1;

// Vulture
export const VULTURE_START_X = GAME_WIDTH;
export const VULTURE_START_Y = GAME_HEIGHT - 400; // 50
export const VULTURE_WIDTH = 200;
export const VULTURE_HEIGHT = 150;
export const VULTURE_SPEED = 28; // 25 + 3
export const VULTURE_MAX_FRAME = 6; // 7 frames: 0-6
export const VULTURE_FRAME_SPEED = 0.25;

// PrairieDog
export const PRAIRIE_START_X = GAME_WIDTH;
export const PRAIRIE_START_Y = GAME_HEIGHT - 150; // 300
export const PRAIRIE_WIDTH = 75;
export const PRAIRIE_HEIGHT = 75;
export const PRAIRIE_SPEED = 25;
export const PRAIRIE_FRAME_COUNT = 29; // 0-28
export const PRAIRIE_FRAME_SPEED = 0.3;

// Tumbleweed
export const TUMBLE_START_X = GAME_WIDTH;
export const TUMBLE_START_Y = GAME_HEIGHT - 200; // 250
export const TUMBLE_INIT_SIZE = 1;
export const TUMBLE_GROW_RATE = 3;
export const TUMBLE_SPEED = 28; // 25 + 3
export const TUMBLE_MAX_FRAME = 6; // wraps at >6, so 0-6 effectively but uses 0-7 images
export const TUMBLE_FRAME_SPEED = 0.4;

// Scoring
export const SCORE_PER_TICK = 1.25;
export const LEVEL_UP_SCORE = 500;

// Title
export const TITLE_TEXT = 'Raspberry Lanes 2: UNBOUND';
