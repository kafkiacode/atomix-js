// @flow
import { type ActionType } from 'redux-actions';
import initialState from '../initialState';
// import * as actionTypes from '../actionTypes';
import { screenIds } from '../../enums/general';
import * as actions from '../actions/lifecycle';
import {
  LIFECYCLE_MAIN_MENU,
  LIFECYCLE_GAME_ENTER,
  LIFECYCLE_GAME_SHOW_READY,
  // LIFECYCLE_GAME_LOAD,
  LIFECYCLE_GAME_START,
  // LIFECYCLE_GAME_PAUSE,
  // LIFECYCLE_GAME_TIMEUP,
  LIFECYCLE_ATOMS_EXPLODE,
  LIFECYCLE_COUNT_SCORE,
  LIFECYCLE_GAME_PAUSE,
  LIFECYCLE_GAME_PAUSE_END,
  LIFECYCLE_GAME_OVER,
  LIFECYCLE_GAME_WIN,
} from '../actionTypes';
import { gameStages } from '../../enums/game';

type AllowedActionType =
  | ActionType<typeof actions.lifecycleMainMenu>
  | ActionType<typeof actions.lifecycleGameEnter>
  ;

const lifecycle = (
  state: typeof initialState.lifecycle = initialState.lifecycle,
  action: AllowedActionType
): typeof initialState.lifecycle => {
  switch (action.type) {
    case LIFECYCLE_MAIN_MENU:
      return {
        ...state,
        screenId: screenIds.MAIN,
      };
    case LIFECYCLE_GAME_ENTER:
      return {
        ...state,
        screenId: screenIds.GAME,
        stage: gameStages.READY,
        // TODO: payload.difficulty
      };
    case LIFECYCLE_GAME_SHOW_READY:
      return {
        ...state,
        stage: gameStages.READY,
      };
    // case LIFECYCLE_GAME_LOAD:
    case LIFECYCLE_GAME_START:
      return {
        ...state,
        stage: gameStages.PLAYING,
      };
    case LIFECYCLE_GAME_PAUSE:
      return {
        ...state,
        stage: gameStages.PAUSED,
      };
    case LIFECYCLE_GAME_PAUSE_END:
      return {
        ...state,
      };
    case LIFECYCLE_GAME_OVER:
      return {
        ...state,
        stage: gameStages.GAME_OVER,
      };
    case LIFECYCLE_ATOMS_EXPLODE:
      return {
        ...state,
        stage: gameStages.EXPLODING_ATOMS,
      };
    case LIFECYCLE_COUNT_SCORE:
      return {
        ...state,
        stage: gameStages.COUNTING_SCORE,
      };
    case LIFECYCLE_GAME_WIN:
      return {
        ...state,
        stage: gameStages.NEXT_LEVEL,
      };
    default:
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default lifecycle;
