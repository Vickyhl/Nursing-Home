import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import MedicalHistory from "./MedicalHistory";
import AppointmentsPage from "./AppointmentsPage";
import AddAppointment from "./AddAppointment";
import AddMedications from "./AddMedications";
import WorkSchedule from "./WorkSchedule";
import OrderingMedications from "./OrderingMedications";
import NursingHomeAdmissionForm from "./NursingHomeAdmissionForm";
import PaymentReviewPage from "./PaymentReviewPage";
import NutritionalMonitoringPage from "./NutritionalMonitoringPage";
import ManagementOfVisits from "./ManagementOfVisits";
import Export from "./Export";

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
      <Route path="/AddMedications" element={<AddMedications />} />
      <Route path="/workSchedule" element={<WorkSchedule />} />
      <Route path="/orderMedication" element={<OrderingMedications />} />\
      <Route path="/admissionForm" element={<NursingHomeAdmissionForm />} />
      <Route path="/paymentReview" element={<PaymentReviewPage />} />
      <Route path="/managementOfVisits" element={<ManagementOfVisits />} />
      <Route path="/exportData" element={<Export />} />
      <Route
        path="/nutritionalMonitoring"
        element={<NutritionalMonitoringPage />}
      />
    </Routes>
  );
};

export default Routes1;
