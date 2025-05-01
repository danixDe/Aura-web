import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import styles from './auth.module.css';
import { motion } from 'framer-motion';
import { AuthContext } from '../Context/AuthContext';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import toast from 'react-hot-toast';
import {useUser} from '../Context/UserContext.jsx';
const VLogin = () => {
  const {setUserEmail} = useUser();
  const [email,setEmailInput] = useState('');
  console.log(window.location.href);
  const navigate = useNavigate();
  const {login}=useContext(AuthContext);
  const [valid,setValid]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const emailInput = formdata.get("email").trim();
    const password = formdata.get("password").trim();
    
    try {
      const response = await axios.post("http://localhost:5000/api/donors/authdonor", { email: emailInput, password });
      console.log(response);

      if (response.data.message === "valid") {
        login(emailInput);
        toast.success('Login Successful');
        navigate('/donor');
      } else {
        console.log("invalid user");
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      if (err.response) {
        console.error("Error Response:", err.response);
        toast.error(`Error: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        console.error("No Response received:", err.request);
        toast.error("No response from server");
      } else {
        console.error("Error setting up request:", err.message);
        toast.error("Error setting up request");
      }
    }
  };
  

  

  const handleGoogleSuccess =async (credentialResponse) => {
    try{
    console.log('Google Sign In Success:', credentialResponse);
    const credential=credentialResponse.credential;
    const response=await axios.post("http://localhost:5000/api/googleAuth",{credential});
    console.log("response",response);

    if(response.data.message==="success"){
      console.log("success");
      login(jwtDecode(credential).email);
      setEmail(email);
      setValid(true);
      toast.success('Login Successful');
    }
    else{
    console.log("error login using google",response.data.message);
     toast.error("Google Login failed");
    }
  }
  catch(err){
    toast.error("Something went wrong with Google Login");
    console.error(err);
  }
  };
useEffect(()=>{
  console.log("valid effect",valid);
 if(valid===true){
   console.log("valid",valid);
   navigate('/donor');
  }
},[valid]);
  const handleGoogleError = () => {
    console.log('Google Sign In Failed');
  };
  return (
    <div className={styles.authContainer}>
      <motion.div 
        className={styles.formCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Volunteer Sign In</h1>
        
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
            width="100vh"
            text="signin_with"
            shape="rectangular"
            useOneTap
            ux_mode="popup"
          />
        </div>

        <p className={styles.switchText}>
          Don't have an account?
          <Link to="/VSignup" className={styles.switchLink}>Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default VLogin;
