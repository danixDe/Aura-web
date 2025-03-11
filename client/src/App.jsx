import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VLogin from "./pages/VLogin";
import VSignup from "./pages/VSignup";
import MFLogin from "./pages/MFLogin";
import MFSignup from "./pages/MFSignup";
import Land from './pages/Lander'
import DonorHome from './pages/DonorHome.jsx'
import Home from './pages/Homepage'
import BloodBankPage from "./pages/BloodBankPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/VLogin" element={<VLogin />} />
        <Route path="/MFLogin" element={<MFLogin />} />
        <Route path="/MFSignup" element={<MFSignup />} />
        <Route path="/VSignup" element={<VSignup />} />
        <Route path = '/DonorHome' element = {<DonorHome />} />
        <Route path="bloodbank" element={<BloodBankPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
