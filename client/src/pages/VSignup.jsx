import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import styles from './auth.module.css';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
const VSignup = () => {

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dName = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const phone = formData.get('phone');
    const location = formData.get('location');
    const preferred_notification = formData.get('preferred_notification');
    const blood_group = formData.get('blood_group');
  
    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      toast.error("Passwords do not match!");
    } else {
      const user = { dName, email, phone, location, blood_group, preferred_notification, password };
      console.log('Form submitted:', user);
  
      try {
        const response = await axios.post("http://localhost:5000/api/donors", user);
        if (response.data.message === "Donor added successfully") {
          toast.success("Signup successful!");
          navigate("/donor");
        } else {
          console.log("error signing up", response.data.message);
          toast.error("Signup failed. Please try again.");
        }
      } catch (err) {
        console.log("Signup error:", err);
        toast.error("Server error. Try again later.");
      }
    }
  };
  
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('Google Sign Up Success:', credentialResponse);
      navigate("/google-signup", { state: credentialResponse });
    } catch (err) {
      console.log("Error during Google Sign Up redirect:", err);
      toast.error("Something went wrong with Google Sign Up");
    }
  };
  
  const handleGoogleError = () => {
    console.log('Google Sign Up Failed');
    toast.error("Google Sign Up Failed");
  };

  return (
    <div className={styles.authContainer}>
      <motion.div 
        className={styles.formCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Volunteer Sign Up</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.inputField}
              required
            />
          </div>

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
            <label htmlFor="phone">Mobile number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Address</label>
            <input
              type="text"
              id="location"
              name="location"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="blood">Blood Group</label>
            <input
              type="text"
              id="blood"
              name="blood_group"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="notification">Preferred Notification</label>
            <input
              type="text"
              id="notification"
              name="preferred_notification"
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

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
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
            Sign Up
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
            text="signup_with"
            shape="rectangular"
          />
        </div>

        <p className={styles.switchText}>
          Already have an account?
          <Link to="/VLogin" className={styles.switchLink}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default VSignup;