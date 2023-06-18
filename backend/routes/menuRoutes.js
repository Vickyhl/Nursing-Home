import { Router } from "express";
import {
  getMenuById,
  getMenuesByUserId,
  personalizedMenu,
  // updateMenu,
  // deleteMenu,
} from "../controllers/menuController.js";

const router = Router();

router.get("/:mid", getMenuById);

router.get("/user/:uid", getMenuesByUserId);

router.post("/personalMenu", personalizedMenu);

export default router;
