import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SelectUser from "./SelectUser";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectUser />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/user" element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;