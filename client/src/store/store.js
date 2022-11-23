import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './slices/authSlice'

const reducer = {
    authSliceReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});