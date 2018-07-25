/* global it */
// @flow
import isMoleculeComplete from './isMoleculeComplete';
import { elements, bondsCounts } from '../enums/chemistry';
import { basicDirections } from '../enums/game';

const level1 = {
  atoms: [
    {
      element: elements.H,
      bonds: [{ count: bondsCounts.SINGLE, direction: basicDirections.LEFT }],
      x: 1,
      y: 1,
    },
    {
      element: elements.H,
      bonds: [{ count: bondsCounts.SINGLE, direction: basicDirections.RIGHT }],
      x: 3,
      y: 5,
    },
  ],
  goalMolecule: {
    name: 'Hydrogen',
    formula: 'H2',
    atomRefs: [
      { atomIdxs: [0], x: 0, y: 0 },
      { atomIdxs: [1], x: 1, y: 0 },
    ],
  },
};

describe('selector isMoleculeComplete', () => {
  it('should return false for some cases', () => {
    expect(isMoleculeComplete(level1)).toBe(false);
  });
  it('should return true for other cases', () => {
    const level1Correct = { ...level1, atoms: [...level1.atoms] };
    level1Correct.atoms[1] = { ...level1Correct.atoms[1], x: 2, y: 1 };
    expect(isMoleculeComplete(level1Correct)).toBe(true);
  });
});
