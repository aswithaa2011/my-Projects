import TaskV2 from "../model/TaskModelV2.js";

// GET /api/tasks/day/:dayId  — tasks in a specific day
export const getTasksByDay = async (req, res) => {
  try {
    const filter = { day: req.params.dayId, owner: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }
    const tasks = await TaskV2.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// GET /api/tasks/workspace/:workspaceId  — all tasks across a workspace
export const getTasksByWorkspace = async (req, res) => {
  try {
    const filter = { workspace: req.params.workspaceId, owner: req.user._id };
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }
    const tasks = await TaskV2.find(filter)
      .populate("day", "label folderSlug")
      .sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// GET /api/tasks/stats/:workspaceId  — stats for dashboard
export const getStats = async (req, res) => {
  try {
    const match = { workspace: req.params.workspaceId, owner: req.user._id };
    const [total, done, inProgress, overdue] = await Promise.all([
      TaskV2.countDocuments(match),
      TaskV2.countDocuments({ ...match, status: "done" }),
      TaskV2.countDocuments({ ...match, status: "in-progress" }),
      TaskV2.countDocuments({
        ...match,
        status: { $ne: "done" },
        dueDate: { $lt: new Date() },
      }),
    ]);
    res.json({
      success: true,
      stats: { total, done, inProgress, todo: total - done - inProgress, overdue },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// POST /api/tasks  — create task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, tags, dueDate, dayId, workspaceId } = req.body;
    if (!title || !dayId || !workspaceId) {
      return res.status(400).json({ success: false, error: "title, dayId, workspaceId required" });
    }
    const order = await TaskV2.countDocuments({ day: dayId });
    const task = await TaskV2.create({
      title,
      description: description || "",
      status: status || "todo",
      priority: priority || "medium",
      tags: tags || [],
      dueDate: dueDate || null,
      day: dayId,
      workspace: workspaceId,
      owner: req.user._id,
      order,
    });
    res.status(201).json({ success: true, task });
  } catch (err) {
    console.error("createTask error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// PATCH /api/tasks/:id  — update task
export const updateTask = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.body.status === "done") update.completedAt = new Date();
    if (req.body.status && req.body.status !== "done") update.completedAt = null;

    const task = await TaskV2.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      update,
      { new: true }
    );
    if (!task) return res.status(404).json({ success: false, error: "Task not found" });
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await TaskV2.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) return res.status(404).json({ success: false, error: "Task not found" });
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// POST /api/tasks/bulk  — bulk actions
export const bulkUpdate = async (req, res) => {
  try {
    const { action, ids } = req.body;
    if (action === "clear-completed") {
      await TaskV2.deleteMany({ _id: { $in: ids }, owner: req.user._id, status: "done" });
    }
    if (action === "mark-done") {
      await TaskV2.updateMany(
        { _id: { $in: ids }, owner: req.user._id },
        { status: "done", completedAt: new Date() }
      );
    }
    res.json({ success: true, message: "Bulk action done" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
