import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
/* eslint-disable import/no-cycle */
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../containers/loginForm/loginSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
