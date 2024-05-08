import { createSlice } from "@reduxjs/toolkit";
import addDeleteGetLocalStorage from "../../GlobalModule/addDeleteGetLocalStorage";
import { STORAGE } from "../../Helpers/Enums";

const getLocalData = () => {
  let data = addDeleteGetLocalStorage(
    STORAGE.TOOLED_UP_LOCAL_DATA,
    {},
    "get",
    "single"
  );
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  } else {
    return {};
  }
};

export const tooledUpData = createSlice({
  name: "tooledUpData",
  initialState: {
    value: getLocalData(),
  },
  reducers: {
    setData: (state, action) => {
      state.value = getLocalData();
    },
  },
});

export const { setData } = tooledUpData.actions;
export const tooledUpLocalData = (state) => state.tooledUpData.value;
export default tooledUpData.reducer;
