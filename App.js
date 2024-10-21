import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "./App.css";
import "./components/Login_Page/styles.css";
import SignInForm from "./components/Login_Page/Login";
import SignUpForm from "./components/Signup_Page/Signup";
import Dashboard from './components/Dashboard/Dashboard';
// import WebSocketClient from './components/Websocket/websocket';
import Settings from './components/Bar/Setting';
import CollabWork from './components/Bar/CollabWork';
import Upgrade from './components/Bar/Upgrade';
import UserProfile from './components/Bar/UserProfile';
import Sidebar from './components/Side_bar/Sidebar';
import Admin from './components/Admindashboard/Admin';
import ForgotPassword  from './components/Forgot_Password/Forgot';
import ResetPassword from "./components/Forgot_Password/ResetLink";
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
  
const AppContent = () => {
  const [type, setType] = useState("signIn");
  const location = useLocation();

  // Determine whether to show the sidebar
  const showSidebar = location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/' && location.pathname!=="/ForgotPassword" && location.pathname!=="/Resetpassword";
  
  // Handler for switching between SignIn and SignUp
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  // Set container class dynamically based on the form type
  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div  style={{ display: 'flex', height: '100vh' }}>
      {showSidebar && <Sidebar />}
      {/* <WebSocketClient /> */}

      <Routes>
        <Route path='/' element={
          <div className="App">
            <div className={containerClass} id="container">
              <SignUpForm />
              <SignInForm />
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your info</p>
                    <button
                      className="ghost"
                      id="signIn"
                      onClick={() => handleOnClick("signIn")}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your  details and start your journey with us</p>
                    <button
                      className="ghost"
                      id="signUp"
                      onClick={() => handleOnClick("signUp")}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />

        {/* <Route path='/login' element={<SignInForm />} /> */}
        <Route path="/Resetpassword" element={<ResetPassword />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/collab-work' element={<CollabWork />} />
        <Route path='/upgrade' element={<Upgrade />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
};
