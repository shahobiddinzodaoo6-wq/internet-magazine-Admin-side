import { createSlice } from "@reduxjs/toolkit";
import { saveToken } from "../../utils/url";
import { loginUser } from "../../api/authApi/authApi";

interface AuthState {
  value: number;
  statusRegistration: boolean;
  statusLogin: boolean;
  errorMessege: string;
}

const initialState: AuthState = {
  value: 0,
  statusRegistration: false,
  statusLogin: false,
  errorMessege: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      state.statusLogin = action.payload?.statusCode === 200;
      if (action.payload?.data) {
        saveToken(action.payload.data);
      }
    });
  },
});

export default authSlice.reducer;
