import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  roles: [],
  password: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authContainer: (state, actions) => {
      state.user = actions.payload.user;
      state.roles = actions.payload.roles;
      state.password = actions.payload.password;
      state.accessToken = actions.payload.accessToken;
    },
    updateAccessTokenAuth: (state, actions) => {
      return {
        ...state,
        accessToken: actions.payload.accessToken,
      };
    },
  },
});

export const selectAuthContainer = (state) => state.auth;

export const { authContainer, updateAccessTokenAuth } = authSlice.actions;

export default authSlice.reducer;
