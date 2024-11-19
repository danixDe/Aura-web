import React, { useState } from "react";
import {
  Typography,
  Button,
  Container,
  CssBaseline,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

const MFSignup = () => {
  const [facilityType, setFacilityType] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleFacilityTypeChange = (event) => {
    setFacilityType(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      facilityType: facilityType,
      licenseNumber: formData.get("licenseNumber"),
      contactPerson: formData.get("contactPerson"),
      contactNumber: formData.get("contactNumber"),
      address: formData.get("address"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (!termsAccepted) {
      alert("You must accept the Terms & Conditions to proceed.");
      return;
    }

    console.log("Form submitted:", data);
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
            Medical Facility Sign Up
          </Typography>
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Organization Name"
              name="name"
              autoFocus
            />

           
            <FormControl
               required
               fullWidth
               margin="normal"
               variant="outlined"  >
                <InputLabel id="facility-type-label">Facility Type</InputLabel>
                    <Select
                       labelId="facility-type-label"
                       id="facility-type"
                       value={facilityType}
                       onChange={handleFacilityTypeChange}
                       label="Facility Type" >
                         <MenuItem value={"Hospital"}>Hospital</MenuItem>
                         <MenuItem value={"Clinic"}>Clinic</MenuItem>
                         <MenuItem value={"Blood Bank"}>Blood Bank</MenuItem>
                         <MenuItem value={"NGO"}>NGO</MenuItem>
                         <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
            </FormControl>


         
            <TextField
              margin="normal"
              required
              fullWidth
              id="licenseNumber"
              label="License Number"
              name="licenseNumber"
            />

            
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactPerson"
              label="Contact Person Name"
              name="contactPerson"
            />

           
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactNumber"
              label="Contact Number"
              name="contactNumber"
              type="tel"
            />

           
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              multiline
              rows={3}
            />

           
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
            />

           
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />

          
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                  color="primary"
                />
              }
              label="I accept the Terms & Conditions"
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
          Already have an account? <Link to="/MFLogin">Login</Link>
        </p>
      </Container>
    </>
  );
};

export default MFSignup;
