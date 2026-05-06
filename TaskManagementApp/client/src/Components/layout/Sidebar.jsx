import { Link, useLocation } from "react-router-dom";
import { mockTasks } from "../../data/mockTasks";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-brand-sidebar text-white shadow-xl z-20 flex flex-col">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-tr-full pointer-events-none" />
      
      <div className="p-8 relative z-10">
        <h1 className="text-3xl font-bold tracking-tight flex items-baseline gap-1">
          Taski<span className="text-brand-pink text-4xl leading-none">.</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto relative z-10">
        <Link
          to="/"
          className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
            location.pathname === "/" ? "bg-brand-active border border-white/10" : "hover:bg-brand-sidebar-hover"
          }`}
        >
          <div className={`grid size-8 place-items-center rounded-lg text-sm font-bold ${
            location.pathname === "/" ? "bg-[#63294c] text-brand-pink" : "bg-white/10 text-white"
          }`}>
            H
          </div>
          <span className="font-medium">Dashboard</span>
        </Link>

        <div className="pt-6 pb-2 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">
          Your Days
        </div>

        {mockTasks.map((taskDay) => {
          const isActive = location.pathname === `/day/${taskDay.day}`;
          return (
            <Link
              key={taskDay.day}
              to={`/day/${taskDay.day}`}
              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all ${
                isActive ? "bg-brand-active" : "hover:bg-brand-sidebar-hover"
              }`}
            >
              <div className={`grid size-7 place-items-center rounded-lg text-xs font-bold ${
                isActive ? "bg-white/20" : "bg-white/10"
              }`}>
                {taskDay.day}
              </div>
              <span className="text-sm font-medium text-white/80">{taskDay.title}</span>
            </Link>
          );
        })}

        <div className="pt-6 pb-2 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">
          Practice
        </div>
        <Link
          to="/labs"
          className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all ${
            location.pathname.startsWith("/labs") ? "bg-brand-active" : "hover:bg-brand-sidebar-hover"
          }`}
        >
          <div className="grid size-7 place-items-center rounded-lg text-xs font-bold bg-white/10">
            L
          </div>
          <span className="text-sm font-medium text-white/80">Labs</span>
        </Link>
      </nav>
    </aside>
  );
}
