import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { logEvent } from "./LoggingService";
import "../components/modalCSS.css";

const MCI = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const firstName = userData?.firstName;
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [request, setRequest] = useState({
    bloodAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const onSubmit = async () => {
    const { bloodAmount } = request;
    console.log(request.bloodAmount);
    await axios.post("http://localhost:5000/MCI", request).then((res) => {
      if (res.data.message === "There is a shortage of O- blood") {
        logEvent({
          timestamp: new Date(),
          user: firstName,
          action: "Blood request in MCI",
          bloodType: "O-",
          bloodAmount: request.bloodAmount,
          response: "Insufficient amount of blood",
          TransactionDescription: "There is no change in the blood database",
          firsNameOfDonor: null,
          lastNameOfDonor: null,
          idOfDonor: null,
        });
      } else if (
        res.data.message ===
        `${bloodAmount} packets of type O- were produced at your request`
      ) {
        logEvent({
          timestamp: new Date(),
          user: firstName,
          action: "Blood request in MCI",
          bloodType: "O-",
          bloodAmount: request.bloodAmount,
          response: "Sufficient amount of blood",
          TransactionDescription: `${request.bloodAmount} units of type O- were removed from the database`,
          firsNameOfDonor: null,
          lastNameOfDonor: null,
          idOfDonor: null,
        });
      } else {
        logEvent({
          timestamp: new Date(),
          user: firstName,
          action: "Blood request in MCI",
          bloodType: "O-",
          bloodAmount: request.bloodAmount,
          response: "A smaller amount of blood than requested",
          TransactionDescription: `${request.bloodAmount} units of type O- were removed from the database`,
          firsNameOfDonor: null,
          lastNameOfDonor: null,
          idOfDonor: null,
        });
      }
      console.log(res.data.message);
      setErrorMessage(res.data.message);
    });
  };

  const closeModal = () => {
    setErrorMessage(false);
    //navigate home
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>How much blood is required?</h1>
        <label htmlFor="bloodAmount">Blood amount (in packets): </label>
        <input
          type="number"
          id="bloodAmount"
          {...register("bloodAmount", {
            required: "This field is required",
            min: { value: 1, message: "The minimum required is 1" },
          })}
          onChange={handleChange}
          name="bloodAmount"
          value={request.bloodAmount}
        />
        {errors?.bloodAmount?.message && (
          <div className="validationError">{errors?.bloodAmount?.message}</div>
        )}
        <div className="btn-container">
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      {errorMessage && (
        <div className="modal">
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

export default MCI;
