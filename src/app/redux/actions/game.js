// @flow
import { createAction } from 'redux-actions';
import * as actionTypes from '../actionTypes';
import { type Atom, type Molecule } from '../../types/chemistry';
import { type BoardTile, type BasicDirection } from '../../types/game';
import { type Difficulty } from '../../types/general';
import { difficulties } from '../../enums/general';

// GAME GENERAL
export const clockTick = createAction(actionTypes.CLOCK_TICK);

// GAME UI

export const gameUiTouch =
  createAction(actionTypes.GAME_UI_TOUCH, (atomIdx: number) => ({ atomIdx }));

export const gameUiTouchLean =
  createAction(actionTypes.GAME_UI_TOUCH_LEAN, (direction: ?BasicDirection) => ({ direction }));

export const gameUiTouchRelease = createAction(actionTypes.GAME_UI_TOUCH_RELEASE);

export const gameUiAtomMove =
  createAction(actionTypes.GAME_UI_ATOM_MOVE, (atomIdx, x, y) => ({ atomIdx, x, y }));
// todo: only atomIdx and Direction, with the help of getLimits

export const gameUiAtomMoveEnd = createAction(
  actionTypes.GAME_UI_ATOM_MOVE_END,
  () => undefined
);

export const gameUiCursorMoveStart =
  createAction(actionTypes.GAME_UI_CURSOR_MOVE_START);

export const gameUiCursorMoveEnd =
  createAction(actionTypes.GAME_UI_CURSOR_MOVE_END);

export const gameUiCursorSelect =
  createAction(actionTypes.GAME_UI_CURSOR_SELECT, (atomIdx: number) => ({ atomIdx }));

export const gameUiCursorUnselect =
  createAction(actionTypes.GAME_UI_CURSOR_UNSELECT);

// GAME STAGES

export const gameStart = createAction(actionTypes.LIFECYCLE_GAME_START, () => undefined);
export const gameEnter = createAction(actionTypes.LIFECYCLE_GAME_ENTER, (difficulty: Difficulty) => ({ difficulty }));

export const gameLoadLevel =
  createAction(
    actionTypes.GAME_LOAD_LEVEL,
    ({
      cellsMatrix, atoms, goalMolecule, times,
    }: {|
      cellsMatrix: Array<Array<BoardTile>>,
      atoms: Array<Atom>,
      goalMolecule: Molecule,
      times: {| [Difficulty]: number |},
    |}, difficulty: Difficulty) =>
      ({
        cellsMatrix, atoms, goalMolecule, time: times[difficulty] || times[difficulties.EASY],
      })
  );

export const gameLevelWin = createAction(actionTypes.GAME_LEVEL_WIN, () => undefined);

export const gameLevelLose = createAction(actionTypes.GAME_LEVEL_LOSE, () => undefined);
