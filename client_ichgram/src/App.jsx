import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Registration from "./pages/registration";
import Login from "./pages/login";
import ForgotPass from "./pages/forgotPass";
import ResetPass from "./pages/resetPass";
import Home from "./pages/home";
import LearnMore from "./pages/learnMore";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Cookies from "./pages/cookies";
import NotFound from "./pages/notFound";
import Explore from "./pages/explore";
import Message from "./pages/message";
import Profile from "./pages/profile";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import OtherProfile from "./pages/otherProfile";

const manuArr = [
  {
    key: "home",
    type: "route",
    link: "/",
    title: "Home",
    icon: "src/assets/icons/home.png",
    element: <Home />,
  },
  {
    key: "search",
    type: "panel",
    panel: "search",
    title: "Search",
    icon: "src/assets/icons/search.png",
  },
  {
    key: "explore",
    type: "route",
    link: "/explore",
    title: "Explore",
    icon: "src/assets/icons/explore.png",
    element: <Explore />,
  },
  {
    key: "messages",
    type: "route",
    link: "/messages",
    title: "Messages",
    icon: "src/assets/icons/message.png",
    element: <Message />,
  },
  {
    key: "notifications",
    type: "panel",
    panel: "notifications",
    title: "Notificaitons",
    icon: "src/assets/icons/notifications.png",
  },
  {
    key: "create",
    type: "modal",
    modal: "create",
    title: "Create",
    icon: "src/assets/icons/create.png",
  },
  {
    key: "route",
    type: "route",
    link: "/profile",
    title: "Profile",
    icon: "src/assets/icons/profile.png",
    element: <Profile />,
  },
];

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset" element={<ResetPass />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout manuArr={manuArr} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Home />} />
          {manuArr
            .filter((elem) => elem.type === "route" && elem.link !== "/")
            .map((elem) => (
              <Route key={elem.link} path={elem.link} element={elem.element} />
            ))}
          <Route path="/otherProfile" element={<OtherProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
    </Router>
  );
}

export default App;
