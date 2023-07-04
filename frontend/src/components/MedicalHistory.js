import React, { useState, useEffect } from "react";
import "../components/MedicalHistory.css";
import medicalHistoryLogo from "./images/medical-history.png";
import { logAuditTrail } from "./LoggingService";
import back from "./images/back.jpeg";
import axios from "axios";

function MedicalHistory() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // New state for editing
  const [editedAllergies, setEditedAllergies] = useState("");

  const handleInputChange = (event) => {
    setPatientId(event.target.value);
  };

  const handleViewMedicalHistory = async () => {
    const result = await axios.get(
      `http://localhost:5000/api/users/getUserById/${patientId}`
    );
    if (result.data.message === "The requested id is not found") {
      setErrorMessage("The requested id is not found");
      setPatient(null);
    } else {
      setErrorMessage(null);
      setPatient(result.data.user);
      const userData = JSON.parse(localStorage.getItem("user"));
      const { firstName, lastName } = userData;
      const fullName = `${firstName} ${lastName}`;
      logAuditTrail(
        fullName,
        "Viewing medical history",
        `${fullName} has viewed ${result.data.user.firstName} ${result.data.user.lastName} medical history`
      );
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setEditedAllergies(patient.allergies.join(", "));
  };

  const handleQuantityBlur = (event, historyIndex, medicationIndex) => {
    const { value } = event.target;
    setPatient((prevPatient) => {
      const updatedMedicalHistory = [...prevPatient.medicalHistory];
      const updatedMedications = [
        ...updatedMedicalHistory[historyIndex].medications,
      ];
      updatedMedications[medicationIndex].quantity = value;
      updatedMedicalHistory[historyIndex].medications = updatedMedications;
      return {
        ...prevPatient,
        medicalHistory: updatedMedicalHistory,
      };
    });
  };

  const handleQuantityChange = (event, historyIndex, medicationIndex) => {
    const { value } = event.target;
    setPatient((prevPatient) => {
      const updatedMedicalHistory = [...prevPatient.medicalHistory];
      const updatedMedications = [
        ...updatedMedicalHistory[historyIndex].medications,
      ];
      updatedMedications[medicationIndex].quantity = value;
      updatedMedicalHistory[historyIndex].medications = updatedMedications;
      return {
        ...prevPatient,
        medicalHistory: updatedMedicalHistory,
      };
    });
  };

  const handleUnitMeasureBlur = (event, historyIndex, medicationIndex) => {
    const { value } = event.target;
    setPatient((prevPatient) => {
      const updatedMedicalHistory = [...prevPatient.medicalHistory];
      const updatedMedications = [
        ...updatedMedicalHistory[historyIndex].medications,
      ];
      updatedMedications[medicationIndex].unitMeasure = value;
      updatedMedicalHistory[historyIndex].medications = updatedMedications;
      return {
        ...prevPatient,
        medicalHistory: updatedMedicalHistory,
      };
    });
  };

  const handleFrequencyBlur = (event, historyIndex, medicationIndex) => {
    const { value } = event.target;
    setPatient((prevPatient) => {
      const updatedMedicalHistory = [...prevPatient.medicalHistory];
      const updatedMedications = [
        ...updatedMedicalHistory[historyIndex].medications,
      ];
      updatedMedications[medicationIndex].frequency = value;
      updatedMedicalHistory[historyIndex].medications = updatedMedications;
      return {
        ...prevPatient,
        medicalHistory: updatedMedicalHistory,
      };
    });
  };

  const handleDeleteMedication = async (historyIndex, medicationIndex) => {
    try {
      setPatient((prevPatient) => {
        const updatedMedicalHistory = [...prevPatient.medicalHistory];
        const updatedMedications = [
          ...updatedMedicalHistory[historyIndex].medications,
        ];
        updatedMedications.splice(medicationIndex, 1);
        updatedMedicalHistory[historyIndex].medications = updatedMedications;
        return {
          ...prevPatient,
          medicalHistory: updatedMedicalHistory,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const updatedMedicalHistory = patient.medicalHistory.map((history) => ({
        ...history,
        medications: history.medications
          .filter((medication) => medication.name) // Remove medications without a name
          .map((medication) => ({
            ...medication,
            isEditing: false,
          })),
      }));

      const updatedPatient = {
        ...patient,
        allergies: editedAllergies.split(","),
        medicalHistory: updatedMedicalHistory,
      };

      await axios.put(
        `http://localhost:5000/api/users/updateUser/${patient.id}`,
        updatedPatient
      );

      setPatient(updatedPatient);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="medical-history">
      <img className="img-fluid" src={back} alt="homeImg" />
      <h1>Medical history</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter patient id"
          className="medical-history-input"
          value={patientId}
          onChange={handleInputChange}
        />
        {errorMessage && <div className="validationError">{errorMessage}</div>}
        <button className="btn-container" onClick={handleViewMedicalHistory}>
          View Medical History
        </button>
      </div>
      {patient && (
        <div>
          <h2>Patient's Information</h2>
          <div className="patient-info">
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
              <strong>Allergies:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedAllergies}
                  onChange={(event) => setEditedAllergies(event.target.value)}
                />
              ) : (
                patient.allergies.join(", ")
              )}
            </p>
          </div>
          <h3>
            <img
              className="medical-histpry-img"
              src={medicalHistoryLogo}
              alt="Medical History"
            />
            Medical History
          </h3>
          {patient.medicalHistory.map((history, historyIndex) => (
            <div key={historyIndex}>
              <h4>
                Disease Name:{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={history.diseaseName}
                    onChange={(event) => {
                      const updatedDiseaseName = event.target.value;
                      setPatient((prevPatient) => {
                        const updatedMedicalHistory = [
                          ...prevPatient.medicalHistory,
                        ];
                        updatedMedicalHistory[historyIndex].diseaseName =
                          updatedDiseaseName;
                        return {
                          ...prevPatient,
                          medicalHistory: updatedMedicalHistory,
                        };
                      });
                    }}
                  />
                ) : (
                  <span>{history.diseaseName}</span>
                )}
              </h4>

              {history.diseaseName && (
                <>
                  <p>
                    Diagnosed Date:{" "}
                    {new Date(history.diagnosedDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                  <h5>Medications</h5>
                  {history.medications.map((medication, medicationIndex) => (
                    <div key={medicationIndex}>
                      {!medication.name && (
                        <p>
                          <strong>Medication Name:</strong>
                        </p>
                      )}
                      {medication.isEditing ? (
                        <input
                          type="text"
                          value={medication.name}
                          onChange={(event) => {
                            const editedMedication = {
                              ...medication,
                              name: event.target.value,
                            };
                            setPatient((prevPatient) => {
                              const updatedMedicalHistory = [
                                ...prevPatient.medicalHistory,
                              ];
                              const updatedMedications = [
                                ...updatedMedicalHistory[historyIndex]
                                  .medications,
                              ];
                              updatedMedications[medicationIndex] = {
                                ...updatedMedications[medicationIndex],
                                ...editedMedication,
                                // isEditing: false,
                              };
                              updatedMedicalHistory[historyIndex].medications =
                                updatedMedications;
                              return {
                                ...prevPatient,
                                medicalHistory: updatedMedicalHistory,
                              };
                            });
                          }}
                          onBlur={() => {
                            if (medication.name.trim() === "") {
                              handleDeleteMedication(
                                historyIndex,
                                medicationIndex
                              );
                            }
                          }}
                        />
                      ) : (
                        <p>
                          <strong>Medication Name:</strong> {medication.name}
                        </p>
                      )}
                      {medication.name && (
                        <>
                          <p>
                            Quantity:{" "}
                            {medication.isEditing ? (
                              <input
                                type="text"
                                value={medication.quantity}
                                onChange={(event) => {
                                  handleQuantityChange(
                                    event,
                                    historyIndex,
                                    medicationIndex
                                  );
                                }}
                                onBlur={(event) =>
                                  handleQuantityBlur(
                                    event,
                                    historyIndex,
                                    medicationIndex
                                  )
                                }
                              />
                            ) : (
                              <span>{medication.quantity}</span>
                            )}
                          </p>
                          <p>
                            Unit Measure:{" "}
                            {medication.isEditing ? (
                              <input
                                type="text"
                                value={medication.unitMeasure}
                                onChange={(event) => {
                                  // handleSaveMedication
                                  const editedMedication = {
                                    ...medication,
                                    unitMeasure: event.target.value,
                                  };
                                  setPatient((prevPatient) => {
                                    const updatedMedicalHistory = [
                                      ...prevPatient.medicalHistory,
                                    ];
                                    const updatedMedications = [
                                      ...updatedMedicalHistory[historyIndex]
                                        .medications,
                                    ];
                                    updatedMedications[medicationIndex] = {
                                      ...updatedMedications[medicationIndex],
                                      ...editedMedication,
                                      // isEditing: false,
                                    };
                                    updatedMedicalHistory[
                                      historyIndex
                                    ].medications = updatedMedications;
                                    return {
                                      ...prevPatient,
                                      medicalHistory: updatedMedicalHistory,
                                    };
                                  });
                                }}
                                onBlur={(event) =>
                                  handleUnitMeasureBlur(
                                    event,
                                    historyIndex,
                                    medicationIndex
                                  )
                                }
                              />
                            ) : (
                              <span>{medication.unitMeasure}</span>
                            )}
                          </p>
                          <p>
                            Frequency:{" "}
                            {medication.isEditing ? (
                              <input
                                type="text"
                                value={medication.frequency}
                                onChange={(event) => {
                                  // handleSaveMedication
                                  const editedMedication = {
                                    ...medication,
                                    frequency: event.target.value,
                                  };
                                  setPatient((prevPatient) => {
                                    const updatedMedicalHistory = [
                                      ...prevPatient.medicalHistory,
                                    ];
                                    const updatedMedications = [
                                      ...updatedMedicalHistory[historyIndex]
                                        .medications,
                                    ];
                                    updatedMedications[medicationIndex] = {
                                      ...updatedMedications[medicationIndex],
                                      ...editedMedication,
                                      // isEditing: false,
                                    };
                                    updatedMedicalHistory[
                                      historyIndex
                                    ].medications = updatedMedications;
                                    return {
                                      ...prevPatient,
                                      medicalHistory: updatedMedicalHistory,
                                    };
                                  });
                                }}
                                onBlur={(event) =>
                                  handleFrequencyBlur(
                                    event,
                                    historyIndex,
                                    medicationIndex
                                  )
                                }
                              />
                            ) : (
                              <span>{medication.frequency}</span>
                            )}
                          </p>
                          {!medication.isEditing && (
                            <button
                              className="edit-button"
                              onClick={() =>
                                // handleEditMedication
                                setPatient((prevPatient) => {
                                  const updatedMedicalHistory = [
                                    ...prevPatient.medicalHistory,
                                  ];
                                  const updatedMedications = [
                                    ...updatedMedicalHistory[historyIndex]
                                      .medications,
                                  ];
                                  updatedMedications[
                                    medicationIndex
                                  ].isEditing = true;
                                  updatedMedicalHistory[
                                    historyIndex
                                  ].medications = updatedMedications;
                                  return {
                                    ...prevPatient,
                                    medicalHistory: updatedMedicalHistory,
                                  };
                                })
                              }
                            >
                              Edit Medication
                            </button>
                          )}
                          {!medication.isEditing && (
                            <button
                              className="edit-button"
                              onClick={() =>
                                // handleDeleteMedication
                                setPatient((prevPatient) => {
                                  const updatedMedicalHistory = [
                                    ...prevPatient.medicalHistory,
                                  ];
                                  const updatedMedications = [
                                    ...updatedMedicalHistory[historyIndex]
                                      .medications,
                                  ];
                                  updatedMedications.splice(medicationIndex, 1);
                                  updatedMedicalHistory[
                                    historyIndex
                                  ].medications = updatedMedications;
                                  return {
                                    ...prevPatient,
                                    medicalHistory: updatedMedicalHistory,
                                  };
                                })
                              }
                            >
                              Delete Medication
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  {!isEditing && (
                    <button
                      className="edit-button"
                      onClick={() =>
                        setPatient((prevPatient) => {
                          const updatedMedicalHistory = [
                            ...prevPatient.medicalHistory,
                          ];
                          const updatedMedications = [
                            ...updatedMedicalHistory[historyIndex].medications,
                            {
                              name: "",
                              quantity: "",
                              unitMeasure: "",
                              frequency: "",
                              isEditing: true,
                            },
                          ];
                          updatedMedicalHistory[historyIndex].medications =
                            updatedMedications;
                          return {
                            ...prevPatient,
                            medicalHistory: updatedMedicalHistory,
                          };
                        })
                      }
                    >
                      Add Medication
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
          <button className="main-edit-btn" onClick={handleEdit}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button className="main-edit-btn" onClick={handleSave}>
              Save Changes
            </button>
          )}{" "}
        </div>
      )}
    </div>
  );
}

export default MedicalHistory;
