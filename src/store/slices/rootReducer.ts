import { Reducer } from 'react';
import { AnyAction, CombinedState, combineReducers } from 'redux';
/* eslint-disable import/no-cycle */
import userReducer, { UserState } from './userSlice';
import projectReducer, { ProjectState } from './projectSlice';

export default function createRootReducer(): Reducer<
  CombinedState<{
    user: UserState;
    project: ProjectState;
  }>,
  AnyAction
> {
  return combineReducers({
    user: userReducer,
    project: projectReducer,
  });
}
