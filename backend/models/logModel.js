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
  eventName: {
    type: String,
    required: true,
  },
  eventDetails: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model("Log", logSchema);

export default Log;
