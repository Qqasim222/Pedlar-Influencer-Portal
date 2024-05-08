import { createSlice } from "@reduxjs/toolkit";

export const addProductValueChange = createSlice({
  name: "addProductValueChange",
  initialState: {
    value: false,
  },
  reducers: {
    setAddProductValueChange: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAddProductValueChange } = addProductValueChange.actions;
export const currentReloadData = (state) => state.addProductValueChange.value;
export default addProductValueChange.reducer;
