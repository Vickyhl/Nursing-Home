import mongoose from "mongoose";

const bloodSchema = mongoose.Schema(
  {
    type: {
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Blood = mongoose.model("Blood", bloodSchema);

export default Blood;
