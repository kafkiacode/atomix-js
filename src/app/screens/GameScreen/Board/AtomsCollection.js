// @flow
/* NO eslint-disable react/sort-comp */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Atom from '../../../elements/game/Atom';
import { type Atom as AtomType } from '../../../types/chemistry';
import * as gameActions from '../../../redux/actions/game';
import Selected from '../../../elements/game/Selected';

type AtomStyle = {
  opacity?: number,
  transitionProperty?: 'left, top',
  transitionDuration?: string,
  left?: string,
  top?: string,
};

type Props = {
  atoms: Array<AtomType>,
  touchingAtomIdx: ?number,
  movingAtomIdx: ?number,
  onAtomTouchDown: (clientX: number, clientY: number, atomIdx: number) => *,
  gameUiAtomMoveEnd: () => *,
};

type State = {
  lastTouchedOrSelectedAtom: ?AtomType,
};

class AtomsCollection extends Component<Props, State> {
  state = { lastTouchedOrSelectedAtom: null };
  static getDerivedStateFromProps(props: Props, state: State) {
    // TODO: consider, later, the case for keyboard selection
    if (props.touchingAtomIdx != null &&
      props.atoms[props.touchingAtomIdx] !== state.lastTouchedOrSelectedAtom
    ) {
      return { lastTouchedOrSelectedAtom: props.atoms[props.touchingAtomIdx] };
    }
    return null;
  }
  onMouseDown(e: MouseEvent, atomIdx: number): void {
    this.props.onAtomTouchDown(e.clientX, e.clientY, atomIdx);
  }
  onTouchStart(e: TouchEvent, atomIdx: number): void {
    if (e.touches && e.touches[0]) {
      this.props.onAtomTouchDown(e.touches[0].clientX, e.touches[0].clientY, atomIdx);
    }
  }
  render() {
    const {
      atoms,
      touchingAtomIdx,
      movingAtomIdx,
      gameUiAtomMoveEnd,
    } = this.props;
    const { lastTouchedOrSelectedAtom: lastAtom } = this.state;
    return (
      <Fragment>
        {atoms.map((atom, idx) => {
          const style: AtomStyle = {};
          // if (idx === touchingAtomIdx) {
          //   // style.opacity = 0.5;
          // }
          if (idx === movingAtomIdx && lastAtom != null) {
            const positionsToMove = Math.abs(atom.y - lastAtom.y) +
              Math.abs(atom.x - lastAtom.x);
            style.transitionDuration = `${positionsToMove * 0.20}s`;
          }
          /* eslint-disable react/no-array-index-key */
          return (
            <Atom
              key={idx}
              atom={atom}
              onTransitionEnd={movingAtomIdx != null ? gameUiAtomMoveEnd : undefined}
              style={{
                transitionTimingFunction: 'linear',
                ...style,
              }}
              onMouseDown={(touchingAtomIdx == null && movingAtomIdx == null)
                ? e => this.onMouseDown(e, idx) : undefined}
              onTouchStart={(touchingAtomIdx == null && movingAtomIdx == null)
                ? e => this.onTouchStart(e, idx) : undefined}
            >
              {idx === touchingAtomIdx && <Selected />}
            </Atom>);
          /* eslint-enable react/no-array-index-key */
        })}
      </Fragment>);
  }
}

const enhance = connect(
  state => ({
    atoms: state.game.board.atoms,
    isTouching: state.game.ui.isTouching,
    touchingAtomIdx: state.game.ui.touchingAtomIdx,
    movingAtomIdx: state.game.ui.movingAtomIdx,
  }),
  (dispatch: *) => bindActionCreators({
    gameUiAtomMoveEnd: gameActions.gameUiAtomMoveEnd,
  }, dispatch)
);

export { AtomsCollection as PresentationalAtomsCollection };
export default enhance(AtomsCollection);
