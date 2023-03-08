import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
