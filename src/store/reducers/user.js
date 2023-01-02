import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login_user, register_user } from "../../firebase_api/AuthApi";

const initialState = {
  user: {},
  loading: false,
  error: "",
};

export const loginUserAsync = createAsyncThunk(
  "user/loginAsync",
  async (userInfo) => {
    try {
      await login_user(userInfo.email, userInfo.password);
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  }
);
export const registerUserAsync = createAsyncThunk(
  "user/registerAsync",
  async (userInfo) => {
    try {
      const { data } = await register_user(userInfo);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = "";
        state.user = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
