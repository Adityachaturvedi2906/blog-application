// store.js
import { configureStore } from '@reduxjs/toolkit';
import blogSlice from './blogSlice';
import authReducer from './authSlice'; // Import the auth reducer

const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    auth: authReducer, // Include the auth reducer in your store setup
  },
});

export default store;
