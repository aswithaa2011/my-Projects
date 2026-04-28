import { FiCheckCircle, FiClock, FiInbox, FiList } from "react-icons/fi";

function Stat({ label, value, icon, tone }) {
  const toneStyles =
    tone === "good"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "warn"
        ? "bg-amber-50 text-amber-700"
        : "bg-slate-100 text-slate-700";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium text-slate-600">{label}</div>
        <div className={`grid size-10 place-items-center rounded-2xl ${toneStyles}`}>
          {icon}
        </div>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

export default function TaskStats({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat label="Total" value={stats.total} icon={<FiList />} />
      <Stat label="Open" value={stats.open} icon={<FiInbox />} />
      <Stat label="Due today" value={stats.dueToday} icon={<FiClock />} tone="warn" />
      <Stat label="Completed" value={stats.done} icon={<FiCheckCircle />} tone="good" />
    </div>
  );
}

