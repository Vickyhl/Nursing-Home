import React, { useContext } from "react";
import homeImg from "./images/HomePage.png";
import "./style.css";

const Home = () => {
  let userData = localStorage.getItem("user");

  return (
    <div className="container-home">
      <img className="img-fluid" src={homeImg} alt="homeImg" />
    </div>
  );
};

export default Home;
