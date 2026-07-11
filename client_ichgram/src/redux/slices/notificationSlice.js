import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:3333";

const getAuthConfig = (getState) => ({
  headers: {
    Authorization: `Bearer ${getState().auth.token}`,
  },
});

export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/notification`,
        getAuthConfig(getState),
      );

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (id, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/notification/${id}`,
        {},
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (id, { getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/notification/${id}`,
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

const pendingNotif = (state) => {
  state.loading = true;
  state.error = null;
};
const rejectedNotif = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, pendingNotif)
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
      })
      .addCase(getNotifications.rejected, rejectedNotif);
    builder
      .addCase(markAsRead.pending, pendingNotif)
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.notification;

        const index = state.notifications.findIndex(
          (n) => n._id === updated._id,
        );

        if (index !== -1) {
          state.notifications[index] = updated;
        }
      })
      .addCase(markAsRead.rejected, rejectedNotif);
    builder
      .addCase(deleteNotification.pending, pendingNotif)
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;

        const deletedId = action.payload.notification._id;

        state.notifications = state.notifications.filter(
          (n) => n._id !== deletedId,
        );
      })
      .addCase(deleteNotification.rejected, rejectedNotif);
  },
});

export default notificationSlice.reducer;
