// @flow
import { type ActionType } from 'redux-actions';
import initialState from '../../initialState';
import { GAME_LOAD_LEVEL, GAME_UI_ATOM_MOVE } from '../../actionTypes';
import { gameLoadLevel, gameUiAtomMove } from '../../actions/game';

type AllowedActionType =
  | ActionType<typeof gameLoadLevel>
  | ActionType<typeof gameUiAtomMove>
  ;

const board = (
  state: typeof initialState.game.board = initialState.game.board,
  action: AllowedActionType,
): typeof initialState.game.board => {
  switch (action.type) {
    case GAME_LOAD_LEVEL:
      return {
        ...state,
        cellsMatrix: action.payload.cellsMatrix,
        atoms: action.payload.atoms,
        goalMolecule: action.payload.goalMolecule,
      };
    case GAME_UI_ATOM_MOVE:
    {
      const { atomIdx, x, y } = action.payload;
      const atoms = [...state.atoms];
      atoms[atomIdx] = {
        ...atoms[atomIdx],
        x,
        y,
      };
      return {
        ...state,
        atoms,
      };
    }
    default:
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default board;
