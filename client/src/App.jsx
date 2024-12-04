import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import VLogin from './pages/VLogin'
import Homepage from './pages/Homepage'
function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path = '/login' element = {<Login />} />
          </Routes>
        </Router>
    
  
  )
}

export default App;
