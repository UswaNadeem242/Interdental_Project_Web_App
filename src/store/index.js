import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./slices/order-dropdown-slice/index";
import teethReducer from "./slices/teeth-slice/index";
import restorationReducer from "./slices/restoration-slice/index";
import toastReducer from "./toast-slice/index";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer,
        teeth: teethReducer,
        restoration: restorationReducer,
        toast: toastReducer,
    }
});
