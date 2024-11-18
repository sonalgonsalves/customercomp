import { Link, Box, Container, Grid, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", newPassword: "", confirmPassword: "" });
    const [message, setMessage] = useState("");

    const handleReset = async (event) => {
        event.preventDefault();
        setMessage("");
        let validationErrors = { email: "", newPassword: "", confirmPassword: "" };
        let isValid = true;

        if (!email) {
            validationErrors.email = "Email is required";
            isValid = false;
        }
        if (!newPassword) {
            validationErrors.newPassword = "New password is required";
            isValid = false;
        } else if (newPassword.length < 8) {
            validationErrors.newPassword = "Password must be at least 8 characters long";
            isValid = false;
        }
        if (!confirmPassword) {
            validationErrors.confirmPassword = "Confirm password is required";
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(validationErrors);

        if (isValid) {
            try {
                const response = await axios.post("http://localhost:5000/reset-password", {
                    email,
                    password: newPassword,
                });
                setMessage(response.data.message);
                if (response.data.success) {
                    setTimeout(() => navigate("/user"), 2000);
                }
            } catch (error) {
                setMessage(error.response?.data?.message || "An error occurred");
            }
        }
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
                    <b>Reset Password</b>
                </Typography>
                <Box component="form" onSubmit={handleReset} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="New Password"
                                type="password"
                                fullWidth
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                error={!!errors.newPassword}
                                helperText={errors.newPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" fullWidth>
                                <b>Reset Password</b>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {message && (
                    <Typography
                        variant="body2"
                        color={message.includes("success") ? "green" : "red"}
                        sx={{ mt: 2 }}
                    >
                        {message}
                    </Typography>
                )}

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link href="/user" underline="hover" sx={{ display: 'block', mt: 1 }}>
                        Login
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}

export default ResetPassword;
