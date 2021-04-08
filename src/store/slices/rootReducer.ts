import { combineReducers } from 'redux';
/* eslint-disable import/no-cycle */
import userReducer from './loginSlice';
import projectReducer from './projectSlice';

export default function createRootReducer() {
  return combineReducers({
    user: userReducer,
    project: projectReducer,
  });
}
