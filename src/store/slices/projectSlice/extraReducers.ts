import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

/* eslint-disable import/no-cycle */
import {
  ProjectState,
  getProjects,
  getProjectById,
  updateTask,
  postProject,
  initialState,
  postTask,
  postItem,
} from './index';

const extraReducers = (builder: ActionReducerMapBuilder<ProjectState>) => {
  // //////////GET ALL PROJECTS////////////////
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

  // //////////////GET ONE PROJECT/////////////////
  builder.addCase(getProjectById.pending, (state) => {
    state.currentProject = initialState.currentProject;
    state.error = '';
    // state.loading = 'loading';
  });
  builder.addCase(getProjectById.fulfilled, (state, { payload }) => {
    state.currentProject = payload.currentProject;
    state.error = '';
    // state.loading="loaded";
  });
  builder.addCase(getProjectById.rejected, (state, action) => {
    // state.loading ="error";
    state.error = action.error.message;
  });

  // //////////////POST PROJECT////////////////
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

  // UPDATE ONE TASK
  builder.addCase(updateTask.pending, () => {
    // state.loading = 'loading';
  });
  builder.addCase(updateTask.fulfilled, (state) => {
    state.error = '';
    // state.loading="loaded";
  });
  builder.addCase(updateTask.rejected, (state, action) => {
  // ///////////POST TASK ///////////////
  builder.addCase(postTask.pending, (state) => {
    state.currentProject.tasks.todo = [...state.currentProject.tasks.todo];
    state.currentProject.tasks.doing = [...state.currentProject.tasks.doing];
    state.currentProject.tasks.done = [...state.currentProject.tasks.done];
    state.error = '';
    // state.loading = 'loading';
  });
  builder.addCase(postTask.fulfilled, (state, { payload }) => {
    state.currentProject.tasks[payload.task.taskStatus].push(payload.task);
    state.error = '';
    // state.loading="loaded";
  });
  builder.addCase(postTask.rejected, (state, action) => {
    // state.loading ="error";
    state.error = action.error.message;
  });

  // ///////////POST ITEMS ///////////////
  // MATERIAL
  builder.addCase(postItem.pending, (state) => {
    state.currentProject.items.material = [...state.currentProject.items.material];
    state.error = '';
    // state.loading = 'loading';
  });
  builder.addCase(postItem.fulfilled, (state, { payload }) => {
    if (payload.item.category === 'material') {
      state.currentProject.items.material.push(payload.item);
      state.error = '';
    } else if (payload.item.category === 'labor') {
      state.currentProject.items.labor.push(payload.item);
      state.error = '';
    } else if (payload.item.category === 'other') {
      state.currentProject.items.other.push(payload.item);
      state.error = '';
    }
    // state.loading="loaded";
  });
  builder.addCase(postItem.rejected, (state, action) => {
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
