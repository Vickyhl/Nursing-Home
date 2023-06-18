import User from "../models/userModel.js";

export const updateMedicalHistory = async (req, res) => {
  const medicalRecord = {
    diseaseName: "Hypertension",
    diagnosedDate: new Date("March 15, 2022"),
    medications: {
      name: "lisinopril",
      quantity: 20,
      unitMeasure: "mg",
      frequency: "daily",
    },
  };
  const user = await User.findById("64897e101206275fb1e09fcd");
  user.medicalHistory = medicalRecord;
  await user.save();
  console.log(user);
  console.log(user.medicalHistory[0].medications);
  //regular blood pressure monitoring.
  res.json({ user });
};
