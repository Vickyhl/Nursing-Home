import React, { useState } from "react";
import axios from "axios";
import { logAuditTrail } from "./LoggingService";
import back from "./images/medications.jpeg";

function OrderingMedications() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let result;
  const [medication, setMedication] = useState({
    name: "",
    brand: "",
    quantity: 0,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMedication((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the medication object to the backend
    try {
      result = await (async () => {
        try {
          return await axios.post(
            "http://localhost:5000/api/medications/OrderMedication",
            medication
          );
        } catch (error) {
          if (error.response && error.response.status === 500) {
            setErrorMessage("Medication not found!");
            setMessage(""); // Clear the message state
          }
        }
      })();
      // console.log(result);

      if (result && !errorMessage) {
        setMessage("Medication found!");
        const userData = JSON.parse(localStorage.getItem("user"));
        const { firstName, lastName } = userData;
        const fullName = `${firstName} ${lastName}`;
        logAuditTrail(
          fullName,
          "Medication order",
          `${fullName} has ordered ${medication.quantity} units of ${medication.name}`
        );
      } else {
        setMessage(""); // Clear the message state
      }

      // Reset the form
      //   setMedication({
      //     name: "",
      //     brand: "",
      //     quantity: 0,
      //   });
    } catch (error) {
      // Handle any other unexpected errors here
      console.error("An error occurred while ordering medication:", error);
      alert("An error occurred while ordering medication.");
    }
  };

  return (
    <>
      <div className="add-medications-class">
        <img className="add-medications-img" src={back} alt="homeImg" />
        <h1 className="add-medications-header">Order medication</h1>
        <label htmlFor="name">Name:</label>
        <input
          className="AddaApointment-input"
          placeholder="Enter medication name"
          type="text"
          id="name"
          value={medication.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="brand">Brand:</label>
        <input
          className="AddaApointment-input"
          placeholder="Enter medication brand"
          type="text"
          id="brand"
          value={medication.brand}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="quantity">Quantity:</label>
        <input
          className="AddaApointment-input"
          placeholder="Enter medication quantity"
          type="number"
          id="quantity"
          value={medication.quantity}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        {message && <div className="validation">{message}</div>}
        {errorMessage && <div className="validationError">{errorMessage}</div>}
        <button className="btn-container" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

export default OrderingMedications;
