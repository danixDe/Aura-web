import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import{Link,useNavigate} from "react-router-dom";
import React from "react";


const VLogin = () => {
  const navigate =useNavigate();
 /* const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Form submitted:", { email, password });
  };  */

  const handleSubmit = (e) => {
        navigate('/HomePage');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Volunteer Sign In
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3 }}
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
           
            fullWidth
            id="email"
            label="Email Address/Mobile"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#dc143c",
              ":hover": {
                bgcolor: "#a10f2d",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      <p>
          Not having an account? <Link to="/VSignup">Sign Up</Link>
          </p>

    </Container>
  );
};

export default VLogin;
