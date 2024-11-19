<<<<<<< HEAD
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VLogin from "./pages/VLogin";
import VSignup from "./pages/VSignup";
import LandingPage from "./pages/LandingPage";
import MFLogin from "./pages/MFLogin";
import MFSignup from "./pages/MFSignup";


=======
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Homepage from './pages/Homepage'
>>>>>>> 1eff73ecd475c3c4e57f98a5ed0a691b9fc4925e
function App() {
  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/VLogin" element={<VLogin />} />
        <Route path="/MFLogin" element={<MFLogin />} />
        <Route path="/MFSignup" element={<MFSignup />} />
        <Route path="/VSignup" element={<VSignup />} />
      </Routes>
    </Router>
  );
=======
        <Router>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path = '/login' element = {<Login />} />
          </Routes>
        </Router>
    
  
  )
>>>>>>> 1eff73ecd475c3c4e57f98a5ed0a691b9fc4925e
}

export default App;
