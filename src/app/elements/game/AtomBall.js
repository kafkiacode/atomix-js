// @flow
import React, { type Node } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  atomBallContainer: {
    width: '1in',
    height: '1in',
    cursor: 'pointer',
    // Needed to avoid weird semi transparent highlight when touching atom
    '-webkitTapHighlightColor': 'transparent',
    display: 'inline-block',
    position: 'relative',
    boxSizing: 'border-box',
    padding: 'calc(1in / 16 * 2) calc(1in / 16 * 3) calc(1in / 16 * 3) calc(1in / 16 * 2)',
    transform: 'translate3d(0, 0, 0)',
  },
  ball: {
    zIndex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundImage: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.4), rgba(0, 0, 0, 0.4))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: ['"Press Start 2P"', 'Courier new', 'monospace', 'sans-serif'],
    textTransform: 'uppercase',
    lineHeight: '1',
    fontSize: 'calc(1in * 0.45)',
    verticalAlign: 'baseline',
    backgroundColor: '#00f',
    color: 'rgba(0, 0, 0, 0.6)',
    // boxShadow: 'calc(1in/16) calc(1in/16) 0 rgba(0, 0, 0, 0.3)', // todo: 0.3?
  },
  fixTextPosition: {
    transform: 'translate(.065em,.065em) scale(1.13)',
  },
});

const AtomBall = ({
  letters,
  color,
  style,
  children,
  ...props
}: {
  letters: string,
  color: string,
  style?: {},
  children?: Node,
}) => (
  <div className={css(styles.atomBallContainer)} style={style} {...props}>
    <div className={css(styles.ball)} style={{ backgroundColor: color }}>
      <span className={css(styles.fixTextPosition)}>{letters}</span>
    </div>
    {children}
  </div>);

AtomBall.defaultProps = { style: {}, children: undefined };

export default AtomBall;
