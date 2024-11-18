import { Box, Container, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
    const navigate = useNavigate();

    // State variables for form fields and errors
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = (event) => {
        event.preventDefault();

        // Reset errors
        let validationErrors = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
        let isValid = true;

        // Validation logic
        if (!formData.username) {
            validationErrors.username = "Username is required";
            isValid = false;
        }
        if (!formData.email) {
            validationErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Invalid email format";
            isValid = false;
        }
        if (!formData.password) {
            validationErrors.password = "Password is required";
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(validationErrors);

        // If valid, navigate to login
        if (isValid) {
            console.log("Registration successful", formData);
            navigate("/login");
        }
    };

    return (
        <Container maxWidth="xs" style={{ backgroundColor: "lightblue", height: "100vh" }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h2><b>REGISTER</b></h2>
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Username"
                                name="username"
                                fullWidth
                                value={formData.username}
                                onChange={handleChange}
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Email"
                                name="email"
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                fullWidth
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" fullWidth>
                                <b>REGISTER</b>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default UserRegistration;