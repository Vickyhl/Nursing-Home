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
    </ul>
  );
};

export default Header;