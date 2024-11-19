import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VLogin from "./pages/VLogin";
import VSignup from "./pages/VSignup";
import LandingPage from "./pages/LandingPage";
import MFLogin from "./pages/MFLogin";
import MFSignup from "./pages/MFSignup";


function App() {
  return (
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
}

export default App;
