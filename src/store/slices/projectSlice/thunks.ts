import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';

export const getProjects = createAsyncThunk('project/getProjects', async (id: string, thunkAPI) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/projects/myprojects`, { id });
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

export const postProject = createAsyncThunk(
  'project/postProject',
  async (
    {
      projectName,
      startDate,
      endDate,
      uuid,
    }: { projectName: string; startDate: string; endDate: string; uuid: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/projects/`, {
        project: {
          projectName,
          startDate,
          endDate,
          uuid,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const putProject = createAsyncThunk(
  'project/putProject',
  async (
    {
      projId,
      projectName,
      startDate,
      endDate,
    }: {
      projId: number;
      projectName: string;
      startDate: string;
      endDate: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/projects/${projId}`, {
        project: {
          id: projId,
          projectName,
          startDate,
          endDate,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const postTask = createAsyncThunk(
  'project/postTask',
  async (
    {
      taskName,
      taskDesc,
      taskStatus,
      project,
    }: { taskName: string; taskDesc: string; taskStatus: string; project: number },
    thunkAPI
  ) => {
    try {
      const now = dayjs();
      const response = await axios.post(`http://localhost:3000/api/tasks/`, {
        task: {
          taskName,
          taskDesc,
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

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ id, taskStatus }: { id: string; taskStatus: string }, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      return { id, taskStatus };
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

export const putItem = createAsyncThunk(
  'project/putItem',
  async (
    {
      id,
      itemName,
      itemPrice,
      quantity,
      category,
      date,
      minutes,
      hours,
    }: {
      id: number;
      itemName: string;
      itemPrice: number | undefined;
      quantity: number | undefined;
      category: string;
      date: string | undefined;
      minutes: number | undefined;
      hours: number | undefined;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/items/${id}`, {
        item: {
          id,
          itemName,
          itemPrice,
          quantity,
          category,
          date,
          minutes,
          hours,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async ({ id, category }: { id: string; category: string }, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${id}`);
      return { id, category };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
