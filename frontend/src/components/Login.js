import React, { useState } from "react";
import axios from "axios";
import { logAuditTrail } from "./LoggingService";
import "../components/Login.css";
import loginPic from "./images/loginPic.jpg";

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.post(
      "http://localhost:5000/api/users/login",
      user
    );
    if (result.data.message === "Your email or password is incorrect") {
      setErrorMessage("Your email or password is incorrect");
    } else if (result.data.existingUser) {
      localStorage.setItem("user", JSON.stringify(result.data.existingUser));
      const userData = JSON.parse(localStorage.getItem("user"));
      const { firstName, lastName } = userData;
      const fullName = `${firstName} ${lastName}`;
      logAuditTrail(
        fullName,
        "System login",
        `${fullName} has logged in into the system`
      );
      window.location.assign("/home");
    }
  };

  const closeModal = () => {
    setErrorMessage(false);
  };

  return (
    <div className="login" style={{ borderRadius: 16, height: 400 }}>
      <div className="login-background">
        <h1 className="login-header">Welcome</h1>
        <br />
        <form>
          <label htmlFor="email">Email</label>
          <input
            className="login-input"
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            className="login-input"
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <button className="btn-container" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
      <div className="loginPic">
        <img className="loginPic" src={loginPic}></img>
      </div>
      <div className="overlay hidden"></div>
    </div>
  );
};

export default Login;
