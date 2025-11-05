import express from "express";
import { updateUserProfile, getUserProfile, uploadUserAvatar } from "../controllers/userController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get("/:id", getUserProfile);
router.put("/:id", updateUserProfile);
router.post("/:id/avatar", upload.single("avatar"), uploadUserAvatar);

export default router;
