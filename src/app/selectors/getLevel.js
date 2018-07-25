// @flow
// import { type ActionType } from 'redux-actions';
import { boardTiles } from '../enums/game';
import { type Atom, type Molecule } from '../types/chemistry';
import levelsJson from '../data/levels.json';
// import { gameLoadLevel } from '../redux/actions/game';
import { type Difficulty } from '../types/general';
import { type BoardTile } from '../types/game';
import { difficulties } from '../enums/general';

export type SourceLevel = {|
  +board: Array<Array<number>>,
  +atoms: Array<Atom>,
  +goalMolecule: Molecule,
  +easyTime: number,
|};

const sourceLevels: SourceLevel[] = levelsJson;

export const totalLevels = sourceLevels.length;

/** debug */
// levels[0].atoms[0] = { ...levels[0].atoms[0], x: 4, y: 2 };
// levels[0].atoms[1] = { ...levels[0].atoms[1], x: 3, y: 3 };
// levels[0].atoms[2] = { ...levels[0].atoms[2], x: 2, y: 3 };

type ProcessedLevel = {|
  cellsMatrix: Array<Array<BoardTile>>,
  atoms: Array<Atom>,
  goalMolecule: Molecule,
  times: {| [Difficulty]: number |},
|};

const processLevel = (sourceLevel: SourceLevel): ProcessedLevel => ({
  cellsMatrix: sourceLevel.board.map(row => row.map((value) => {
    switch (value) {
      case 1:
        return boardTiles.WALL_EXTERNAL;
      case 2:
        return boardTiles.FLOOR;
      case 0:
      default:
        return boardTiles.EMPTY;
    }
  })),
  atoms: sourceLevel.atoms,
  goalMolecule: sourceLevel.goalMolecule,
  times: {
    [difficulties.EASY]: sourceLevel.easyTime,
    [difficulties.MEDIUM]: sourceLevel.easyTime * 1,
    [difficulties.HARD]: sourceLevel.easyTime * 1,
  },
});

export default (levelNumber: number): ProcessedLevel => processLevel(sourceLevels[levelNumber - 1]);
