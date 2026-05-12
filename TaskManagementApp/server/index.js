import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

// ── Routes ──────────────────────────────────────────────────
import loginRoute from "./Routes/loginRoute.js";
import taskRoute from "./Routes/TaskRoute.js";        // legacy routes (kept for existing tasks/projects)
import authRoute from "./Routes/authRoute.js";         // new auth routes
import workspaceRoute from "./Routes/workspaceRoute.js";
import dayRoute from "./Routes/dayRoute.js";
import taskRouteV2 from "./Routes/taskRouteV2.js";

// ── Error handler ────────────────────────────────────────────
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDb();

const app = express();

// ── Middleware ───────────────────────────────────────────────
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

// ── API Routes ───────────────────────────────────────────────
app.use("/api", taskRoute);            // legacy: /api/tasks, /api/projects
app.use("/api/auth", authRoute);       // new: /api/auth/signup, /api/auth/login, /api/auth/me
app.use("/api/workspaces", workspaceRoute);
app.use("/api/days", dayRoute);
app.use("/api/v2/tasks", taskRouteV2); // new task routes at /api/v2/tasks/*

// ── Health check ─────────────────────────────────────────────
app.get("/api/health", (req, res) =>
  res.json({ success: true, message: "mytask-webapp API is running 🚀" })
);

// ── Global error handler ─────────────────────────────────────
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`\n🚀 Server running on http://localhost:${port}`);
  console.log(`   Auth API    → http://localhost:${port}/api/auth`);
  console.log(`   Workspaces  → http://localhost:${port}/api/workspaces`);
  console.log(`   Days        → http://localhost:${port}/api/days`);
  console.log(`   Tasks (v2)  → http://localhost:${port}/api/v2/tasks`);
});
