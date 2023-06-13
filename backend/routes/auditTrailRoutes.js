import express from "express";
const router = express.Router();
import {
  auditExport,
  saveAuditTrail,
  studentAuditExport,
} from "../controllers/auditTrailController.js";

router.get("/auditExport", auditExport);
router.post("/saveAuditTrail", saveAuditTrail);
router.get("/studentAuditExport", studentAuditExport);

export default router;
