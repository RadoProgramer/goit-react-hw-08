import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://your-api-url.com/'; // Replace with your real API URL

// Utility to add JWT token to the headers
const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Utility to remove JWT token from the headers
const clearAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

// Register new user
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token); // Set the token in headers
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Login user
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', credentials);
      setAuthHeader(res.data.token); // Set the token in headers
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Logout user
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader(); // Remove the token from headers after logout
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Refresh user session
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken); // Set token in headers if available
      const res = await axios.get('/users/me');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
