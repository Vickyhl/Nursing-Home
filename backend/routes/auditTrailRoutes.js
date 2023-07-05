import express from "express";
const router = express.Router();
import {
  auditExport,
  medicationsExport,
  saveAuditTrail,
} from "../controllers/auditTrailController.js";

router.get("/auditExport", auditExport);
router.post("/saveAuditTrail", saveAuditTrail);
router.get("/medicationsExport", medicationsExport);

export default router;
