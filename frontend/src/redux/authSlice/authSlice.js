import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  roles: [],
  accessToken: "",
  persist: false || JSON.parse(localStorage.getItem("persist")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authContainer: (state, actions) => {
      state.user = actions.payload.user;
      state.roles = actions.payload.roles;
      state.persist = actions.payload.persist;
      state.accessToken = actions.payload.accessToken;
    },
    updateAccessTokenAuth: (state, actions) => {
      return {
        ...state,
        roles: actions.payload.roles,
        accessToken: actions.payload.accessToken,
      };
    },
  },
});

export const selectAuthContainer = (state) => state.auth;

export const { authContainer, updateAccessTokenAuth } = authSlice.actions;

export default authSlice.reducer;
