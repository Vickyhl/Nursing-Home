import React, { useState } from "react";
import axios from "axios";
import "./AddMedications.css";
import back from "./images/medications.jpeg";

function AddMedications() {
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
    console.log(medication);
    const result = await axios.post(
      `http://localhost:5000/api/medications/AddMedication`,
      medication
    );
    // Reset the form
    setMedication({
      name: "",
      brand: "",
      quantity: 0,
    });
  };

  return (
    <>
      <div className="add-medications-class">
        <img className="add-medications-img" src={back} alt="homeImg" />
        <h1 className="add-medications-header">
          Medications inventory management
        </h1>
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
        <button className="btn-container" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

export default AddMedications;
