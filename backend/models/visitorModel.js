import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
