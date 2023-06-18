import { Router } from "express";
import { updateMedicalHistory } from "../controllers/medicalHistoryController.js";

const router = Router();

router.post("/updateMedicalHistory", updateMedicalHistory);

export default router;
