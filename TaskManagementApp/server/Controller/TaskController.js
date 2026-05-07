import fs from "fs";
import path from "path";
import { exec } from "child_process";
import Project from "../model/ProjectModel.js";
import Task from "../model/TaskModel.js";

// Paths for dynamic folder creation
const CLIENT_COMPONENTS_DIR = path.resolve(
  process.cwd(),
  "../client/src/Components/Tasks"
);

// --- PROJECT CONTROLLERS ---

export const createProject = async (req, res) => {
  try {
    const { name, description, emoji, color } = req.body;

    // 1. Save Project to DB
    const newProject = new Project({ name, description, emoji, color });
    const savedProject = await newProject.save();

    // 2. Dynamic Folder Creation (Option B Implementation)
    // Remove spaces and special characters for a safe folder/file name
    const safeName = name.replace(/[^a-zA-Z0-9]/g, "");
    
    // Ensure base directory exists
    if (!fs.existsSync(CLIENT_COMPONENTS_DIR)) {
      fs.mkdirSync(CLIENT_COMPONENTS_DIR, { recursive: true });
    }

    const projectFolderPath = path.join(CLIENT_COMPONENTS_DIR, safeName);
    const componentFilePath = path.join(projectFolderPath, `${safeName}Board.jsx`);

    let folderCreated = false;

    // Create the folder if it doesn't exist
    if (!fs.existsSync(projectFolderPath)) {
      fs.mkdirSync(projectFolderPath);
      
      // Create a basic boilerplate React component for the project
      const componentBoilerplate = `import React from 'react';

const ${safeName}Board = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>${emoji} ${name} Board</h1>
      <p>{description}</p>
      <p>This component was dynamically generated!</p>
    </div>
  );
};

export default ${safeName}Board;
`;
      fs.writeFileSync(componentFilePath, componentBoilerplate, "utf-8");
      folderCreated = true;

      // 3. Open in VS Code
      // We run the 'code' command on the generated folder path.
      exec(`code "${projectFolderPath}"`, (error) => {
        if (error) {
          console.error(`Failed to open VS Code: ${error.message}`);
        } else {
          console.log(`Successfully opened VS Code for ${projectFolderPath}`);
        }
      });
    }

    res.status(201).json({
      success: true,
      project: {
        id: savedProject._id.toString(), // map _id to id for frontend
        name: savedProject.name,
        description: savedProject.description,
        emoji: savedProject.emoji,
        color: savedProject.color,
      },
      folderCreated,
      message: folderCreated 
        ? "Project created and folder generated. Opening in VS Code..." 
        : "Project created in DB (Folder already existed)."
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    // Map _id to id for the frontend
    const mappedProjects = projects.map(p => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      emoji: p.emoji,
      color: p.color
    }));
    res.status(200).json({ success: true, projects: mappedProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// --- TASK CONTROLLERS ---

const PAGES_DIR = path.resolve(process.cwd(), "../client/src/pages");

export const createTask = async (req, res) => {
  try {
    const { name, status = 'todo' } = req.body;
    
    // Convert "Day 18" -> "Day18" to match your existing pattern
    const folder = name.replace(/[^a-zA-Z0-9]/g, "");
    const projectPath = path.join(PAGES_DIR, folder);

    // Create folder on disk
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
      
      const componentBoilerplate = `import React from 'react';

export default function ${folder}() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">${name} Workspace</h1>
      <p className="text-slate-500">Start building your task here!</p>
    </div>
  );
}
`;
      fs.writeFileSync(path.join(projectPath, 'index.jsx'), componentBoilerplate, "utf-8");
    }

    // Save to DB
    const newTask = new Task({ name, folder, status, projectPath });
    const savedTask = await newTask.save();

    // Open in VS Code
    exec(`code "${projectPath}"`, (error) => {
      if (error) {
         console.error(`Failed to open VS Code: ${error.message}`);
      } else {
         console.log(`Successfully opened VS Code for ${projectPath}`);
      }
    });
    
    res.status(201).json({
      success: true,
      task: savedTask
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    // Sort by oldest first so Day 1 comes before Day 2
    const tasks = await Task.find().sort({ createdAt: 1 });
    
    // For each task, scan its folder for sub-tasks (files)
    const tasksWithFiles = tasks.map(task => {
      let files = [];
      if (task.projectPath && fs.existsSync(task.projectPath)) {
        files = fs.readdirSync(task.projectPath)
          .filter(f => f.endsWith('.jsx') && f.toLowerCase() !== 'index.jsx')
          .map(f => ({
            name: f.replace('.jsx', ''),
            fileName: f,
            // Construct a path that matches AppRoutes.jsx structure
            // e.g. labs/day1/task1
            routePath: `/labs/${task.folder.toLowerCase()}/${f.replace('.jsx', '').toLowerCase()}`
          }));
      }
      
      const taskObj = task.toObject();
      return { ...taskObj, files };
    });

    res.status(200).json({ success: true, tasks: tasksWithFiles });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      task: updatedTask
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const openFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if (!task || !task.projectPath) {
      return res.status(404).json({ success: false, message: "Task or project path not found" });
    }

    exec(`code "${task.projectPath}"`, (error) => {
      if (error) {
         console.error(`Failed to open VS Code: ${error.message}`);
         return res.status(500).json({ success: false, message: "Failed to open VS Code" });
      }
      res.status(200).json({ success: true, message: "VS Code opened" });
    });
  } catch (error) {
    console.error("Error opening folder:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
