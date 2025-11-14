import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import modalSlice from "./slices/modalSlice";

export const combinedSlices = combineReducers({
  auth: authSlice,
  modal: modalSlice,
});
