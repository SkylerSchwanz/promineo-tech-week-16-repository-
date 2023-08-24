import { combineReducers } from 'redux';
import authReducer from './slices/authSlice'; // Import your auth slice
import cartReducer from './slices/cartSlice';
import filtersReducer from './slices/filterSlice';
//import otherReducer from './otherSlice'; // Import other slices if you have them

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  filters: filtersReducer,
  //other: otherReducer, // Add more reducers here
  // Add more slices here if needed
});

export default rootReducer;
