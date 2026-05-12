import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTasksV2 } from "../hooks/useTasksV2";
import api from "../api/axios";
import {
  FiArrowLeft, FiCode, FiTrash2, FiPlus, FiSearch,
  FiCheckCircle, FiClock, FiCircle, FiX, FiEdit2, FiFlag
} from "react-icons/fi";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["todo", "in-progress", "done"];
const PRIORITY_OPTIONS = ["low", "medium", "high"];

function getDueLabel(dueDate) {
  if (!dueDate) return null;
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((due - today) / 86400000);
  if (diff < 0) return { label: "Overdue", color: "text-red-500 bg-red-50" };
  if (diff === 0) return { label: "Due today", color: "text-amber-600 bg-amber-50" };
  if (diff === 1) return { label: "Due tomorrow", color: "text-blue-600 bg-blue-50" };
  return { label: `Due ${due.toLocaleDateString()}`, color: "text-slate-500 bg-slate-100" };
}

const PRIORITY_CONFIG = {
  high: { color: "bg-red-500", label: "High" },
  medium: { color: "bg-amber-400", label: "Med" },
  low: { color: "bg-slate-300", label: "Low" },
};

const STATUS_CONFIG = {
  todo: { color: "bg-status-todo text-slate-600", label: "To Do", icon: <FiCircle size={10} /> },
  "in-progress": { color: "bg-amber-100 text-amber-700", label: "In Progress", icon: <FiClock size={10} /> },
  done: { color: "bg-green-100 text-status-done", label: "Done", icon: <FiCheckCircle size={10} /> },
};

function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const due = getDueLabel(task.dueDate);
  const status = STATUS_CONFIG[task.status];
  const priority = PRIORITY_CONFIG[task.priority || "medium"];

  return (
    <div className={`group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 ${task.status === "done" ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            task.status === "done"
              ? "bg-status-done border-status-done text-white"
              : task.status === "in-progress"
              ? "border-amber-400 text-amber-400"
              : "border-slate-300 hover:border-brand-pink"
          }`}
        >
          {task.status === "done" && <FiCheckCircle size={10} />}
          {task.status === "in-progress" && <FiClock size={10} />}
        </button>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-start justify-between gap-2">
            <p
              className={`font-semibold text-sm leading-snug cursor-pointer hover:text-brand-pink transition-colors ${
                task.status === "done" ? "line-through text-slate-400" : "text-slate-800"
              }`}
              onClick={() => onEdit(task)}
            >
              {task.title}
            </p>
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Priority dot */}
              <span className={`w-2 h-2 rounded-full ${priority.color}`} title={priority.label} />
              {/* Status badge */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${status.color}`}>
                {status.icon} {status.label}
              </span>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-slate-400 mt-1 line-clamp-1">{task.description}</p>
          )}

          {/* Tags + Due */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {task.tags?.slice(0, 4).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-card-purple-bg text-card-purple-text text-[10px] font-semibold">
                #{tag}
              </span>
            ))}
            {due && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${due.color}`}>
                {due.label}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-pink hover:bg-brand-pink/10 transition-all"
          >
            <FiEdit2 size={12} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <FiTrash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TaskModal({ task, dayId, workspaceId, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(
    task || { title: "", description: "", status: "todo", priority: "medium", tags: "", dueDate: "" }
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: typeof form.tags === "string"
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : form.tags,
        dueDate: form.dueDate || null,
      };
      await onSave(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 pb-4 border-b border-slate-100 flex justify-between items-center rounded-t-3xl z-10">
          <h2 className="text-xl font-black text-slate-900">{task ? "Edit Sub-task" : "New Sub-task"}</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500">
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title *</label>
            <input
              autoFocus
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="What needs to be done?"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 transition-all text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Add details..."
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 transition-all text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-pink text-sm font-medium"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-pink text-sm font-medium"
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags</label>
            <input
              type="text"
              value={typeof form.tags === "string" ? form.tags : form.tags?.join(", ")}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="react, hooks, api (comma separated)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Due Date</label>
            <input
              type="date"
              value={form.dueDate ? form.dueDate.split("T")[0] : ""}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-pink text-sm font-medium"
            />
          </div>

          <div className="flex gap-3 pt-2">
            {task && (
              <button
                type="button"
                onClick={() => { onDelete(task._id); onClose(); }}
                className="flex items-center gap-1.5 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all text-sm"
              >
                <FiTrash2 size={14} /> Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !form.title.trim()}
              className="flex-[2] py-3 bg-brand-sidebar hover:bg-brand-sidebar-hover text-white font-bold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : task ? "Save Changes" : "Create Sub-task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function WorkspaceDayPage() {
  const { workspaceId, dayId } = useParams();
  const navigate = useNavigate();
  const { tasks, loading, createTask, updateTask, deleteTask, clearCompleted, refetch } = useTasksV2(dayId, workspaceId);

  const [day, setDay] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [quickAdd, setQuickAdd] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    api.get(`/days/${workspaceId}`).then(({ data }) => {
      const found = data.days?.find((d) => d._id === dayId);
      if (found) setDay(found);
    }).catch(() => {});
  }, [dayId, workspaceId]);

  // Keyboard shortcut: Ctrl+K to focus quick add
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("quick-add-input")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!quickAdd.trim()) return;
    await createTask({ title: quickAdd.trim() });
    setQuickAdd("");
  };

  const handleToggle = (task) => {
    const next = task.status === "done" ? "todo" : "done";
    updateTask(task._id, { status: next });
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleSaveTask = async (payload) => {
    if (editTask) {
      await updateTask(editTask._id, payload);
    } else {
      await createTask(payload);
    }
  };



  // Filtered tasks
  const filteredTasks = tasks.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const doneTasks = tasks.filter((t) => t.status === "done");
  const hasDone = doneTasks.length > 0;

  return (
    <div className="min-h-screen bg-brand-bg max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Back + Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <Link
            to={`/workspace/${workspaceId}`}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors mb-3"
          >
            <FiArrowLeft size={14} /> Back to Workspace
          </Link>
          <h1 className="text-3xl font-black text-slate-900">
            {day?.label || "Task"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {tasks.length} sub-task{tasks.length !== 1 ? "s" : ""} · {doneTasks.length} done · {tasks.length - doneTasks.length} open
          </p>
        </div>
      </div>

      {/* Quick Add */}
      <form onSubmit={handleQuickAdd} className="mb-4">
        <div className="relative">
          <FiPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            id="quick-add-input"
            type="text"
            value={quickAdd}
            onChange={(e) => setQuickAdd(e.target.value)}
            placeholder="Add a new sub-task… (press Enter or Ctrl+K to focus)"
            className="w-full pl-10 pr-24 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 transition-all text-sm font-medium shadow-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={() => { setEditTask(null); setShowModal(true); }}
              className="text-xs text-slate-400 hover:text-brand-pink font-medium transition-colors"
            >
              + More options
            </button>
            {quickAdd && (
              <button
                type="submit"
                className="px-3 py-1 bg-brand-sidebar text-white text-xs font-bold rounded-lg"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="relative flex-1 min-w-[180px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sub-tasks..."
            className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-pink text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-brand-pink"
        >
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-brand-pink"
        >
          <option value="all">All Priority</option>
          {PRIORITY_OPTIONS.map((p) => (
            <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
          ))}
        </select>

        {hasDone && (
          <button
            onClick={clearCompleted}
            className="px-3 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
          >
            Clear {doneTasks.length} done
          </button>
        )}
      </div>

      {/* Task List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 h-16 animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-20">
          {tasks.length === 0 ? (
            <>
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No sub-tasks yet</h3>
              <p className="text-slate-400 text-sm">Type above to add your first sub-task, or click "+ More options" for full details</p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No matching sub-tasks</h3>
              <button
                onClick={() => { setSearch(""); setStatusFilter("all"); setPriorityFilter("all"); }}
                className="text-brand-pink text-sm font-semibold hover:underline"
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onDelete={deleteTask}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editTask}
          dayId={dayId}
          workspaceId={workspaceId}
          onSave={handleSaveTask}
          onDelete={deleteTask}
          onClose={() => { setShowModal(false); setEditTask(null); }}
        />
      )}
    </div>
  );
}
