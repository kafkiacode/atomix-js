// @flow
import React, { type Node } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { type Atom as AtomType, type Bond as BondType, type Element } from '../../types/chemistry';
import { elements, diagonalDirections, bondsCounts } from '../../enums/chemistry';
import { basicDirections } from '../../enums/game';
import AtomBall from './AtomBall';

const styles = StyleSheet.create({
  bondContainer: {
    position: 'absolute',
    transformOrigin: 'center left',
    top: 0,
    left: 0,
    marginLeft: 'calc(1in / 2)',
  },
  bond: {
    boxSizing: 'border-box',
    height: 'calc(1in / 16 * 3)',
    width: 'calc(1in / 16 * 7)',
    borderTop: 'calc(1in / 16) solid #efefef',
    borderBottom: 'calc(1in / 16) solid #4a4a4a',
    backgroundColor: '#8c8c8c',
  },
  [bondsCounts.SINGLE]: {
    marginTop: 'calc(1in / 16 * 6)',
    // marginBottom: 'calc(1in / 16 * 6)',
  },
  [bondsCounts.DOUBLE]: {
    marginTop: 'calc(1in / 16 * 4.5)',
    marginBottom: 'calc(1in / 16 * 4.5)',
    ':nth-child(1n) > :first-child': {
      marginBottom: 'calc(1in / 16)',
    },
  },
  [diagonalDirections.UP_LEFT]: { transform: 'rotate(-135deg)' },
  [diagonalDirections.UP_RIGHT]: { transform: 'rotate(-45deg)' },
  [diagonalDirections.DOWN_LEFT]: { transform: 'rotate(135deg)' },
  [diagonalDirections.DOWN_RIGHT]: { transform: 'rotate(45deg)' },
  [basicDirections.UP]: { transform: 'rotate(-90deg)' },
  [basicDirections.RIGHT]: { transform: 'rotate(0deg)' },
  [basicDirections.DOWN]: { transform: 'rotate(-90deg) translateX(calc(1in / -16 * 8))' },
  [basicDirections.LEFT]: { transform: 'rotate(0deg) translateX(calc(1in / -16 * 8))' },
});

const elementsToColor: { [Element]: string } = {
  [elements.H]: '#00F',
  [elements.O]: '#f00',
  [elements.C]: '#CCC',
};
const Bond = ({
  count,
  direction,
}: BondType) => (
  <div className={css(styles.bondContainer, styles[count], styles[direction])}>
    <div className={css(styles.bond)} />
    {count === bondsCounts.DOUBLE && <div className={css(styles.bond)} />}
  </div>);

const Atom = ({
  atom,
  style,
  children,
  isMoving,
  ...props
}: {
  atom: AtomType,
  children?: Node,
  style?: {},
  isMoving?: boolean,
}) => (
  <AtomBall
    letters={atom.element}
    color={elementsToColor[atom.element]}
    style={{
      position: 'absolute',
      top: `${atom.y}in`,
      left: `${atom.x}in`,
      filter: 'drop-shadow(calc(1in/16) calc(1in/16) 0 rgba(0, 0, 0, 0.3))',
      ...style,
    }}
    {...props}
  >
    {/* eslint-disable-next-line react/no-array-index-key */}
    {atom.bonds.map((bond, key) => (<Bond {...bond} key={key} />))}
    {children}
  </AtomBall>
);

Atom.defaultProps = {
  style: {},
  children: undefined,
  isMoving: false,
};

export default Atom;
