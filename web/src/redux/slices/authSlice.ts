import type { User } from "@/types/data";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// State interface
interface UserState {
  user: User | null;
}

// Initial state
const initialState: UserState = {
  user: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addLoginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeLoginUser: (state) => {
      state.user = null;
    },
  },
});

export const { addLoginUser, removeLoginUser } = authSlice.actions;

export default authSlice.reducer;
