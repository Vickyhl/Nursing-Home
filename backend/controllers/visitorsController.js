import mongoose from "mongoose";
import Visitor from "../models/visitorModel.js";

export const getVisitors = async (req, res, next) => {
  try {
    // Fetch all visitors from the database or data store
    // For example, using Mongoose:
    const visitors = await Visitor.find();

    // Respond with the retrieved visitors
    res.status(200).json(visitors);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ error: "Failed to retrieve visitors" });
  }
};

export const addVisitor = async (req, res, next) => {
  try {
    const visitor = req.body;
    // Save the visitor to the database or data store
    // For example, using Mongoose:
    const savedVisitor = await Visitor.create(visitor);

    // Respond with the saved visitor
    res.status(201).json(savedVisitor);
  } catch (error) {
    // Handle any errors that occur during the saving process
    res.status(500).json({ error: "Failed to save visitor" });
  }
};

export const removeVisitor = async (req, res, next) => {
  const visitorId = req.params.id;

  try {
    // Delete the visitor from the database or data store
    // For example, using Mongoose:
    await Visitor.findByIdAndDelete(visitorId);

    // Respond with a success message
    res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    res.status(500).json({ error: "Failed to delete visitor" });
  }
};
