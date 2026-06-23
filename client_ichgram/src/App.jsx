import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Registration from "./pages/registration";
import Login from "./pages/login";
import ForgotPass from "./pages/forgotPass";
import ResetPass from "./pages/resetPass";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
          {/* інші сторінки */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
