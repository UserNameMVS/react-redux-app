import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  taskCreate,
} from './store/task';
import configureStore from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getError } from './store/errors';

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  const createTask = (task) => {
    dispatch(taskCreate(task));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <button onClick={() => createTask({ title: 'New task', completed: false })}>Add task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>Completed</button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
