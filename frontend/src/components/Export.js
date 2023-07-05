import React, { useState } from "react";
import { exportDataToCSV } from "./exportDataToCSV";
import back from "./images/back.jpeg";
import axios from "axios";

function Export() {
  const [auditData, setAuditData] = useState([]);

  const handleAudit = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auditTrails/auditExport"
    );
    setAuditData(response.data);
    if (response.data) {
      exportDataToCSV(response.data);
    }
  };

  const handleMedications = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auditTrails/medicationsExport"
    );
    // console.log(response.data);
    exportDataToCSV(response.data);
  };

  return (
    <div className="add-medications-class">
      <img className="add-medications-img" src={back} alt="homeImg" />

      <h1 className="export"> Choose a data to export:</h1>
      <button className="btn-container" onClick={handleAudit}>
        Audit trail data
      </button>
      <button className="btn-container" onClick={handleMedications}>
        Medications data
      </button>
    </div>
  );
}

export default Export;
