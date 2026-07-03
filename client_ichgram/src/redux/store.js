import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import likeReducer from "./slices/likeSlice";
import commentReducer from "./slices/commentSlice";
import authMiddleware from "./middleware/authMiddleware";
import allPostReducer from "./slices/allPostSlice";
import userReducer from "./slices/userSlice";
import notificationReducer from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    likes: likeReducer,
    comments: commentReducer,
    allPosts: allPostReducer,
    user: userReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authMiddleware);
  },
});

export default store;
