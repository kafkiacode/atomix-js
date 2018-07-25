// @flow
import { type ActionType } from 'redux-actions';
import initialState from '../initialState';
import { LIFECYCLE_GAME_ENTER } from '../actionTypes';
import { lifecycleGameEnter } from '../actions/lifecycle';

type AllowedActionType =
  | ActionType<typeof lifecycleGameEnter>
  ;

const lifecycle = (
  state: typeof initialState.settings = initialState.settings,
  action: AllowedActionType,
): typeof initialState.settings => {
  switch (action.type) {
    case LIFECYCLE_GAME_ENTER:
      return {
        ...state,
        difficulty: action.payload.difficulty,
      };
    default:
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default lifecycle;
