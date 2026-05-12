import express from "express";
import {
  getTasksByDay,
  getTasksByWorkspace,
  getStats,
  createTask,
  updateTask,
  deleteTask,
  bulkUpdate,
} from "../Controller/taskControllerV2.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// IMPORTANT: specific routes BEFORE parameterized routes
router.get("/day/:dayId", getTasksByDay);
router.get("/workspace/:workspaceId", getTasksByWorkspace);
router.get("/stats/:workspaceId", getStats);
router.post("/bulk", bulkUpdate);

router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
