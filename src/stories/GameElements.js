// @flow
/* global module */
import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { getGameBackgroundDecorator } from './decorators';
import NeonBar from '../app/elements/decoration/NeonBar';
import Brick from '../app/elements/game/Brick';
import AtomBall from '../app/elements/game/AtomBall';
import Atom from '../app/elements/game/Atom';
import Selected from '../app/elements/game/Selected';
import AtomExplosion from '../app/elements/game/AtomExplosion';
import { elements, bondsCounts, diagonalDirections } from '../app/enums/chemistry';
import { basicDirections } from '../app/enums/game';
import Arrow from '../app/elements/game/Arrow';

export default () => {
  storiesOf('NeonBar', module)
    .add('Default', () => (<NeonBar />));

  storiesOf('Brick', module)
    .add('For level 2', () => (<Brick />));

  storiesOf('AtomExplosion', module)
    .add('Default', () => {
      class AtomExplosionWrapper extends Component<{}, { atomKey: number}> {
        state = { atomKey: 1 };
        increaseAtomKey = () => {
          this.setState({ atomKey: this.state.atomKey + 1 });
        };
        render() {
          return (
            <div style={{ position: 'relative', height: '1in', width: '1in' }}>
              <AtomExplosion
                key={this.state.atomKey}
                onDone={() => { this.increaseAtomKey(); }}
                x={0}
                y={0}
              />
            </div>);
        }
      }
      return <AtomExplosionWrapper />;
    });
  const gameBackgroundDecorator = getGameBackgroundDecorator();

  storiesOf('AtomBall', module)
    .addDecorator(gameBackgroundDecorator)
    .add('Simple', () => <AtomBall color="#00F" letters="H" />);

  const baseAtom = {
    element: elements.S, x: 0, y: 0, bonds: [],
  };

  storiesOf('Atom', module)
    .addDecorator(gameBackgroundDecorator)
    .add('Simple', () => <Atom atom={baseAtom} />)
    .add('Simple with one single bound', () => (
      <Atom atom={{
        ...baseAtom,
        bonds: [
          { count: bondsCounts.SINGLE, direction: diagonalDirections.DOWN_RIGHT },
        ],
      }}
      />))
    .add('Simple with many single bounds', () => (
      <Atom atom={{
        ...baseAtom,
        bonds: [
          { count: bondsCounts.SINGLE, direction: diagonalDirections.DOWN_RIGHT },
          { count: bondsCounts.SINGLE, direction: diagonalDirections.DOWN_LEFT },
          { count: bondsCounts.SINGLE, direction: basicDirections.UP },
        ],
      }}
      />))
    .add('Simple with single and bounds', () => (
      <Atom atom={{
        ...baseAtom,
        bonds: [
          { count: bondsCounts.SINGLE, direction: diagonalDirections.DOWN_LEFT },
          { count: bondsCounts.DOUBLE, direction: basicDirections.RIGHT },
        ],
      }}
      />));
  storiesOf('Selected Atom', module)
    .addDecorator(gameBackgroundDecorator)
    .add('Selected, no leaning', () => <Atom atom={baseAtom}><Selected /></Atom>);
  storiesOf('Selected Atom', module)
    .addDecorator(getGameBackgroundDecorator({ size: 3 }))
    .add('Selected, leaning 1', () => {
      const xy = { x: 1, y: 1 };
      return (
        <Fragment>
          <Atom atom={{ ...baseAtom, x: 1, y: 1 }}><Selected /></Atom>
          <Arrow {...xy} direction={basicDirections.RIGHT} />
          <Arrow {...xy} direction={basicDirections.UP} />
          <Arrow {...xy} direction={basicDirections.LEFT} />
          <Arrow {...xy} direction={basicDirections.DOWN} />
        </Fragment>);
    });
};
