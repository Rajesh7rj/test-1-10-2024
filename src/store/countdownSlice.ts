
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CountdownState {
  timeLeft: number;
}

const initialState: CountdownState = {
  timeLeft: calculateTimeLeft(),
};

export const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
  },
});

export const { setTimeLeft } = countdownSlice.actions;

export const selectTimeLeft = (state: RootState) => state.countdown.timeLeft;

export default countdownSlice.reducer;

function calculateTimeLeft() {
  const currentTime = new Date();
  const nextYear = currentTime.getFullYear() + 1;
  const newYearTime = new Date(`January 1, ${nextYear} 00:00:00`).getTime();
  return Math.max(newYearTime - currentTime.getTime(), 0);
}
    