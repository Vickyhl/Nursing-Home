import { Router } from "express";
import {
  addVisitor,
  getVisitors,
  removeVisitor,
} from "../controllers/visitorsController.js";

const router = Router();

router.get("/getVisitors", getVisitors);
router.post("/addVisitor", addVisitor);
router.delete("/removeVisitor/:id", removeVisitor);

export default router;
