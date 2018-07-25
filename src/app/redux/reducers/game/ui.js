// @flow
import { type ActionType } from 'redux-actions';
import initialState from '../../initialState';
import * as actionTypes from '../../actionTypes';
import * as gameActions from '../../actions/game';

type AllowedActionType =
  | ActionType<typeof gameActions.gameUiTouch>
  | ActionType<typeof gameActions.gameUiTouchLean>
  | ActionType<typeof gameActions.gameUiTouchRelease>
  | ActionType<typeof gameActions.gameUiAtomMove>
  | ActionType<typeof gameActions.gameUiAtomMoveEnd>
  ;

const ui = (
  state: typeof initialState.game.ui = initialState.game.ui,
  action: AllowedActionType
): typeof initialState.game.ui => {
  switch (action.type) {
    case actionTypes.GAME_UI_TOUCH:
      return {
        ...state,
        touchingAtomIdx: action.payload.atomIdx,
      };
    case actionTypes.GAME_UI_TOUCH_LEAN:
      return {
        ...state,
        leaningDir: action.payload.direction,
      };
    case actionTypes.GAME_UI_TOUCH_RELEASE:
      return {
        ...state,
        touchingAtomIdx: null,
        leaningDir: null,
      };
    case actionTypes.GAME_UI_ATOM_MOVE:
      return {
        ...state,
        movingAtomIdx: action.payload.atomIdx,
      };
    case actionTypes.GAME_UI_ATOM_MOVE_END:
      return {
        ...state,
        movingAtomIdx: null,
      };
    default:
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default ui;
