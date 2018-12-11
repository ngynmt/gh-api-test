// redux dependencies
import { combineReducers } from 'redux';

// reducers
import pagesReducer from './pagesReducer';
import createReducer from './createReducer';

const reducers = combineReducers({
  pagesReducer,
  createReducer
});

export default reducers;
