import express from "express";
import { 
  createProject, 
  getProjects, 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask
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

export default router;
