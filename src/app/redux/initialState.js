// @flow
import {
  screenIds,
  difficulties,
} from '../enums/general';

import { gameStages } from '../enums/game';

import {
  type ScreenId,
  type Difficulty,
} from '../types/general';

import {
  type GameStage,
  type BoardTile,
  type BasicDirection,
} from '../types/game';

import {
  type Atom,
  type Molecule,
} from '../types/chemistry';

export type ReduxState = {|
  +lifecycle: {|
    +screenId: ScreenId,
    +stage: GameStage,
    +isPaused: boolean,
  |},
  +settings: {|
    +difficulty: Difficulty,
  |},
  +game: {|
    +board: {|
      +cellsMatrix: Array<Array<BoardTile>>,
      +atoms: Atom[],
      +goalMolecule: ?Molecule,
    |},
    +player: {|
      +levelNumber: number,
      +score: number,
      +highScore: number,
      +timeLeft: number,
    |},
    +ui: {|
      +touchingAtomIdx: ?number,
      +hoveringAtomIdx: ?number,
      +selectedAtomIdx: ?number,
      +movingAtomIdx: ?number,
      +leaningDir: ?BasicDirection,
    |},
  |}
|};

const initialState: ReduxState = {
  lifecycle: {
    screenId: screenIds.START,
    // screenId: screenIds.MAIN,
    stage: gameStages.READY,
    isPaused: false,
  },
  settings: {
    difficulty: difficulties.EASY,
  },
  game: {
    board: {
      atoms: [],
      cellsMatrix: [[]],
      goalMolecule: null,
    },
    player: {
      levelNumber: 1,
      score: 0,
      highScore: 0,
      timeLeft: 0,
      // startTime: 0,
    },
    ui: {
      touchingAtomIdx: null,
      hoveringAtomIdx: null,
      selectedAtomIdx: null,
      movingAtomIdx: null,
      leaningDir: null,
      // movingDir: null,
    },
  },
};

export default initialState;
