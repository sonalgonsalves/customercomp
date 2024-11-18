import { Box, Container, Grid, TextField, Button, Link, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
    const navigate = useNavigate();

    // State variables for username, password, and error messages
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });
    const [loginMessage, setLoginMessage] = useState(""); // Message for login feedback

    const handleLogin = (event) => {
        event.preventDefault();

        // Reset message on each attempt
        setLoginMessage("");

        // Simple validation logic
        let validationErrors = { username: "", password: "" };
        let isValid = true;

        if (!username) {
            validationErrors.username = "Username is required";
            isValid = false;
        }
        if (!password) {
            validationErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(validationErrors);

        // Mock validation (Replace with actual API call in a real app)
        if (isValid) {
            if (username === "user1" && password === "password123") {
                setLoginMessage("Login successful!");
                navigate("/student"); // Redirect to student dashboard
            } else {
                setLoginMessage("Invalid username or password");
            }
        }
    };

    return (
        <Container maxWidth="xs" style={{ backgroundColor: 'lightblue', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                sx={{
                    width: '100%',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 3,
                    backgroundColor: "white",
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    <b>LOGIN</b>
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Username"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" fullWidth>
                                <b>LOGIN</b>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Display login message */}
                {loginMessage && (
                    <Typography
                        variant="body2"
                        color={loginMessage === "Login successful!" ? "green" : "error"}
                        sx={{ mt: 2 }}
                    >
                        {loginMessage}
                    </Typography>
                )}

                {/* Links for navigation */}
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link href="/forgot-password" underline="hover" sx={{ display: 'block', mt: 1 }}>
                        Forgot Password?
                    </Link>
                    <Link href="/reset-password" underline="hover" sx={{ display: 'block', mt: 1 }}>
                       Reset the Password?
                    </Link>
                    <Link href="/register" underline="hover" sx={{ display: 'block', mt: 1 }}>
                      Register
                    </Link>
                    
                </Box>
            </Box>
        </Container>
    );
}

export default UserLogin;