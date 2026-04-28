import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const LABS = [
  {
    day: "Day 10",
    items: [
      { label: "Task 1", to: "/labs/day10/task1" },
      { label: "Task 2", to: "/labs/day10/task2" },
    ],
  },
  {
    day: "Day 11",
    items: [
      { label: "Timer", to: "/labs/day11/timer" },
      { label: "Recipes", to: "/labs/day11/recipes" },
      { label: "Todo", to: "/labs/day11/todo" },
    ],
  },
  {
    day: "Day 13",
    items: [
      { label: "Counter", to: "/labs/day13/counter" },
      { label: "Form", to: "/labs/day13/form" },
    ],
  },
  {
    day: "Day 15 (useRef)",
    items: [
      { label: "Feedback Form", to: "/labs/day15/feedback" },
      { label: "Search Form", to: "/labs/day15/search" },
    ],
  },
  {
    day: "Day 16",
    items: [
      { label: "Login Form", to: "/labs/day16/login-form" },
      { label: "Login/Register", to: "/labs/day16/login-register" },
      { label: "Alert (HOC)", to: "/labs/day16/alert" },
    ],
  },
  {
    day: "Day 17 (useMemo)",
    items: [
      { label: "Sum", to: "/labs/day17/sum" },
      { label: "Sorting", to: "/labs/day17/sorting" },
      { label: "Filter Name", to: "/labs/day17/filter-name" },
    ],
  },
  {
    day: "Day 18 (Custom hooks)",
    items: [{ label: "Hooks", to: "/labs/day18/hooks" }],
  },
  {
    day: "Day 19",
    items: [{ label: "CRUD", to: "/labs/day19/crud" }],
  },
  {
    day: "Day 20",
    items: [{ label: "Text Change", to: "/labs/day20/text-change" }],
  },
];

function LabCard({ day, items }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-base font-semibold text-slate-900">{day}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            {item.label} <FiArrowRight className="text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function LabsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold text-indigo-600">Labs</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Practice pages (Day10–Day20)
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          These are your learning tasks. They’re now grouped under{" "}
          <span className="font-medium">/labs</span> so the main app UI stays clean
          and professional.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {LABS.map((group) => (
          <LabCard key={group.day} day={group.day} items={group.items} />
        ))}
      </div>
    </div>
  );
}

