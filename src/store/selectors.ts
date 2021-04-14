import { createSelector } from '@reduxjs/toolkit';
import { selectAuth } from './slices/authSlice';
import { selectProject } from './slices/projectSlice';

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
  (project) => project.items.materials
);
export const selectLaborItems = createSelector([projectSelector], (project) => project.items.labor);
export const selectOtherItems = createSelector([projectSelector], (project) => project.items.other);

export const selectProjectDueDate = createSelector([projectSelector], (project) => project.dueDate);

export const authSelector = createSelector(selectAuth, (user) => user);

export const selectUUID = createSelector([authSelector], (user) => user.uuid);
