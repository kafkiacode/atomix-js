// @flow
/* eslint-disable no-underscore-dangle */
import { levelFiles, parseAtom, loadLevel, transformLevel } from './buildLevels';
import { type SourceLevel } from '../app/selectors/getLevel';
import { elements, bondsCounts } from '../app/enums/chemistry';
import { type Atom } from '../app/types/chemistry';
import { basicDirections } from '../app/enums/game';

describe('loadLevel async function', () => {
  it('should load correctly the Water file', () => {
    expect.assertions(3);
    return loadLevel(levelFiles[0]).then((xmlJson) => {
      // console.log(xmlJson.level.environment);
      expect(xmlJson).not.toEqual(false);
      expect(xmlJson.$._name).toEqual('Water');
      expect(xmlJson.environment[0].$.n_columns).toEqual('13');
    });
  });
});

describe('parseAtom function', () => {
  it('parses one Hydrogen atom tile from xmlJson', () => {
    const positionXml = {
      $: { col: '4', row: '3' },
      tile: [
        {
          $: { base: 'atom-h' },
          underlay: ['link-right'],
        },
      ],
    };
    const atom: Atom = parseAtom(positionXml);
    expect(atom).toMatchObject({
      x: 4,
      y: 3,
      element: elements.H,
      bonds: [{ count: bondsCounts.SINGLE, direction: basicDirections.RIGHT }],
    });
  });
});

describe('transformLevels function', () => {
  it('should transform the (xml) for level 1 into a JSON ready to be used by loadLevel', () =>
    loadLevel(levelFiles[0])
      .then(transformLevel)
      .then((level: SourceLevel) => {
        // console.log(level.board);
        expect(level.board[4]).toEqual([0, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 0, 0]);
        expect(level.atoms[0]).toMatchObject({
          x: 4,
          y: 3,
          element: elements.H,
          bonds: [{ count: bondsCounts.SINGLE, direction: basicDirections.LEFT }],
        });
        expect(level.atoms[1]).toMatchObject({
          x: 9,
          y: 7,
          element: elements.O,
          bonds: [
            { count: bondsCounts.SINGLE, direction: basicDirections.RIGHT },
            { count: bondsCounts.SINGLE, direction: basicDirections.LEFT },
          ],
        });
        expect(level.easyTime).toBeGreaterThan(0);
        expect(level.goalMolecule.name).toEqual('Water');
        expect(level.goalMolecule.formula).toEqual('H2O');
        expect(level.goalMolecule.atomRefs).toEqual([
          { atomIdxs: [2], x: 0, y: 0 },
          { atomIdxs: [1], x: 1, y: 0 },
          { atomIdxs: [0], x: 2, y: 0 },
        ]);
      }));
});
