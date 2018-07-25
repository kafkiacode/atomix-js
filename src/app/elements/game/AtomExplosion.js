// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { lifecycle } from 'recompose';

const absoluteFill = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    width: '1in',
    height: '1in',
  },
  inner: {
    transition: 'transform 1s linear',
    transformOrigin: 'center',
    ...absoluteFill,
    transform: 'scale(0.25)',
    ':before': {
      content: '\'\'',
      ...absoluteFill,
      background: `
        radial-gradient(ellipse 6.25% 50% at center, #fff 0, #fff 30%, rgba(255,255,255,0) 95%),
        radial-gradient(ellipse 50% 6.25% at center, #fff 0, #fff 30%, rgba(255,255,255,0) 95%)
      `,
      zIndex: 1,
    },
    ':after': {
      content: '\'\'',
      ...absoluteFill,
      background: `
        radial-gradient(ellipse 25% 50% at center, #00f 0, #00f 30%, rgba(0,0,255,0) 95%),
        radial-gradient(ellipse 50% 25% at center, #00f 0, #00f 30%, rgba(0,0,255,0) 95%)
      `,
      zIndex: 0,
    },
  },
  innerOn: {
    transform: 'scale(1)',
  },
});

const AtomExplosion = ({
  onDone, x, y, transitioning,
}: {
  onDone: () => *,
  x: number,
  y: number,
  transitioning?: boolean,
}) => (
  <div
    style={{
      left: `${x}in`,
      top: `${y}in`,
    }}
    className={css(styles.outer)}
  >
    <div
      className={css(styles.inner, transitioning && styles.innerOn)}
      onTransitionEnd={() => onDone()}
    />
  </div>);

AtomExplosion.defaultProps = { transitioning: false };

export default lifecycle({
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    window.setTimeout(() => this.setState({ transitioning: true }), 0);
  },
})(AtomExplosion);
