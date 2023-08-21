import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import authReducer from './slices/authSlice'; // Import your auth reducer
import productsReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import filtersReducer from './slices/filterSlice'; // Import the filters reducer
import { api } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    root: rootReducer,
    products: productsReducer, // Include the products reducer
    cart: cartReducer,
    filters: filtersReducer, // Add the filters reducer
    [api.reducerPath]: api.reducer, // Add the api reducer
    auth: authReducer, // Include your auth reducer
    // Other reducers go here if you have more slices
  },
  // Other options if needed
});

export default store;
