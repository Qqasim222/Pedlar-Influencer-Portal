import { createSlice } from "@reduxjs/toolkit";
import addDeleteGetLocalStorage from "../../GlobalModule/addDeleteGetLocalStorage";
import { STORAGE } from "../../Helpers/Enums";

const firstLogin = () => {
  let a = addDeleteGetLocalStorage(STORAGE.FIRST_LOGIN, {}, "get", "single");
  if (a) {
    try {
      return a;
    } catch (e) {
      return {};
    }
  } else {
    return "no";
  }
};
const userDataPlanOption = () => {
  let a = addDeleteGetLocalStorage(STORAGE.USER_DATA, {}, "get", "single");

  if (a) {
    try {
      return JSON.parse(a);
    } catch (e) {
      return {};
    }
  } else {
    return {};
  }
};
const folderDropDown = () => {
  let f = addDeleteGetLocalStorage(STORAGE.FOLDER_DROPDOWN, {}, "get");
  if (f) {
    try {
      return JSON.parse(f);
    } catch (e) {
      return [];
    }
  } else {
    return [];
  }
};
const forMainDropDown = (param) => {
  let a = addDeleteGetLocalStorage(
    param == "keyword"
      ? STORAGE.FOR_MAIN_DROPDOWN_KEYWORD
      : STORAGE.FOR_MAIN_DROPDOWN_COMPANY,
    {},
    "get"
  );

  if (a) {
    try {
      return JSON.parse(a);
    } catch (e) {
      return [];
    }
  } else {
    return [];
  }
};
const lastActiveString = (param) => {
  let a = addDeleteGetLocalStorage(
    param == "keyword"
      ? STORAGE.LAST_ACTIVE_STRING_KEYWORD
      : STORAGE.LAST_ACTIVE_STRING_COMPANY,
    {},
    "get",
    "single"
  );

  if (a) {
    try {
      return JSON.parse(a);
    } catch (e) {
      return {};
    }
  } else {
    return {};
  }
};
const allFunctionCall = () => {
  return {
    first_login: firstLogin(),
    last_active_string_keyword: lastActiveString("keyword"),
    last_active_string_company: lastActiveString("company"),
    user_data_plan_option: userDataPlanOption(),
    folder_dropdown: folderDropDown(),
    for_main_dropdown_keyword: forMainDropDown("keyword"),
    for_main_dropdown_company: forMainDropDown("company"),
  };
};

export const getLocalData = createSlice({
  name: "getLocalData",
  initialState: {
    value: allFunctionCall(),
  },
  reducers: {
    setChange: (state, action) => {
      state.value = allFunctionCall();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChange } = getLocalData.actions;

export const currentLocalValue = (state) => state.getLocalData.value;
export default getLocalData.reducer;
