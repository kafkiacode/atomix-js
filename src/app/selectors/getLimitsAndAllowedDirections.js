// @flow
import memoize from 'lodash/memoize';
import initialState, { type ReduxState } from '../redux/initialState';
import { boardTiles, basicDirections } from '../enums/game';
import { type BasicDirection } from '../types/game';
import { type Atom as AtomType } from '../types/chemistry';

export type LimitsAndAllowedDirections = {
  [BasicDirection]: number,
  allowedDirections: Array<BasicDirection>,
};

const getter = (
  atomIdx: number,
  atoms: Array<AtomType>,
  cellsMatrix: typeof initialState.game.board.cellsMatrix
): ?LimitsAndAllowedDirections => {
  const { x, y } = atoms[atomIdx];
  const ret = {
    [basicDirections.LEFT]: x,
    [basicDirections.RIGHT]: x,
    [basicDirections.UP]: y,
    [basicDirections.DOWN]: y,
    allowedDirections: [],
  };

  const cellsMatrixWithAtoms: typeof cellsMatrix = [...cellsMatrix.map(row => [...row])];
  atoms.forEach((atom: AtomType, idx: number) => {
    if (idx !== atomIdx) {
      cellsMatrixWithAtoms[atom.y][atom.x] = boardTiles.WALL_EXTERNAL;
    }
  });
  // const {
  //   row: rowCrossedAtoms,
  //   col: columnCrossedAtoms
  // }: {
  //   row: Array<AtomType>,
  //   col: Array<AtomType>,
  // } = atoms.reduce(
  //   (obj, atom: AtomType, idx) => {
  //     return idx === atomIdx
  //       ? obj
  //       : {
  //         row: atom.y === y ? [...obj.row, atom] : obj.row,
  //         col: atom.x === x ? [...obj.col, atom] : obj.col,
  //       };
  //   },
  //   { row: [], col: [] }
  // );


  let c: number;
  c = x - 1;
  while (c >= 0 && cellsMatrixWithAtoms[y][c] === boardTiles.FLOOR) {
    ret[basicDirections.LEFT] = c;
    c -= 1;
  }
  c = x + 1;
  while (c < cellsMatrixWithAtoms[y].length && cellsMatrixWithAtoms[y][c] === boardTiles.FLOOR) {
    ret[basicDirections.RIGHT] = c;
    c += 1;
  }
  c = y - 1;
  while (c >= 0 && cellsMatrixWithAtoms[c][x] === boardTiles.FLOOR) {
    ret[basicDirections.UP] = c;
    c -= 1;
  }
  c = y + 1;
  while (c < cellsMatrixWithAtoms.length && cellsMatrixWithAtoms[c][x] === boardTiles.FLOOR) {
    ret[basicDirections.DOWN] = c;
    c += 1;
  }
  if (ret[basicDirections.UP] < y) {
    ret.allowedDirections.push(basicDirections.UP);
  }
  if (ret[basicDirections.DOWN] > y) {
    ret.allowedDirections.push(basicDirections.DOWN);
  }
  if (ret[basicDirections.LEFT] < x) {
    ret.allowedDirections.push(basicDirections.LEFT);
  }
  if (ret[basicDirections.RIGHT] > x) {
    ret.allowedDirections.push(basicDirections.RIGHT);
  }
  return ret;
};
// TODO
const memoizedGetter = memoize(getter);

const ws = new WeakSet();

const getLimitsAndAllowedDirections = (state: ReduxState) => {
  const { board } = state.game;
  const { cellsMatrix, atoms } = board;
  if (!ws.has(board)) {
    ws.add(board);
    memoizedGetter.cache.clear();
  }
  let atomIdx: ?number = null;
  if (state.game.ui.touchingAtomIdx != null) {
    atomIdx = state.game.ui.touchingAtomIdx;
  } else if (state.game.ui.selectedAtomIdx) {
    atomIdx = state.game.ui.selectedAtomIdx;
  }
  if (atomIdx != null) {
    const ret = memoizedGetter(atomIdx, atoms, cellsMatrix);
    return ret;
  }
  return null;
};

export default getLimitsAndAllowedDirections;
