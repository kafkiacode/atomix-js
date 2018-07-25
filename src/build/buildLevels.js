/* global __dirname */
// @flow
/* eslint-disable no-console */
import fs from 'fs';
import fill from 'lodash/fill';
import isEqual from 'lodash/isEqual';
import xml2js from 'xml2js';
import { Html4Entities } from 'html-entities';
import { type SourceLevel } from '../app/selectors/getLevel';
import {
  type Bond,
  type BondsCount,
  type Atom,
  type AtomRef,
  type Molecule,
  type DiagonalDirection,
} from '../app/types/chemistry';
import levelFilesJson from './levelFiles.json';
import { elements, bondsCounts, diagonalDirections } from '../app/enums/chemistry';
import { basicDirections } from '../app/enums/game';
import { type BasicDirection } from '../app/types/game';

const decodeEntities = (new Html4Entities()).decode;

type LevelItem = {
  name: string,
  time: number,
};

export const levelFiles: LevelItem[] = levelFilesJson;

export const loadLevel = (levelItem: LevelItem): Promise<Object> => new Promise((resolve, reject) => {
  fs.readFile(
    `${__dirname}/level/${levelItem.name.replace(/ /g, '-').toLowerCase()}.atomix.xml.in`,
    'utf-8',
    (err, data) => {
      if (err) {
        reject(err);
      } else {
        xml2js.parseString(data, (err2, jsonXml) => {
          if (err2) {
            reject(err2);
          } else {
            resolve({ ...jsonXml.level, ...levelItem });
          }
        });
      }
    }
  );
});

type XmlPosition = {
  $: { col: string, row: string },
  tile: Array<{
    $: { base: string },
    underlay: string[],
  }>
};

export const parseAtom = (position: XmlPosition): Atom => ({
  x: parseInt(position.$.col, 10),
  y: parseInt(position.$.row, 10),
  element: elements[position.tile[0].$.base.replace('atom-', '').toUpperCase()],
  bonds: position.tile[0].underlay.map((underlay: string): Bond => {
    let count: BondsCount = bondsCounts.SINGLE;
    const bondDesc: string = underlay;
    if (bondDesc.indexOf('triple') !== -1) {
      count = bondsCounts.TRIPLE;
    } else if (bondDesc.indexOf('double') !== -1) {
      count = bondsCounts.DOUBLE;
    }
    const dirString: string = bondDesc
      .replace('-double', '')
      .replace('-triple', '')
      .replace('link-', '')
      .replace('top', 'up')
      .replace('bottom', 'down')
      .replace('-', '_')
      .toUpperCase();
    // console.log(bondDesc, dirString, underlay);
    const direction: ?(DiagonalDirection | BasicDirection) =
      diagonalDirections[dirString] || basicDirections[dirString] || null;
    if (direction == null) {
      throw new Error(`Direction ${dirString} is not a BasicDirection or a DiagonalDirection`);
    }
    return { count, direction };
  }),
});

export const parseMoleculeAtomRefs = (atoms: Atom[], xmlGoalPositions: XmlPosition[]): { atomRefs: AtomRef[] } => {
  const goalAtoms: Atom[] = xmlGoalPositions.map(parseAtom);
  return {
    atomRefs: goalAtoms.map((goalAtom: Atom): AtomRef => ({
      x: goalAtom.x,
      y: goalAtom.y,
      atomIdxs: atoms.reduce((acc: number[], atom: Atom, idx: number) => (
        isEqual({ ...atom, x: null, y: null }, { ...goalAtom, x: null, y: null })
          ? [...acc, idx]
          : acc
      ), []),
    })),
  };
};

export function transformLevel(xmlLevel: { [key: string]: any }): SourceLevel {
  const numRows: number = parseInt(xmlLevel.environment[0].$.n_rows, 10);
  const numCols: number = parseInt(xmlLevel.environment[0].$.n_columns, 10);
  let board: number[][] = fill(new Array(numRows), null).map(() => fill(new Array(numCols), 0));
  // fill all the wall squares
  xmlLevel.environment[0].position.forEach((position) => {
    const { type } = position.tile[0].$;
    if (type === 'TILE_TYPE_WALL') {
      const row = parseInt(position.$.row, 10);
      const col = parseInt(position.$.col, 10);
      board[row][col] = 1;
    }
  });
  let trimLeftPos: number = board[0].length - 1;
  let trimRightPos: number = 0;
  let trimTop: number = 0;
  let trimTopDone: boolean = false;
  board = board
    .filter((row: number[]) => {
      const isEmpty = row.indexOf(1) === -1;
      if (isEmpty && !trimTopDone) {
        trimTop += 1;
      }
      if (!isEmpty) {
        trimTopDone = true;
      }
      return !isEmpty;
    })
    .map((row: number[]): number[] => {
      const firstWallIdx: number = row.indexOf(1);
      const lastWallIdx: number = row.lastIndexOf(1);
      trimLeftPos = Math.min(trimLeftPos, firstWallIdx);
      trimRightPos = Math.max(trimRightPos, lastWallIdx);
      return row.map((cell: number, col: number) => (col > firstWallIdx && col < lastWallIdx && cell === 0 ? 2 : cell));
    })
    .map((row: number[]): number[] => row.slice(trimLeftPos, trimRightPos + 1));

  const atoms = xmlLevel.scenario[0].position.map(parseAtom).map((atom: Atom): Atom => ({
    ...atom,
    x: atom.x - trimLeftPos,
    y: atom.y - trimTop,
  }));

  const goalMolecule: Molecule = {
    ...parseMoleculeAtomRefs(atoms, xmlLevel.goal[0].position),
    /* eslint-disable-next-line no-underscore-dangle */
    name: xmlLevel.$._name,
    formula: decodeEntities(xmlLevel.$.formula).replace(/<[^>]*>/g, ''),
    // formula: decodeEntities(xmlLevel.$.formula),
  };

  return {
    board,
    atoms,
    goalMolecule,
    easyTime: xmlLevel.time,
  };
}

export default () => {
  Promise.all(levelFilesJson.map((levelItem: LevelItem): Promise<?SourceLevel> =>
    loadLevel(levelItem)
      .then(transformLevel)
      .catch((e) => { console.error(e); return null; }))).then((levels: SourceLevel[]) => {
    fs.writeFile(
      `${__dirname}/../app/data/levels.json`,
      JSON.stringify(levels.filter(d => d), null, 2),
      'utf8',
      e => (e ? console.error(e) : console.log('levels.json file saved'))
    );
  });
};
