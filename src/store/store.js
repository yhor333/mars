import { configureStore } from "@reduxjs/toolkit";
import apiResponseReducer from "./reduser/apiSlice";

export const store = configureStore({
  reducer: {
    api: apiResponseReducer,
  },
});
