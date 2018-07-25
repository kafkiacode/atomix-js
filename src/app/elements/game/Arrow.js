// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { type BasicDirection } from '../../types/game';
import { basicDirections } from '../../enums/game';

const {
  UP, LEFT, DOWN, RIGHT,
} = basicDirections;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    boxSizing: 'border-box',
    width: '1in',
    height: '1in',
    padding: 'calc(1in / 16 * 2) calc(1in / 16 * 3) calc(1in / 16 * 3) calc(1in / 16 * 2)',
    transformOrigin: 'calc(1in / 16 * 7.5) calc(1in / 16 * 7.5)',
  },
  [`container-${RIGHT}`]: {
    transform: 'rotate(0deg)',
  },
  [`container-${DOWN}`]: {
    transform: 'rotate(90deg)',
  },
  [`container-${LEFT}`]: {
    transform: 'rotate(180deg)',
  },
  [`container-${UP}`]: {
    transform: 'rotate(270deg)',
  },
  arrow: {
    boxSizing: 'border-box',
    width: 'calc(1in / 16 * 11)',
    height: 'calc(1in / 16 * 11)',
    borderWidth: 'calc(1in / 16 * 5.5)',
    borderStyle: 'solid',
    borderColor: 'transparent transparent transparent red',
    transformOrigin: 'calc(1in / 16 * 5.5) calc(1in / 16 * 5.5)',
    transform: 'translateX(calc(1in / 16 * 12))',
    position: 'relative',
  },
  animatedArrow: {
    boxSizing: 'border-box',
    width: 'calc(1in / 16 * 11)',
    height: 'calc(1in / 16 * 11)',
    borderWidth: 'calc(1in / 16 * 5.5)',
    borderStyle: 'solid',
    borderColor: 'transparent transparent transparent orange',
    position: 'absolute',
    top: 'calc(-1in / 16 * 5.5)',
    left: 'calc(-1in / 16 * 5.5)',
    transformOrigin: '25% 50%',
    animationName: {
      from: {
        transform: 'scale(0.2)',
        borderLeftColor: 'rgba(255, 165, 0, 0)',
      },
      to: {
        transform: 'scale(1)',
        borderLeftColor: 'rgba(255, 165, 0, 1)',
      },
    },
    animationDuration: '1.5s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
});

const Arrow = ({ x, y, direction }: {
  x: number,
  y: number,
  direction: BasicDirection,
}) => (
  <div
    className={css(styles.container, styles[`container-${direction}`])}
    style={{
      left: `${x}in`,
      top: `${y}in`,
    }}
  >
    <div className={css(styles.arrow)}>
      <div className={css(styles.animatedArrow)} />
    </div>
  </div>
);

export default Arrow;
