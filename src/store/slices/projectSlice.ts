import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { RootState } from '../store';

export interface TaskItem {
  taskName: string;
  taskStatus: string;
  id: string;
}

export interface FinanceItem {
  itemName: string;
  itemPrice: string;
  quantity: number;
  category: string;
  date: Date;
  minutes: number;
}

export interface ProjectState {
  projectName: string;
  dueDate: Date;
  id: string;
  tasks: Array<TaskItem>;
  items: Array<FinanceItem>;
}

const initialState: ProjectState = {
  projectName: '',
  dueDate: new Date('01/01/2021'),
  id: '',
  tasks: [],
  items: [],
};

function idMaker(projectName: string) {
  const a = Math.floor(Math.random() * 100);
  const b = projectName[0];
  return b + a;
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
    setProjectDueDate: (state, action: PayloadAction<Date>) => {
      state.dueDate = action.payload;
    },
    setId: (state) => {
      state.id = idMaker(state.projectName);
    },
    addTask: (state, action: PayloadAction<{ taskName: string; taskStatus: string }>) => {
      state.tasks = [
        ...(state.tasks || []),
        {
          taskName: action.payload.taskName,
          taskStatus: action.payload.taskStatus,
          id: idMaker(action.payload.taskName),
        },
      ];
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
    addLineItem: (
      state,
      action: PayloadAction<{
        itemName: string;
        itemPrice: string;
        quantity: number;
        category: string;
        date: Date;
        minutes: number;
        hours: number;
      }>
    ) => {
      state.items = [
        ...(state.items || []),
        {
          itemName: action.payload.itemName,
          itemPrice: action.payload.itemPrice,
          quantity: action.payload.quantity,
          category: action.payload.category,
          date: action.payload.date,
          minutes: Math.floor(action.payload.minutes) + Math.floor(action.payload.hours * 60),
        },
      ];
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const {
  setProjectName,
  setId,
  addTask,
  clearTasks,
  addLineItem,
  clearItems,
  setProjectDueDate,
} = projectSlice.actions;

export const selectProject = (state: RootState): ProjectState => state.project;

export default projectSlice.reducer;
