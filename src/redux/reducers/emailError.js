import { createSlice } from "@reduxjs/toolkit";

export const emailError = createSlice({
  name: "emailError",
  initialState: {
    value: "",
  },
  reducers: {
    setEmailError: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEmailError } = emailError.actions;
export const currentEmailValue = (state) => state.emailError.value;
export default emailError.reducer;
