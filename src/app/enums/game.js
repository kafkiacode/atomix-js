// @flow

export const gameMessages = {
  START: 'START',
  PAUSE: 'PAUSE',
  RETRY: 'RETRY',
  WIN: 'WIN',
  LOSE: 'LOSE',
};

export const gameStages = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  EXPLODING_ATOMS: 'EXPLODING_ATOMS',
  COUNTING_SCORE: 'COUNTING_SCORE',
  // TIMEUP: 'TIMEUP',
  GAME_OVER: 'GAME_OVER',
  NEXT_LEVEL: 'NEXT_LEVEL',
};

export const basicDirections = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

export const boardTiles = {
  EMPTY: 'EMPTY',
  FLOOR: 'FLOOR',
  WALL_INTERNAL: 'WALL_INTERNAL',
  WALL_EXTERNAL: 'WALL_EXTERNAL',
};
