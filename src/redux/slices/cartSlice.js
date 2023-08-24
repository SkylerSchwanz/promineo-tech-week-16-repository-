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
      // Check if the product is already in the cart
      const existingCartItem = state.items.find((item) => item.id === action.payload.id);

      if (existingCartItem) {
        // Update the quantity of the existing cart item
        existingCartItem.quantity += 1;
      } else {
        // Add the new item to the cart
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromCart(state, action) {
      // Find the index of the first item in the cart with a matching ID
      const index = state.items.findIndex((item) => item.id === action.payload);

      // If an item with a matching ID was found, remove it from the cart
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      state.items.forEach((item, index) => console.log(`updateItemQuantity Loop! Product #${item.id} has index #${index} || Selected product id: ${productId} / selected quantity: ${quantity}`))
      console.log(productId);
      const index = state.items.findIndex((item) => item.id === parseInt(productId));

      console.log(`updateItemQuantity fired on product '${state.items[index].title}'.. quantity #${quantity}`);
      if (index !== -1) {
        console.log(`updateItemQuantity fired on product '${state.items[index].title}'.. quantity #${quantity}`);
        state.items[index].quantity = parseInt(quantity);
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
      state.items = action.payload.map((item) => ({ ...item }));
    },
    fetchCartItemsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  toggleItemDetails,
  clearCart,
  fetchCartItemsStart,
  fetchCartItemsSuccess,
  fetchCartItemsFailure,
} = cartSlice.actions;

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
