import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
// eslint-disable-next-line
import { RootState } from '../store';

interface AuthState {
  email: string;
  password: string;
  uuid: string;
}

const initialState: AuthState = {
  email: '',
  password: '',
  uuid: '',
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUUID: (state) => {
      state.uuid = v4();
    },
  },
});

export const { setEmail, setPassword, setUUID } = authSlice.actions;

export const selectAuth = (state: RootState): AuthState => state.user;

export default authSlice.reducer;
