import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logEvent } from "./LoggingService";
import { useForm } from "react-hook-form";
import "../components/Login.css";

const Donation = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const firstName = userData?.firstName;
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    id: "",
    bloodType: "",
    donationDate: "",
    health: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const onSubmit = async () => {
    // console.log("Submitting form data:", user);
    try {
      const response = await axios.post("http://localhost:5000/donation", user);

      logEvent({
        timestamp: new Date(),
        user: firstName,
        action: "Blood donation",
        bloodType: user.bloodType,
        bloodAmount: 1,
        response: "The donation was successfully received!",
        TransactionDescription: `One unit of type ${user.bloodType} were added to the database`,
        firsNameOfDonor: user.firstName,
        lastNameOfDonor: user.lastName,
        idOfDonor: user.id,
      });

      console.log("Response:", response);
      setErrorMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error submitting form data");
    }
  };

  const closeModal = () => {
    navigate("/home");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">Enter doners first Name:</label>
        <input
          type="text"
          id="firstName"
          onChange={handleChange}
          name="firstName"
          value={user.firstName}
          required
        />
        {errors?.firstName?.message && (
          <div className="validationError">{errors?.firstName?.message}</div>
        )}
        <label htmlFor="lastName">Enter doners last Name:</label>
        <input
          type="text"
          id="lastName"
          onChange={handleChange}
          name="lastName"
          value={user.lastName}
          required
        />
        {errors?.lastName?.message && (
          <div className="validationError">{errors?.lastName?.message}</div>
        )}
        <label htmlFor="id">Enter doners ID:</label>
        <input
          type="number"
          id="id"
          {...register("id", {
            required: "This field is required",
          })}
          name="id"
          value={user.id}
          onChange={handleChange}
          required
        />
        {errors?.id?.message && (
          <div className="validationError">{errors?.id?.message}</div>
        )}
        <label htmlFor="bloodType">Enter doners blood type:</label>
        <select
          id="bloodType"
          {...register("bloodType", { required: "This field is required" })}
          value={user.bloodType}
          name="bloodType"
          onChange={handleChange}
          required
        >
          <option value="">Select blood type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        {errors?.bloodType?.message && (
          <div className="validationError">{errors?.bloodType?.message}</div>
        )}

        <label for="donationDate">Donation date:</label>
        <input
          type="date"
          id="donationDate"
          onChange={handleChange}
          name="donationDate"
          value={user.donationDate}
          required
        ></input>

        <div className="form-check">
          <input
            type="checkbox"
            name="selectCheckbox"
            id="selectCheckbox"
            className={`form-check-label ${errors?.health ? "is-invalid" : ""}`}
            onChange={handleChange}
            required
          />
          <a href="/HealthDec" className="form-check-label">
            Health declaration for doner
          </a>
          <div className="validationError">{errors?.health?.message}</div>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      {errorMessage && (
        <div className="modal hidden">
          <div className="flex">
            <button className="btn-close" onClick={closeModal}>
              ⨉
            </button>
            <div className="modal-text">{errorMessage}</div>
            <button className="btn-ok" onClick={closeModal}>
              Okay
            </button>
          </div>
        </div>
      )}
      <div className="overlay hidden"></div>
    </div>
  );
};

export default Donation;
