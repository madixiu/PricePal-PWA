import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isAuthenticated: false,
  user: null,
};
const authSlice = createSlice({
name: "auth",
initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, setAuthenticated } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
