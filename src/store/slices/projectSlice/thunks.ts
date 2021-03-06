import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';

const API_URL: string = process.env.REACT_APP_API_URL ?? 'http://localhost:3000';

export const getProjects = createAsyncThunk('project/getProjects', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/api/projects/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data.projects;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getProjectById = createAsyncThunk(
  'project/getProjectById',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/projects/${id}`, {
        withCredentials: true,
      });
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
      const response = await axios.post(
        `${API_URL}/api/projects/`,
        {
          project: {
            projectName,
            startDate,
            endDate,
            uuid,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
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
      hourly,
      units,
      markup,
    }: {
      projId: number;
      projectName: string;
      startDate: string;
      endDate: string;
      hourly: number;
      units: number;
      markup: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/projects/${projId}`,
        {
          project: {
            id: projId,
            projectName,
            startDate,
            endDate,
            hourly,
            units,
            markup,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
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
      await axios.delete(`${API_URL}/api/projects/${id}`, { withCredentials: true });
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
      const response = await axios.post(
        `${API_URL}/api/tasks/`,
        {
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
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
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
      taskDesc,
      updatedPosition,
    }: {
      taskName: string;
      intId: number;
      taskStatus: string;
      taskDesc: string;
      updatedPosition: number;
    },
    thunkAPI
  ) => {
    try {
      const now = dayjs().toString();
      const taskResponse = await axios.put(
        `${API_URL}/api/tasks/${intId}`,
        {
          task: {
            taskName,
            id: intId,
            taskStatus,
            taskDesc,
            position: updatedPosition,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      await axios.post(
        `${API_URL}/api/task-activities`,
        {
          taskActivity: {
            dateTime: now,
            description: `${taskName} was moved to ${taskStatus}`,
            task: intId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

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
      await axios.delete(`${API_URL}/api/tasks/${id}`, { withCredentials: true });
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
      hours,
      project,
    }: {
      itemName: string;
      itemPrice: number;
      quantity: number;
      category: string;
      date: string;
      hours: number;
      project: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/items/`,
        {
          item: {
            itemName,
            itemPrice,
            quantity,
            category,
            date,
            hours,
            project,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
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
      hours,
    }: {
      id: number;
      itemName: string;
      itemPrice: number | undefined;
      quantity: number | undefined;
      category: string;
      date: string | undefined;
      hours: number | undefined;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/items/${id}`,
        {
          item: {
            id,
            itemName,
            itemPrice,
            quantity,
            category,
            date,
            hours,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
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
      await axios.delete(`${API_URL}/api/items/${id}`, { withCredentials: true });
      return { id, category };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
