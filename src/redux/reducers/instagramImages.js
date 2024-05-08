import { createSlice } from "@reduxjs/toolkit";

export const InstagramImages = createSlice({
  name: "acessToken",
  initialState: {
    value: [],
  },
  reducers: {
    saveInstagramImages: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveInstagramImages } = InstagramImages.actions;
export const currentInstagramImagesData = (state) =>
  state.InstagramImages.value;
export default InstagramImages.reducer;
