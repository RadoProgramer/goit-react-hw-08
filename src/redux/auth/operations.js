import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

// Ustawienie nagłówka autoryzacji
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Wyczyszczenie nagłówka autoryzacji
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// Rejestracja użytkownika
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      // Sprawdzenie błędu duplikacji emaila (MongoError 11000)
      if (error.response?.data?.code === 11000) {
        return thunkAPI.rejectWithValue("Email is already registered");
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Logowanie użytkownika
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Wylogowanie użytkownika
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Odświeżenie danych użytkownika
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Please log in to see your contacts!");
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
