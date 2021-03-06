import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
/* eslint-disable import/no-cycle */
import {
  getProjects,
  getProjectById,
  updateTask,
  postProject,
  postTask,
  postItem,
  putProject,
  deleteTask,
  deleteItem,
  deleteProject,
  putItem,
} from './thunks';
import { ProjectState, initialState, TaskItem, FinanceItem } from './index';

const extraReducers = (builder: ActionReducerMapBuilder<ProjectState>): void => {
  // //////////GET ALL PROJECTS////////////////
  builder.addCase(getProjects.pending, (state) => {
    state.error = '';
  });
  builder.addCase(getProjects.fulfilled, (state, { payload }) => {
    state.projectsList = payload;
    state.error = '';
  });
  builder.addCase(getProjects.rejected, (state, action) => {
    state.error = action.error.message;
  });

  // //////////////GET ONE PROJECT/////////////////
  builder.addCase(getProjectById.pending, (state) => {
    state.currentProject = initialState.currentProject;
    state.error = '';
  });
  builder.addCase(getProjectById.fulfilled, (state, { payload }) => {
    state.currentProject = payload.currentProject;
    state.error = '';
  });
  builder.addCase(getProjectById.rejected, (state, action) => {
    state.error = action.error.message;
  });

  // //////////////POST PROJECT////////////////
  builder.addCase(postProject.pending, (state) => {
    state.projectsList = [...state.projectsList];
    state.error = '';
  });
  builder.addCase(postProject.fulfilled, (state, { payload }) => {
    state.projectsList.push(payload.project);
    state.error = '';
  });
  builder.addCase(postProject.rejected, (state, action) => {
    state.error = action.error.message;
  });

  // /////////// PUT PROJECT//////////////////
  builder.addCase(putProject.pending, (state) => {
    state.projectsList = [...state.projectsList];
  });
  builder.addCase(putProject.fulfilled, (state, { payload }) => {
    state.currentProject.projectName = payload.project.projectName;
    state.currentProject.startDate = payload.project.startDate;
    state.currentProject.endDate = payload.project.endDate;
    state.currentProject.hourly = payload.project.hourly;
    state.currentProject.units = payload.project.units;
    state.currentProject.markup = payload.project.markup;
    state.error = '';
  });
  builder.addCase(putProject.rejected, (state, action) => {
    state.error = action.error.message;
  });

  // //////////////DELETE PROJECT////////////////
  builder.addCase(deleteProject.pending, (state) => {
    state.error = '';
  });
  builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
    state.currentProject = initialState.currentProject;
    state.projectsList = [...state.projectsList].filter((e) => e.id !== payload.id);
    state.error = '';
  });
  builder.addCase(deleteProject.rejected, (state) => {
    state.error = '';
  });

  // ///////////POST TASK ///////////////
  builder.addCase(postTask.pending, (state) => {
    state.currentProject.tasks.todo = [...state.currentProject.tasks.todo];
    state.currentProject.tasks.doing = [...state.currentProject.tasks.doing];
    state.currentProject.tasks.done = [...state.currentProject.tasks.done];
    state.error = '';
  });
  builder.addCase(postTask.fulfilled, (state, { payload }) => {
    state.currentProject.tasks[payload.task.taskStatus].push(payload.task);
    state.error = '';
  });
  builder.addCase(postTask.rejected, (state, action) => {
    state.error = action.error.message;
  });

  // //////////////UPDATE ONE TASK//////////////////
  builder.addCase(updateTask.pending, () => {});
  builder.addCase(updateTask.fulfilled, (state, { payload }) => {
    const targetTask = (e: TaskItem) => e.id === payload.task.id;
    const targetArray = state.currentProject.tasks[payload.task.taskStatus];
    const targetIndex = targetArray.findIndex(targetTask);
    state.currentProject.tasks[payload.task.taskStatus][targetIndex] = payload.task;
    state.error = '';
  });
  builder.addCase(updateTask.rejected, (state, action) => {
    state.error = action.error.message;
  });

  // ///////////DELETE ONE TASK/////////////////
  builder.addCase(deleteTask.pending, () => {});
  builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
    state.currentProject.tasks[payload.taskStatus] = [
      ...state.currentProject.tasks[payload.taskStatus].filter((e) => e.id !== payload.id),
    ];
  });
  builder.addCase(deleteTask.rejected, (state, action) => {
    state.error = action.error.message;
  });

  // ///////////POST ITEMS ///////////////
  builder.addCase(postItem.pending, (state) => {
    state.currentProject.items.material = [...state.currentProject.items.material];
    state.currentProject.items.labor = [...state.currentProject.items.labor];
    state.currentProject.items.other = [...state.currentProject.items.other];
    state.error = '';
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
  });
  builder.addCase(postItem.rejected, (state, action) => {
    state.error = action.error.message;
  });

  // //////////UPDATE ONE ITEM /////////////////
  builder.addCase(putItem.pending, () => {});
  builder.addCase(putItem.fulfilled, (state, { payload }) => {
    if (payload.item.category === 'material') {
      const targetItem = (e: FinanceItem) => e.id === payload.item.id;
      const targetIndex = state.currentProject.items.material.findIndex(targetItem);
      state.currentProject.items.material[targetIndex] = payload.item;
      state.error = '';
    } else if (payload.item.category === 'labor') {
      const targetItem = (e: FinanceItem) => e.id === payload.item.id;
      const targetIndex = state.currentProject.items.labor.findIndex(targetItem);
      state.currentProject.items.labor[targetIndex] = payload.item;
      state.error = '';
    } else if (payload.item.category === 'other') {
      const targetItem = (e: FinanceItem) => e.id === payload.item.id;
      const targetIndex = state.currentProject.items.other.findIndex(targetItem);
      state.currentProject.items.other[targetIndex] = payload.item;
      state.error = '';
    }
  });
  builder.addCase(putItem.rejected, (state, action) => {
    state.error = action.error.message;
  });

  // //////////////DELETE ONE ITEM////////////////
  builder.addCase(deleteItem.pending, () => {});
  builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
    if (payload.category === 'material') {
      state.currentProject.items.material = [
        ...state.currentProject.items.material.filter((e) => e.id !== payload.id),
      ];
      state.error = '';
    } else if (payload.category === 'labor') {
      state.currentProject.items.labor = [
        ...state.currentProject.items.labor.filter((e) => e.id !== payload.id),
      ];
      state.error = '';
    } else if (payload.category === 'other') {
      state.currentProject.items.other = [
        ...state.currentProject.items.other.filter((e) => e.id !== payload.id),
      ];
      state.error = '';
    }
  });
  builder.addCase(deleteItem.rejected, (state, action) => {
    state.error = action.error.message;
  });
};

export default extraReducers;
