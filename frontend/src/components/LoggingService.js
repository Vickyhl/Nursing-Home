import axios from "axios";

// Define a function to log audit trail events
export const logAuditTrail = async (user, eventName, eventDetails) => {
  // Get current timestamp
  const timestamp = new Date().toISOString();

  // Get the user or actor information (e.g., username, ID, etc.)
  // const user = getCurrentUser(); // Implement the function to retrieve user information

  // Construct the log message or object
  const logEntry = {
    timestamp,
    user,
    eventName,
    eventDetails,
  };
  // console.log(logEntry);
  const responseData = await axios.post(
    `http://localhost:5000/api/auditTrails/saveAuditTrail`,
    logEntry
  );
};

// function getCurrentUser() {
//   const userData = JSON.parse(localStorage.getItem("user"));
//   const { firstName, lastName } = userData;

//   // Combine first and last name into one variable
//   const fullName = `${firstName} ${lastName}`;
//   return fullName;
// }
// Function to log an event to the audit trail
// export const logEvent = async (eventData) => {
//   const newObject = {};

//   Object.keys(eventData).forEach((key) => {
//     if (key !== "__v") {
//       newObject[key] = eventData[key];
//     }
//   });

//   console.log(newObject);

//   const responseData = await axios.post(
//     `http://localhost:5000/api/auditTrails/saveAuditTrail`,
//     newObject
//   );
// };
