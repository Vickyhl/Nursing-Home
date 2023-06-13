import React, { useState } from "react";
import axios from "axios";
import "./export.css";
import { exportDataToCSV } from "./exportDataToCSV";
import { logEvent } from "./LoggingService";

function Export() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const firstName = userData?.firstName;
  const isAdmin = userData?.isAdmin;
  const isStudent = userData?.student;
  const [auditData, setAuditData] = useState([]);
  const [data, setData] = useState([]);

  const handleAudit = async () => {
    let response;
    if (isAdmin) {
      response = await axios.get(
        "http://localhost:5000/api/auditTrails/auditExport"
      );
    } else if (isStudent) {
      response = await axios.get(
        "http://localhost:5000/api/auditTrails/studentAuditExport"
      );
    }

    setAuditData(response.data);
    if (response.data) {
      logEvent({
        timestamp: new Date(),
        user: firstName,
        action: "Export of audit trails",
        bloodType: null,
        bloodAmount: null,
        response: "Export successfully!",
        TransactionDescription: "Successful exported audit trails",
        firsNameOfDonor: null,
        lastNameOfDonor: null,
        idOfDonor: null,
      });
      exportDataToCSV(response.data);
    }
  };

  const handleData = async () => {
    const response = await axios.get(`http://localhost:5000/data`);
    setData(response.data);
    if (response.data) {
      logEvent({
        timestamp: new Date(),
        user: firstName,
        action: "Export of meta data",
        response: "Export successfully!",
        TransactionDescription: "Successful exported meta data",
      });
      exportDataToCSV(response.data);
    }
  };

  return (
    <div>
      <h1 className="export"> Choose a data to export:</h1>
      {(isAdmin || isStudent) && (
        <div className="btn-container-export" onClick={handleAudit}>
          <button className="btn">Audit trail data</button>
        </div>
      )}
      <div className="btn-container-export" onClick={handleData}>
        <button className="btn">Blood inventory data</button>
      </div>
    </div>
  );
}

export default Export;
