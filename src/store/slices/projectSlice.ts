import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import axios from 'axios';
// eslint-disable-next-line
import { RootState } from '../store';

const testProject = {
  project: {
    projectName: 'From Front End',
    startDate: '2019-04-28',
    endDate: '2019-04-28',
  },
};

export const getProjects = createAsyncThunk('project/getProjects', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/projects/`);
    console.log('api try');
    return response.data.projects[0];
  } catch (error) {
    console.log(error.message);
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const postProject = createAsyncThunk('project/postProject', async () => {
  return axios.post(`http://localhost:3000/api/projects/`, testProject).then((res) => {
    console.log(res.data);
  });
});

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
  minutes: number;
  hours: number;
}
export interface MaterialItem {
  itemName: string;
  itemPrice: number;
  quantity: number;
  category: ItemCategory.Material;
  date?: never;
  minutes?: never;
  hours?: never;
}
export interface OtherItem {
  itemName: string;
  itemPrice: number;
  quantity?: never;
  category: ItemCategory.Other;
  date?: never;
  minutes?: never;
  hours?: never;
}
export type FinanceItem = LaborItem | MaterialItem | OtherItem;

export interface ProjectState {
  projectName: string;
  startDate: Date;
  dueDate: Date;
  id: string;
  items: {
    [ItemCategory.Material]: MaterialItem[];
    [ItemCategory.Labor]: LaborItem[];
    [ItemCategory.Other]: OtherItem[];
  };
  tasks: Record<string, Array<TaskItem>>;
}

const initialState: ProjectState = {
  projectName: '',
  startDate: new Date(),
  dueDate: new Date('01/01/2021'),
  id: '',
  items: { material: [], labor: [], other: [] },
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
    // addLineItem: (
    //   state,
    //   action: PayloadAction<{
    //     Item: FinanceItem;
    //   }>
    // ) => {
    //   state.items[action.payload.category] = [
    //     ...(state.items[action.payload.category] || []),
    //     {
    //       itemName: action.payload.itemName,
    //       itemPrice: action.payload.itemPrice,
    //       quantity: action.payload.quantity,
    //       category: action.payload.category,
    //       date: action.payload.date,
    //       minutes: Math.floor(action.payload.minutes) + Math.floor(action.payload.hours * 60),
    //     },
    //   ];
    // },
    addMaterialItem: (
      state,
      action: PayloadAction<{
        item: MaterialItem;
      }>
    ) => {
      state.items.material = [...(state.items.material || []), action.payload.item];
    },
    addLaborItem: (
      state,
      action: PayloadAction<{
        item: LaborItem;
      }>
    ) => {
      state.items.labor = [...(state.items.labor || []), action.payload.item];
    },
    addOtherItem: (
      state,
      action: PayloadAction<{
        item: OtherItem;
      }>
    ) => {
      state.items.other = [...(state.items.other || []), action.payload.item];
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
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.projectName = '';
      // state.loading = 'loading';
    });
    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.projectName = payload.projectName;
      // state.loading="loaded";
    });
    // [getProjects.fulfilled.type]: (state, { payload }) => {
    //   state.projectName = 'success';
    // },
    //   [getProjects.rejected.type]: (state) => {
    //     state.projectName = 'failed';
    //   },
    //   [postProject.pending.type]: (state) => {
    //     state.projectName = 'Pending';
    //   },
    //   [postProject.fulfilled.type]: (
    //     state,
    //     action: PayloadAction<{
    //       projectName: string;
    //       startDate: string;
    //       endDate: string;
    //     }>
    //   ) => {
    //     state.projectName = action.payload.projectName;
    //   },
    //   [postProject.rejected.type]: (state) => {
    //     state.projectName = 'failed';
    //   },
  },
});

export const {
  setProjectName,
  setId,
  addTask,
  clearTasks,
  // addLineItem,
  addMaterialItem,
  addLaborItem,
  addOtherItem,
  clearItems,
  setProjectStartDate,
  setProjectDueDate,
  // updateTaskStatus,
  moveTask,
  deleteTask,
} = projectSlice.actions;

export const selectProject = (state: RootState): ProjectState => state.project;

export default projectSlice.reducer;
