import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
/* eslint-disable import/no-cycle */
import { initialState, UserState } from './index';
import { signIn, signOut } from './thunks';

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  // //////////////SIGN IN OR SIGN UP////////////////
  builder.addCase(signIn.pending, (state) => {
    state.userInfo = initialState.userInfo;
  });
  builder.addCase(signIn.fulfilled, (state, { payload }) => {
    console.log('what', payload);
    if (payload.user) {
      state.userInfo = payload.user;
    }
  });
  builder.addCase(signIn.rejected, (state) => {
    state.userInfo = initialState.userInfo;
  });
  // //////////////SIGN IN OR SIGN UP////////////////
  builder.addCase(signOut.pending, (state) => {
    // state.userInfo = initialState.userInfo;
  });
  builder.addCase(signOut.fulfilled, (state) => {
    console.log('what is happening', state.userInfo, initialState.userInfo);
    state.userInfo = initialState.userInfo;
  });
  builder.addCase(signOut.rejected, (state) => {
    // state.userInfo = initialState.userInfo;
  });
};

export default extraReducers;
