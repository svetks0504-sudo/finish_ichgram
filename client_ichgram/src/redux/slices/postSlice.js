import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const getAuthConfig = (getState) => ({
  headers: {
    Authorization: `Bearer ${getState().auth.token}`,
  },
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/posts/my`,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/posts/my/${id}`,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();

      formData.append("description", data.description);
      if (data.images) {
        data.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await axios.post(
        `${BASE_URL}/posts/my`,
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

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/posts/my/${id}`,
        data,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/posts/my/${id}`,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

const pendingPost = (state) => {
  state.loading = true;
  state.error = null;
};
const rejectedPost = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, pendingPost)
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, rejectedPost);

    builder
      .addCase(fetchPost.pending, pendingPost)
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
      })
      .addCase(fetchPost.rejected, rejectedPost);
    builder
      .addCase(createPost.pending, pendingPost)
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload.post);
      })
      .addCase(createPost.rejected, rejectedPost);
    builder
      .addCase(updatePost.pending, pendingPost)
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload.post;
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id,
        );
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
        if (state.post?._id === updatedPost._id) {
          state.post = updatedPost;
        }
      })
      .addCase(updatePost.rejected, rejectedPost);
    builder
      .addCase(deletePost.pending, pendingPost)
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        const deletedPostId = action.payload.post._id;
        state.posts = state.posts.filter((post) => post._id !== deletedPostId);
        if (state.post?._id === deletedPostId) {
          state.post = null;
        }
      })
      .addCase(deletePost.rejected, rejectedPost);
  },
});

export default postSlice.reducer;
