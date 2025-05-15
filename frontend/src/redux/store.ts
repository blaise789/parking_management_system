// store.js
import { configureStore } from '@reduxjs/toolkit';
import UserReducer from "./slices/UserSlice"

export const store = configureStore({
  reducer: {
    authReducer: UserReducer,
    
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;