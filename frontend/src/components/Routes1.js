import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import MedicalHistory from "./MedicalHistory";
import AppointmentsPage from "./AppointmentsPage";
import AddAppointment from "./AddAppointment";

const Routes1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/viewMedicalHistory" element={<MedicalHistory />} />
      <Route path="/viewAppointments" element={<AppointmentsPage />} />
      <Route path="/AddAppointments" element={<AddAppointment />} />
    </Routes>
  );
};

export default Routes1;
