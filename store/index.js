import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import reducers from './reducers';

function generateCompose(...middlewares) {
  if (process.env.NODE_ENV === 'development') {
    return composeWithDevTools(...middlewares);
  }
  return compose(...middlewares);
}

export default initialState => createStore(reducers, initialState, generateCompose(applyMiddleware(thunk, loadingBarMiddleware())));
