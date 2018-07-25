/* global module */
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import '@storybook/addon-viewport/register';

import StateIndicator from '../app/elements/StateIndicator';
import GameLayout from '../app/elements/game/GameLayout';
import GameBackground from '../app/screens/GameScreen/GameBackground';
import coordinateSystemStories from './CoordinateSystem';
import gameElementsStories from './GameElements';
import gameScreensStories from './GameScreens';
import levelsStories from './Levels';

const styles = StyleSheet.create({
  flexContainer: {
    background: '#000',
    // minHeight: '400px',
    // maxHeight: '100%',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

addDecorator(story => <div className={css(styles.flexContainer)}>{story()}</div>);

coordinateSystemStories();
gameElementsStories();
gameScreensStories();
levelsStories();

storiesOf('StateIndicator', module)
  .addDecorator(withKnobs)
  .add('with level', () => (
    <StateIndicator
      label={text('label', 'Label')}
      value={number('value', 1)}
      showValueInBig={boolean('showValueInBig', false)}
      showValueBelow={boolean('showValueBelow', false)}
    />
  ));

storiesOf('GameLayout', module)
  .add('Default', () => (
    <div style={{
      alignSelf: 'stretch',
      flexGrow: 1,
      margin: -10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <GameLayout
        moleculeShowcase={<div style={{ background: 'lime' }} />}
        controls={[
          <StateIndicator />,
          <StateIndicator />,
          <StateIndicator />,
          <StateIndicator />,
        ]}
        board={<div style={{ background: 'red' }} />}
      />
    </div>));

storiesOf('GameBackground', module)
  .add('Default', () => <GameBackground />);
