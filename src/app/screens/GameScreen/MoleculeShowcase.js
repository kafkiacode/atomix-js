// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import memoize from 'lodash/memoize';
// import { withContentRect } from 'react-measure';
import { StyleSheet, css } from 'aphrodite/no-important';
import { type ReduxState } from '../../redux/initialState';
import { type AtomRef, type Molecule, type Atom as AtomType } from '../../types/chemistry';
import CoordinateSystem from '../../elements/CoordinateSystem';
import Atom from '../../elements/game/Atom';
import { withScale } from './boardScaleContext';

const styles = StyleSheet.create({
  container: {
    border: '9px ridge #ccc',
    padding: '9px',
    height: 'calc(100% - 2em)',
    margin: '1em',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '2.5vmin',
    boxSizing: 'border-box',
    // fontSize: 15,
  },
  bannerContainer: {
    flex: '0 0 auto',
    fontSize: '1.5em',
  },
  atomContainer: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    fontFamily: ['"Press Start 2P"', 'Courier new', 'monospace', 'sans-serif'],
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadow: '0 0 3px rgba(0, 65, 0, 0.5)',
    alignItems: 'center',
    color: '#008200',
  },
});

const getMoleculeSize = memoize((molecule: Molecule): { width: number, height: number } => ({
  width: Math.max(...molecule.atomRefs.map(({ x }) => x)) + 1,
  height: Math.max(...molecule.atomRefs.map(({ y }) => y)) + 1,
}));

class MoleculeShowcase extends Component<{
  goalMolecule?: Molecule,
  atoms: AtomType[],
  scale: number,
  // measureRef: *,
  // contentRect: {
  //   bounds: {
  //     width: number,
  //     height: number,
  //     top: number,
  //     left: number,
  //   },
  // },
}> {
  render() {
    if (this.props.goalMolecule == null) {
      return null;
    }
    const { name, formula, atomRefs } = this.props.goalMolecule;
    const { atoms, scale } = this.props;
    const { height, width } = getMoleculeSize(this.props.goalMolecule);
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.bannerContainer)}>
          <div className={css(styles.banner)}>Molecule</div>
          <div className={css(styles.banner)}>{name} ({formula})</div>
        </div>
        <div className={css(styles.atomContainer)}>
          <CoordinateSystem
            style={{ width: `${width * scale}px`, height: `${height * scale}px` }}
            width={width}
            height={height}
          >
            {/* eslint-disable react/no-array-index-key */}
            {atomRefs.map((atomRef: AtomRef, idx) => (
              <Atom
                key={idx}
                atom={{
                  ...atoms[atomRef.atomIdxs[0]],
                  x: atomRef.x,
                  y: atomRef.y,
                }}
              />
            ))}
          </CoordinateSystem>
        </div>
      </div>);
  }
}

const enhance = compose(
  connect((state: ReduxState) => ({
    goalMolecule: state.game.board.goalMolecule,
    atoms: state.game.board.atoms,
  })),
  withScale
);
export { MoleculeShowcase as PresentationalMoleculeShowcase };
export default enhance(MoleculeShowcase);
