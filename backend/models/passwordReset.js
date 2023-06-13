import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

// Create a new model for the password reset token
const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema
);

export default PasswordResetToken;
