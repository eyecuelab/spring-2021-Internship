import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { RootState } from '../store';

export interface TaskItem {
  taskName: string;
  taskStatus: any;
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
  items: Record<string, Array<FinanceItem>>;
  tasks: Record<string, Array<TaskItem>>;
}

const initialState: ProjectState = {
  projectName: '',
  dueDate: new Date('01/01/2021'),
  id: '',
  items: { materials: [], labor: [], other: [] },
  tasks: { todo: [], doing: [], done: [] },
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
      state.tasks[action.payload.taskStatus] = [
        ...(state.tasks[action.payload.taskStatus] || []),
        {
          taskName: action.payload.taskName,
          taskStatus: action.payload.taskStatus,
          id: idMaker(action.payload.taskName),
        },
      ];
    },
    clearTasks: (state) => {
      state.tasks.todo = [];
      state.tasks.doing = [];
      state.tasks.done = [];
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
      state.items[action.payload.category] = [
        ...(state.items[action.payload.category] || []),
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
      state.items = initialState.items;
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{
        taskName: string;
        taskStatus: string;
        id: string;
        formerStatus: string;
      }>
    ) => {
      state.tasks[action.payload.formerStatus] = state.tasks[action.payload.formerStatus].filter(
        (e) => e.id !== action.payload.id
      );
      state.tasks[action.payload.taskStatus] = [
        ...(state.tasks[action.payload.taskStatus] || []),
        {
          taskName: action.payload.taskName,
          taskStatus: action.payload.taskStatus,
          id: action.payload.id,
        },
      ];
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
  updateTaskStatus,
} = projectSlice.actions;

export const selectProject = (state: RootState): ProjectState => state.project;

export default projectSlice.reducer;
