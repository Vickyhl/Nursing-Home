import React, { useState, useEffect } from "react";
import "../components/ViewMedicalHistory.css";
import medicalHistoryLogo from "./images/medical-history.png";
import axios from "axios";

function ViewMedicalHistory() {
  const [patient, setPatient] = useState();
  const [initialMedicalHistory, setInitialMedicalHistory] = useState([]);

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    const result = await axios.post(
      "http://localhost:5000/api/medicalHistory/updateMedicalHistory"
    );
    console.log(result.data.user);
    setPatient(result.data.user);
  };

  const addMedicalHistory = () => {};

  return (
    <div className="medical-history">
      {patient && (
        <div>
          <h2>Patient's Information</h2>
          <p>
            <strong>Patient's Name:</strong> {patient.firstName}{" "}
            {patient.lastName}
          </p>
          <p>
            <strong>Patient's Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Date of Admission:</strong>{" "}
            {new Date(patient.createdAt).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Allergies:</strong> {patient.allergies.join(", ")}
          </p>
          <h3>
            <img className="medical-histpry-img" src={medicalHistoryLogo}></img>
            Medical History
          </h3>
          {patient.medicalHistory.map((history, index) => (
            <div key={index}>
              <h4>Disease Name: {history.diseaseName}</h4>
              <p>
                Diagnosed Date:{" "}
                {new Date(history.diagnosedDate).toLocaleDateString("en-GB")}
              </p>
              <h5>Medications</h5>
              {history.medications.map((medication, medIndex) => (
                <div key={medIndex}>
                  <p>Medication Name: {medication.name}</p>
                  <p>Quantity: {medication.quantity}</p>
                  <p>Unit Measure: {medication.unitMeasure}</p>
                  <p>Frequency: {medication.frequency}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMedicalHistory;
