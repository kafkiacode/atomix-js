// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
export default () => {
  const store = createStore(
    rootReducer,
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function')
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : undefined,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

