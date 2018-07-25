// @flow
import {
  basicDirections,
  gameStages,
  boardTiles,
  gameMessages,
} from '../enums/game';

export type GameMessage = $Keys<typeof gameMessages>;
export type BasicDirection = $Keys<typeof basicDirections>;
export type GameStage = $Keys<typeof gameStages>;
export type BoardTile = $Keys<typeof boardTiles>;
