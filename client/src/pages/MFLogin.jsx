import React from "react";
import { Typography, Button, Container, CssBaseline, Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const MFLogin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Form submitted:", { email, password });
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Medical Facility Sign In
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
           
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address / Mobile"
              name="email"
              autoComplete="email"
              autoFocus
              aria-label="Email or Mobile"
              InputLabelProps={{
                shrink: true, 
              }}
              variant="outlined" 
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#dc143c",
                  },
                },
              }}
            />

            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              aria-label="Password"
              InputLabelProps={{
                shrink: true, 
              }}
              variant="outlined" 
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#dc143c",
                  },
                },
              }}
            />

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
          Not having an account? <Link to="/MFSignup">Sign Up</Link>
         </p>
      </Container>
    </>
  );
};

export default MFLogin;
