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
import DataPolicy from "./pages/DataPolicy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/data-policy" element={<DataPolicy />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* інші сторінки */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
