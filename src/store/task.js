import { createSlice } from '@reduxjs/toolkit';
import { setError } from './errors';
import todosService from './services/todos.service';

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    create(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const index = state.entities.findIndex((el) => el.id === action.payload.id);
      state.entities[index] = { ...state.entities[index], ...action.payload };
    },
    remove(state, action) {
      state.entities = state.entities.filter((el) => el.id !== action.payload.id);
    },
    taskRequast(state) {
      state.isLoading = true;
    },
    taskRequastFailed(state) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received, taskRequast, taskRequastFailed, create } = actions;

export const taskCreate = (task) => async (dispatch) => {
  dispatch(taskRequast());
  try {
    const data = await todosService.create(task);
    dispatch(create(data));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(taskRequastFailed(error.message));
  }
};

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequast());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
    console.log(data);
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(taskRequastFailed(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export const titleChanged = (id) => {
  return update({ id, title: `Title for id: ${id}` });
};

export const taskDeleted = (id) => {
  return remove({ id });
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
