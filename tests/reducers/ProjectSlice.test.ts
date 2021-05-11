import { AnyAction } from 'redux';
import slice, { moveTask, initialState } from '../../src/store/slices/projectSlice';

describe('auth reducer', () => {
  let state = { ...initialState };
  it('should handle initial state', () => {
    state = slice(state, {} as AnyAction);
    expect(state).toEqual(initialState);
  });

  it('should move task from todo array to doing array', () => {
    const task = {
      taskName: 'taskName',
      id: '24',
      formerStatus: 'todo',
      taskStatus: 'doing',
      taskDesc: 'This is a test task',
      updatedPosition: 100,
      activity: [],
      fromIndex: 0,
      toIndex: 0,
    };
    state = slice(state, moveTask(task));
    expect(state.currentProject.tasks.doing[0].id).toEqual('24');
  });
});
