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
      const existingCartItem = state.items.find((item) => item.id === action.payload.id);

      if (existingCartItem) {
        return {
          ...state,
          items: state.items.map((item) => (item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    },
    removeItemFromCart(state, action) {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
      };
    },
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const updatedItems = state.items.map((item) => (item.id === parseInt(productId) ? { ...item, quantity: parseInt(quantity) } : item));
      return {
        ...state,
        items: updatedItems,
      };
    },
    toggleItemDetails(state, action) {
      const updatedItems = state.items.map((item) => (item.id === action.payload ? { ...item, showDetails: !item.showDetails } : item));
      return {
        ...state,
        items: updatedItems,
      };
    },
    clearCart(state) {
      return {
        ...state,
        items: [],
      };
    },
    fetchCartItemsStart(state) {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    fetchCartItemsSuccess(state, action) {
      const updatedItems = action.payload.map((item) => ({ ...item }));
      return {
        ...state,
        isLoading: false,
        items: updatedItems,
      };
    },
    fetchCartItemsFailure(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
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
