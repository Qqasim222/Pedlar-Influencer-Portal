import { createSlice } from "@reduxjs/toolkit";

export const letCollab = createSlice({
  name: "letCollab",
  initialState: {
    value: false,
  },
  reducers: {
    changeData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeData } = letCollab.actions;
export const currentCollab = (state) => state.letCollab.value;
export default letCollab.reducer;
