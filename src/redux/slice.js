import { createSlice } from "@reduxjs/toolkit";

const initialState = { tasks: [] };

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    add(state, action) {
      state.tasks.unshift(action.payload);
    },
    addInitial(state, action) {
      console.log("*****");
      for (const id in action.payload) {
        let task = {
          id: id,
          title: action.payload[id].title,
          isCompleted: action.payload[id].isCompleted,
        };
        console.log(task);
        state.tasks.unshift(task);
      }
    },
    delete(state, action) {
      state.tasks.splice(action.payload, 1);
    },
    editTask(state, action) {
      state.tasks[action.payload.position].title = action.payload.editedTitle;
    },
    completeHandler(state, action) {
      state.tasks[action.payload.index].isCompleted =
        action.payload.isCompleted;
    },
    clearTasks(state, action) {
      state.tasks = [];
    },
  },
});

export const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const todoAction = todoSlice.actions;
export const authAction = authSlice.actions;

export default todoSlice;
