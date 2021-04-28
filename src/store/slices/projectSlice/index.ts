import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import axios from 'axios';
// eslint-disable-next-line
import { RootState } from '../../store';
/* eslint-disable import/no-cycle */
import extraReducers from './extraReducers';

const testProject = {
  project: {
    projectName: 'NEW',
    startDate: '2019-04-28',
    endDate: '2019-04-28',
  },
};

export const getProjects = createAsyncThunk('project/getProjects', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/projects/`);
    return response.data.projects;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getProjectById = createAsyncThunk(
  'project/getProjectById',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/projects/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const postProject = createAsyncThunk('project/postProject', async (_, thunkAPI) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/projects/`, testProject);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    {
      taskName,
      intId,
      taskStatus,
      updatedPosition,
    }: { taskName: string; intId: number; taskStatus: string; updatedPosition: number },
    thunkAPI
  ) => {
    try {
      const now = dayjs().toString();
      const taskResponse = await axios.put(`http://localhost:3000/api/tasks/${intId}`, {
        task: {
          id: intId,
          taskStatus,
          position: updatedPosition,
        },
      });
      await axios.post(`http://localhost:3000/api/task-activities`, {
        taskActivity: {
          dateTime: now,
          description: `${taskName} was moved to ${taskStatus}`,
          task: intId,
        },
      });

      return taskResponse.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string, thunkAPI) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

// export const putProject = createAsyncThunk('project/putProject', async (id: number, thunkAPI) => {
//   try {
//     const response = await axios.put(`http://localhost:3000/api/projects/${id}`, testProject);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error.message);
//     return thunkAPI.rejectWithValue({ error: error.message });
//   }
// });

// export const deleteProject = createAsyncThunk(
//   'project/deleteProject',
//   async (id: number, thunkAPI) => {
//     try {
//       const response = await axios.delete(`http://localhost:3000/api/projects/${id}`);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.log(error.message);
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );

export const postTask = createAsyncThunk(
  'project/postTask',
  async (
    { taskName, taskStatus, project }: { taskName: string; taskStatus: string; project: number },
    thunkAPI
  ) => {
    try {
      const now = dayjs();
      const response = await axios.post(`http://localhost:3000/api/tasks/`, {
        task: {
          taskName,
          taskStatus,
          project,
          activity: [
            {
              dateTime: now,
              description: `${taskName} created and added to ${taskStatus}`,
            },
          ],
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const postItem = createAsyncThunk(
  'project/postItem',
  async (
    {
      itemName,
      itemPrice,
      quantity,
      category,
      date,
      minutes,
      hours,
      project,
    }: {
      itemName: string;
      itemPrice: number;
      quantity: number;
      category: string;
      date: string;
      minutes: number;
      hours: number;
      project: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/items/`, {
        item: {
          itemName,
          itemPrice,
          quantity,
          category,
          date,
          minutes,
          hours,
          project,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

interface ActivityItem {
  dateTime: dayjs.Dayjs;
  description: string;
}

export interface TaskItem {
  taskName: string;
  taskStatus: string;
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

function idMaker(projectName: string) {
  const a = Math.floor(Math.random() * 100);
  const b = projectName[0];
  return b + a;
}

const now = dayjs();
// const { projectName, startDate, endDate, id} = state.currentProject;
export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
      state.currentProject.projectName = action.payload;
    },
    setProjectStartDate: (state) => {
      state.currentProject.startDate = new Date().toString();
    },
    setProjectEndDate: (state, action: PayloadAction<string>) => {
      state.currentProject.endDate = action.payload;
    },
    setId: (state) => {
      state.currentProject.id = idMaker(state.currentProject.projectName);
    },

    moveTask: (
      state,
      action: PayloadAction<{
        taskName: string;
        id: string;
        formerStatus: string;
        taskStatus: string;
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
        id: action.payload.id,
        position: action.payload.updatedPosition,
        activity: [
          ...action.payload.activity,
          {
            dateTime: now,
            description: `${action.payload.taskName} was moved to ${action.payload.taskStatus}`,
          },
        ],
      });
      state.currentProject.tasks[action.payload.taskStatus] = updatedDestinationArray;
    },
    clearTasks: (state) => {
      state.currentProject.tasks = initialState.currentProject.tasks;
    },

    clearItems: (state) => {
      state.currentProject.items = initialState.currentProject.items;
    },
    // deleteTask: (
    //   state,
    //   action: PayloadAction<{
    //     id: string;
    //     taskStatus: string;
    //   }>
    // ) => {
    //   state.currentProject.tasks[action.payload.taskStatus] = state.currentProject.tasks[
    //     action.payload.taskStatus
    //   ].filter((e) => e.id !== action.payload.id);
    // },
  },
  extraReducers: (builder) => {
    extraReducers(builder);
  },
});

export const {
  setProjectName,
  setId,
  clearTasks,
  clearItems,
  setProjectStartDate,
  setProjectEndDate,
  moveTask,
} = projectSlice.actions;

export const selectProject = (state: RootState): ProjectState => state.project;

export default projectSlice.reducer;
