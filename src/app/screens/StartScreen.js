// @flow
import React, { Component, type Element } from 'react';
import { type Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { type Action } from '../types/redux/action';
import { Screen } from './styles';
import einstein from '../../assets/img/einstein.jpg';
import { lifecycleMainMenu } from '../redux/actions/lifecycle';

const styles = StyleSheet.create({
  startScreen: {
    backgroundImage: `url(${einstein})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  button: {
    border: 'none',
    background: 'transparent',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    zIndex: 2,
    position: 'relative',
  },
  atomixTitle: {
    textTransform: 'uppercase',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '10vw',
  },
});

const StartScreen = ({
  moveNextScreen,
}: {
  moveNextScreen: () => null,
}): Element<(typeof Component) | 'div'> => (
  <div className={css(Screen.screen, styles.startScreen)}>
    <h1 className={css(styles.atomixTitle)}>Atomix</h1>
    <button onClick={moveNextScreen} className={css(styles.button)} />
  </div>);

const enhance = connect(
  null,
  (dispatch: Dispatch<Action>) => ({
    moveNextScreen: () => dispatch(lifecycleMainMenu()),
  })
);

export default enhance(StartScreen);
