import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      }
      state.totalQuantity++;
      state.totalPrice = state.totalPrice + newItem.price;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id
      );
      if (existingItem) {
        state.totalQuantity--;
        state.totalPrice = state.totalPrice - existingItem.price;

        if (existingItem.quantity === 1) {
          const index = state.items.indexOf(existingItem);
          state.items.splice(index, 1);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice =
            existingItem.totalPrice - existingItem.price;
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
