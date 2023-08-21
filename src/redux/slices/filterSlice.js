// filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: { nameFilter: '', categoryFilter: '', minRatingFilter: 0, minPriceFilter: 1, maxPriceFilter: Infinity },
  reducers: {
    setNameFilter(state, action) {
      state.nameFilter = action.payload;
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
    },
    setMinRatingFilter(state, action) {
      state.minRatingFilter = action.payload;
    },
    setMinPriceFilter(state, action) {
      state.minPriceFilter = action.payload;
    },
    setMaxPriceFilter(state, action) {
      state.maxPriceFilter = action.payload;
    },
    clearFilters(state) {
      state.nameFilter = '';
      state.categoryFilter = '';
      state.minRatingFilter = 0;
      state.minPriceFilter = 1;
      state.maxPriceFilter = Infinity;
    },
  },
});

export const { setNameFilter, setCategoryFilter, setMinRatingFilter, setMinPriceFilter, setMaxPriceFilter, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
