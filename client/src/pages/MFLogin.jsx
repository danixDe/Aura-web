import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import styles from './auth.module.css';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

const MFLogin = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get('email');
    const password = formdata.get('password');
    console.log(password);

    try {
      const response = await axios.post("http://localhost:5000/api/facilities/auth", { email, password });
      if (response.data.message === "valid") {
        setValid(true);
        toast.success('Login Successful!');
      } else {
        console.log("invalid user");
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("Server error.");
      console.log(err);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('Google Sign In Success:', credentialResponse);
      const credential = credentialResponse.credential;
      const response = await axios.post("http://localhost:5000/api/googleAuth", { credential });
      console.log("response", response);

      if (response.data.message === "success") {
        console.log("success");
        setValid(true);
        toast.success('Login Successful');
      } else {
        console.log("error login using google", response.data.message);
        toast.error("Google Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong with Google Login");
      console.error(err);
    }
  };

  const handleGoogleError = () => {
    console.log('Google Sign In Failed');
    toast.error("Google Sign In Failed");
  };

  useEffect(() => {
    if (valid === true) {
      navigate('/bloodbank'); 
    }
  }, [valid]);

  return (
    <div className={styles.authContainer}>
      <motion.div
        className={styles.formCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Medical Facility Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.inputField}
              required
            />
          </div>

          <motion.button
            className={styles.submitButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Sign In
          </motion.button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <div className={styles.socialButtons}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            size="large"
            width="100%"
            text="signin_with"
            shape="rectangular"
            useOneTap
            ux_mode='popup'
          />
        </div>

        <p className={styles.switchText}>
          Don't have an account?
          <Link to="/MFSignup" className={styles.switchLink}>Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default MFLogin;
