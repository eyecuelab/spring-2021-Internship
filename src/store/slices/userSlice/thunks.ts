import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line
import { UserState } from '.';

const API_URL: string = process.env.REACT_APP_API_URL ?? 'http://localhost:3000';

export const signIn = createAsyncThunk('user/signIn', async (googleData: any, thunkAPI) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/`,
      { token: googleData.tokenId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    return response.data as { user: UserState['userInfo'] };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const signOut = createAsyncThunk('user/signOut', async (_, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_URL}/api/auth/`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
