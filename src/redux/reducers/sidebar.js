import { createSlice } from "@reduxjs/toolkit";
import addDeleteGetLocalStorage from "../../GlobalModule/addDeleteGetLocalStorage";
import { STORAGE } from "../../Helpers/Enums";

const getFromLocal = () => {
  let sidebar = addDeleteGetLocalStorage(
    STORAGE.NEW_SIDE_BAR,
    {},
    "get",
    "single"
  );
  if (sidebar) {
    return sidebar;
  } else {
    return "keyword";
  }
};

export const sidebar = createSlice({
  name: "sidebar",
  initialState: {
    value: getFromLocal(),
  },
  reducers: {
    changeSidebar: (state, action) => {
      state.value = getFromLocal();
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSidebar } = sidebar.actions;
export const currentSidebar = (state) => state.sidebar.value;
export default sidebar.reducer;
