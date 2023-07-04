import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import HttpError from "../models/httpError.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointmentModel.js";
import Schedule from "../models/scheduleModel.js";

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

export const updateUser = async (req, res, next) => {
  const updatedUser = req.body;
  const uid = updatedUser._id;
  // console.log(uid);

  const user = await User.findById(uid);

  // Update the user's information
  user.allergies = updatedUser.allergies;
  user.medicalHistory = updatedUser.medicalHistory;

  await user.save();

  return res.json({ message: "User updated successfully", user });
};

export const getUserById = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  if (mongoose.isValidObjectId(uid)) {
    user = await User.findOne({ _id: uid });
  }
  // console.log(user);

  if (!user) {
    return res.json({ message: "The requested id is not found" });
  }
  return res.json({ user });
};

export const getUserBySsn = async (req, res, next) => {
  const ssn = req.query.ssn;

  try {
    const user = await User.findOne({ ssn }); // Find the user by their SSN
    if (user) {
      res.json({ exists: true }); // User exists
    } else {
      res.json({ exists: false }); // User does not exist
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const admissionForm = async (req, res, next) => {
  const formData = req.body;

  try {
    // Create a new user object with the form data
    const newUser = new User({
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      ssn: formData.ssn,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      emergencyContact: formData.emergencyContact,
      canWalkUnassisted: formData.canWalkUnassisted,
      requiresADLAssistance: formData.requiresADLAssistance,
      hasMobilityAids: formData.hasMobilityAids,
      mobilityAids: formData.mobilityAids,
      isReceivingTherapies: formData.isReceivingTherapies,
      therapies: formData.therapies,
      isDeclarationAccepted: formData.isDeclarationAccepted,
      patientSignature: formData.patientSignature,
      date: formData.date,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Admission form data saved successfully",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save admission form data",
      error: error.message,
    });
  }
};

export const getUsersInfo = async (req, res, next) => {
  const userId = req.params.uid;
  console.log(userId);

  try {
    // Find the user in the database based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Extract the required information from the user object
    const {
      fullName,
      initialAssessment,
      nutritionalGoals,
      dietaryPlan,
      nutritionalSupplements,
      weightMeasurements,
    } = user;

    // Create an object containing the extracted information
    const userInfo = {
      fullName,
      initialAssessment,
      nutritionalGoals,
      dietaryPlan,
      nutritionalSupplements,
      weightMeasurements,
    };

    // Send back the user information in the response
    res.status(200).json(userInfo);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.log("Error retrieving user information:", error);
    res.status(500).json({ message: "Error retrieving user information." });
  }
};

export const updateUsersInfo = async (req, res, next) => {
  const formData = req.body;
  console.log(formData);
  const userId = req.params.uid;
  // const userId = "649c458a3b9c90750cca0369";
  try {
    // Update the user's information in the database
    await User.findByIdAndUpdate(userId, formData);

    // Respond with a success message or appropriate status code
    res.status(200).json({ message: "User information updated successfully." });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.log("Error updating user information:", error);
    res.status(500).json({ message: "Error updating user information." });
  }
};

export const getAppointments = async (req, res, next) => {
  // Create a new array to store the extracted appointments with patient names
  const extractedAppointments = [];
  User.find({}, { firstName: 1, lastName: 1, appointments: 1 }).then(
    (users) => {
      const uniqueAppointments = new Map();

      users.forEach((user) => {
        if (user.appointments && user.appointments.length > 0) {
          user.appointments.forEach((appointment) => {
            const {
              date,
              time,
              location,
              escort,
              treatmentType,
              therapistName,
              _id,
              userId,
            } = appointment;

            // Ensure the appointment has the required fields
            if (
              date &&
              location &&
              typeof escort === "boolean" &&
              therapistName &&
              time
            ) {
              const key = `${user.firstName}${user.lastName}${date}${location}${escort}${therapistName}${time}`;
              // console.log("key:", key);

              // Check if the appointment is unique based on a key
              if (!uniqueAppointments.has(key)) {
                uniqueAppointments.set(key, true);

                const extractedAppointment = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  date,
                  time,
                  location,
                  escort,
                  treatmentType,
                  therapistName,
                  _id,
                  userId,
                };
                extractedAppointments.push(extractedAppointment);
              }
            }
          });
        }
      });

      // console.log("Extracted appointments:", extractedAppointments);
      res.json({ extractedAppointments });
    }
  );
};

export const AddAppointment = async (req, res, next) => {
  const { date, time, location, escortValue, treatmentType, therapistName } =
    req.body;

  console.log(escortValue);

  const uid = req.params.uid;

  try {
    // Create a new appointment in the database or perform other relevant actions
    const newAppointment = await new Appointment({
      date,
      time,
      location,
      escort: escortValue,
      treatmentType,
      therapistName,
      userId: uid, // Assuming you have a userId field to associate with the appointment
    });
    console.log(newAppointment);
    await newAppointment.save();

    // Update the user with the newly created appointment
    const user = await User.findByIdAndUpdate(
      uid,
      { $push: { appointments: newAppointment } },
      { new: true }
    );

    // Return the newly created appointment as the response
    res.status(201).json(newAppointment);
  } catch (error) {
    // Handle any errors that occurred during the creation of the appointment
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Failed to create appointment." });
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const updatedAppointments = req.body; // Assume req.body is an array of updated appointments
    console.log(updatedAppointments);
    // Use Promise.all to run all the promises concurrently
    await Promise.all(
      updatedAppointments.map(async (updatedAppointment) => {
        const appointmentId = updatedAppointment._id;
        const userId = updatedAppointment.userId;

        // Update the appointment in the appointment collection using Mongoose
        await Appointment.updateOne(
          { _id: appointmentId },
          { $set: updatedAppointment }
        );

        // Update the appointment in the user collection using Mongoose
        await User.updateOne(
          { _id: userId, "appointments._id": appointmentId },
          { $set: { "appointments.$": updatedAppointment } }
        );
      })
    );

    // Return a success response
    res.status(200).json({ message: "Appointments updated successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error updating appointments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the appointments" });
  }
};

export const removeAppointment = async (req, res, next) => {
  try {
    const aid = req.body._id;
    const uid = req.body.userId;
    // console.log(typeof aid, typeof uid);

    // Delete the appointment from the appointment collection using Mongoose
    await Appointment.deleteOne({ _id: aid });

    // Delete the appointment from the user collection using Mongoose
    await User.updateOne(
      { _id: uid },
      { $pull: { appointments: { _id: aid } } }
    );
    // Return a success response
    res.status(200).json({ message: "Appointment removed successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error removing appointment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the appointment" });
  }
};

export const getSchedule = async (req, res, next) => {
  try {
    // Assuming Schedule.find() returns the array of objects you posted
    const schedule = await Schedule.find({});

    // Create an object to hold the shifts for each day
    const formattedSchedule = {
      Morning: [],
      Noon: [],
      Night: [],
    };

    // Iterate over the schedule array
    for (let day of schedule) {
      formattedSchedule.Morning.push(day.shifts.morning);
      formattedSchedule.Noon.push(day.shifts.noon);
      formattedSchedule.Night.push(day.shifts.night);
    }

    res.status(200).json({ schedule: formattedSchedule });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: error.toString() });
  }
};

export const saveSchedule = async (req, res, next) => {
  const newSchedule = req.body.newSchedule; // Extract newSchedule from the request body

  try {
    // Remove all current documents
    await Schedule.deleteMany({});

    // Insert the new schedule
    for (const daySchedule of newSchedule) {
      const day = new Schedule(daySchedule);
      await day.save();
    }

    res.status(200).send("Schedule updated successfully.");
  } catch (error) {
    console.error("Error saving schedule:", error);
    res.status(500).send(error);
  }
};
export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.json({ message: "Signing up failed, please try again later" });
  }

  if (existingUser) {
    return res.json({ message: "Signing up failed, please try again later" });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.json({ message: "Signing up failed, please try again later" });
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.error(err);
    return res.json({ message: "Signing up failed, please try again later" });
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res.json({ message: "Signing up failed, please try again later" });
  }

  return res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("hey");
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Your email or password is incorrect", 401);
    // res.send({ message: "Your email or password is incorrect" });
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }
  console.log(isValidPassword);

  if (!isValidPassword) {
    const error = new HttpError("Your email or password is incorrect", 401);
    // res.send({ message: "Your email or password is incorrect" });
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    existingUser,
    token: token,
  });
};
