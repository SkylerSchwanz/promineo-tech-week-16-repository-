import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import authReducer from './slices/authSlice'; // Import your auth reducer
import productsReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import filtersReducer from './slices/filterSlice'; // Import the filters reducer
import { api } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    // Reducers
    root: rootReducer,
    products: productsReducer,
    cart: cartReducer,
    filters: filtersReducer,
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
});

export default store;
