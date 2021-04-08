import { combineReducers } from 'redux';
/* eslint-disable import/no-cycle */
import authReducer from './authSlice';
import projectReducer from './projectSlice';

export default function createRootReducer() {
  return combineReducers({
    user: authReducer,
    project: projectReducer,
  });
}
