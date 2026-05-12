import express from "express";
import {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../Controller/workspaceController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // all workspace routes require auth

router.get("/", getWorkspaces);
router.post("/", createWorkspace);
router.get("/:id", getWorkspace);
router.patch("/:id", updateWorkspace);
router.delete("/:id", deleteWorkspace);

export default router;
