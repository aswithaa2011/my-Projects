import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDays } from "../hooks/useDays";
import api from "../api/axios";
import {
  FiArrowLeft, FiPlus, FiX, FiCode, FiTrash2,
  FiCheckCircle, FiClock, FiList, FiDownload, FiLogOut
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function WorkspacePage() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { days, loading, createDay, deleteDay, openInVSCode } = useDays(workspaceId);

  const [workspace, setWorkspace] = useState(null);
  const [wsLoading, setWsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [dayLabel, setDayLabel] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    api.get(`/workspaces/${workspaceId}`)
      .then(({ data }) => setWorkspace(data.workspace))
      .catch(() => toast.error("Workspace not found"))
      .finally(() => setWsLoading(false));
  }, [workspaceId]);

  const handleCreateDay = async (e) => {
    e.preventDefault();
    if (!dayLabel.trim()) return;
    setCreating(true);
    try {
      await createDay(dayLabel.trim());
      setShowModal(false);
      setDayLabel("");
    } catch {
      // handled by hook
    } finally {
      setCreating(false);
    }
  };

  const handleExportJSON = async () => {
    try {
      const { data } = await api.get(`/v2/tasks/workspace/${workspaceId}`);
      const blob = new Blob([JSON.stringify(data.tasks, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${workspace?.name || "workspace"}-tasks.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Exported tasks JSON");
    } catch {
      toast.error("Export failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (wsLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="text-4xl mb-4">🗂️</div>
          <p className="text-slate-500 font-medium">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-brand-sidebar text-white flex flex-col z-20 shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-tr-full pointer-events-none" />

        {/* Logo */}
        <div className="p-6 relative z-10">
          <h1 className="text-2xl font-bold tracking-tight">
            Taski<span className="text-brand-pink text-3xl leading-none">.</span>
          </h1>
          <p className="text-xs text-white/50 mt-0.5">Task Management</p>
        </div>

        {/* Workspace info */}
        <div className="px-4 py-3 mx-4 rounded-2xl bg-brand-active border border-white/10 relative z-10 mb-2">
          <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Workspace</div>
          <div className="font-bold text-white truncate">
            {workspace?.icon} {workspace?.name}
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-2 flex flex-col gap-1 relative z-10">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-brand-sidebar-hover hover:text-white transition-all text-sm"
          >
            <FiArrowLeft size={14} /> All Workspaces
          </Link>
        </nav>

        {/* Day list */}
        <div className="flex-1 overflow-y-auto px-4 relative z-10">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 py-3">
            Tasks
          </div>

          {loading ? (
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-9 bg-white/10 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : days.length === 0 ? (
            <p className="text-xs text-white/40 px-3">No tasks yet</p>
          ) : (
            <div className="space-y-1">
              {days.map((day) => (
                <Link
                  key={day._id}
                  to={`/workspace/${workspaceId}/day/${day._id}`}
                  className="group flex items-center justify-between px-3 py-2.5 rounded-xl text-white/70 hover:bg-brand-sidebar-hover hover:text-white transition-all text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold">
                      {day.order + 1}
                    </span>
                    {day.label}
                  </span>
                  <span className="text-xs text-white/30">{day.progress || 0}%</span>
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="mt-3 w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-white/60 hover:bg-brand-sidebar-hover hover:text-white transition-all text-sm border border-dashed border-white/20 hover:border-white/40"
          >
            <FiPlus size={14} /> Add Task
          </button>
        </div>

        {/* User section */}
        <div className="p-4 border-t border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-pink/30 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-xs text-white/40 truncate">{user?.email}</div>
            </div>
            <button onClick={handleLogout} className="text-white/40 hover:text-white transition-colors">
              <FiLogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 sm:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Workspace
            </div>
            <h1 className="text-3xl font-black text-slate-900">
              {workspace?.icon} {workspace?.name}
            </h1>
            {workspace?.description && (
              <p className="text-slate-500 mt-1">{workspace.description}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm shadow-sm"
            >
              <FiDownload size={14} /> Export JSON
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-sidebar hover:bg-brand-sidebar-hover text-white font-bold rounded-xl transition-all shadow-lg text-sm"
            >
              <FiPlus size={14} /> New Task
            </button>
          </div>
        </div>

        {/* Stats */}
        {days.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Tasks", value: days.length, icon: <FiList />, color: "text-card-purple-text", bg: "bg-card-purple-bg" },
              { label: "Sub-tasks Done", value: days.reduce((s, d) => s + (d.done || 0), 0), icon: <FiCheckCircle />, color: "text-status-done", bg: "bg-green-50" },
              { label: "In Progress", value: days.reduce((s, d) => s + (d.inProgress || 0), 0), icon: <FiClock />, color: "text-status-active", bg: "bg-amber-50" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-4 flex items-center gap-3`}>
                <div className={`text-xl ${s.color}`}>{s.icon}</div>
                <div>
                  <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs font-semibold text-slate-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Days Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 h-44 animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : days.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No tasks yet</h3>
            <p className="text-slate-500 mb-6">
              Create your first task to start tracking your sub-tasks!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-brand-sidebar text-white font-bold rounded-2xl hover:bg-brand-sidebar-hover transition-all"
            >
              Create Task 1
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {days.map((day) => {
              const radius = 20;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (day.progress / 100) * circumference;

              return (
                <div
                  key={day._id}
                  onClick={() => navigate(`/workspace/${workspaceId}/day/${day._id}`)}
                  className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-brand-bg/80 rounded-full pointer-events-none" />

                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-brand-pink transition-colors">
                      {day.label}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete ${day.label}? This also deletes all its tasks.`)) {
                            deleteDay(day._id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <FiTrash2 size={14} />
                      </button>

                      {/* Progress Ring */}
                      <div className="relative w-10 h-10">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                          <circle stroke="#e2e8f0" strokeWidth="4" fill="transparent" r={radius} cx="24" cy="24" />
                          <circle
                            stroke="#ff6b9e"
                            strokeWidth="4"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            fill="transparent"
                            r={radius}
                            cx="24"
                            cy="24"
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-slate-700">
                          {day.progress}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs text-slate-500 mb-4 flex-wrap">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-status-done inline-block" />
                      {day.done} done
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-status-active inline-block" />
                      {day.inProgress} active
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-status-todo inline-block" />
                      {day.todo} todo
                    </span>
                  </div>



                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-auto">
                    <div
                      className="h-full bg-brand-pink/70 rounded-full transition-all duration-700"
                      style={{ width: `${day.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Create Day Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="p-6 pb-0 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900">Add Task</h2>
              <button
                onClick={() => { setShowModal(false); setDayLabel(""); }}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateDay} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Task Label</label>
                <input
                  autoFocus
                  type="text"
                  value={dayLabel}
                  onChange={(e) => setDayLabel(e.target.value)}
                  placeholder={`e.g. Task ${days.length + 1}`}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 transition-all text-sm font-medium"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setDayLabel(""); }}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !dayLabel.trim()}
                  className="flex-[2] py-3 bg-brand-sidebar hover:bg-brand-sidebar-hover text-white font-bold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {creating ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Create Task"
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
