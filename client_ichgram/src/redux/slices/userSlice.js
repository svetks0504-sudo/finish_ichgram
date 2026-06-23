import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice ({
name: "user",
initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
}
})

export default userSlice.reducer;