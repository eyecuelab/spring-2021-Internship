import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
// eslint-disable-next-line
import { RootState } from '../../store';
/* eslint-disable import/no-cycle */
import extraReducers from './extraReducers';

interface ActivityItem {
  dateTime: dayjs.Dayjs;
  description: string;
}

export interface TaskItem {
  taskName: string;
  taskStatus: string;
  taskDesc: string;
  id: string;
  position: number;
  activity: Array<ActivityItem>;
}

export enum ItemCategory {
  Labor = 'labor',
  Material = 'material',
  Other = 'other',
}
export interface LaborItem {
  itemName: string;
  itemPrice?: never;
  quantity?: never;
  category: ItemCategory.Labor;
  date: Date;
  hours: number;
  id: string;
}
export interface MaterialItem {
  itemName: string;
  itemPrice: number;
  quantity: number;
  category: ItemCategory.Material;
  date?: never;
  hours?: never;
  id: string;
}
export interface OtherItem {
  itemName: string;
  itemPrice: number;
  quantity?: never;
  category: ItemCategory.Other;
  date?: never;
  hours?: never;
  id: string;
}
export type FinanceItem = LaborItem | MaterialItem | OtherItem;

export interface CurrentProject {
  projectName: string;
  startDate: string;
  endDate: string;
  id: string;
  items: {
    [ItemCategory.Material]: MaterialItem[];
    [ItemCategory.Labor]: LaborItem[];
    [ItemCategory.Other]: OtherItem[];
  };
  tasks: Record<string, Array<TaskItem>>;
}

export interface ListProject {
  projectName: string;
  startDate: string;
  endDate: string;
  id: string;
}

export interface ProjectState {
  currentProject: CurrentProject;
  projectsList: Array<ListProject>;
  error: string | undefined;
}

export const initialState: ProjectState = {
  currentProject: {
    projectName: '',
    startDate: '',
    endDate: '',
    id: '',
    items: { material: [], labor: [], other: [] },
    tasks: { todo: [], doing: [], done: [] },
  },
  projectsList: [],
  error: '',
};

const now = dayjs();
export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    moveTask: (
      state,
      action: PayloadAction<{
        taskName: string;
        id: string;
        formerStatus: string;
        taskStatus: string;
        taskDesc: string;
        updatedPosition: number;
        activity: Array<ActivityItem>;
        fromIndex: number;
        toIndex: number;
      }>
    ) => {
      state.currentProject.tasks[action.payload.formerStatus] = state.currentProject.tasks[
        action.payload.formerStatus
      ].filter((e) => e.id !== action.payload.id);
      const updatedDestinationArray = [...state.currentProject.tasks[action.payload.taskStatus]];
      updatedDestinationArray.splice(action.payload.toIndex, 0, {
        taskName: action.payload.taskName,
        taskStatus: action.payload.taskStatus,
        taskDesc: action.payload.taskDesc,
        id: action.payload.id,
        position: action.payload.updatedPosition,
        activity: [
          // ...action.payload.activity,
          {
            dateTime: now,
            description: ``,
          },
        ],
      });
      state.currentProject.tasks[action.payload.taskStatus] = updatedDestinationArray;
    },
  },
  extraReducers: (builder) => {
    extraReducers(builder);
  },
});

export const { moveTask } = projectSlice.actions;

export const selectProject = (state: RootState): ProjectState => state.project;

export default projectSlice.reducer;
