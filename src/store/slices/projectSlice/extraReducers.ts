import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

/* eslint-disable import/no-cycle */
import { ProjectState, getProjects, getProjectById, postProject, initialState } from './index';

const extraReducers = (builder: ActionReducerMapBuilder<ProjectState>) => {
  // GET ALL PROJECTS
  builder.addCase(getProjects.pending, (state) => {
    state.projectsList = [];
    state.error = '';
    // state.loading = 'loading';
  });
  builder.addCase(getProjects.fulfilled, (state, { payload }) => {
    state.projectsList = payload;
    state.error = '';
    // state.loading="loaded";
  });
  builder.addCase(getProjects.rejected, (state, action) => {
    // state.loading ="error";
    state.error = action.error.message;
  });

  // GET ONE PROJECT
  builder.addCase(getProjectById.pending, (state) => {
    state.currentProject = initialState.currentProject;
    state.error = '';
    // state.loading = 'loading';
  });
  builder.addCase(getProjectById.fulfilled, (state, { payload }) => {
    state.currentProject = payload.project;
    state.error = '';
    // state.loading="loaded";
  });
  builder.addCase(getProjectById.rejected, (state, action) => {
    // state.loading ="error";
    state.error = action.error.message;
  });

  // POST PROJECT
  builder.addCase(postProject.pending, (state) => {
    state.projectsList = [...state.projectsList];
    state.error = '';
    // state.loading = 'loading';
  });
  builder.addCase(postProject.fulfilled, (state, { payload }) => {
    state.projectsList.push(payload.project);
    state.error = '';
    // state.loading="loaded";
  });
  builder.addCase(postProject.rejected, (state, action) => {
    // state.loading ="error";
    state.error = action.error.message;
  });
};

export default extraReducers;

// // PUT PROJECT
// builder.addCase(putProject.pending, (state) => {
//   state.projectsList = [...state.projectsList];
//   // state.loading = 'loading';
// });
// builder.addCase(postProject.fulfilled, (state, { payload }) => {
//   state.projectsList.push(payload);
//   // state.loading="loaded";
// });
// builder.addCase(postProject.rejected, (state, action) => {
//   // state.loading ="error";
//   // state.error=action.error.message;
//   console.log(action.error.message);
// });
// builder.addCase(postProject.pending, (state) => {
//   state.projectsList = [...state.projectsList];
//   // state.loading = 'loading';
// });
// builder.addCase(postProject.fulfilled, (state, { payload }) => {
//   state.projectsList.push(payload);
//   // state.loading="loaded";
// });
// builder.addCase(postProject.rejected, (state, action) => {
//   // state.loading ="error";
//   // state.error=action.error.message;
//   console.log(action.error.message);
// });
// },
