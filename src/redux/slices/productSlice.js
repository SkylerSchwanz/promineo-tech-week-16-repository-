import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = 'https://fakestoreapi.com/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [], // Your product data from FakeApi
    nameFilter: '',
    categoryFilter: '',
    minRatingFilter: 0,
    minPriceFilter: 0,
    maxPriceFilter: Infinity,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setMinRatingFilter: (state, action) => {
      state.minRatingFilter = action.payload;
    },
    setMinPriceFilter: (state, action) => {
        state.minPriceFilter = action.payload;
    },
    setMaxPriceFilter: (state, action) => {
      state.maxPriceFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const selectProductById = (state, productId) => state.products.products.find((product) => product.id === productId);

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

export const { setProducts, setNameFilter, setCategoryFilter, setMinRatingFilter, setMinPriceFilter, setMaxPriceFilter } = productsSlice.actions;
export default productsSlice.reducer;