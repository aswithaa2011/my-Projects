import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const LABS = [
  {
    day: "Day 1",
    items: [
      { label: "Task 1", to: "/labs/day1/task1" },
      { label: "Task 2", to: "/labs/day1/task2" },
    ],
  },
  {
    day: "Day 2",
    items: [
      { label: "Timer", to: "/labs/day2/timer" },
      { label: "Recipes", to: "/labs/day2/recipes" },
      { label: "Todo", to: "/labs/day2/todo" },
    ],
  },
  {
    day: "Day 4",
    items: [
      { label: "Counter", to: "/labs/day4/counter" },
      { label: "Form", to: "/labs/day4/form" },
    ],
  },
  {
    day: "Day 6 (useRef)",
    items: [
      { label: "Feedback Form", to: "/labs/day6/feedback" },
      { label: "Search Form", to: "/labs/day6/search" },
    ],
  },
  {
    day: "Day 7",
    items: [
      { label: "Login Form", to: "/labs/day7/login-form" },
      { label: "Login/Register", to: "/labs/day7/login-register" },
      { label: "Alert (HOC)", to: "/labs/day7/alert" },
    ],
  },
  {
    day: "Day 8 (useMemo)",
    items: [
      { label: "Sum", to: "/labs/day8/sum" },
      { label: "Sorting", to: "/labs/day8/sorting" },
      { label: "Filter Name", to: "/labs/day8/filter-name" },
    ],
  },
  {
    day: "Day 9 (Custom hooks)",
    items: [{ label: "Hooks", to: "/labs/day9/hooks" }],
  },
  {
    day: "Day 10",
    items: [{ label: "CRUD", to: "/labs/day10/crud" }],
  },
  {
    day: "Day 11",
    items: [{ label: "Text Change", to: "/labs/day11/text-change" }],
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
          Practice pages (Day1–Day11)
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

