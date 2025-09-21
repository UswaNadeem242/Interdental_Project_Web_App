import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: "toast",
    initialState: {
        message: "",
        type: "info", // 'success', 'error', 'info', 'warning'
        visible: false,
    },
    reducers: {
        showToast: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type || "info";
            state.visible = true;
        },
        hideToast: (state) => {
            state.visible = false;
            state.message = "";
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
