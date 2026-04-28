import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

function FieldLabel({ children }) {
  return <div className="text-xs font-medium text-slate-600">{children}</div>;
}

export default function TaskComposer({ onAdd }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const canSubmit = useMemo(() => title.trim().length > 0, [title]);

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 12);
    onAdd({ title: title.trim(), notes: notes.trim(), tags, priority, dueDate });
    setTitle("");
    setNotes("");
    setTagsText("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold text-indigo-600">Create</div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Add a new task
        </h2>
        <p className="text-sm text-slate-600">
          Keep it small. You can always add notes and a due date.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <FieldLabel>Title</FieldLabel>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Finish today’s tasks"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          />
        </div>

        <div className="lg:col-span-3">
          <FieldLabel>Priority</FieldLabel>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-3">
          <FieldLabel>Due date</FieldLabel>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          />
        </div>

        <div className="lg:col-span-9">
          <FieldLabel>Notes</FieldLabel>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional details…"
            rows={3}
            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          />
        </div>

        <div className="lg:col-span-9">
          <FieldLabel>Tags</FieldLabel>
          <input
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="work, personal, urgent"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          />
          <div className="mt-2 text-xs text-slate-500">
            Separate tags with commas. Up to 12 tags per task.
          </div>
        </div>

        <div className="lg:col-span-3 lg:flex lg:items-end">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiPlus /> Add task
          </button>
        </div>
      </div>
    </form>
  );
}

