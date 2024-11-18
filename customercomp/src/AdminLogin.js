import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // Validateting the inputs
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    // Check if form is valid
    if (validateForm()) {
      // Check predefined credentials
      if (username === "admin" && password === "admin123") {
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        ADMIN LOGIN
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        error={Boolean(errors.username)}
        helperText={errors.username}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        error={Boolean(errors.password)}
        helperText={errors.password}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        LOGIN
      </Button>
    </Box>
  );
}

export default AdminLogin;
