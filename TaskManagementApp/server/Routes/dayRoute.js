import express from "express";
import {
  getDays,
  createDay,
  deleteDay,
} from "../Controller/dayController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/:workspaceId", getDays);
router.post("/", createDay);
router.delete("/:id", deleteDay);

export default router;
