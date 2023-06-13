import mongoose from "mongoose";

const logSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
  },
  bloodAmount: {
    type: String,
  },
  response: {
    type: String,
    required: true,
  },
  TransactionDescription: {
    type: String,
    required: true,
  },
  firsNameOfDonor: {
    type: String,
  },
  lastNameOfDonor: {
    type: String,
  },
  idOfDonor: {
    type: Number,
  },
});

const Log = mongoose.model("Log", logSchema);

export default Log;
