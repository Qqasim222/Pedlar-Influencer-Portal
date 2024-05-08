import { configureStore } from "@reduxjs/toolkit";
import emailError from "./reducers/emailError";
import addProductValueChange from "./reducers/addProductValueChange";
import snackbar from "./reducers/snackbar";
import InstagramImages from "./reducers/instagramImages";

export default configureStore({
  reducer: {
    snackbar: snackbar,
    emailError: emailError,
    addProductValueChange: addProductValueChange,
    InstagramImages: InstagramImages,
  },
});
