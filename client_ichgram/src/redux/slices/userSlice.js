import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:3333";

const getAuthConfig = (getState) => ({
  headers: {
    Authorization: `Bearer ${getState().auth.token}`,
  },
});

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/me`,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/${userId}`,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "user/editProfile",
  async (data, { getState, rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("bio", data.bio);
      formData.append("website", data.website);

      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const response = await axios.patch(
        `${BASE_URL}/user/me`,
        formData,
        getAuthConfig(getState),
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
const fulfilledUser = (state, action) => {
  state.loading = false;
  state.me = action.payload.user;
};
const rejectedUser = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    me: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, pendingUser)
      .addCase(fetchMe.fulfilled, fulfilledUser)
      .addCase(fetchMe.rejected, rejectedUser);
    builder
      .addCase(fetchUser.pending, pendingUser)
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, rejectedUser);
    builder
      .addCase(updateProfile.pending, pendingUser)
      .addCase(updateProfile.fulfilled, fulfilledUser)
      .addCase(updateProfile.rejected, rejectedUser);
  },
});

export default userSlice.reducer;
