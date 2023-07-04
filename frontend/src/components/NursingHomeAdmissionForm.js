import React, { useState } from "react";
import axios from "axios";
import { logAuditTrail } from "./LoggingService";
import "./NursingHomeAdmissionForm.css";
import back from "./images/back.jpeg";

function NursingHomeAdmissionForm() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [ssn, setSSN] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [canWalkUnassisted, setCanWalkUnassisted] = useState(false);
  const [requiresADLAssistance, setRequiresADLAssistance] = useState(false);
  const [hasMobilityAids, setHasMobilityAids] = useState(false);
  const [mobilityAids, setMobilityAids] = useState("");
  const [isReceivingTherapies, setIsReceivingTherapies] = useState(false);
  const [therapies, setTherapies] = useState("");
  const [isDeclarationAccepted, setIsDeclarationAccepted] = useState(false);
  const [patientSignature, setPatientSignature] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullName,
      dateOfBirth,
      gender,
      ssn,
      address,
      phoneNumber,
      emergencyContact,
      canWalkUnassisted,
      requiresADLAssistance,
      hasMobilityAids,
      mobilityAids,
      isReceivingTherapies,
      therapies,
      isDeclarationAccepted,
      patientSignature,
      date,
    };

    const result = await axios.post(
      `http://localhost:5000/api/users/admissionForm`,
      formData
    );
    console.log(result.data.success);
    if (result.data.success) {
      setMessage("Form submitted successfully!");
      const userData = JSON.parse(localStorage.getItem("user"));
      const { firstName, lastName } = userData;
      const fullName = `${firstName} ${lastName}`;
      logAuditTrail(
        fullName,
        "Creating admission form",
        `${fullName} has created admission form for ${formData.fullName}`
      );
    } else {
      setErrorMessage("Error submitting the form");
    }
    // Reset form fields
    // setFullName("");
    // setDateOfBirth("");
    // setGender("");
    // setSSN("");
    // setAddress("");
    // setPhoneNumber("");
    // setEmergencyContact("");
    // setCanWalkUnassisted(false);
    // setRequiresADLAssistance(false);
    // setHasMobilityAids(false);
    // setMobilityAids("");
    // setIsReceivingTherapies(false);
    // setTherapies("");
    // setIsDeclarationAccepted(false);
    // setPatientSignature("");
    // setDate("");
  };

  return (
    <>
      <img className="img-fluid" src={back} alt="homeImg" />
      <h1 className="admission-header">Admission form</h1>
      <div className="admission-class">
        <form className="admission-form" onSubmit={handleSubmit}>
          <h2>Personal Information</h2>
          <label htmlFor="fullName">Patient's Full Name:</label>
          <input
            className="admission-input"
            type="text"
            id="fullName"
            value={fullName}
            placeholder="Enter full name"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            className="admission-input"
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            placeholder="DD-MM-YYYY"
            required
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <label htmlFor="gender">Gender:</label>
          <input
            className="admission-input"
            type="text"
            id="gender"
            value={gender}
            placeholder="Enter gender"
            required
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="ssn">Social Security Number:</label>
          <input
            className="admission-input"
            type="text"
            id="ssn"
            value={ssn}
            placeholder="Enter social security number"
            required
            onChange={(e) => setSSN(e.target.value)}
          />
          <label htmlFor="address">Address:</label>
          <input
            className="admission-input"
            type="text"
            id="address"
            value={address}
            placeholder="Enter address"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            className="admission-input"
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            placeholder="Enter phone number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label htmlFor="emergencyContact">Emergency Contact Name:</label>
          <input
            className="admission-input"
            type="text"
            id="emergencyContact"
            value={emergencyContact}
            placeholder="Enter emergency contact name"
            required
            onChange={(e) => setEmergencyContact(e.target.value)}
          />
          <h2>Additional Information:</h2>
          <label htmlFor="canWalkUnassisted">
            <span className="checkbox-label">
              Is the patient able to walk unassisted?
            </span>
            <input
              className="admission-input"
              type="checkbox"
              id="canWalkUnassisted"
              checked={canWalkUnassisted}
              onChange={(e) => setCanWalkUnassisted(e.target.checked)}
            />
          </label>

          <label htmlFor="requiresADLAssistance">
            <span className="checkbox-label">
              Does the patient require assistance with activities of daily
              living (ADLs)?
            </span>
            <input
              className="admission-input"
              type="checkbox"
              id="requiresADLAssistance"
              checked={requiresADLAssistance}
              onChange={(e) => setRequiresADLAssistance(e.target.checked)}
            />
          </label>

          <label htmlFor="hasMobilityAids">
            <span className="checkbox-label">
              Does the patient have any mobility aids (e.g., walker,
              wheelchair)?
            </span>
            <input
              className="admission-input"
              type="checkbox"
              id="hasMobilityAids"
              checked={hasMobilityAids}
              onChange={(e) => setHasMobilityAids(e.target.checked)}
            />
          </label>

          {hasMobilityAids && (
            <label htmlFor="mobilityAids">
              <span className="checkbox-label">Please specify:</span>
              <input
                className="admission-input"
                type="text"
                id="mobilityAids"
                value={mobilityAids}
                placeholder="Enter mobility aids"
                onChange={(e) => setMobilityAids(e.target.value)}
              />
            </label>
          )}

          <label htmlFor="isReceivingTherapies">
            <span className="checkbox-label">
              Is the patient currently receiving any therapies (e.g., physical,
              occupational, speech)?
            </span>
            <input
              className="admission-input"
              type="checkbox"
              id="isReceivingTherapies"
              checked={isReceivingTherapies}
              onChange={(e) => setIsReceivingTherapies(e.target.checked)}
            />
          </label>

          {isReceivingTherapies && (
            <label htmlFor="therapies">
              <span className="checkbox-label">Please specify:</span>
              <input
                className="admission-input"
                type="text"
                id="therapies"
                value={therapies}
                placeholder="Enter therapies"
                onChange={(e) => setTherapies(e.target.value)}
              />
            </label>
          )}

          <h2>Declaration:</h2>
          <label htmlFor="isDeclarationAccepted">
            <span className="checkbox-label">
              I hereby declare that the information provided above is true and
              accurate to the best of my knowledge. I understand that this
              information will be used for admission and care purposes at the
              nursing home.
            </span>
            <input
              className="admission-input"
              type="checkbox"
              id="isDeclarationAccepted"
              checked={isDeclarationAccepted}
              required
              onChange={(e) => setIsDeclarationAccepted(e.target.checked)}
            />
          </label>

          <label htmlFor="patientSignature">Patient's Signature:</label>
          <input
            className="admission-input"
            type="text"
            id="patientSignature"
            value={patientSignature}
            placeholder="Enter patient's signature"
            required
            onChange={(e) => setPatientSignature(e.target.value)}
          />
          <label htmlFor="date">Date:</label>
          <input
            className="admission-input"
            type="date"
            id="date"
            value={date}
            placeholder="Enter date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
          {message && <div className="validation">{message}</div>}
          {errorMessage && (
            <div className="validationError">{errorMessage}</div>
          )}
          <button className="btn-container" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NursingHomeAdmissionForm;
