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
}

export interface ProjectState {
  projectName: string;
  dueDate: Date;
  id: string;
  tasks: Array<TaskItem>;
  items: Array<FinanceItem>;
  totals: number;
}

const initialState: ProjectState = {
  projectName: '',
  dueDate: new Date('01/01/2021'),
  id: '',
  tasks: [],
  items: [],
  totals: 0,
};

function idMaker(projectName: string) {
  const a = Math.floor(Math.random() * 100);
  const b = projectName[0];
  return b + a;
}

function calculateTotal(items: FinanceItem[]): number {
  let total = 0;
  items.forEach((e) => {
    total += parseInt(e.itemPrice, 10);
  });
  return total;
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
      }>
    ) => {
      state.items = [
        ...(state.items || []),
        {
          itemName: action.payload.itemName,
          itemPrice: action.payload.itemPrice,
          quantity: action.payload.quantity,
          category: action.payload.category,
        },
      ];
    },
    clearItems: (state) => {
      state.items = [];
      state.totals = 0;
    },
    calculateTotals: (state) => {
      state.totals = calculateTotal(state.items);
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
  calculateTotals,
  setProjectDueDate,
} = projectSlice.actions;

export const selectProject = (state: RootState): ProjectState => state.project;

export default projectSlice.reducer;
