import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
    name: 'highscore',
    initialState: {
      value: 0,
    },
    reducers: {
      update: (state, action) => {
        state.value = action.payload
      }
    }
})

export const {update} = slice.actions;

export const selectHighscore = state => state.highscore.value;


export default slice.reducer;