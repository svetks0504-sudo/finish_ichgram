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
import { useSelector, useDispatch} from "react-redux";
import { Navigate } from "react-router-dom";
import OtherProfile from "./pages/otherProfile";
import homeIcon from "./assets/icons/home.png";
import searchIcon from "./assets/icons/search.png";
import exploreIcon from "./assets/icons/explore.png";
import messageIcon from "./assets/icons/message.png";
import notificationsIcon from "./assets/icons/notifications.png";
import createIcon from "./assets/icons/create.png";
import profileIcon from "./assets/icons/profile.png";
import { useEffect } from "react";
import { fetchMe } from "./redux/slices/userSlice";
import {getAllPosts} from "./redux/slices/allPostSlice";


const manuArr = [
  {
    key: "home",
    type: "route",
    link: "/",
    title: "Home",
    icon: homeIcon,
    element: <Home />,
  },
  {
    key: "search",
    type: "panel",
    panel: "search",
    title: "Search",
    icon: searchIcon,
  },
  {
    key: "explore",
    type: "route",
    link: "/explore",
    title: "Explore",
    icon: exploreIcon,
    element: <Explore />,
  },
  {
    key: "messages",
    type: "route",
    link: "/messages",
    title: "Messages",
    icon: messageIcon,
    element: <Message />,
  },
  {
    key: "notifications",
    type: "panel",
    panel: "notifications",
    title: "Notificaitons",
    icon: notificationsIcon,
  },
  {
    key: "create",
    type: "modal",
    modal: "create",
    title: "Create",
    icon: createIcon,
  },
  {
    key: "route",
    type: "route",
    link: "/profile",
    title: "Profile",
    icon: profileIcon,
    element: <Profile />,
  },
];


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
const token = useSelector((state) => state.auth.token);

useEffect(() => {
  if (token) {
    dispatch(getAllPosts())
    dispatch(fetchMe());
  }
}, [dispatch, token]);

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
          <Route path="/profile/:id" element={<OtherProfile />} />
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
