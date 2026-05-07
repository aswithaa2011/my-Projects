import express from "express";
import { 
  createProject, 
  getProjects, 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask,
  openFolder
} from "../Controller/TaskController.js";

const router = express.Router();

// Project Routes
router.post("/projects", createProject);
router.get("/projects", getProjects);

// Task Routes
router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.post("/tasks/:id/open", openFolder);

export default router;
