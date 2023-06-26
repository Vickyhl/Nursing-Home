import mongoose from "mongoose";
import Medication from "../models/medicationModel.js";

export const AddMedication = async (req, res, next) => {
  const medicationData = req.body; // Assuming the request body contains the medication information

  try {
    const newMedication = new Medication(medicationData); // Create a new instance of the Medication model with the provided data
    const savedMedication = await newMedication.save(); // Save the new medication document to the database

    res.status(200).json(savedMedication); // Return the saved medication document in the response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save medication.", error: error.message });
  }
};
