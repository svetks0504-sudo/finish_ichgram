import { logout } from "../slices/authSlice";

const authMiddleware = (store) => (next) => (action) => {
  if (
    action.type.endsWith("/rejected") &&
    action.payload === "Forbidden: Invalid or expired token"
  ) {
    store.dispatch(logout());
  }
  return next(action);
};

export default authMiddleware;
