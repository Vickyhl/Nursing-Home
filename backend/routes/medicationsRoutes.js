import { Router } from "express";
import { AddMedication } from "../controllers/medicationsController.js";

const router = Router();

router.post("/AddMedication", AddMedication);

export default router;
