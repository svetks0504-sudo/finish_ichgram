import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const getAuthConfig = (getState) => ({
  headers: {
    Authorization: `Bearer ${getState().auth.token}`,
  },
});

export const getAllPosts = createAsyncThunk(
  "allPosts/getAllPosts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/posts/`,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const getPost = createAsyncThunk(
  "allPosts/getPost",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/posts/${postId}`,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

const pendingPosts = (state) => {
  state.loading = true;
  state.error = null;
};
const rejectedPosts = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const allPostsSlice = createSlice({
  name: "allPosts",
  initialState: {
    posts: [],
    post: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, pendingPosts)
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      .addCase(getAllPosts.rejected, rejectedPosts);
    builder
      .addCase(getPost.pending, pendingPosts)
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
      })
      .addCase(getPost.rejected, rejectedPosts);
  },
});

export default allPostsSlice.reducer;
