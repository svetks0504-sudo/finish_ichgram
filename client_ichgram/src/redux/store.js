import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import likeReducer from "./slices/likeSlice";
import commentReducer from "./slices/commentSlice";
import authMiddleware from "./middleware/authMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    likes: likeReducer,
    comments: commentReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authMiddleware);
  },
});

export default store;
