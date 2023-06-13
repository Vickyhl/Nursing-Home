import Log from "../models/logModel.js";

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
  Log.find({}).then(function (docs) {
    console.log(docs);
    res.send(docs);
  });
};

export const studentAuditExport = async (req, res) => {
  let data;
  await Log.find({}).then(function (docs) {
    data = docs;
  });

  let docs = data.filter((item) => {
    let lowerCasedAction = item.action.toLowerCase();
    return (
      lowerCasedAction.includes("blood request") ||
      lowerCasedAction.includes("blood donation")
    );
  });

  let updatedData = docs.map((item) => {
    let { createdAt, updatedAt, __v, _id, ...keepAttrs } = item._doc;
    return keepAttrs;
  });

  console.log(updatedData);

  res.send(updatedData);
};
