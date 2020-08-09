import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../../app/store';
import { Todo } from '../../types/todo';

interface TodoListState {
  todos: Todo[];
}

const initialState: TodoListState = {
  todos: [],
};

export const todolistSlice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },

    removeFromList: (state, action: PayloadAction<string>) => {
      // Doesn't have an id yet
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },

    updateInList: (state, action: PayloadAction<Todo>) => {
      const todo = action.payload;
      const index = state.todos.findIndex(t => t.id === todo.id);
      state.todos[index] = todo;
    }
  },
});

const { addToList, removeFromList, updateInList } = todolistSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const add = (todo: Partial<Todo>): AppThunk => async dispatch => {
  const response = await axios.post('/todos', {
    description: todo.description,
    completed: todo.completed
  });

  todo.id = response.data.id;

  // Post to server
  dispatch((addToList(todo as Todo)));
};

export const remove = (id: string): AppThunk => dispatch => {
  axios.delete('/todos', {
    params: {
      id
    }
  });

  // Post to server
  dispatch((removeFromList(id)));
};

export const update = (todo: Todo): AppThunk => async dispatch => {
  const response = await axios.patch('/todos', {
    id: todo.id,
    description: todo.description,
    completed: todo.completed
  });

  todo = response.data;

  // Post to server
  dispatch((updateInList(todo)));
};

export const selectTodos = (state: RootState) => state.todoList.todos;

export const fetchTodos = (): AppThunk => async dispatch => {
  const response = await axios.get('/todos');

  const todos = response.data;

  for (const t of todos) {
    dispatch(addToList(t));
  }
}
export default todolistSlice.reducer;
