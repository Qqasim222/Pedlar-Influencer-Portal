import { createSlice } from "@reduxjs/toolkit";
const json = require("../../localisation_en.json");

export const localString = createSlice({
  name: "localString",
  initialState: {
    value: json,
  },
  reducers: {},
});

export const stringData = (state) => state.localString.value;
export default localString.reducer;
