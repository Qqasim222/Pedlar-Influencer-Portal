import { createSlice } from "@reduxjs/toolkit";

export const typingStatus = createSlice({
  name: "typingStatus",
  initialState: {
    value: "release",
  },
  reducers: {
    changeTypingStatus: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTypingStatus } = typingStatus.actions;
export const currentTypingStatus = (state) => state.typingStatus.value;
export default typingStatus.reducer;
