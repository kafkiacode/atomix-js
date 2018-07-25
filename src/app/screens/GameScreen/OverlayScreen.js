// @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { gameStages } from '../../enums/game';
import { type GameStage } from '../../types/game';

const styles = StyleSheet.create({
  fullScreen: {
    fontFamily: ['"Press Start 2P"', 'Courier new', 'monospace', 'sans-serif'],
    backgroundColor: '#000',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    boxSizing: 'border-box',
    padding: '1em',
    textAlign: 'center',
  },
  textCard: {
    height: '100%',
    position: 'relative',
    ':before': {
      zIndex: 2,
      mixBlendMode: 'screen',
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      background: 'repeating-linear-gradient(#820130 0, #fff 1em, #820130 2em)',
      height: '100%',
    },
  },
  text: {
    zIndex: 1,
    color: '#000',
    position: 'relative',
    fontSize: '2em',
    height: '100%',
    textTransform: 'uppercase',
  },
  text2: {
    zIndex: 3,
    color: '#fff',
    backgroundColor: '#000',
    position: 'relative',
    fontSize: '2em',
    top: '-100%',
    mixBlendMode: 'multiply',
    height: '100%',
    textTransform: 'uppercase',
  },
});

const mapStageToMessage: { [GameStage]: string } = {
  [gameStages.READY]: 'Click to start level 1',
  [gameStages.PAUSED]: 'PAUSED. Click to return to game',
  [gameStages.GAME_OVER]: 'Game over! Click to go to main menu',
  [gameStages.NEXT_LEVEL]: 'Level complete. Click to play next level',
};
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const OverlayScreen = ({ stage, onExit }: {
  stage: GameStage,
  onExit: () => *,
}) => (
  <div
    className={css(styles.fullScreen)}
    onClick={() => onExit()}
  >
    <div className={css(styles.textCard)}>
      <div className={css(styles.text)}>
        {mapStageToMessage[stage]}
      </div>
      <div className={css(styles.text2)}>
        {mapStageToMessage[stage]}
      </div>
    </div>
  </div>
);

export default OverlayScreen;
