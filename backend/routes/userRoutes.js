import { Router } from "express";
import { check } from "express-validator";
import {
  getUsers,
  signup,
  login,
  getUserById,
  updateUser,
  getAppointments,
  AddAppointment,
  removeAppointment,
  updateAppointment,
  saveSchedule,
  getSchedule,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);

router.post(
  "/signup",
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

router.post("/login", login);
router.get("/getUserById/:uid", getUserById);
router.put("/updateUser/:uid", updateUser);
router.get("/getAppointments", getAppointments);
router.post("/AddAppointment/:uid", AddAppointment);
router.post("/removeAppointment", removeAppointment);
router.post("/updateAppointment", updateAppointment);
router.get("/getSchedule", getSchedule);
router.post("/saveSchedule", saveSchedule);

export default router;
