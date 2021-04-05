import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
// eslint-disable-next-line
import { RootState } from '../../app/store';

interface LoginState {
  email: string;
  password: string;
  uuid: string;
}

const initialState: LoginState = {
  email: '',
  password: '',
  uuid: '',
};

export const loginSlice = createSlice({
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

export const { setEmail, setPassword, setUUID } = loginSlice.actions;

export const selectUser = (state: RootState): LoginState => state.user;

export default loginSlice.reducer;
