import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:3333";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const forgotPass = createAsyncThunk(
  "auth/forgotPass",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/forgot`, data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const resetPass = createAsyncThunk(
  "auth/resetPass",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/reset-password?token=${token}`,
        { password },
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

const pendingUser = (state) => {
  state.loading = true;
  state.error = null;
};
const rejectedUser = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const fulfilledUser = (state, action) => {
  state.loading = false;
  state.error = null;
  state.successMessage = action.payload.message;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, pendingUser)
      .addCase(registerUser.fulfilled, fulfilledUser)
      .addCase(registerUser.rejected, rejectedUser);
    builder
      .addCase(loginUser.pending, pendingUser)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, rejectedUser);

    builder
      .addCase(forgotPass.pending, pendingUser)
      .addCase(forgotPass.fulfilled, fulfilledUser)
      .addCase(forgotPass.rejected, rejectedUser);

    builder
      .addCase(resetPass.pending, pendingUser)
      .addCase(resetPass.fulfilled, fulfilledUser)
      .addCase(resetPass.rejected, rejectedUser);
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
