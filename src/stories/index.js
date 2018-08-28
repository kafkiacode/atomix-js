/* global module */
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import '@storybook/addon-viewport/register';
import { withNotes } from '@storybook/addon-notes';

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

storiesOf('Experiments/GameLayout', module)
  .add('Default', withNotes(`
    Constraint 1: The board should always have a fixed proportion (1:1, but maybe 13:12)
    Constraint 2: The board should fill the available space, and leave the rest for the other elements
    Constraint 3: The font-size for the other elements should be equal for all of them, and based on the space they have available
    Constraint 4: The font-size of the other elements should have a minimum value, and if the text does not fit, the board should use less space
    Constraint 5: The use of css units vw, vh, cmin and vmax is not allowed: the layout should be based on the container size
    Constraint 6: There should be the possibility to change the rules according to the orientation of the viewport (use the tab "Viewport" next to "Notes" in Storybook)
    
    Current implementation: Achieves 1 and 2, nothing else, using CSS only, based on css unit vmin.

    <b>Question: How many of these constraints can be solved only with CSS, and how many need JS to be solved?</b>
    `)(() => {
    const Control = () => <div style={{ height: '100%', border: '1px solid lime' }}><StateIndicator label="Score control" value="1000" /></div>;
    return (
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
          moleculeShowcase={(
            <div style={{
              color: '#fff', width: '100%', height: '100%', border: '1px solid lime',
            }}
            >Showcase
            </div>)}
          controls={[
            <Control />,
            <Control />,
            <Control />,
            <Control />,
          ]}
          board={(
            <div style={{
              color: '#fff', width: '100%', height: '100%', border: '1px solid lime',
            }}
            >
              <h3>Board</h3>
            </div>)}
        />
      </div>);
  }));

storiesOf('GameBackground', module)
  .add('Default', () => <GameBackground />);
