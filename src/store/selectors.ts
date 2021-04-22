import { createSelector } from '@reduxjs/toolkit';
import { selectAuth } from './slices/authSlice';
import { selectProject, ItemCategory } from './slices/projectSlice';

export const projectSelector = createSelector(selectProject, (project) => project);

export const selectProjectName = createSelector(
  [projectSelector],
  (project) => project.projectName
);

export const selectProjToDoTasks = createSelector(
  [projectSelector],
  (project) => project.tasks.todo
);

export const selectProjDoingTasks = createSelector(
  [projectSelector],
  (project) => project.tasks.doing
);

export const selectProjDoneTasks = createSelector(
  [projectSelector],
  (project) => project.tasks.done
);

export const selectProjectItems = createSelector([projectSelector], (project) => project.items);

export const selectMaterialItems = createSelector(
  [projectSelector],
  (project) => project.items[ItemCategory.Material]
);

export const selectLaborItems = createSelector(
  [projectSelector],
  (project) => project.items[ItemCategory.Labor]
);

export const selectOtherItems = createSelector(
  [projectSelector],
  (project) => project.items[ItemCategory.Other]
);

export const selectProjectStartDate = createSelector(
  [projectSelector],
  (project) => project.startDate
);

export const selectProjectDueDate = createSelector([projectSelector], (project) => project.dueDate);

export const selectProjectId = createSelector([projectSelector], (project) => project.id);

export const authSelector = createSelector(selectAuth, (user) => user);

export const selectUUID = createSelector([authSelector], (user) => user.uuid);
