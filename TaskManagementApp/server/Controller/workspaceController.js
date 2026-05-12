import Workspace from "../model/WorkspaceModel.js";
import Day from "../model/DayModel.js";
import TaskV2 from "../model/TaskModelV2.js";

// GET /api/workspaces
export const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ owner: req.user._id }).sort({ createdAt: -1 });

    // Attach day count and task stats for each workspace
    const result = await Promise.all(
      workspaces.map(async (ws) => {
        const dayCount = await Day.countDocuments({ workspace: ws._id });
        const totalTasks = await TaskV2.countDocuments({ workspace: ws._id, owner: req.user._id });
        const doneTasks = await TaskV2.countDocuments({
          workspace: ws._id,
          owner: req.user._id,
          status: "done",
        });
        return {
          ...ws.toObject(),
          id: ws._id,
          dayCount,
          totalTasks,
          doneTasks,
        };
      })
    );

    res.json({ success: true, workspaces: result });
  } catch (err) {
    console.error("getWorkspaces error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// GET /api/workspaces/:id
export const getWorkspace = async (req, res) => {
  try {
    const ws = await Workspace.findOne({ _id: req.params.id, owner: req.user._id });
    if (!ws) return res.status(404).json({ success: false, error: "Workspace not found" });
    res.json({ success: true, workspace: ws });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// POST /api/workspaces
export const createWorkspace = async (req, res) => {
  try {
    const { name, description, color, icon } = req.body;
    if (!name) return res.status(400).json({ success: false, error: "Name is required" });
    const ws = await Workspace.create({
      name,
      description: description || "",
      color: color || "#7e22ce",
      icon: icon || "📁",
      owner: req.user._id,
    });
    res.status(201).json({ success: true, workspace: ws });
  } catch (err) {
    console.error("createWorkspace error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// PATCH /api/workspaces/:id
export const updateWorkspace = async (req, res) => {
  try {
    const ws = await Workspace.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!ws) return res.status(404).json({ success: false, error: "Workspace not found" });
    res.json({ success: true, workspace: ws });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// DELETE /api/workspaces/:id
export const deleteWorkspace = async (req, res) => {
  try {
    const ws = await Workspace.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!ws) return res.status(404).json({ success: false, error: "Workspace not found" });

    // Cascade delete days and tasks
    const days = await Day.find({ workspace: ws._id });
    const dayIds = days.map((d) => d._id);
    await TaskV2.deleteMany({ day: { $in: dayIds } });
    await Day.deleteMany({ workspace: ws._id });

    res.json({ success: true, message: "Workspace deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
