import "./NutritionalMonitoringPage.css";
import React, { useState } from "react";
import { logAuditTrail } from "./LoggingService";
import axios from "axios";

const NutritionalMonitoringPage = () => {
  // State variables for each section
  const [errorMessage, setErrorMessage] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [initialAssessment, setInitialAssessment] = useState("");
  const [nutritionalGoals, setNutritionalGoals] = useState("");
  const [dietaryPlan, setDietaryPlan] = useState("");
  const [nutritionalSupplements, setNutritionalSupplements] = useState("");
  const [weightMeasurements, setWeightMeasurements] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    setPatientId(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      initialAssessment,
      nutritionalGoals,
      dietaryPlan,
      nutritionalSupplements,
      weightMeasurements,
    };
    const response = await axios.post(
      `http://localhost:5000/api/users/updateUsersInfo/${patientId}`,
      formData
    );
    // Clear the form fields
    // setInitialAssessment("");
    // setNutritionalGoals("");
    // setDietaryPlan("");
    // setNutritionalSupplements("");
    // setWeightMeasurements("");

    // Exit edit mode after submitting
    setIsEditing(false);
  };

  // Fetch existing data from backend and populate form fields
  const handleViewNutritionalInfo = async () => {
    try {
      // Make the API call to fetch existing data
      const response = await axios.get(
        `http://localhost:5000/api/users/getUsersInfo/${patientId}`
      );
      console.log(response.data);
      const data = response.data;

      const userData = JSON.parse(localStorage.getItem("user"));
      const { firstName, lastName } = userData;
      const fullName = `${firstName} ${lastName}`;
      logAuditTrail(
        fullName,
        "Viewing patient nutritional info",
        `${fullName} has viewed ${data.fullName} nutritional info`
      );

      // Populate the form fields with the retrieved data
      setInitialAssessment(data.initialAssessment);
      setNutritionalGoals(data.nutritionalGoals);
      setDietaryPlan(data.dietaryPlan);
      setNutritionalSupplements(data.nutritionalSupplements);
      setWeightMeasurements(data.weightMeasurements);
      setPatient("ok");
    } catch (error) {
      console.log("Error fetching data from backend:", error);
    }
  };
  return (
    <>
      {patient === null && (
        <div className="AddAppointment-class">
          <h1>Nutritional Monitoring</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter patient id"
              className="medical-history-input"
              value={patientId}
              onChange={handleInputChange}
            />
            {errorMessage && (
              <div className="validationError">{errorMessage}</div>
            )}
            <button
              className="btn-container"
              onClick={handleViewNutritionalInfo}
            >
              View nutritional info
            </button>
          </div>
        </div>
      )}
      {isEditing ? (
        <>
          <div className="nutritional-class-edit">
            <form onSubmit={handleSubmit}>
              {/* Form fields for each section */}
              <div>
                <h2>Initial Assessment</h2>
                <textarea
                  value={initialAssessment}
                  onChange={(e) => setInitialAssessment(e.target.value)}
                  placeholder="Enter initial assessment details"
                ></textarea>
              </div>

              <div>
                <h2>Nutritional Goals</h2>
                <textarea
                  value={nutritionalGoals}
                  onChange={(e) => setNutritionalGoals(e.target.value)}
                  placeholder="Enter nutritional goals"
                ></textarea>
              </div>

              <div>
                <h2>Dietary Plan</h2>
                <textarea
                  value={dietaryPlan}
                  onChange={(e) => setDietaryPlan(e.target.value)}
                  placeholder="Enter dietary plan details"
                ></textarea>
              </div>

              <div>
                <h2>Nutritional Supplements</h2>
                <textarea
                  value={nutritionalSupplements}
                  onChange={(e) => setNutritionalSupplements(e.target.value)}
                  placeholder="Enter nutritional supplements details"
                ></textarea>
              </div>

              <div>
                <h2>Weight and Anthropometric Measurements</h2>
                <textarea
                  value={weightMeasurements}
                  onChange={(e) => setWeightMeasurements(e.target.value)}
                  placeholder="Enter weight and anthropometric measurements details"
                ></textarea>
              </div>

              <button className="btn-container" type="submit">
                Save
              </button>
              <button
                className="btn-container"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      ) : (
        patient && (
          <div className="nutritional-class">
            <div>
              <h2>Initial Assessment</h2>
              <p>{initialAssessment}</p>
            </div>

            <div>
              <h2>Nutritional Goals</h2>
              <p>{nutritionalGoals}</p>
            </div>

            <div>
              <h2>Dietary Plan</h2>
              <p>{dietaryPlan}</p>
            </div>

            <div>
              <h2>Nutritional Supplements</h2>
              <p>{nutritionalSupplements}</p>
            </div>

            <div>
              <h2>Weight and Anthropometric Measurements</h2>
              <p>{weightMeasurements}</p>
            </div>

            <button
              className="btn-container"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )
      )}
    </>
  );
};

export default NutritionalMonitoringPage;
