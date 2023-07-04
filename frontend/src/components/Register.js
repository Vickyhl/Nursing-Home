import React, { useState } from "react";
import axios from "axios";
import { logAuditTrail } from "./LoggingService";
import { useNavigate } from "react-router-dom";
import back from "./images/admission.jpeg";
import "./Login.css";

const Register = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
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
    // setIsLoading(true);
    setErrors({});

    const { firstName, lastName, email, password } = user;
    const newErrors = {};

    // Name validation
    if (
      !/^[a-zA-Z]{2,15}$/.test(firstName) ||
      !/^[a-zA-Z]{2,15}$/.test(lastName)
    ) {
      newErrors.name =
        "First name and Last name must only contain letters, be at least 2 characters long and a maximum of 15 characters.";
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    }

    const res = await axios.post(
      "http://localhost:5000/api/users/signup",
      user
    );
    // console.log(res.data.message);
    if (res.data.message === "Signing up failed, please try again later") {
      newErrors.signUp = "Signing up failed, please try again later";
    } else {
      const fullName = `${firstName} ${lastName}`;
      logAuditTrail(
        fullName,
        "System registration",
        `${fullName} has registered to the system`
      );
      navigate("/login");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // setIsLoading(false);
      return;
    }

    // setIsLoading(false);
  };
  return (
    <>
      <img className="admission-img" src={back} alt="homeImg" />
      {/* {isLoading && <Loader />} */}
      <div className="register">
        <form>
          <label htmlFor="firstname">First Name</label>
          <input
            className="login-input"
            id="firstname"
            onChange={handleChange}
            name="firstName"
            value={user.firstName}
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            className="login-input"
            id="lastname"
            onChange={handleChange}
            name="lastName"
            value={user.lastName}
          />
          {errors.name && <div className="validationError">{errors.name}</div>}

          <label htmlFor="email">Email</label>
          <input
            className="login-input"
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="validationError">{errors.email}</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            className="login-input"
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="validationError">{errors.password}</div>
          )}
          {errors.signUp && (
            <div className="validationError">{errors.signUp}</div>
          )}
          <button className="btn-container" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
