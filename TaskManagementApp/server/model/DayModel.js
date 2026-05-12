import mongoose from "mongoose";

const daySchema = new mongoose.Schema(
  {
    label: { type: String, required: true },          // "Day 1", "Day 2" etc.
    folderSlug: { type: String, required: true },      // "Day1", "Day2" - matches existing page folders
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectPath: { type: String, default: "" },        // absolute FS path on disk
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Day = mongoose.model("Day", daySchema);
export default Day;
