// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import Credits from './Credits';
import { type Difficulty } from '../../types/general';
import DifficultySelector from './DifficultySelector';
import { type Action } from '../../types/redux/action';
import { Screen } from '../styles';
import { lifecycleGameEnter } from '../../redux/actions/lifecycle';

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    color: '#BD9C5A',
    position: 'relative',
    marginBottom: '-2em',
    top: '-2em',
  },
  box: {
    margin: '0 10px',
    padding: '10px',
    border: '5px solid #BD9C5A',
    background: '#BDBDDE',
  },
});

class MainScreen extends Component<{
  selectLevel: (difficulty: Difficulty) => *,
}, {

}> {
  render() {
    const { selectLevel } = this.props;
    return (
      <div className={css(Screen.screen, styles.screen)}>
        <div className={css(styles.box)}>
          <h1 className={css(styles.title)}>Atomix-JS</h1>
          <Credits />
          <DifficultySelector onSelect={(difficulty: Difficulty) => selectLevel(difficulty)} />
        </div>
      </div>);
  }
}

const enhance = connect(
  null,
  (dispatch: Dispatch<Action>) => ({
    selectLevel: (difficulty: Difficulty) => dispatch(lifecycleGameEnter(difficulty)),
  })
);

export default enhance(MainScreen);
