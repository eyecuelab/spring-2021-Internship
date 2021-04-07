import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskItem {
  taskName: string;
  taskStatus: string;
}

interface ProjectState {
  projectName: string;
  id: string;
  tasks: Array<TaskItem>;
}

const initialState: ProjectState = {
  projectName: '',
  id: '',
  tasks: [],
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
    setId: (state) => {
      state.id = idMaker(state.projectName);
    },
    addTask: (state, action: PayloadAction<{ taskName: string; taskStatus: string }>) => {
      state.tasks = [
        ...state.tasks,
        { taskName: action.payload.taskName, taskStatus: action.payload.taskStatus },
      ];
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { setProjectName, setId, addTask, clearTasks } = projectSlice.actions;

export default projectSlice.reducer;
