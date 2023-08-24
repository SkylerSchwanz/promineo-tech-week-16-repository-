import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3001';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username') || null,
    token: localStorage.getItem('accessToken') || null,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { username, accessToken } = action.payload;
      localStorage.setItem('username', username);
      localStorage.setItem('accessToken', accessToken);
      return {
        ...state,
        username: username,
        token: accessToken,
        error: null,
      };
    },
    logOut: (state) => {
      localStorage.removeItem('username');
      localStorage.removeItem('accessToken');
      return {
        ...state,
        username: null,
        token: null,
        error: null,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to log in');
  }

  const data = await response.json();

  if (data.accessToken) {
    return { username: username, accessToken: data.accessToken };
  }

  return data;
});

export const { setCredentials, logOut, setError } = authSlice.actions;

export default authSlice.reducer;
