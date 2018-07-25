// @flow
import {
  elements,
  bondsCounts,
  diagonalDirections,
} from '../enums/chemistry';
import { type BasicDirection } from './game';

export type Element = $Keys<typeof elements>;
export type DiagonalDirection = $Keys<typeof diagonalDirections>;
export type BondsCount = $Keys<typeof bondsCounts>;

type Bond = {|
  count: BondsCount,
  direction: DiagonalDirection | BasicDirection,
|};

type Atom = {|
  element: Element,
  bonds: Bond[],
  x: number,
  y: number,
|};

type AtomRef = {|
  atomIdxs: Array<number>,
  x: number,
  y: number,
|};

type Molecule = {|
  atomRefs: Array<AtomRef>,
  name: string,
  formula: string,
|};

export type { Bond };
export type { Atom };
export type { Molecule };
export type { AtomRef };
