import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:3333";

const getAuthConfig = (getState) => ({
  headers: {
    Authorization: `Bearer ${getState().auth.token}`,
  },
});

export const fetchLikes = createAsyncThunk(
  "likes/fetchLikes",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/likes`, {
        params: { postId },
        ...getAuthConfig(getState),
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const addLike = createAsyncThunk(
  "likes/addLike",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/likes`,
        { postId },
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const removeLike = createAsyncThunk(
  "likes/removeLike",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/likes`, {
        data: { postId },
        ...getAuthConfig(getState),
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

const pendingLikes = (state) => {
  state.loading = true;
  state.error = null;
};
const rejectedLikes = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, pendingLikes)
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.likes = action.payload.likes;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchLikes.rejected, rejectedLikes);
    builder
      .addCase(addLike.pending, pendingLikes)
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = false;
        state.likes.push(action.payload.like);
        state.error = null;
      })
      .addCase(addLike.rejected, rejectedLikes);
    builder
      .addCase(removeLike.pending, pendingLikes)
      .addCase(removeLike.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = state.likes.filter(
          (like) => like._id !== action.payload.like._id,
        );
        state.error = null;
      })
      .addCase(removeLike.rejected, rejectedLikes);
  },
});

export default likesSlice.reducer;
