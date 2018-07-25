// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import range from 'lodash/range';
import random from 'lodash/random';
import { type Atom as AtomType } from '../../../types/chemistry';
import Atom from '../../../elements/game/Atom';
import AtomExplosion from '../../../elements/game/AtomExplosion';

class ExplodingAtomsCollection extends Component<{
  atoms: AtomType[],
  onComplete: () => *,
}, {
  explodedAtomIdxs: number[],
  unexplodedAtomIdxs: number[],
  started: boolean,
}> {
  state = {
    explodedAtomIdxs: [],
    unexplodedAtomIdxs: [],
    // eslint-disable-next-line react/no-unused-state
    started: false,
  }
  static getDerivedStateFromProps(props, state) {
    return state.started
      ? null
      : { started: true, unexplodedAtomIdxs: range(0, props.atoms.length) };
  }
  componentDidMount() {
    this.explodeAtom();
  }
  onAtomExplosionDone = () => {
    if (this.state.unexplodedAtomIdxs.length) {
      this.explodeAtom();
    } else {
      this.props.onComplete();
    }
  };
  explodeAtom = () => {
    const explodingAtomIdx = this.state.unexplodedAtomIdxs[random(0, this.state.unexplodedAtomIdxs.length - 1)];
    const newState = {
      explodedAtomIdxs: [
        ...this.state.explodedAtomIdxs,
        explodingAtomIdx,
      ],
      unexplodedAtomIdxs: this.state.unexplodedAtomIdxs
        .filter(idx => idx !== explodingAtomIdx),
    };
    this.setState(newState);
  };
  render() {
    /* eslint-disable react/no-array-index-key */
    return (
      <Fragment>
        {this.props.atoms.map((atom: AtomType, idx) => {
          if (
            this.state.explodedAtomIdxs.length > 0 &&
            this.state.explodedAtomIdxs[this.state.explodedAtomIdxs.length - 1] === idx
          ) {
            return (
              <AtomExplosion
                key={idx}
                x={atom.x}
                y={atom.y}
                onDone={() => this.onAtomExplosionDone()}
              />);
          } else if (this.state.explodedAtomIdxs.includes(idx)) {
            return null;
          }
          return <Atom key={idx} atom={atom} />;
        })}
      </Fragment>);
    /* eslint-enable react/no-array-index-key */
  }
}

const enhance = connect(state => ({ atoms: state.game.board.atoms }));

export default enhance(ExplodingAtomsCollection);
