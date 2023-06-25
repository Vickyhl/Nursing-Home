import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appointmentSchema = mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  escort: {
    type: Boolean,
    required: true,
    default: false,
    validate: {
      validator: function (value) {
        return value === true || value === false;
      },
      message: "Escort must be either true or false.",
    },
  },
  treatmentType: { type: String, required: true },
  therapistName: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

appointmentSchema.pre("save", function (next) {
  if (typeof this.escort === "string") {
    this.escort = this.escort.toLowerCase() === "yes";
  }
  next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
