import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userID: null,
    location: {
      longitude: null,
      latitude: null,
    },
  },
  reducers: {
    logIn: (state, action) => {
      state.userID = action.payload;
    },
    getLocation: (state, action) => {
      state.location = action.payload;
    },
    logOut: (state) => {
      state.userID = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
