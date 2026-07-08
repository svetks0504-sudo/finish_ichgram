import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:3333";

const getAuthConfig = (getState) => ({
  headers: {
    Authorization: `Bearer ${getState().auth.token}`,
  },
});

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments`, {
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

export const fetchComment = createAsyncThunk(
  "comments/fetchComment",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comments/${id}`,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (data, { rejectWithValue, getState }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/comments`,
        data,
        getAuthConfig(getState),
      );
      console.log(response.data.comment);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ id, data }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/comments/${id}`,
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

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ id, postId }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/comments/${id}`, {
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

const pendingComments = (state) => {
  state.loading = true;
  state.error = null;
};
const rejectedComments = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    comment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, pendingComments)
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
      })
      .addCase(fetchComments.rejected, rejectedComments);

    builder
      .addCase(fetchComment.pending, pendingComments)
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload.comment;
      })
      .addCase(fetchComment.rejected, rejectedComments);

    builder
      .addCase(createComment.pending, pendingComments)
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload.comment);
      })
      .addCase(createComment.rejected, rejectedComments);

    builder
      .addCase(updateComment.pending, pendingComments)
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload.comment;
        state.loading = false;
        const index = state.comments.findIndex(
          (comment) => comment._id === updatedComment._id,
        );
        if (index !== -1) {
          state.comments[index] = updatedComment;
        }
        if (state.comment?._id === updatedComment._id) {
          state.comment = updatedComment;
        }
      })
      .addCase(updateComment.rejected, rejectedComments);
    builder
      .addCase(deleteComment.pending, pendingComments)
      .addCase(deleteComment.fulfilled, (state, action) => {
        const deletedId = action.payload.comment._id;
        state.comments = state.comments.filter(
          (comment) => comment._id !== deletedId,
        );
        if (state.comment?._id === deletedId) {
          state.comment = null;
        }
        state.loading = false;
      })

      .addCase(deleteComment.rejected, rejectedComments);
  },
});

export default commentSlice.reducer;
