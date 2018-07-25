// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import padCharsStart from 'lodash/fp/padCharsStart';
import { Screen } from '../styles';
import GameBackground from './GameBackground';
import GameLayout from '../../elements/game/GameLayout';
import StateIndicator from '../../elements/StateIndicator';
import Board from './Board';
import MoleculeShowcase from './MoleculeShowcase';
import OverlayScreen from './OverlayScreen';
import { gameStages } from '../../enums/game';
import { type ReduxState } from '../../redux/initialState';
import { type GameStage } from '../../types/game';
import * as lifecycleActions from '../../redux/actions/lifecycle';
import { Provider as BoardScaleContextProvider } from './boardScaleContext';

type PropTypes = {
  score: number,
  highScore: number,
  levelNumber: number,
  timeLeft: number,
  stage: GameStage,
  lifecycleGameStart: () => *,
  lifecycleGamePauseEnd: () => *,
  lifecycleMainMenu: () => *,
  lifecycleGameNextLevel: () => *,
  lifecycleAtomsExplodeEnd: () => *,
};

const padClock = padCharsStart('0')(2);

class GameScreen extends Component<PropTypes, { scale: number }> {
  constructor(props) {
    super(props);
    this.exitFunctionMapper = {
      [gameStages.READY]: this.props.lifecycleGameStart,
      [gameStages.PAUSED]: this.props.lifecycleGamePauseEnd,
      [gameStages.GAME_OVER]: this.props.lifecycleMainMenu,
      [gameStages.NEXT_LEVEL]: this.props.lifecycleGameNextLevel,
    };
  }
  state = {
    scale: 1,
  };
  setBoardScale = (scale: number) => {
    this.setState({
      ...this.state,
      scale,
    });
  };
  exitFunctionMapper: { [GameStage]: () => * };
  render() {
    const {
      score,
      highScore,
      levelNumber,
      timeLeft,
      stage,
      lifecycleAtomsExplodeEnd,
    } = this.props;
    const { scale } = this.state;
    return (
      <BoardScaleContextProvider value={{ scale, updateScale: this.setBoardScale }}>
        <div className={css(Screen.screen, Screen.flexCenter)}>
          {!!this.exitFunctionMapper[stage] &&
          <OverlayScreen stage={stage} onExit={this.exitFunctionMapper[stage]} />}
          <GameBackground />
          <GameLayout
            style={{ zIndex: 1, position: 'relative' }}
            board={<Board onNextStage={lifecycleAtomsExplodeEnd} />}
            moleculeShowcase={<MoleculeShowcase />}
            controls={[
              <StateIndicator label="Player 1" value={score} showValueBelow />,
              <StateIndicator label="Level" value={levelNumber} showValueInBig />,
              <StateIndicator label="Hi score" value={highScore} showValueBelow />,
              <StateIndicator
                label="Time"
                value={`${padClock(`${Math.floor(timeLeft / 60)}`)}:${padClock(`${timeLeft % 60}`)}`}
                showValueInBig
                showValueBelow
              />,
            ]}
          />
        </div>
      </BoardScaleContextProvider>);
  }
}

const enhance = connect(
  ({
    lifecycle: { stage },
    game: {
      player: {
        score, highScore, levelNumber, timeLeft,
      },
    },
  }: ReduxState) => ({
    score,
    highScore,
    levelNumber,
    timeLeft,
    stage,
  }),
  (dispatch: *) => {
    const {
      lifecycleGameStart,
      lifecycleGamePauseEnd,
      lifecycleMainMenu,
      lifecycleGameNextLevel,
      lifecycleAtomsExplodeEnd,
    } = lifecycleActions;
    return bindActionCreators({
      lifecycleGameStart,
      lifecycleGamePauseEnd,
      lifecycleMainMenu,
      lifecycleGameNextLevel,
      lifecycleAtomsExplodeEnd,
    }, dispatch);
  }
);

export default enhance(GameScreen);
