import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = (token) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
	axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
	"auth/register",
	async (credentials, thunkAPI) => {
		try {
			console.log("Register payload:", credentials);

			const response = await axios.post("/users/signup", {
				name: credentials.name,
				email: credentials.email,
				password: credentials.password,
			});

			setAuthHeader(response.data.token);

			return response.data;
		} catch (error) {
			console.error("Register error:", error.response?.data || error.message);
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const logIn = createAsyncThunk(
	"auth/login",
	async (credentials, thunkAPI) => {
		try {
			const response = await axios.post("/users/login", credentials);

			setAuthHeader(response.data.token);

			return response.data;
		} catch (error) {
			console.error("Login error:", error.response?.data || error.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		await axios.post("/users/logout");

		clearAuthHeader();
	} catch (error) {
		console.error("Logout error:", error.response?.data || error.message);
		return thunkAPI.rejectWithValue(error.message);
	}
});

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
			console.error(
				"Refresh user error:",
				error.response?.data || error.message
			);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
