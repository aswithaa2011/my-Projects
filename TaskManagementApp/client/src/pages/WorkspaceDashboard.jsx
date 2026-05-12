import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWorkspaces } from "../hooks/useWorkspaces";
import { FiPlus, FiX, FiLogOut, FiFolder, FiCheckCircle, FiClock, FiList, FiTrendingUp } from "react-icons/fi";
import toast from "react-hot-toast";

const CARD_THEMES = [
  { bg: "bg-card-mint-bg", text: "text-card-mint-text", accent: "#059669" },
  { bg: "bg-card-peach-bg", text: "text-card-peach-text", accent: "#d97706" },
  { bg: "bg-card-purple-bg", text: "text-card-purple-text", accent: "#7e22ce" },
];

const WORKSPACE_COLORS = [
  "#7e22ce", "#059669", "#d97706", "#dc2626", "#2563eb", "#0891b2",
];

const WORKSPACE_ICONS = ["📁", "🚀", "💡", "⚡", "🎯", "🔥", "🧠", "💻"];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function WorkspaceDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { workspaces, loading, createWorkspace, deleteWorkspace } = useWorkspaces();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", color: "#7e22ce", icon: "📁" });
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setCreating(true);
    try {
      const ws = await createWorkspace(form);
      setShowModal(false);
      setForm({ name: "", description: "", color: "#7e22ce", icon: "📁" });
      navigate(`/workspace/${ws._id}`);
    } catch {
      // error handled by hook
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    navigate("/login");
  };

  // Compute global stats
  const totalTasks = workspaces.reduce((s, w) => s + (w.totalTasks || 0), 0);
  const doneTasks = workspaces.reduce((s, w) => s + (w.doneTasks || 0), 0);
  const totalDays = workspaces.reduce((s, w) => s + (w.dayCount || 0), 0);

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-brand-sidebar">
          Taski<span className="text-brand-pink text-3xl leading-none">.</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <div className="w-8 h-8 bg-brand-sidebar rounded-full flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            {user?.name}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
          >
            <FiLogOut /> Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        {/* Greeting + CTA */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-slate-500 text-sm font-medium">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-1">
              {getGreeting()},{" "}
              <span className="text-brand-pink font-serif italic">{user?.name?.split(" ")[0]}</span>
              {" "}👋
            </h2>
          </div>
          <button
            id="create-workspace-btn"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-brand-sidebar hover:bg-brand-sidebar-hover text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <FiPlus /> New Workspace
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Workspaces", value: workspaces.length, icon: <FiFolder />, color: "text-card-purple-text", bg: "bg-card-purple-bg" },
            { label: "Tasks", value: totalDays, icon: <FiList />, color: "text-card-mint-text", bg: "bg-card-mint-bg" },
            { label: "Sub-tasks Done", value: doneTasks, icon: <FiCheckCircle />, color: "text-status-done", bg: "bg-green-50" },
            { label: "Total Sub-tasks", value: totalTasks, icon: <FiTrendingUp />, color: "text-card-peach-text", bg: "bg-card-peach-bg" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-5 flex items-center gap-4`}>
              <div className={`text-2xl ${s.color}`}>{s.icon}</div>
              <div>
                <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Workspaces Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 h-44 animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : workspaces.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🗂️</div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No workspaces yet</h3>
            <p className="text-slate-500 mb-6">Create your first workspace to start organizing tasks</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-brand-sidebar text-white font-bold rounded-2xl hover:bg-brand-sidebar-hover transition-all"
            >
              Create First Workspace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((ws, i) => {
              const theme = CARD_THEMES[i % CARD_THEMES.length];
              const pct = ws.totalTasks > 0 ? Math.round((ws.doneTasks / ws.totalTasks) * 100) : 0;
              return (
                <div
                  key={ws._id}
                  className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                  onClick={() => navigate(`/workspace/${ws._id}`)}
                >
                  {/* Color accent strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ backgroundColor: ws.color || "#7e22ce" }}
                  />

                  <div className="flex items-start justify-between mb-4 mt-1">
                    <div
                      className={`text-3xl w-12 h-12 rounded-2xl flex items-center justify-center ${theme.bg}`}
                    >
                      {ws.icon || "📁"}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete workspace "${ws.name}"?`)) deleteWorkspace(ws._id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <FiX size={16} />
                    </button>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-brand-pink transition-colors">
                    {ws.name}
                  </h3>
                  {ws.description && (
                    <p className="text-sm text-slate-500 mb-3 line-clamp-1">{ws.description}</p>
                  )}

                  <div className="flex gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FiFolder className="text-slate-400" /> {ws.dayCount || 0} tasks
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCheckCircle className="text-status-done" /> {ws.doneTasks || 0}/{ws.totalTasks || 0} done
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: ws.color || "#7e22ce" }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-1 text-right">{pct}% complete</div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Create Workspace Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 pb-0 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900">New Workspace</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name *</label>
                <input
                  autoFocus
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. React Sprint, Internship Project"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Optional"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {WORKSPACE_ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setForm({ ...form, icon })}
                      className={`w-10 h-10 text-xl rounded-xl border-2 transition-all ${
                        form.icon === icon ? "border-brand-pink bg-brand-pink/10" : "border-transparent bg-slate-100 hover:bg-slate-200"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Color</label>
                <div className="flex gap-2">
                  {WORKSPACE_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm({ ...form, color })}
                      className={`w-8 h-8 rounded-full border-4 transition-all ${
                        form.color === color ? "border-slate-900 scale-110" : "border-transparent hover:scale-110"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !form.name.trim()}
                  className="flex-[2] py-3 bg-brand-sidebar hover:bg-brand-sidebar-hover text-white font-bold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {creating ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Create Workspace"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
