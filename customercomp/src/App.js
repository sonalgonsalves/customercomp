
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SelectUser from "./SelectUser";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";
import AdminDashboard from "./AdminDashboard";
import RaiseComplaint from "./RaiseComplaint";
import Logout from "./Logout";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import UserRegistration from "./UserRegistration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectUser />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user" element={<UserLogin />} />
        <Route path="/complaint" element={<RaiseComplaint />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/register" element={<UserRegistration />} />
      </Routes> 
    </Router>
  );
}

export default App;