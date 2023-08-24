// filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: { nameFilter: '', categoryFilter: '', minRatingFilter: 0, minPriceFilter: 1, maxPriceFilter: Infinity },
  reducers: {
    setNameFilter(state, action) {
      return { ...state, nameFilter: action.payload };
    },
    setCategoryFilter(state, action) {
      return { ...state, categoryFilter: action.payload };
    },
    setMinRatingFilter(state, action) {
      return { ...state, minRatingFilter: action.payload };
    },
    setMinPriceFilter(state, action) {
      return { ...state, minPriceFilter: action.payload };
    },
    setMaxPriceFilter(state, action) {
      return { ...state, maxPriceFilter: action.payload };
    },
    clearFilters(state) {
      return {
        ...state,
        nameFilter: '',
        categoryFilter: '',
        minRatingFilter: 0,
        minPriceFilter: 1,
        maxPriceFilter: Infinity,
      };
    },
  },
});

export const { setNameFilter, setCategoryFilter, setMinRatingFilter, setMinPriceFilter, setMaxPriceFilter, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
