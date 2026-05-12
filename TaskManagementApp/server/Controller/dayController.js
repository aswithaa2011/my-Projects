import Day from "../model/DayModel.js";
import TaskV2 from "../model/TaskModelV2.js";

// GET /api/days/:workspaceId
export const getDays = async (req, res) => {
  try {
    const days = await Day.find({
      workspace: req.params.workspaceId,
      owner: req.user._id,
    }).sort({ order: 1, createdAt: 1 });

    // Attach task stats per day
    const result = await Promise.all(
      days.map(async (day) => {
        const total = await TaskV2.countDocuments({ day: day._id });
        const done = await TaskV2.countDocuments({ day: day._id, status: "done" });
        const inProgress = await TaskV2.countDocuments({ day: day._id, status: "in-progress" });

        return {
          ...day.toObject(),
          id: day._id,
          total,
          done,
          inProgress,
          todo: total - done - inProgress,
          progress: total > 0 ? Math.round((done / total) * 100) : 0,
          files: [],
        };
      })
    );

    res.json({ success: true, days: result });
  } catch (err) {
    console.error("getDays error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// POST /api/days
export const createDay = async (req, res) => {
  try {
    const { label, workspaceId } = req.body;
    if (!label || !workspaceId) {
      return res.status(400).json({ success: false, error: "label and workspaceId are required" });
    }

    const folderSlug = label.replace(/\s+/g, "");

    const order = await Day.countDocuments({ workspace: workspaceId });

    const day = await Day.create({
      label,
      folderSlug,
      workspace: workspaceId,
      owner: req.user._id,
      order,
    });

    res.status(201).json({ success: true, day: { ...day.toObject(), id: day._id, total: 0, done: 0, inProgress: 0, todo: 0, progress: 0, files: [] } });
  } catch (err) {
    console.error("createDay error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// DELETE /api/days/:id
export const deleteDay = async (req, res) => {
  try {
    const day = await Day.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!day) return res.status(404).json({ success: false, error: "Day not found" });

    // Also delete tasks belonging to this day
    await TaskV2.deleteMany({ day: day._id });

    res.json({ success: true, message: "Day deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
