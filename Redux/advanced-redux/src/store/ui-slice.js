import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartVisible: false,
  notificationVisible: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    showCart(state) {
      state.isCartVisible = true;
    },
    hideCart(state) {
      state.isCartVisible = false;
    },
    showNotification(state, action) {
      state.notificationVisible = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
