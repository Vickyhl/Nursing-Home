import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import InRoutine from "./InRoutine";
import MCI from "./MCI";
import HealthDec from "./HealthDec";
import Donation from "./Donation";
import BloodStatus from "./BloodStatus";
import Export from "./Export";

const Routes1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inRoutine" element={<InRoutine />} />
      <Route path="/MCI" element={<MCI />} />
      <Route path="/donateBlood" element={<Donation />} />
      <Route path="/bloodStatus" element={<BloodStatus />} />
      <Route path="/exportFiles" element={<Export />} />
      <Route path="/HealthDec" element={<HealthDec />} />
    </Routes>
  );
};

export default Routes1;
