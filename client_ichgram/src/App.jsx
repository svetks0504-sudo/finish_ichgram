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
import Privacy from "./pages/dataPolicy";
import Cookies from "./pages/cookies";
import NotFound from "./pages/notFound";
import Search from "./pages/search";
import Explore from "./pages/explore";
import Message from "./pages/message";
import Notification from "./pages/notification";
import Create from "./pages/create";
import Profile from "./pages/profile";

const manuArr = [
  {
    link: "/",
    title: "Home",
    icon: "src/assets/icons/home.png",
    element: <Home />,
  },
  {
    link: "/search",
    title: "Search",
    icon: "src/assets/icons/search.png",
    element: <Search />,
  },
  {
    link: "/explore",
    title: "Explore",
    icon: "src/assets/icons/explore.png",
    element: <Explore />,
  },
  {
    link: "/messages",
    title: "Messages",
    icon: "src/assets/icons/message.png",
    element: <Message />,
  },
  {
    link: "/notificaitons",
    title: "Notificaitons",
    icon: "src/assets/icons/notifications.png",
    element: <Notification />,
  },
  {
    link: "/create",
    title: "Create",
    icon: "src/assets/icons/create.png",
    element: <Create />,
  },
  {
    link: "/profile",
    title: "Profile",
    icon: "src/assets/icons/profile.png",
    element: <Profile />,
  },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset" element={<ResetPass />} />
        <Route path="/" element={<Layout manuArr={manuArr} />}>
          <Route index element={<Home />} />
          {manuArr
            .filter((elem) => elem.link !== "/")
            .map((elem) => (
              <Route key={elem.link} path={elem.link} element={elem.element} />
            ))}
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
