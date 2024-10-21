import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Forgot.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

    // // Call the backend API to reset the password
    // fetch(`/api/reset-password/${token}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ password }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMessage(data.message || 'Password has been reset.');
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     setMessage('An error occurred. Please try again.');
    //   });
  };

  return (
    <div className='contain'>
      <h2 style={{}}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          required
        />
        {errorMessage && (
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
        )}
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
