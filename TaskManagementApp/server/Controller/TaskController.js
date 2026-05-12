import Project from "../model/ProjectModel.js";
import Task from "../model/TaskModel.js";

// --- PROJECT CONTROLLERS ---

export const createProject = async (req, res) => {
  try {
    const { name, description, emoji, color } = req.body;

    const newProject = new Project({ name, description, emoji, color });
    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      project: {
        id: savedProject._id.toString(), // map _id to id for frontend
        name: savedProject.name,
        description: savedProject.description,
        emoji: savedProject.emoji,
        color: savedProject.color,
      },
      message: "Project created in DB."
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
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

export const createTask = async (req, res) => {
  try {
    const { name, status = 'todo' } = req.body;
    
    const folder = name.replace(/[^a-zA-Z0-9]/g, "");

    const newTask = new Task({ name, folder, status });
    const savedTask = await newTask.save();
    
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
    const tasks = await Task.find().sort({ createdAt: 1 });
    
    const tasksWithFiles = tasks.map(task => {
      const taskObj = task.toObject();
      return { ...taskObj, files: [] };
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
