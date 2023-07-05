import Log from "../models/logModel.js";
import Medication from "../models/medicationModel.js";

// Function to save an audit trail entry
export const saveAuditTrail = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    // Create a new audit trail instance with the data to save
    const auditTrail = new Log(data);
    // Save the audit trail entry to MongoDB
    const savedAuditTrail = await auditTrail.save();
    // console.log("Audit trail saved:", savedAuditTrail);
  } catch (error) {
    console.error("Failed to save audit trail:", error);
  }
};

export const auditExport = async (req, res) => {
  Log.find({})
    .select("-_id -__v") // Exclude _id and __v properties from the results
    .then(function (docs) {
      // console.log(docs);
      res.send(docs);
    });
};

export const medicationsExport = async (req, res) => {
  Medication.find({})
    .select("-_id -__v")
    .then(function (docs) {
      // console.log(docs);
      res.send(docs);
    });
};
