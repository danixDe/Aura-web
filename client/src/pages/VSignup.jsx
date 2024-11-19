import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    CssBaseline,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  
  const VSignup = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");
  
      if (password !== confirmPassword) {
        console.log("Passwords do not match!");
      } else {
        console.log("Form submitted:", { name, email, password });
      }
    };
  
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
            Volunteer Sign Up
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
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address / Mobile"
              name="email"
              autoComplete="email"
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
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
              Sign Up
            </Button>
          </Box>
        </Box>
        <p>
          Already have an account? <Link to="/VLogin">Sign In</Link>
          </p>
      </Container>
    );
  };
  
  export default VSignup;
  