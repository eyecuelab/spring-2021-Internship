import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
// eslint-disable-next-line
import { RootState } from '../store';

interface ActivityItem {
  dateTime: dayjs.Dayjs;
  description: string;
}

export interface TaskItem {
  taskName: string;
  taskStatus: string;
  id: string;
  activity: Array<ActivityItem>;
}

export interface FinanceItem {
  itemName: string;
  itemPrice: number;
  quantity: number;
  category: string;
  date: Date;
  minutes: number;
}

export interface ProjectState {
  projectName: string;
  startDate: Date;
  dueDate: Date;
  id: string;
  items: Record<string, Array<FinanceItem>>;
  tasks: Record<string, Array<TaskItem>>;
}

const initialState: ProjectState = {
  projectName: '',
  startDate: new Date(),
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

const now = dayjs();

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
    setProjectStartDate: (state) => {
      state.startDate = new Date();
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
          activity: [
            {
              dateTime: now,
              description: `${action.payload.taskName} created and added to ${action.payload.taskStatus}`,
            },
          ],
        },
      ];
    },
    moveTask: (
      state,
      action: PayloadAction<{
        taskName: string;
        id: string;
        formerStatus: string;
        taskStatus: string;
        activity: Array<ActivityItem>;
        fromIndex: number;
        toIndex: number;
      }>
    ) => {
      state.tasks[action.payload.formerStatus] = state.tasks[action.payload.formerStatus].filter(
        (e) => e.id !== action.payload.id
      );
      const updatedDestinationArray = [...state.tasks[action.payload.taskStatus]];
      updatedDestinationArray.splice(action.payload.toIndex, 0, {
        taskName: action.payload.taskName,
        taskStatus: action.payload.taskStatus,
        id: action.payload.id,
        activity: [
          ...action.payload.activity,
          {
            dateTime: now,
            description: `${action.payload.taskName} was moved to ${action.payload.taskStatus}`,
          },
        ],
      });
      state.tasks[action.payload.taskStatus] = updatedDestinationArray;
    },
    clearTasks: (state) => {
      state.tasks = initialState.tasks;
    },
    addLineItem: (
      state,
      action: PayloadAction<{
        itemName: string;
        itemPrice: number;
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
    deleteTask: (
      state,
      action: PayloadAction<{
        id: string;
        taskStatus: string;
      }>
    ) => {
      state.tasks[action.payload.taskStatus] = state.tasks[action.payload.taskStatus].filter(
        (e) => e.id !== action.payload.id
      );
    },
    // updateTaskStatus: (
    //   state,
    //   action: PayloadAction<{
    //     taskName: string;
    //     taskStatus: string;
    //     id: string;
    //     formerStatus: string;
    //   }>
    // ) => {
    //   state.tasks[action.payload.formerStatus] = state.tasks[action.payload.formerStatus].filter(
    //     (e) => e.id !== action.payload.id
    //   );
    //   state.tasks[action.payload.taskStatus] = [
    //     ...(state.tasks[action.payload.taskStatus] || []),
    //     {
    //       taskName: action.payload.taskName,
    //       taskStatus: action.payload.taskStatus,
    //       id: action.payload.id,
    //     },
    //   ];
    // },
  },
});

export const {
  setProjectName,
  setId,
  addTask,
  clearTasks,
  addLineItem,
  clearItems,
  setProjectStartDate,
  setProjectDueDate,
  // updateTaskStatus,
  moveTask,
  deleteTask,
} = projectSlice.actions;

export const selectProject = (state: RootState): ProjectState => state.project;

export default projectSlice.reducer;
