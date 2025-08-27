import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addItem(state, action) {
            // Implementation goes here
        },
        removeItem(state, action) {
            // Implementation goes here
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;