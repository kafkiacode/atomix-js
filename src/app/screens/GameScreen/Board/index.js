// @flow
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withContentRect } from 'react-measure';
import debounce from 'lodash/debounce';
import { type ReduxState } from '../../../redux/initialState';
import BoardStaticElements from './BoardStaticElements';
import AtomsCollection from './AtomsCollection';
import ExplodingAtomsCollection from './ExplodingAtomsCollection';
// import LeaningAtom from './LeaningAtom';
import Arrow from '../../../elements/game/Arrow';
import CoordinateSystem from '../../../elements/CoordinateSystem';
import { type BasicDirection, type GameStage } from '../../../types/game';
import { type Atom as AtomType } from '../../../types/chemistry';
import * as gameActions from '../../../redux/actions/game';
import { gameStages, basicDirections } from '../../../enums/game';
import { withScale } from '../boardScaleContext';
import getLimitsAndAllowedDirections, { type LimitsAndAllowedDirections } from '../../../selectors/getLimitsAndAllowedDirections';

export class PresentationalBoard extends Component<{
  atoms: AtomType[],
  stage: GameStage,
  cellsWidth: number,
  cellsHeight: number,
  touchingAtomIdx: ?number,
  leaningDir: ?BasicDirection,
  limits: LimitsAndAllowedDirections,
  gameUiTouch: (any) => *,
  gameUiTouchRelease: () => *,
  gameUiAtomMove: (number, number, number) => *,
  gameUiAtomMoveEnd: () => *,
  gameUiTouchLean: (?BasicDirection) => *,
  measureRef: *,
  onNextStage: () => *,
  scale: number,
  updateScale: (scale: number) => void,
  contentRect: {
    bounds: {
      width: number,
      height: number,
      top: number,
      left: number,
    },
  },
}, {
  touchStartX: number,
  touchStartY: number,
}> {
  state = {
    touchStartY: 0,
    touchStartX: 0,
  };
  updateScale = () => {
    const {
      cellsWidth,
      updateScale,
      scale,
      contentRect: {
        bounds: {
          width,
        },
      },
    } = this.props;
    const newScale: number = width / cellsWidth;
    if (!Number.isNaN(newScale) && scale !== newScale) {
      updateScale(newScale);
    }
  }
  componentDidMount() {
    this.updateScale();
  }
  componentDidUpdate() {
    this.updateScale();
  }
  onAtomTouchDown = (clientX: number, clientY: number, idx: number) => {
    this.props.gameUiTouch(idx);
    this.setState({
      touchStartX: clientX,
      touchStartY: clientY,
    });
    document.addEventListener('touchmove', this.onTouchMove, { passive: false });
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onTouchEnd);
  }
  onMouseMove = debounce((e: MouseEvent): void => {
    this.onDeviceMove(e.clientX, e.clientY);
  }, 5)
  onTouchMove = debounce((e: TouchEvent): void => {
    e.preventDefault();
    if (e.changedTouches && e.changedTouches[0]) {
      this.onDeviceMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  }, 5)
  onDeviceMove(clientX: number, clientY: number): void {
    const {
      gameUiTouchLean,
      leaningDir,
    } = this.props;
    const {
      touchStartX,
      touchStartY,
    } = this.state;
    const leanX = clientX - touchStartX;
    const leanY = clientY - touchStartY;
    const newLeaningDir: ?BasicDirection = this.getLeaningDir(leanX, leanY);

    // calculate leaningDir
    // this.setPosition(leanX, leanY, newLeaningDir);

    if (newLeaningDir !== leaningDir) {
      gameUiTouchLean(newLeaningDir);
    }
  }
  getLeaningDir(cleanX: number, cleanY: number): ?BasicDirection {
    let newLeaningDir: ?BasicDirection = null;
    if (cleanX === 0 && cleanY === 0) {
      newLeaningDir = null;
    } else if (Math.abs(cleanX) > Math.abs(cleanY)) {
      newLeaningDir = cleanX > 0 ? basicDirections.RIGHT : basicDirections.LEFT;
    } else {
      newLeaningDir = cleanY > 0 ? basicDirections.DOWN : basicDirections.UP;
    }

    if (!this.props.limits.allowedDirections.includes(newLeaningDir)) {
      newLeaningDir = null;
    }
    return newLeaningDir;
  }
  onTouchEnd = () => {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onTouchEnd);
    this.onMouseMove.cancel();
    this.onTouchMove.cancel();
    const {
      leaningDir, touchingAtomIdx, limits, gameUiAtomMove, atoms,
    } = this.props;
    if (touchingAtomIdx == null) {
      throw new Error('Invalid state: touchend with no touchingAtomIdx');
    }
    const atom: AtomType = atoms[touchingAtomIdx];

    this.props.gameUiTouchRelease();
    if (leaningDir != null) {
      gameUiAtomMove(
        touchingAtomIdx,
        [basicDirections.UP, basicDirections.DOWN].includes(leaningDir)
          ? atom.x : limits[leaningDir],
        [basicDirections.LEFT, basicDirections.RIGHT].includes(leaningDir)
          ? atom.y : limits[leaningDir],
      );
    }
  }
  render() {
    const {
      atoms,
      leaningDir,
      stage,
      cellsWidth,
      cellsHeight,
      touchingAtomIdx,
      contentRect: {
        bounds: {
          width, height, left, top,
        },
      },
      measureRef,
      onNextStage,
    } = this.props;
    // const { touchStartX, touchStartY } = this.state;
    /* eslint-disable react/no-array-index-key */
    return (
      <div ref={measureRef} style={{ height: '100%' }}>
        <CoordinateSystem
          style={{ width: '100%', height: '100%' }}
          width={cellsWidth}
          height={cellsHeight}
        >
          <BoardStaticElements />
          {stage === gameStages.PLAYING && <AtomsCollection
            {...{
              width, height, left, top,
            }}
            onAtomTouchDown={this.onAtomTouchDown}
          />}
          {stage === gameStages.EXPLODING_ATOMS && <ExplodingAtomsCollection
            onComplete={onNextStage}
          />}
          {touchingAtomIdx != null && !!leaningDir &&
          <Arrow x={atoms[touchingAtomIdx].x} y={atoms[touchingAtomIdx].y} direction={leaningDir} />}

        </CoordinateSystem>
      </div>);
  }
}

const enhance = compose(
  connect(
    (state: ReduxState) => ({
      cellsWidth: state.game.board.cellsMatrix[0].length,
      cellsHeight: state.game.board.cellsMatrix.length,
      touchingAtomIdx: state.game.ui.touchingAtomIdx,
      leaningDir: state.game.ui.leaningDir,
      atoms: state.game.board.atoms,
      stage: state.lifecycle.stage,
      limits: getLimitsAndAllowedDirections(state),
    }),
    (dispatch: *) => {
      const {
        gameUiTouch,
        gameUiTouchLean,
        gameUiTouchRelease,
        gameUiAtomMove,
        gameUiAtomMoveEnd,
      } = gameActions;
      return bindActionCreators({
        gameUiTouch,
        gameUiTouchLean,
        gameUiTouchRelease,
        gameUiAtomMove,
        gameUiAtomMoveEnd,
      }, dispatch);
    }
  ),
  withContentRect('bounds'),
  withScale
);

export default enhance(PresentationalBoard);
