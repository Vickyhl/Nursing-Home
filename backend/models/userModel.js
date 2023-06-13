import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: false,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: false,
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

export default User;
