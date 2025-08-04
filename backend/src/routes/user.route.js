import Router from "express";
import { legacyRequireAuth } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controller/user.controller.js";
const router = Router();

router.get("/", legacyRequireAuth, getAllUsers);

export default router;
