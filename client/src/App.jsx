import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VLogin from "./pages/VLogin";
import VSignup from "./pages/VSignup";
import MFLogin from "./pages/MFLogin";
import MFSignup from "./pages/MFSignup";
import Land from './pages/Lander'
import DonorHome from './pages/DonorHome.jsx'
import BloodBankPage from "./pages/BloodBankPage";
import DonorProfile from './pages/donor_profile.jsx'
import DonorHistory from "./pages/donor_history.jsx";
import BloodRequests from "./pages/BloodRequests.jsx";
import DonorsList from "./pages/DonorsList.jsx";
import Analytics from "./pages/Analytics.jsx";
import { AuthProvider, AuthContext } from "./utils/AuthContext.jsx";
import { useContext } from "react";
import ProtectedRoute from "./ProtectedRoute.jsx";
import GoogleSignup from "./pages/GoogleSignup.jsx";
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/VLogin" element={<VLogin />} />
        <Route path="/MFLogin" element={<MFLogin />} />
        <Route path="/MFSignup" element={<MFSignup />} />
        <Route path="/VSignup" element={<VSignup />} />
        <Route path="google-signup" element={<GoogleSignup/>} />
       <Route element={<ProtectedRoute/>}>
        <Route path = '/DonorHome' element = {<DonorHome />} />
        <Route path="/bloodbank" element={<BloodBankPage/>} />
        <Route path = '/donor' element = {<DonorProfile />} />
        <Route path = '/donationHistory' element = {<DonorHistory />} />
        <Route path="/blood-requests" element={<BloodRequests />} />
        <Route path="/donors-list" element={<DonorsList />} />
        <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
