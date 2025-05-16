import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/UserSlice";
import storage from "redux-persist/lib/storage"

const persitConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    authReducer: authReducer
});

const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});


export const persistor = persistStore(store);