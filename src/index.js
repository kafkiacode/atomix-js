// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import preventIosSwipeDownRefresh from './app/helpers/preventIosSwipeDownRefresh';

preventIosSwipeDownRefresh();

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.render(<App isWelcome />, rootEl);
}
