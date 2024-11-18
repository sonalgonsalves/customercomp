import { Box, Container, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();

    // State variables for email and error
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = (event) => {
        event.preventDefault();

        // Reset error
        setError("");

        // Validation logic
        if (!email) {
            setError("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email format");
        } else {
            console.log("Password reset link sent to:", email);
            navigate("/login"); // Redirect to login after successful submission
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
                <h2><b>FORGOT PASSWORD</b></h2>
                <Box component="form" onSubmit={handleForgotPassword} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!error}
                                helperText={error}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" fullWidth>
                                <b>SUBMIT</b>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default ForgotPassword;