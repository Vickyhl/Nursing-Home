import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from "mongoose-unique-validator";
import Appointment from "./appointmentModel.js";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: false,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    isNursemaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    isNurse: {
      type: Boolean,
      required: false,
      default: false,
    },
    isPatient: {
      type: Boolean,
      required: false,
      default: false,
    },
    gender: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
      default: 0,
    },
    weight: {
      type: Number,
      required: false,
      default: 0,
    },
    height: {
      type: Number,
      required: false,
      default: 0,
    },
    admissionDate: {
      type: Date,
      required: false,
    },
    mobility: {
      type: String,
      required: false,
    },
    allergies: [{}],
    medicalHistory: [
      {
        diseaseName: { type: String, required: true },
        diagnosedDate: { type: Date, required: true },
        medications: [
          {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            unitMeasure: { type: String, required: true },
            frequency: { type: String, required: true },
          },
        ],
      },
    ],
    appointments: [Appointment.schema],
    nutrition: {
      type: String,
      required: false,
    },
    psychosocialAssesment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

export default User;
