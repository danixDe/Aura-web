import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";

const Login = () => {
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
          Sign In
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3 }}
          onSubmit={(e) => {
            e.preventDefault(); 
            console.log("Form submitted");
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
    </Container>
  );
};

export default Login;
