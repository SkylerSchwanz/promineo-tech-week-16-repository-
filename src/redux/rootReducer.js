import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import filtersReducer from './slices/filterSlice';

const rootReducer = combineReducers({
  // Slices
  auth: authReducer,
  cart: cartReducer,
  filters: filtersReducer,
});

export default rootReducer;
