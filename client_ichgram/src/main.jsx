import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import PostModalProvider from "./components/postModalProvider";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PostModalProvider>
      <App />
    </PostModalProvider>
  </Provider>,
);
