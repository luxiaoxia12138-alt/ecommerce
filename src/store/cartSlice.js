import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // { id, name, price, quantity, specs: {}, key }
    isOpen: false,
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const key = `${item.id}-${JSON.stringify(item.specs || {})}`;

      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({
          ...item,
          key,
          quantity: item.quantity || 1,
        });
      }
    },
    removeFromCart(state, action) {
      const key = action.payload;
      state.items = state.items.filter((i) => i.key !== key);
    },
    setCartOpen(state, action) {
      state.isOpen = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, setCartOpen, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
