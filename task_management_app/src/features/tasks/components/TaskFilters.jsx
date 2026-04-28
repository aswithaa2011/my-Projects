import { FiSearch, FiX } from "react-icons/fi";

const PRIORITIES = [
  { value: "all", label: "All priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const VIEWS = [
  { value: "inbox", label: "Inbox (open)" },
  { value: "today", label: "Today" },
  { value: "upcoming", label: "Upcoming" },
  { value: "done", label: "Completed" },
  { value: "all", label: "All" },
];

export default function TaskFilters({ filters, onChange, onClear }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold text-indigo-600">Browse</div>
        <div className="text-base font-semibold text-slate-900">Filters</div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <FiSearch className="text-slate-400" />
            <input
              value={filters.query}
              onChange={(e) => onChange({ query: e.target.value })}
              placeholder="Search title or notes…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            {filters.query ? (
              <button
                type="button"
                onClick={() => onChange({ query: "" })}
                className="grid size-8 place-items-center rounded-xl hover:bg-slate-100"
                aria-label="Clear search"
              >
                <FiX className="text-slate-500" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-3">
          <select
            value={filters.view}
            onChange={(e) => onChange({ view: e.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          >
            {VIEWS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-3">
          <select
            value={filters.priority}
            onChange={(e) => onChange({ priority: e.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-indigo-500/20 focus:ring-4"
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs font-medium text-slate-600">Tag</div>
        <input
          value={filters.tag}
          onChange={(e) => onChange({ tag: e.target.value })}
          placeholder="e.g., work"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-indigo-500/20 focus:ring-4"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Reset filters
        </button>
        <div className="text-xs text-slate-500">
          Tip: use <span className="font-medium">Today</span> to focus on due items.
        </div>
      </div>
    </div>
  );
}

