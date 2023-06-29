import React, { useState, useEffect } from "react";
import "./AppointmentsPage.css";
import axios from "axios";
import back from "./images/back.jpeg";

function AppointmentsPage() {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState([]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (event, appointmentId) => {
    const { name, value } = event.target;

    // Update the specific property in the appointment object
    const updatedAppointmentData = updatedData.map((appointment) =>
      appointment._id === appointmentId
        ? { ...appointment, [name]: value }
        : appointment
    );

    // console.log(updatedAppointmentData);

    // Update the state with the updated data array
    setUpdatedData(updatedAppointmentData);
  };

  const handleSelectChange = (event, appointmentId) => {
    const { value } = event.target;

    // Update the specific property in the appointment object
    const updatedAppointmentData = updatedData.map((appointment) =>
      appointment.appointmentId === appointmentId
        ? { ...appointment, escort: value === "Yes" }
        : appointment
    );

    // Update the state with the updated data array
    setUpdatedData(updatedAppointmentData);
  };

  const saveChanges = async (dataToSave) => {
    try {
      // Send a POST request to update the appointments in the backend
      await axios.post(
        "http://localhost:5000/api/users/updateAppointment",
        dataToSave
      );
      console.log("Appointments updated successfully");

      // Update the state with the saved changes
      setData(dataToSave);
      setUpdatedData(dataToSave);

      // Exit the edit mode
      setEditMode(false);
    } catch (error) {
      console.error("Error updating appointments:", error);
    }
  };

  const removeAppointment = async (appointment) => {
    console.log(appointment);
    // Filter out the appointment with the specified appointmentId
    const newUpdatedData = data.filter(
      (oldAppointment) => oldAppointment._id !== appointment._id
    );

    console.log(newUpdatedData);
    // Update the state with the updated data array
    setData(newUpdatedData);
    setUpdatedData(newUpdatedData); // Update the updatedData state

    // Call delete endpoint to remove the appointment from backend
    try {
      await axios.post(
        "http://localhost:5000/api/users/removeAppointment",
        appointment
      );
      console.log("Appointment deleted successfully");
    } catch (error) {
      console.error("Error deleting appointments:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:5000/api/users/getAppointments"
      );
      console.log(result.data.extractedAppointments);
      const deepClonedAppointments = JSON.parse(
        JSON.stringify(result.data.extractedAppointments)
      );

      setData(deepClonedAppointments);
      setUpdatedData(deepClonedAppointments); // Initialize updatedData with the deep cloned data
    };
    fetchData();
  }, []);

  return (
    <>
      <img className="img-fluid" src={back} alt="homeImg" />

      <div className="appointment-class">
        {data.length > 0 ? (
          <>
            <table className="fixed-table">
              <thead>
                <tr>
                  <th></th>
                  {data.map((appointment) => (
                    <th key={appointment.appointmentId}>
                      {new Date(appointment.date).toLocaleDateString()}
                      <button
                        className="remove-button"
                        onClick={() => removeAppointment(appointment)}
                      >
                        Remove
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  {updatedData.map((appointment) => {
                    const { _id, firstName, lastName } = appointment;
                    return (
                      <td key={_id}>
                        {appointment.firstName} {appointment.lastName}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td>Appointment time</td>
                  {updatedData.map((appointment) => {
                    const { _id, time } = appointment;
                    return (
                      <td key={_id}>
                        {editMode ? (
                          <input
                            className="appointment-input"
                            type="text"
                            name="time"
                            value={appointment.time}
                            onChange={(event) => handleInputChange(event, _id)}
                          />
                        ) : (
                          time
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td>Location</td>
                  {updatedData.map((appointment) => {
                    const { _id, location } = appointment;
                    return (
                      <td key={_id}>
                        {editMode ? (
                          <input
                            className="appointment-input"
                            type="text"
                            name="location"
                            value={appointment.location}
                            onChange={(event) => handleInputChange(event, _id)}
                          />
                        ) : (
                          location
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td>Escort</td>
                  {updatedData.map((appointment) => {
                    const { _id, escort } = appointment;
                    return (
                      <td key={_id}>
                        {editMode ? (
                          <select
                            value={appointment.escort ? "Yes" : "No"}
                            onChange={(event) => handleSelectChange(event, _id)}
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        ) : escort ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td>Treatment Type</td>
                  {updatedData.map((appointment) => {
                    const { _id, treatmentType } = appointment;
                    return (
                      <td key={_id}>
                        {editMode ? (
                          <input
                            className="appointment-input"
                            name="treatmentType"
                            type="text"
                            value={appointment.treatmentType}
                            onChange={(event) => handleInputChange(event, _id)}
                          />
                        ) : (
                          treatmentType
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td>Therapist Name</td>
                  {updatedData.map((appointment) => {
                    const { _id, therapistName } = appointment;
                    return (
                      <td key={_id}>
                        {editMode ? (
                          <input
                            className="appointment-input"
                            name="therapistName"
                            type="text"
                            value={appointment.therapistName}
                            onChange={(event) => handleInputChange(event, _id)}
                          />
                        ) : (
                          therapistName
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            {editMode ? (
              <button
                className="appointment-button"
                onClick={() => saveChanges(updatedData)}
              >
                Save
              </button>
            ) : (
              <button className="appointment-button" onClick={toggleEditMode}>
                Edit
              </button>
            )}
          </>
        ) : (
          <p>No appointments available.</p>
        )}
      </div>
    </>
  );
}

export default AppointmentsPage;
