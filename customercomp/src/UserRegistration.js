import { Link, Box, Container, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UserRegistration() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleRegister = (event) => {
        event.preventDefault();

        let validationErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
        let isValid = true;

        // Validation logic
        if (!name) {
            validationErrors.name = "Username is required";
            isValid = false;
        }
        if (!email) {
            validationErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = "Invalid email format";
            isValid = false;
        }
        if (!password) {
            validationErrors.password = "Password is required";
            isValid = false;
        }else if (password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters long";
            isValid = false;
        }

        if (!confirmPassword) {
            validationErrors.confirmPassword = "Confirm password is required";
            isValid = false;
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(validationErrors);

        // If valid, send data and navigate
        if (isValid) {
            axios.post('http://localhost:5000/users', {name, email, password})
                .then(result => {
                    console.log(result);
                    alert('User registration successfull!')
                    navigate('/user');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <Container maxWidth="xs" style={{ height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{
                width: '100%',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 3,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
            }}>
                <h2><b>REGISTER</b></h2>
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Username"
                                name="username"
                                fullWidth
                                onChange={(e) => setName(e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Email"
                                name="email"
                                fullWidth
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                {/* Links for navigation */}
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link href="/user" underline="hover" sx={{ display: 'block', mt: 1 }}>
                        Login
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}

export default UserRegistration;
