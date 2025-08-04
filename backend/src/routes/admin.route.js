import Router from "express";
import {
  legacyRequireAuth,
  requireAdmin,
} from "../middleware/auth.middleware.js";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controller/admin.controller.js";
const router = Router();
router.use(legacyRequireAuth, requireAdmin);
router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/album", createAlbum);
router.delete("/album/:id", deleteAlbum);

export default router;
