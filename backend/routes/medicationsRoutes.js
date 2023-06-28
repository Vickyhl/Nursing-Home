import { Router } from "express";
import {
  AddMedication,
  OrderMedication,
} from "../controllers/medicationsController.js";

const router = Router();

router.post("/AddMedication", AddMedication);
router.post("/OrderMedication", OrderMedication);

export default router;
