import { Router } from "express";
import { check } from "express-validator";
import {
  getUsers,
  signup,
  login,
  forgotPassword,
  resetPassword,
  getUserById,
  updateUser,
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
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);

export default router;
