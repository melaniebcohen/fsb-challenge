import { createStore, applyMiddleware } from 'redux';
import thunk from '../lib/thunk.js';

let colorReducer = (state=[], action) => {
  let { type, payload } = action;

  switch(type) {
  case 'MULTIPLE_COLORS_FETCH':
  case 'SINGLE_COLOR_FETCH': 
    return payload;
  default:
    return state;
  }
};

export default () => createStore(colorReducer, applyMiddleware(thunk));