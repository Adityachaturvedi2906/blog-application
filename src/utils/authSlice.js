// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Initial state when user is not logged in
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set the user information when they log in
    },
    clearUser: (state) => {
      state.user = null; // Clear user information when they log out
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
