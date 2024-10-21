import React, { useState } from 'react';
import './Forgot.css';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the backend API to send a reset password email
    // fetch('/api/forgot-password', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMessage(data.message || 'Check your email for a reset link.');
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     setMessage('An error occurred. Please try again.');
    //   });
  };

  return(
    <div className='contain'>
      
      <form onSubmit={handleSubmit}>
        <h3>Oops,Forgot Password!!</h3>
        <p>Enter your Email to reset the password</p>
       <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
