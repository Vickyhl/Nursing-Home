import React, { useState, useEffect } from "react";
import "./WorkSchedule.css";
import axios from "axios";
import back from "./images/back.jpeg";

function WorkSchedule() {
  const [isEditing, setIsEditing] = useState(false);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const shifts = ["Morning", "Noon", "Night"];
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getSchedule"
        );

        // console.log(response.data.schedule);

        setSchedule(response.data.schedule);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const formattedSchedule = daysOfWeek.map((day, i) => {
        return {
          dayOfWeek: day,
          shifts: {
            morning: schedule.Morning[i],
            noon: schedule.Noon[i],
            night: schedule.Night[i],
          },
        };
      });

      console.log(formattedSchedule);

      await axios.post("http://localhost:5000/api/users/saveSchedule", {
        newSchedule: formattedSchedule,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  const handleChange = (e, day, shift) => {
    const updatedSchedule = { ...schedule };
    const dayIndex = daysOfWeek.indexOf(day);
    updatedSchedule[shift][dayIndex] = e.target.value;
    setSchedule(updatedSchedule);
  };

  const renderTableCell = (day, shift) => {
    if (isEditing) {
      const dayIndex = daysOfWeek.indexOf(day);
      const cellValue = schedule[shift][dayIndex];

      return (
        <input
          type="text"
          value={cellValue}
          onChange={(e) => handleChange(e, day, shift)}
        />
      );
    } else {
      const dayIndex = daysOfWeek.indexOf(day);
      return <span>{schedule[shift][dayIndex]}</span>;
    }
  };

  return (
    <>
      <img className="img-fluid" src={back} alt="homeImg" />
      {Object.keys(schedule).length > 0 && (
        <>
          <h1 className="work-schedule-header">Work schedule</h1>
          <table className="shift-table">
            <thead>
              <tr>
                <th></th>
                {daysOfWeek.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift}>
                  <td>{shift}</td>
                  {daysOfWeek.map((day) => (
                    <td key={day + shift}>{renderTableCell(day, shift)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="work-schedule-button" onClick={handleEdit}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button className="work-schedule-button" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </>
      )}
    </>
  );
}

export default WorkSchedule;
