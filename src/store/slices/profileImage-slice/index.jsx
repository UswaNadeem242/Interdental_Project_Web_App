import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileImage: null, // initially no image
};

const profileSlice = createSlice({
    name: "userProfileImage",
    initialState,
    reducers: {
        setProfileImage: (state, action) => {
            state.profileImage = action.payload;
        },
        setUserProfile: (state, action) => {
            return { ...state, ...action.payload }; // update full profile
        },
    },
});

export const { setProfileImage } = profileSlice.actions;
export default profileSlice.reducer;

