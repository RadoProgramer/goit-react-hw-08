import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./slices/contactsSlice";
import filtersReducer from "./slices/filtersSlice";
import userReducer from "./slices/userSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
