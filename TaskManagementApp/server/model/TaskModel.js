import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    folder: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    projectPath: {
      type: String,
    },
    // Keep backwards compatibility for any other features if needed
    priority: {
      type: String,
      enum: ["p1", "p2", "p3", "p4"],
      default: "p3",
    },
    due: {
      type: String,
      default: null,
    },
    labels: {
      type: [String],
      default: [],
    },
    assignee: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
