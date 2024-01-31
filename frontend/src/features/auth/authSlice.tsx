import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User/user.type";

export interface AuthState {
  user: Partial<User>;
  token: string;
}

const initialState: AuthState = {
  user: { username: "", department_id: 0 },
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.user = { ...state.user, ...action.payload.user };
      state.token = action.payload.token;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
