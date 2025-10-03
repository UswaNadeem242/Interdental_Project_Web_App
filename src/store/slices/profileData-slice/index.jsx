import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileData: {}, // initially no image
};

const profileDataSlice = createSlice({
  name: "userProfileData",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
  },
});

export const { setProfileData } = profileDataSlice.actions;
export default profileDataSlice.reducer;
