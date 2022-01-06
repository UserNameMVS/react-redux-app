import httpService from './http.service';

const todosEndPoing = 'todos/';

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndPoing, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });

    return data;
  },
  create: async (task) => {
    const { data } = await httpService.post(todosEndPoing, {
      id: task.id,
      title: task.title,
      completed: task.completed,
    });
    return data;
  },
};

export default todosService;
