import React from "react";
import logo from "./images/Logo.png";
import "./Header.css";

const Header = (handleClick) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userData?.isAdmin;
  const isStudent = userData?.student;
  const isUser = userData?.user;

  const logOut = () => {
    localStorage.clear();
  };
  handleClick = (text) => {
    console.log(text);
  };

  return (
    <ul className="nav-bar-ul">
      <div className="navbar-brand ">
        <a href="/">
          <img className="headerImg" src={logo}></img>
        </a>{" "}
      </div>
      <li>
        <a href="/home">Home</a>
      </li>
      <li className="dropdown">
        <a href="" className="dropbtn">
          My Account
        </a>
        <div className="dropdown-content">
          {userData === "undefined" || !userData ? (
            <a href="/register">Register</a>
          ) : (
            <a href="/home">Home</a>
          )}
          {userData === "undefined" || !userData ? (
            <a href="/login">Login</a>
          ) : (
            <a href="home" onClick={logOut}>
              Logout
            </a>
          )}
        </div>
      </li>
      <li>
        <a href="/admissionForm">Admission form</a>
      </li>
      <li>
        <a href="/viewMedicalHistory">View Medical History</a>
      </li>
      <li className="dropdown">
        <a href="" className="dropbtn">
          Appointments
        </a>
        <div className="dropdown-content">
          <a href="/viewAppointments">View Appointments</a>
          <a href="/AddAppointments">Add new Appointment</a>
        </div>
      </li>
      <li>
        <a href="/AddMedications">Add medications</a>
      </li>
      <li>
        <a href="/orderMedication">Order medication</a>
      </li>
      <li>
        <a href="/workSchedule">Work schedule</a>
      </li>
      <li>
        <a href="/paymentReview">Nursing home payment</a>
      </li>
      <li>
        <a href="/nutritionalMonitoring">Nutritional monitoring</a>
      </li>
    </ul>
  );
};

export default Header;
