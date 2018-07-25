// @flow
import React from 'react';
import { connect } from 'react-redux';
import StartScreen from './StartScreen';
import MainScreen from './MainScreen';
import GameScreen from './GameScreen';
import {
  type ScreenId,
  // type Difficulty,
} from '../types/general';
import {
  screenIds,
  // difficulties,
} from '../enums/general';

const Lifecycle = ({
  screenId,
}: {
  screenId: ScreenId,
}) => {
  switch (screenId) {
    case screenIds.START:
      return <StartScreen />;
    case screenIds.MAIN:
      return <MainScreen />;
    case screenIds.GAME:
    default:
      return <GameScreen />;
  }
};

const enhance = connect(({ lifecycle: { screenId } }) => ({ screenId }));

export default enhance(Lifecycle);
