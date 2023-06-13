import React, { useState } from "react";
import axios from "axios";
import { logEvent } from "./LoggingService";
import "../components/Login.css";

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
      window.location.assign("/home");
    }
  };

  const closeModal = () => {
    setErrorMessage(false);
  };

  return (
    <div>
      <div className="login">
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <div className="btn-container">
            <button className="btn" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
      {errorMessage && (
        <div className="modal hidden">
          <div className="flex">
            <button className="btn-close" onClick={closeModal}>
              ⨉
            </button>
            <div className="modal-text">
              Your email or password is incorrect
            </div>
            <button className="btn-ok" onClick={closeModal}>
              Okay
            </button>
          </div>
        </div>
      )}
      <div className="overlay hidden"></div>
    </div>
  );
};

export default Login;
