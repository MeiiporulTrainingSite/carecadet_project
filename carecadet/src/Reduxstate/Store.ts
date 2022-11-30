import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './LoginSlice';



export const store = configureStore({
  reducer: {
    loginstate: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
