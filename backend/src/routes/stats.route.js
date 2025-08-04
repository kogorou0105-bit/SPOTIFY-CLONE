import Router from "express";
import {
  legacyRequireAuth,
  requireAdmin,
} from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";
const router = Router();

router.get("/", legacyRequireAuth, requireAdmin, getStats);

export default router;
