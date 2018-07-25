// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    fontFamily: ['"Press Start 2P"', 'Courier new', 'monospace', 'sans-serif'],
    textTransform: 'uppercase',
    fontSize: '2.5vmin',
    display: 'inline-flex',
    alignItems: 'flex-start',
    color: '#fff',
  },
  label: {
    fontSize: '1em',
    marginRight: '1em',
  },
  value: {
    fontSize: '1em',
  },
  big: {
    fontSize: '2em',
  },
  withBelow: {
    flexDirection: 'column',
  },
  below: {
    paddingTop: '0.1em',
    alignSelf: 'flex-end',
  },
});

const StateIndicator = ({
  label,
  value,
  showValueInBig,
  showValueBelow,
}: {
  label: string,
  value: number | string,
  showValueInBig?: boolean,
  showValueBelow?: boolean,
}) => (
  <div className={css(styles.container, showValueBelow && styles.withBelow)}>
    <span className={css(styles.label)}>{label}</span>
    <span className={css(styles.value, showValueInBig && styles.big, showValueBelow && styles.below)}>{value}</span>
  </div>);

StateIndicator.defaultProps = {
  showValueInBig: false,
  showValueBelow: false,
};


export default StateIndicator;
