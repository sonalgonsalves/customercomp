
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SelectUser from "./SelectUser";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";
import AdminDashboard from "./AdminDashboard";
import Logout from "./Logout";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectUser />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user" element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;