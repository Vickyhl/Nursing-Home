import { Router } from "express";
import CheckAuth from "../middleware/checkAuth.js";

import {
  getMenuById,
  getMenuesByUserId,
  personalizedMenu,
  // updateMenu,
  // deleteMenu,
} from "../controllers/menuController.js";

const router = Router(CheckAuth);

router.get("/:mid", getMenuById);

router.get("/user/:uid", getMenuesByUserId);

router.use(CheckAuth);

router.post("/personalMenu", personalizedMenu);

export default router;
