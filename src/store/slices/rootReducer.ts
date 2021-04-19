import { Reducer } from 'react';
import { AnyAction, CombinedState, combineReducers } from 'redux';
/* eslint-disable import/no-cycle */
import authReducer, { AuthState } from './authSlice';
import projectReducer, { ProjectState } from './projectSlice';

export default function createRootReducer(): Reducer<
  CombinedState<{
    user: AuthState;
    project: ProjectState;
  }>,
  AnyAction
> {
  return combineReducers({
    user: authReducer,
    project: projectReducer,
  });
}
