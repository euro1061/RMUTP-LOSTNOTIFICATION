import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './slices/authSlice'
import settingSlice from "./slices/settingSlice";

const reducer = {
    authSliceReducer,
    setting: settingSlice
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});