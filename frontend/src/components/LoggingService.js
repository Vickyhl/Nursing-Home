import axios from "axios";

// Function to log an event to the audit trail
export const logEvent = async (eventData) => {
  const newObject = {};

  Object.keys(eventData).forEach((key) => {
    if (key !== "__v") {
      newObject[key] = eventData[key];
    }
  });

  console.log(newObject);

  const responseData = await axios.post(
    `http://localhost:5000/api/auditTrails/saveAuditTrail`,
    newObject
  );
};
