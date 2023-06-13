import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const adminSchema = mongoose.Schema(
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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: {
      type: String,
      required: false,
    },
    passwordResetExpires: {
      type: Date,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: Boolean,
      default: false,
      required: true,
    },
    student: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.plugin(uniqueValidator);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
