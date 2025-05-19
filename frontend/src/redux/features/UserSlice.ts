// src/redux/slices/authSlice.ts
import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: User;
  token: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
  isLoggedIn: false,
  token: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      (state.isLoggedIn = true), (state.user = { ...payload });
      localStorage.setItem("token", payload.token);
    },
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.user = {
        id: "",
        name: "",
        email: "",
        role: "",
      };
      localStorage.removeItem("token");
      window.location.replace("/login");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
