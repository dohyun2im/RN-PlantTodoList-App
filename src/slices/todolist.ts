import {createSlice} from '@reduxjs/toolkit';

interface state {
  todoList: any[];
  reverse: boolean;
}

const initialState:state = {
  todoList: [],
  reverse: false,
};

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodo(state, action) {
      state.todoList = action.payload;
    },
    setReverse(state, action) {
      state.reverse = action.payload;
    }
  },
  extraReducers: builder => {},
});

export default todoSlice;
export const {setTodo, setReverse} = todoSlice.actions;