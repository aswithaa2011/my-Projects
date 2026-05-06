import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import TaskComposer from "../features/tasks/components/TaskComposer";
import TaskFilters from "../features/tasks/components/TaskFilters";
import TaskList from "../features/tasks/components/TaskList";
import TaskStats from "../features/tasks/components/TaskStats";
import { useTasks } from "../features/tasks/useTasks";

const DEFAULT_FILTERS = {
  query: "",
  view: "inbox",
  priority: "all",
  tag: "",
};

export default function TasksPage() {
  const {
    tasks,
    stats,
    addTask,
    updateTask,
    removeTask,
    toggleDone,
    clearCompleted,
    exportTasks,
    importTasks,
  } = useTasks();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const fileRef = useRef(null);
  const [importMode, setImportMode] = useState("merge"); // merge | replace

  const hasTasks = tasks.length > 0;
  const subtitle = useMemo(() => {
    if (!hasTasks) return "Add your first task to get started.";
    if (stats.dueToday > 0) return `${stats.dueToday} task(s) due today — focus on those first.`;
    return "Inbox view shows open tasks. Use filters to switch views.";
  }, [hasTasks, stats.dueToday]);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-indigo-600">Tasks</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Your daily task board
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>
          </div>

          <Link
            to="/labs"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Labs
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const json = exportTasks();
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "tasks-export.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Export JSON
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const text = await file.text();
              importTasks(text, { mode: importMode });
              setImportMode("merge");
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => {
              setImportMode("merge");
              fileRef.current?.click();
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Import JSON (merge)
          </button>
          <button
            type="button"
            onClick={() => {
              const ok = window.confirm(
                "Replace all existing tasks with an imported file? This cannot be undone.",
              );
              if (!ok) return;
              setImportMode("replace");
              fileRef.current?.click();
            }}
            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 shadow-sm hover:bg-rose-100"
          >
            Import JSON (replace)
          </button>

          <div className="text-xs text-slate-500">
            Your tasks are stored locally (browser `localStorage`).
          </div>
        </div>
      </div>

      <TaskStats stats={stats} />

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <TaskComposer onAdd={addTask} />
        </div>

        <div className="lg:col-span-4">
          <TaskFilters
            filters={filters}
            onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
            onClear={() => setFilters(DEFAULT_FILTERS)}
          />
        </div>

        <div className="lg:col-span-8">
          <TaskList
            tasks={tasks}
            filters={filters}
            onToggleDone={toggleDone}
            onRemove={removeTask}
            onUpdate={updateTask}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}

