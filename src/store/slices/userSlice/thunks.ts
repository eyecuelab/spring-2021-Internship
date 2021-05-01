import { createAsyncThunk } from '@reduxjs/toolkit';

export const signIn = createAsyncThunk('user/signIn', async (googleData: any, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const signOut = createAsyncThunk('user/signIn', async (googleData: any, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
