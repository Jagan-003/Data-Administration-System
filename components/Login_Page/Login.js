import React from "react";
import { Link, useNavigate } from "react-router-dom"; 

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: state.email, // Assuming you're using email as the username
          password: state.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("userRole", data.role);
        // Redirect to a different page, for example, the dashboard
        navigate("/dashboard");
        if (data.role === "admin") {
          navigate("/admin");  // Redirect to admin dashboard
      } else {
          navigate("/dashboard"); // Redirect to user dashboard
      }
    }
    else {
      alert("Login failed: " + data.message);
    } 
  }
    catch (error) {
      alert("An error occurred during login: " + error.message);
    } finally {
      setState({
        email: "",
        password: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <span style={{ lineHeight: "100px", fontFamily: "Roboto", fontSize: "20px" }}>
          To Use your account
        </span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <Link to="/ForgotPassword">Forgot your password?</Link>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
