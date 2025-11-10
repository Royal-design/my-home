import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a proper User type
export interface User {
  id: string;
  name: string;
  email: string;
  accessToken?: string;
  // add other fields as needed
}

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
