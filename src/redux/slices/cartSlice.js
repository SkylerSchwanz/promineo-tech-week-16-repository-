// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.items.push(action.payload);
    },
    removeItemFromCart(state, action) {
      // Find the index of the first item in the cart with a matching ID
      const index = state.items.findIndex((item) => item.id === action.payload);

      // If an item with a matching ID was found, remove it from the cart
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    toggleItemDetails(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.showDetails = !item.showDetails;
      }
    },
    clearCart(state) {
      state.items = [];
    },
    fetchCartItemsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchCartItemsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchCartItemsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addItemToCart, removeItemFromCart, toggleItemDetails, clearCart, fetchCartItemsStart, fetchCartItemsSuccess, fetchCartItemsFailure } =
  cartSlice.actions;

export default cartSlice.reducer;

// Asynchronous thunk action to fetch cart items from the server
export const fetchCartItems = () => async (dispatch, getState) => {
  dispatch(fetchCartItemsStart());
  try {
    const token = getState().auth.token;
    const response = await fetch('http://localhost:3001/users/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(fetchCartItemsSuccess(data.cart));
  } catch (error) {
    dispatch(fetchCartItemsFailure(error.message));
  }
};
