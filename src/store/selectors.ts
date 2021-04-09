import { createSelector } from '@reduxjs/toolkit';
import { selectAuth } from './slices/authSlice';
import { selectProject } from './slices/projectSlice';

export const projectSelector = createSelector(selectProject, (project) => project);

export const selectProjectName = createSelector(
  [projectSelector],
  (project) => project.projectName
);

export const selectProjectTasks = createSelector([projectSelector], (project) => project.tasks);

export const authSelector = createSelector(selectAuth, (user) => user);

export const selectUUID = createSelector([authSelector], (user) => user.uuid);
