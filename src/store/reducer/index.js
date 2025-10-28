// import { configureStore } from "@reduxjs/toolkit";
// import dropdownReducer from "../slices/order-dropdown-slice/index";
// import teethReducer from "../slices/teeth-slice/index";
// import restorationReducer from "../slices/restoration-slice/index";
// import toastReducer from "../toast-slice/index";
// import profileReducer from "../slices/profileImage-slice/index"; // adjust path

// export const store = configureStore({
//     reducer: {
//         dropdown: dropdownReducer,
//         teeth: teethReducer,
//         restoration: restorationReducer,
//         toast: toastReducer,
//         profile: profileReducer,
//     }
// });

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import dropdownReducer from "../slices/order-dropdown-slice/index";
import teethReducer from "../slices/teeth-slice/index";
import restorationReducer from "../slices/restoration-slice/index";
import toastReducer from "../toast-slice/index";
import profileReducer from "../slices/profileImage-slice/index";
import profileDataReducer from "../slices/profileData-slice/index";

// persist config - exclude restoration state from persistence
const persistConfig = {
  key: "root",
  storage,
  blacklist: ['restoration'], // Don't persist restoration state
};

// combine reducers if you have multiple
const rootReducer = combineReducers({
  dropdown: dropdownReducer,
  teeth: teethReducer,
  restoration: restorationReducer,
  toast: toastReducer,
  profile: profileReducer,
  profileData: profileDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
