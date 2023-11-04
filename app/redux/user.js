import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userID: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.userID = action.payload;
    },
    logOut: (state) => {
      state.userID = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
