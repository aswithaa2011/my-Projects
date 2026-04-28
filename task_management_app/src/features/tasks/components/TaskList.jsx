import { useMemo, useState } from "react";
import { FiCheck, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { parseDateInput, isSameDay } from "../utils";

function priorityBadge(priority) {
  if (priority === "high") return "bg-rose-50 text-rose-700";
  if (priority === "low") return "bg-slate-100 text-slate-700";
  return "bg-amber-50 text-amber-700";
}

function dueBadge(task) {
  if (!task.dueDate) return null;
  const d = parseDateInput(task.dueDate);
  if (!d) return null;
  const today = new Date();
  const isToday = isSameDay(d, today);
  const isOverdue = d.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  if (task.status === "done") return "bg-emerald-50 text-emerald-700";
  if (isOverdue) return "bg-rose-50 text-rose-700";
  if (isToday) return "bg-indigo-50 text-indigo-700";
  return "bg-slate-100 text-slate-700";
}

function formatDueLabel(task) {
  if (!task.dueDate) return null;
  const d = parseDateInput(task.dueDate);
  if (!d) return null;
  const today = new Date();
  if (isSameDay(d, today)) return "Due today";
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  if (isSameDay(d, tomorrow)) return "Due tomorrow";
  return `Due ${d.toLocaleDateString()}`;
}

function EditRow({ task, onCancel, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [notes, setNotes] = useState(task.notes ?? "");
  const [tagsText, setTagsText] = useState((task.tags ?? []).join(", "));
  const [priority, setPriority] = useState(task.priority ?? "medium");
  const [dueDate, setDueDate] = useState(task.dueDate ?? "");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="text-xs font-medium text-slate-600">Title</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          />
        </div>
        <div className="lg:col-span-3">
          <div className="text-xs font-medium text-slate-600">Priority</div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="lg:col-span-4">
          <div className="text-xs font-medium text-slate-600">Due date</div>
          <input
            type="date"
            value={dueDate || ""}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          />
        </div>
        <div className="lg:col-span-9">
          <div className="text-xs font-medium text-slate-600">Notes</div>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          />
        </div>
        <div className="lg:col-span-9">
          <div className="text-xs font-medium text-slate-600">Tags</div>
          <input
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="work, personal"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          />
        </div>
        <div className="lg:col-span-3 lg:flex lg:items-end">
          <div className="flex w-full gap-2">
            <button
              type="button"
              onClick={() =>
                onSave({
                  title: title.trim(),
                  notes: notes.trim(),
                  tags: tagsText
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .slice(0, 12),
                  priority,
                  dueDate: dueDate || null,
                })
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              <FiCheck /> Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <FiX /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle, onRemove, onStartEdit }) {
  const dueTone = dueBadge(task);
  const dueLabel = formatDueLabel(task);
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-base font-semibold text-slate-900">
              {task.title}
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityBadge(task.priority)}`}>
              {task.priority}
            </span>
            {dueLabel ? (
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${dueTone}`}>
                {dueLabel}
              </span>
            ) : null}
            {task.status === "done" ? (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                Done
              </span>
            ) : null}
          </div>
          {task.notes ? (
            <div className="mt-1 text-sm text-slate-600">{task.notes}</div>
          ) : null}
          {task.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <FiCheck />
            {task.status === "done" ? "Mark open" : "Complete"}
          </button>
          <button
            type="button"
            onClick={() => onStartEdit(task.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <FiEdit2 /> Edit
          </button>
          <button
            type="button"
            onClick={() => onRemove(task.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-rose-700 shadow-sm hover:bg-rose-50"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TaskList({
  tasks,
  filters,
  onToggleDone,
  onRemove,
  onUpdate,
  onClearCompleted,
}) {
  const [editingId, setEditingId] = useState(null);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const tag = filters.tag.trim().toLowerCase();
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    return tasks.filter((t) => {
      if (filters.priority !== "all" && t.priority !== filters.priority) return false;

      if (q) {
        const hay = `${t.title} ${t.notes ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (tag) {
        const tags = Array.isArray(t.tags) ? t.tags : [];
        const has = tags.some((x) => String(x).toLowerCase() === tag);
        if (!has) return false;
      }

      const due = t.dueDate ? parseDateInput(t.dueDate) : null;

      if (filters.view === "inbox") return t.status === "open";
      if (filters.view === "done") return t.status === "done";
      if (filters.view === "today") {
        if (t.status !== "open") return false;
        if (!due) return false;
        return isSameDay(due, today);
      }
      if (filters.view === "upcoming") {
        if (t.status !== "open") return false;
        if (!due) return false;
        return due.getTime() >= todayStart;
      }

      return true;
    });
  }, [filters.priority, filters.query, filters.tag, filters.view, tasks]);

  const empty = filtered.length === 0;

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-indigo-600">List</div>
          <div className="text-xl font-semibold tracking-tight text-slate-900">
            Your tasks
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Showing <span className="font-medium">{filtered.length}</span> item(s)
          </div>
        </div>

        <button
          type="button"
          onClick={onClearCompleted}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Clear completed
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {empty ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="text-base font-semibold text-slate-900">
              No tasks match your filters
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Try resetting filters or add a new task above.
            </div>
          </div>
        ) : (
          filtered.map((t) =>
            editingId === t.id ? (
              <EditRow
                key={t.id}
                task={t}
                onCancel={() => setEditingId(null)}
                onSave={(patch) => {
                  onUpdate(t.id, patch);
                  setEditingId(null);
                }}
              />
            ) : (
              <TaskRow
                key={t.id}
                task={t}
                onToggle={onToggleDone}
                onRemove={onRemove}
                onStartEdit={setEditingId}
              />
            ),
          )
        )}
      </div>
    </div>
  );
}

