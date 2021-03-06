import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { RootState } from '../../store';
/* eslint-disable import/no-cycle */
import extraReducers from './extraReducers';

export interface UserState {
  userInfo: {
    firstName: string;
    lastName: string;
    uuid: string;
    id: string;
    email: string;
  };
}

export const initialState: UserState = {
  userInfo: {
    firstName: '',
    lastName: '',
    uuid: '',
    id: '',
    email: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducers(builder);
  },
});

export const selectUser = (state: RootState): UserState => state.user;

export default userSlice.reducer;
