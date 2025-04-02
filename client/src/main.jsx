import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
const clientid="148388239184-5afa0ejenmi1t6gr9r444rkdpj7gn8mj.apps.googleusercontent.com";
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientid}>
  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>
)
