import { configureStore } from "@reduxjs/toolkit";
import todoSlice, { authSlice } from "./slice";

const store = configureStore({
  reducer: { todo: todoSlice.reducer, auth: authSlice.reducer },
});

export default store;
