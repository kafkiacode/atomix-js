// @flow
import { type ActionType } from 'redux-actions';
import initialState from '../../initialState';
import {
  CLOCK_TICK,
  LIFECYCLE_GAME_ENTER,
  GAME_LOAD_LEVEL,
  LIFECYCLE_GAME_NEXT_LEVEL,
} from '../../actionTypes';
import { clockTick } from '../../actions/player';

type AllowedActionType =
  | ActionType<typeof clockTick>
  ;

const player = (
  state: typeof initialState.game.player = initialState.game.player,
  action: AllowedActionType
): typeof initialState.game.player => {
  switch (action.type) {
    case LIFECYCLE_GAME_ENTER:
      return {
        ...state,
        levelNumber: 1,
      };
    case GAME_LOAD_LEVEL: // TODO: This should be after first screen
      return {
        ...state,
        timeLeft: action.payload.time,
      };
    case LIFECYCLE_GAME_NEXT_LEVEL:
      return {
        ...state,
        levelNumber: state.levelNumber + 1,
      };
    case CLOCK_TICK:
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };
    default:
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default player;
