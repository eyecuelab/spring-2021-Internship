import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const testProject = {
  project: {
    projectName: 'From Front End',
    startDate: '2019-04-28',
    endDate: '2019-04-28',
  },
};
export const getProjects = createAsyncThunk('project/getProjects', async () => {
  return axios.get(`http://localhost:3000/api/projects/`).then((res) => {
    console.log(res.data);
  });
});

export const postProject = createAsyncThunk('project/postProject', async () => {
  return axios.post(`http://localhost:3000/api/projects/`, testProject).then((res) => {
    console.log(res.data);
  });
});

const initialState = {
  projectName: '',
};

export const testApiSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: {
    [getProjects.pending]: (state) => {
      state.projectName = 'Pending';
    },
    [getProjects.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.projectName = 'success';
    },
    [getProjects.rejected]: (state) => {
      state.projectName = 'failed';
    },
    [postProject.pending]: (state) => {
      state.projectName = 'Pending';
    },
    [postProject.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.projectName = payload.projectName;
    },
    [postProject.rejected]: (state) => {
      state.projectName = 'failed';
    },
  },
});

export default testApiSlice.reducer;
