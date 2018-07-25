// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  selector: {
    boxSizing: 'border-box',
    border: 'calc(1in / 16) solid red', // TODO color
    borderRadius: 'calc(1in / 16)',
    width: '1in',
    height: '1in',
    left: 0,
    top: 0,
    position: 'absolute',
  },
});

const Selector = () => (<div className={css(styles.selector)} />);

export default Selector;
