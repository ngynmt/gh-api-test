// react and redux dependencies
import { createStore, applyMiddleware, compose } from 'redux';

// middlewares
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

// all reducers
import reducers from '../reducers/combineReducer';

const middlewares = [thunk, logger];
const store = createStore(reducers, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
