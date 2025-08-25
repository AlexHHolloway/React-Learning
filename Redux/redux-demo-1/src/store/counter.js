import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {
  counter: 0,
  isVisible: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    custom(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggle(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;