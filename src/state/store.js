import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducerSlices/userSlice.js";

export const store = configureStore({
  reducer: {
    global: userReducer,
  },
});
