import { createStore, applyMiddleware } from 'redux';
import repositoriesReducer from '../reducers/repositories-reducer';
import thunk from './thunk';

const appCreateStore = () => (
  createStore(repositoriesReducer, applyMiddleware(thunk))
);

export default appCreateStore;
