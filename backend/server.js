import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import HttpError from "./models/httpError.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import medicalHistoryRoutes from "./routes/medicalHistoryRoutes.js";
import auditTrailRoutes from "./routes/auditTrailRoutes.js";
import medicationsRoutes from "./routes/medicationsRoutes.js";
import visitorsRoutes from "./routes/visitorsRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users", userRoutes);
app.use("/api/auditTrails", auditTrailRoutes);
app.use("/api/medicalHistory", medicalHistoryRoutes);
app.use("/api/medications", medicationsRoutes);
app.use("/api/visitors", visitorsRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

/*============================
        listen
=============================*/
app.listen(5000, () => {
  console.log("Server is runing at port 5000");
});

// /*=================================
//         Database
// ===================================*/
mongoose
  .connect("mongodb+srv://Vicky:123456EAF@eaf.rhcan5b.mongodb.net/NH", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
