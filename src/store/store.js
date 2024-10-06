import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "../redux/slices/contactsSlice";
import filtersReducer from "../redux/slices/filtersSlice";
import { authReducer } from "../redux/auth/slice";
import { middleware } from "./middleware";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	contacts: contactsReducer,
	filters: filtersReducer,
	auth: authReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware,
});

export const persistor = persistStore(store);
