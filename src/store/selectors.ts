import { createSelector } from '@reduxjs/toolkit';
// import { selectAuth } from './slices/authSlice';
import { selectProject, ItemCategory } from './slices/projectSlice';

export const projectSelector = createSelector(selectProject, (project) => project);

export const selectProjectName = createSelector(
  [projectSelector],
  (project) => project.currentProject.projectName
);

export const selectProjToDoTasks = createSelector(
  [projectSelector],
  (project) => project.currentProject.tasks.todo
);

export const selectProjDoingTasks = createSelector(
  [projectSelector],
  (project) => project.currentProject.tasks.doing
);

export const selectProjDoneTasks = createSelector(
  [projectSelector],
  (project) => project.currentProject.tasks.done
);

export const selectProjectItems = createSelector(
  [projectSelector],
  (project) => project.currentProject.items
);

export const selectMaterialItems = createSelector(
  [projectSelector],
  (project) => project.currentProject.items[ItemCategory.Material]
);

export const selectLaborItems = createSelector(
  [projectSelector],
  (project) => project.currentProject.items[ItemCategory.Labor]
);

export const selectOtherItems = createSelector(
  [projectSelector],
  (project) => project.currentProject.items[ItemCategory.Other]
);

export const selectProjectStartDate = createSelector(
  [projectSelector],
  (project) => project.currentProject.startDate
);

export const selectProjectEndDate = createSelector(
  [projectSelector],
  (project) => project.currentProject.endDate
);

export const selectProjectId = createSelector(
  [projectSelector],
  (project) => project.currentProject.id
);

export const selectProjectList = createSelector(
  [projectSelector],
  (project) => project.projectsList
);

// export const authSelector = createSelector(selectAuth, (user) => user);

// export const selectUUID = createSelector([authSelector], (user) => user.uuid);
