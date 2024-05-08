import { createSlice } from "@reduxjs/toolkit";

export const getPlanDetail = createSlice({
  name: "getPlanDetail",
  initialState: {
    value: {},
  },
  reducers: {
    setPlanDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPlanDetails } = getPlanDetail.actions;
export const planDetails = (state) => state.getPlanDetail.value;
export default getPlanDetail.reducer;
