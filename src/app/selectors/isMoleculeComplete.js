// @flow
// import initialState from '../redux/initialState';
import { type Atom, type AtomRef, type Molecule } from '../types/chemistry';

export default function isMoleculeComplete({ atoms, goalMolecule }: {
    atoms: Atom[],
    goalMolecule: Molecule
  }): boolean {
  const minimumX: number = Math.min(...atoms.map(({ x }) => x));
  const minimumY: number = Math.min(...atoms.map(({ y }) => y));
  const offsetAtoms: Atom[] = atoms.map(atom => ({
    ...atom,
    x: atom.x - minimumX,
    y: atom.y - minimumY,
  }));
  return goalMolecule.atomRefs
    .every((atomRef: AtomRef) => atomRef.atomIdxs
      .some((atomIdx: number) =>
        offsetAtoms[atomIdx].x === atomRef.x &&
        offsetAtoms[atomIdx].y === atomRef.y));
}
