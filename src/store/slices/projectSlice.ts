import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import axios from 'axios';
// eslint-disable-next-line
import { RootState } from '../store';

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
    console.log('api try');
    return response.data.projects;
  } catch (error) {
    console.log(error.message);
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getProjectById = createAsyncThunk(
  'project/getProjectById',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/projects/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const postProject = createAsyncThunk('project/postProject', async (_, thunkAPI) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/projects/`, testProject);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
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
}

const initialState: ProjectState = {
  currentProject: {
    projectName: '',
    startDate: '',
    endDate: '',
    id: '',
    items: { material: [], labor: [], other: [] },
    tasks: { todo: [], doing: [], done: [] },
  },
  projectsList: [],
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

    addTask: (state, action: PayloadAction<{ taskName: string; taskStatus: string }>) => {
      state.currentProject.tasks[action.payload.taskStatus] = [
        ...(state.currentProject.tasks[action.payload.taskStatus] || []),
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
      state.currentProject.tasks[action.payload.formerStatus] = state.currentProject.tasks[
        action.payload.formerStatus
      ].filter((e) => e.id !== action.payload.id);
      const updatedDestinationArray = [...state.currentProject.tasks[action.payload.taskStatus]];
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
      state.currentProject.tasks[action.payload.taskStatus] = updatedDestinationArray;
    },
    clearTasks: (state) => {
      state.currentProject.tasks = initialState.currentProject.tasks;
    },
    addMaterialItem: (
      state,
      action: PayloadAction<{
        item: MaterialItem;
      }>
    ) => {
      state.currentProject.items.material = [
        ...(state.currentProject.items.material || []),
        action.payload.item,
      ];
    },
    addLaborItem: (
      state,
      action: PayloadAction<{
        item: LaborItem;
      }>
    ) => {
      state.currentProject.items.labor = [
        ...(state.currentProject.items.labor || []),
        action.payload.item,
      ];
    },
    addOtherItem: (
      state,
      action: PayloadAction<{
        item: OtherItem;
      }>
    ) => {
      state.currentProject.items.other = [
        ...(state.currentProject.items.other || []),
        action.payload.item,
      ];
    },
    clearItems: (state) => {
      state.currentProject.items = initialState.currentProject.items;
    },
    deleteTask: (
      state,
      action: PayloadAction<{
        id: string;
        taskStatus: string;
      }>
    ) => {
      state.currentProject.tasks[action.payload.taskStatus] = state.currentProject.tasks[
        action.payload.taskStatus
      ].filter((e) => e.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    // GET ALL PROJECTS
    builder.addCase(getProjects.pending, (state) => {
      state.projectsList = [];
      // state.loading = 'loading';
    });
    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.projectsList = payload;
      // state.loading="loaded";
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      // state.loading ="error";
      // state.error=action.error.message;
      console.log(action.error.message);
    });

    // GET ONE PROJECT
    builder.addCase(getProjectById.pending, (state) => {
      state.currentProject = initialState.currentProject;
      // state.loading = 'loading';
    });
    builder.addCase(getProjectById.fulfilled, (state, { payload }) => {
      state.currentProject = payload;
      // state.loading="loaded";
    });
    builder.addCase(getProjectById.rejected, (state, action) => {
      // state.loading ="error";
      // state.error=action.error.message;
      console.log(action.error.message);
    });

    // POST PROJECT
    builder.addCase(postProject.pending, (state) => {
      state.projectsList = [...state.projectsList];
      // state.loading = 'loading';
    });
    builder.addCase(postProject.fulfilled, (state, { payload }) => {
      state.projectsList.push(payload);
      // state.loading="loaded";
    });
    builder.addCase(postProject.rejected, (state, action) => {
      // state.loading ="error";
      // state.error=action.error.message;
      console.log(action.error.message);
    });

    // // PUT PROJECT
    // builder.addCase(putProject.pending, (state) => {
    //   state.projectsList = [...state.projectsList];
    //   // state.loading = 'loading';
    // });
    // builder.addCase(postProject.fulfilled, (state, { payload }) => {
    //   state.projectsList.push(payload);
    //   // state.loading="loaded";
    // });
    // builder.addCase(postProject.rejected, (state, action) => {
    //   // state.loading ="error";
    //   // state.error=action.error.message;
    //   console.log(action.error.message);
    // });
    // builder.addCase(postProject.pending, (state) => {
    //   state.projectsList = [...state.projectsList];
    //   // state.loading = 'loading';
    // });
    // builder.addCase(postProject.fulfilled, (state, { payload }) => {
    //   state.projectsList.push(payload);
    //   // state.loading="loaded";
    // });
    // builder.addCase(postProject.rejected, (state, action) => {
    //   // state.loading ="error";
    //   // state.error=action.error.message;
    //   console.log(action.error.message);
    // });
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
  setProjectEndDate,
  // updateTaskStatus,
  moveTask,
  deleteTask,
} = projectSlice.actions;

export const selectProject = (state: RootState): ProjectState => state.project;

export default projectSlice.reducer;
