// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export const height = 7;
export const multiplier = 2;

const styles = StyleSheet.create({
  neonbar: {
    borderRadius: (height * multiplier) / 2,
    height: height * multiplier,
    animationDuration: '180s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease',
  },
  // inner sizes are in reference to height = 6 and multiplier = 2
  light: {
    height: 6,
    marginTop: 2,
    marginLeft: 6,
    marginRight: 6,
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'solid',
    borderRadius: 3,
    backgroundClip: 'content-box',
  },
});

const NeonBar = ({
  color: backgroundColor,
  length = 200,
  style,
  styles: propStyles,
}: {
  color?: string,
  length?: number,
  style?: {},
  styles?: Array<*>
}) => (
  <div className={css(styles.neonbar, propStyles)} style={{ backgroundColor, width: length * multiplier, ...style }}>
    <div className={css(styles.light)} />
  </div>);

NeonBar.defaultProps = {
  color: '#001E65',
  length: 200,
  style: undefined,
  styles: [],
};

export default NeonBar;
