import React from "react";
import { Typography, Button, Container, CssBaseline, Box } from "@mui/material";


const LandingPage = () => {

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h2" gutterBottom>
          Welcome to AuraHP!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Choose your role to proceed.
        </Typography>
        <Box display="flex" justifyContent="space-around" marginTop={4}>
          <Button
            variant="contained"
            color="primary"
            href="/MFLogin"
          >
            Medical Facility
          </Button>
          <Button
            variant="contained"
            color="secondary"
            href="/VLogin"
          >
            Volunteer
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LandingPage;
