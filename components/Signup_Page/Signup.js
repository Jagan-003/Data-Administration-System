import React, { useState } from "react";

function SignUpForm() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (evt) => {
    const value = evt.target.value;
    
    setState({
      ...state,
      [evt.target.name]: value
    });

    // Only set the role when changing the role select input
    if (evt.target.name === "role") {
      setRole(value);
    }
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { confirmpassword, password } = state;

    if (password !== confirmpassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // Make a POST request to the signup endpoint using fetch
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set content type to JSON
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          password: state.password,
          role: role // Send the selected role
        })
      });

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred during registration.");
      }

      // Handle success
      const data = await response.json();
      if (data.message === "User registered successfully") {
        setSuccessMessage("Registration successful! You can now log in.");
        setState({
          name: "",
          email: "",
          password: "",
          confirmpassword: ""
        });
        setErrorMessage(""); // Clear any previous error messages
      }
    } catch (error) {
      // Handle error
      console.error("Registration error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <span style={{ lineHeight: "100px", fontFamily: "Roboto", fontSize: "20px" }}>
          Use your email for registration
        </span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <label style={{ marginLeft: "-428px", padding: "20px" }}>Select Role:</label>
        <div className="role-selection-container"> 
          <select id="role-select" name="role" value={role} onChange={handleChange} className="role-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <p style={{ textAlign: "left", fontSize: "15px" }}>
            Selected Role:<span style={{ fontSize: "18px", color: "green", fontWeight: "bold" }}> {role}</span>
          </p>
        </div>

        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmpassword"
          value={state.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        {errorMessage && (
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
        )}
        {successMessage && (
          <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
