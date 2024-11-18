import { Box, Container, Grid, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();

    // State for new password, confirm password, and errors
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });
    const [message, setMessage] = useState(""); // Feedback message

    const handleReset = (event) => {
        event.preventDefault();

        // Clear message
        setMessage("");

        // Validation logic
        let validationErrors = { newPassword: "", confirmPassword: "" };
        let isValid = true;

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

        // If valid, show success message and navigate (mock behavior)
        if (isValid) {
            setMessage("Password reset successfully!");
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
        }
    };

    return (
        <Container maxWidth="xs" style={{ backgroundColor: 'lightblue', height: '85 vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2, textAlign: 'center' }}>
                    Enter your new password below.
                </Typography>
                <Box component="form" onSubmit={handleReset} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
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

                {/* Feedback message */}
                {message && (
                    <Typography
                        variant="body2"
                        color="green"
                        sx={{ mt: 2 }}
                    >
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}

export default ResetPassword;