// @flow
import React from 'react';
import { lifecycle } from 'recompose';
import { Provider } from 'react-redux';
import Lifecycle from './app/screens/Lifecycle';
import createStore from './app/redux/createStore';

const store = createStore();
window.store = store;
const App = () => (
  <Provider store={store}>
    <Lifecycle />
  </Provider>);

const debugEnhance = lifecycle({
  // componentDidMount() {
  //   store.dispatch({ type: 'LIFECYCLE_GAME_LOAD' });
  // },
});

export default debugEnhance(App);
