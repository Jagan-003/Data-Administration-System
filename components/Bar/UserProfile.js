// src/components/UserProfile.js
import React from 'react';
import { Typography } from '@mui/material';
import { useState } from 'react';
import './userProfile.css';

const UserProfile = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
    
      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
    
      const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value,
        });
      };
    
      const handleOnSubmit = async (evt) => {
        evt.preventDefault();
    
        const { confirmpassword, password } = state;
    
        if (password !== confirmpassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }
    
        try {
          const response = await fetch("http://localhost:5000/api/updateUser", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: state.name,
              email: state.email,
              password: state.password,
            }),
          });
    
          // Check if the response is ok
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred while updating.");
          }
    
          // Handle success
          const data = await response.json();
          if (data.message === "User updated successfully") {
            setSuccessMessage("Update successful!");
            setErrorMessage(""); 
          }
        } catch (error) {
          // Handle error
          console.error("Update error:", error.message);
          setErrorMessage(error.message);
        }
      };
    
      return (
        <div className="container">
              <h1 style={{marginTop:"10px"}}>User Profile</h1>
              <p>This is the user profile page where you can view and edit your profile.</p>
                  
          <div className="update-container">
                  <form onSubmit={handleOnSubmit}>
                      <h1>Update Your Information</h1>

                      <input
                          type="text"
                          name="name"
                          value={state.name}
                          onChange={handleChange}
                          placeholder="Name"
                          required />
                      <input
                          type="email"
                          name="email"
                          value={state.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required />
                      <input
                          type="password"
                          name="password"
                          value={state.password}
                          onChange={handleChange}
                          placeholder="New Password"
                          required />
                      <input
                          type="password"
                          name="confirmpassword"
                          value={state.confirmpassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          required />
                      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

                      <button type="submit">Update</button>
                  </form>
              </div>
              </div>
      );
    }
    
        
   

export default UserProfile;