import { Box, Container, Grid, TextField, Button, Link, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function UserLogin() {

    const navigate = useNavigate();
    const [name, setName] = useState()
    const [password, setPassword] = useState()

    const [errors, setErrors] = useState({ name: "", password: "" });

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/login', { name, password })
        .then(result => {
            if (result.data === "Success") {
                alert("Login successful!");
                navigate('/complaint');
            } else {
                alert("Invalid credentials, please try again.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("An error occurred while logging in. Please try again later.");
        });
        
        // Simple validation logic
        let validationErrors = { name: "", password: "" };
        let isValid = true;

        if (!name) {
            validationErrors.name = "Username is required";
            isValid = false;
        }
        if (!password) {
            validationErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(validationErrors);
    };

    return (
        <Container maxWidth="xs" style={{ height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
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

                {/* Display login message 
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
                    <Link href="/resetpassword" underline="hover" sx={{ display: 'block', mt: 1 }}>
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
