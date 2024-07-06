import { configureStore, combineReducers } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = { //used to store the data in local storage
  key: "root", //means the root of the state
  version: 1,
  storage, // means local storage
};
const rootReducer = combineReducers({ //combining all the reducers
  ui: uiSlice,
  user: userSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer); //persistReducer is used to store the data in local storage

export const store = configureStore({ //configurestore is used to create the store
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ // getDefaultMiddleware is used to get the default middleware
      serializableCheck: false, //used to check the serializable, serializable means the data is in the form of string
    }),
});
export let persistor = persistStore(store);
