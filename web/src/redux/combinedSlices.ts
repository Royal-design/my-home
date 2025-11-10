import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
export const combinedSlices = combineReducers({
  auth: authSlice,
});
