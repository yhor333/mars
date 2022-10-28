import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: {},
};

export const apiResponseSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    addRovers: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { addRovers } = apiResponseSlice.actions;

export default apiResponseSlice.reducer;
