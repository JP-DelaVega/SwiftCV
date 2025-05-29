import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "../slices/slice";
import { apiSlice } from "../slices/apiSlice";
import authSliceReducer from "../slices/authSlice";
export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true  
});



