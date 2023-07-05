import React, { useState } from "react";
import axios from "axios";
import { logAuditTrail } from "./LoggingService";
import back from "./images/back.jpeg";
import "./AddAppointment.css";

let usersFullName = "";
function AddAppointment() {
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [escort, setEscort] = useState(false);
  const [treatmentType, setTreatmentType] = useState("");
  const [therapistName, setTherapistName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [user, setUser] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const { firstName, lastName } = userData;
  const fullName = `${firstName} ${lastName}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const escortValue = escort === "Yes";

    const appointmen = {
      date,
      time,
      location,
      escortValue,
      treatmentType,
      therapistName,
    };
    const result = await axios.post(
      `http://localhost:5000/api/users/AddAppointment/${patientId}`,
      appointmen
    );

    logAuditTrail(
      fullName,
      "Adding an appointment",
      `${fullName} has added an appointment for: ${usersFullName} at: ${date} ${time}`
    );
    setErrorMessage("Form submitted!");
    console.log("Form submitted!");
  };

  const handleCheckUser = async (e) => {
    e.preventDefault();
    const result = await axios.get(
      `http://localhost:5000/api/users/getUserById/${patientId}`
    );
    if (result.data.message === "The requested id is not found") {
      setErrorMessage("The requested id is not found");
      setUser(null);
    } else {
      setErrorMessage(null);
      setUser(result.data.user);
      usersFullName = `${result.data.user.firstName} ${result.data.user.lastName}`; // Update the fullName variable
    }
  };
  const handlePatientIdChange = async (e) => {
    setPatientId(e.target.value);
  };

  return (
    <>
      {user === null && (
        <div className="AddAppointment-class">
          <img className="img-fluid" src={back} alt="homeImg" />
          <h1 className="appointment-header">Appointment Form</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter patient id"
              className="patientId-input"
              id="patientId"
              value={patientId}
              onChange={handlePatientIdChange}
              required
            />
            {errorMessage && (
              <div className="validationError">{errorMessage}</div>
            )}
            <br />
            <br />
            <button className="AddAppointment-btn" onClick={handleCheckUser}>
              Submit
            </button>
          </div>
        </div>
      )}
      {user != null && (
        <div className="AddAppointment-class-big">
          <label htmlFor="date">Date:</label>
          <input
            className="AddaApointment-input"
            placeholder="dd/mm/yyyy"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="time">Time:</label>
          <input
            className="AddaApointment-input"
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <br />
          <br />

          <label htmlFor="location">Location:</label>
          <input
            className="AddaApointment-input"
            placeholder="Enter appointment location"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <br />
          <br />

          <label htmlFor="escort">Escort:</label>
          <select
            value={escort ? "Yes" : "No"}
            onChange={(event) => setEscort(event.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <br />
          <br />

          <label htmlFor="treatmentType">Treatment Type:</label>
          <input
            type="text"
            className="AddaApointment-input"
            placeholder="Enter treatment type of the appointment"
            id="treatmentType"
            value={treatmentType}
            onChange={(e) => setTreatmentType(e.target.value)}
            required
          />
          <br />
          <br />

          <label htmlFor="therapistName">Therapist Name:</label>
          <input
            type="text"
            className="AddaApointment-input"
            placeholder="Enter therapist name"
            id="therapistName"
            value={therapistName}
            onChange={(e) => setTherapistName(e.target.value)}
            required
          />
          <br />
          <br />
          {errorMessage && <div className="validation">{errorMessage}</div>}
          <button className="btn-container" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default AddAppointment;
