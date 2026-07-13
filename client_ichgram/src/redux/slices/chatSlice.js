import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:3333";

const getAuthConfig = (getState) => ({
  headers: {
    Authorization: `Bearer ${getState().auth.token}`,
  },
});

export const openChat = createAsyncThunk(
  "chat/openChat",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chat/create`,
        {userId},
        getAuthConfig(getState),
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);



const pendingChat = (state) => {
  state.loading = true;
  state.error = null;
};
const rejectedChat = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        conversation: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
builder
.addCase(openChat.pending, pendingChat)
.addCase(openChat.fulfilled, (state, action)=>{
    state.loading = false;
    state.conversation = action.payload.conversation;
    state.error = null;
})
.addCase(openChat.rejected, rejectedChat);
    }
})

export default chatSlice.reducer;