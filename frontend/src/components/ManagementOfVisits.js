import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { logAuditTrail } from "./LoggingService";
import "../components/Login.css";
import "../components/ManagementOfVisits.css";
import visitorsPic from "./images/visitors.png";

const ManagementOfVisits = () => {
  const [visitors, setVisitors] = useState([]);
  const [displayInputs, setDisplayInputs] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    name: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/visitors/getVisitors"
        );
        console.log(response.data);
        setVisitors(response.data);
      } catch (error) {
        console.log(error); // Handle any errors that occur during the request
      }
    };
    fetchVisitors();
  }, []);

  const handleAddVisitor = async () => {
    setDisplayInputs(true);
    try {
      const result = await axios.post(
        "http://localhost:5000/api/visitors/addVisitor",
        newVisitor
      );
      const addedVisitor = result.data;
      setVisitors([...visitors, addedVisitor]);
      setNewVisitor({ name: "", date: "", time: "" });
      setDisplayInputs(false);

      const userData = JSON.parse(localStorage.getItem("user"));
      const { firstName, lastName } = userData;
      const fullName = `${firstName} ${lastName}`;
      logAuditTrail(
        fullName,
        "Adding new visit",
        `${fullName} has added a visit of ${newVisitor.name} at ${newVisitor.date} ${newVisitor.time}`
      );
      console.log(result.data); // Handle the response data as needed
    } catch (error) {
      console.log(error); // Handle any errors that occur during the request
    }
  };

  const handleRemoveVisitor = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/visitors/removeVisitor/${id}`
      );
      setVisitors((prevVisitors) =>
        prevVisitors.filter((visitor) => visitor._id !== id)
      );
    } catch (error) {
      console.log(error); // Handle any errors that occur during the request
    }
  };

  const handleVisitorChange = (field, value) => {
    setNewVisitor((prevVisitor) => ({
      ...prevVisitor,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="visits-background">
        <img className="add-medications-img" src={visitorsPic} alt="Visitors" />
        <h1 className="login-header">Management of Visits</h1>
        <button className="btn-container" onClick={handleAddVisitor}>
          Add Visitor
        </button>
        {visitors.map((visitor) => (
          <div className="management-visits-class" key={visitor._id}>
            <p>Name: {visitor.name}</p>
            <p>Date: {moment(visitor.date).format("DD-MM-YYYY")}</p>
            <p>Time: {visitor.time}</p>
            <button
              className="btn-container"
              onClick={() => handleRemoveVisitor(visitor._id)}
            >
              Remove
            </button>
          </div>
        ))}
        {displayInputs && (
          <div className="management-visits-class">
            <input
              className="login-input"
              type="text"
              placeholder="Visitor Name"
              value={newVisitor.name}
              onChange={(e) => handleVisitorChange("name", e.target.value)}
            />
            <input
              className="login-input"
              type="date"
              placeholder="Date"
              value={newVisitor.date}
              onChange={(e) => handleVisitorChange("date", e.target.value)}
            />
            <input
              className="login-input"
              type="time"
              placeholder="Time"
              value={newVisitor.time}
              onChange={(e) => handleVisitorChange("time", e.target.value)}
            />
            <button className="btn-container" onClick={handleAddVisitor}>
              Save Visitor
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ManagementOfVisits;
