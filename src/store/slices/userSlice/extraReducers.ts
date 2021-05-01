import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
/* eslint-disable import/no-cycle */
import { UserState } from './index';
import { signIn } from './thunks';

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  // //////////////SIGN IN////////////////
  builder.addCase(signIn.pending, (state) => {
    state.error = '';
  });
  builder.addCase(signIn.fulfilled, (state, { payload }) => {
    if (payload.existingUser) {
      state.firstName = payload.existingUser.firstName;
      state.lastName = payload.existingUser.lastName;
      state.uuid = payload.existingUser.uuid;
      state.email = payload.existingUser.email;
      state.id = payload.existingUser.id;
    } else if (payload.newUser) {
      state.firstName = payload.newUser.firstName;
      state.lastName = payload.newUser.lastName;
      state.uuid = payload.newUser.uuid;
      state.email = payload.newUser.email;
      state.id = payload.newUser.id;
    }
    state.error = '';
  });
  builder.addCase(signIn.rejected, (state) => {
    state.error = 'rejected';
  });
};

export default extraReducers;
