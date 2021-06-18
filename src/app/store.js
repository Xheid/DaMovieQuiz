import { configureStore } from '@reduxjs/toolkit';
import highscore from '../features/quiz/highscoreSlice';

export const store = configureStore({
  reducer: {
    highscore: highscore,
  },
});
