
import { configureStore } from '@reduxjs/toolkit';
import countdownReducer from './countdownSlice';
import participantsReducer from "./participantsSlice"

export const store = configureStore({
  reducer: {
    countdown: countdownReducer,
    participants: participantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
    