// @flow
import { createAction } from 'redux-actions';
import * as actionTypes from '../actionTypes';
import { type Difficulty } from '../../types/general';

export const init = createAction(actionTypes.INIT);

export const lifecycleStart = createAction(actionTypes.LIFECYCLE_START);
export const lifecycleMainMenu = createAction(actionTypes.LIFECYCLE_MAIN_MENU);
export const lifecycleGameEnter =
  createAction(actionTypes.LIFECYCLE_GAME_ENTER, (difficulty: Difficulty) => ({ difficulty }));
export const lifecycleGameLoad =
  createAction(actionTypes.LIFECYCLE_GAME_LOAD);
export const lifecycleGameShowReady =
  createAction(actionTypes.LIFECYCLE_GAME_SHOW_READY);
export const lifecycleGameStart =
  createAction(actionTypes.LIFECYCLE_GAME_START);
export const lifecycleGamePause =
  createAction(actionTypes.LIFECYCLE_GAME_PAUSE);
export const lifecycleGamePauseEnd =
  createAction(actionTypes.LIFECYCLE_GAME_PAUSE_END);
export const lifecycleGameOver =
  createAction(actionTypes.LIFECYCLE_GAME_OVER);
export const lifecycleGameWin =
  createAction(actionTypes.LIFECYCLE_GAME_WIN);
export const lifecycleGameNextLevel =
  createAction(actionTypes.LIFECYCLE_GAME_NEXT_LEVEL);
export const lifecycleAtomsExplode =
  createAction(actionTypes.LIFECYCLE_ATOMS_EXPLODE, () => undefined);
export const lifecycleAtomsExplodeEnd =
  createAction(actionTypes.LIFECYCLE_ATOMS_EXPLODE_END, () => undefined);
export const lifecycleCountScore =
  createAction(actionTypes.LIFECYCLE_COUNT_SCORE, () => undefined);
export const lifecycleCountScoreEnd =
  createAction(actionTypes.LIFECYCLE_COUNT_SCORE_END, () => undefined);
