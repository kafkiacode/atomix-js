// @flow
import React, { type Node } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { type Difficulty } from '../../types/general';
import { difficulties } from '../../enums/general';

const { EASY, MEDIUM, HARD } = difficulties;

const styles: Object = StyleSheet.create({
  main: {
    marginTop: '2em',
  },
  button: {
    fontSize: '1em',
    fontFamily: ['"Press Start 2P"', 'Courier new', 'monospace', 'sans-serif'],
    color: '#FFF',
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
    ':focus': {
      // backgroundColor: 'transparent',
      // outline: 'none',
    },
  },
});

const DifficultySelector = ({ onSelect }: {
  onSelect: (difficulty: Difficulty) => void
}): Node => (
  <div className={css(styles.main)}>
    <p>To start,<br /><br />choose difficulty:</p>
    <p>
      <button className={css(styles.button)} onClick={() => onSelect(EASY)}>Easy</button>,
      <button className={css(styles.button)} onClick={() => onSelect(MEDIUM)}>Medium</button>,
      <button className={css(styles.button)} onClick={() => onSelect(HARD)}>Hard</button>.
    </p>
  </div>
);

export default DifficultySelector;
