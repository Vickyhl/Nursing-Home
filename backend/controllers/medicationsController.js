import mongoose from "mongoose";
import axios from "axios";
import zlib from "zlib";
import Medication from "../models/medicationModel.js";

export const AddMedication = async (req, res, next) => {
  const medicationData = req.body;

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

export const OrderMedication = async (req, res, next) => {
  const medicationName = req.body.name;
  const medicationBrand = req.body.brand;

  try {
    const response = await axios.get(
      `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${medicationName}+AND+openfda.brand_name:${medicationBrand}`,
      {
        headers: {
          "Accept-Encoding": "gzip", // Specify that you accept GZIP-encoded responses
        },
        responseType: "arraybuffer", // Set the response type as arraybuffer
      }
    );

    // Decompress the response data
    const decompressedData = zlib.gunzipSync(response.data).toString("utf-8");

    // Process the response data as needed
    const medicationData = JSON.parse(decompressedData);

    if (medicationData.results.length === 0) {
      return res.status(404).json({ error: "Medication not found." });
    }

    // console.log(JSON.stringify(medicationData, null, 2)); // Log the response in a readable format

    // Send the medication data back to the client
    res.json({ medicationData });
  } catch (error) {
    // Handle any errors that occurred during the API request
    // console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching medication information.",
    });
  }
};
