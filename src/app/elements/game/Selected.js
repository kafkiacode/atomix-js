// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  selected: {
    boxSizing: 'border-box',
    width: '1in',
    height: '1in',
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 'calc(1in / 16 * 2) calc(1in / 16 * 3) calc(1in / 16 * 3) calc(1in / 16 * 2)',
  },
  inner: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  circle1: {
    boxSizing: 'border-box',
    border: 'calc(1in / 16) solid red', // TODO color
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    position: 'absolute',
    zIndex: 1,
  },
  circle2: {
    boxSizing: 'border-box',
    position: 'absolute',
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    zIndex: 2,
    border: 'calc(1in / 16) dotted orange',
    animationName: {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
    animationDuration: '2.5s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
});

const Selected = () => (
  <div className={css(styles.selected)}>
    <div className={css(styles.inner)}>
      <div className={css(styles.circle1)} />
      <div className={css(styles.circle2)} />
    </div>
  </div>);

export default Selected;
