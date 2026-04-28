import { NavLink } from "react-router-dom";
import { FiArrowUpRight, FiGrid, FiHome, FiList, FiSearch } from "react-icons/fi";

function NavItem({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
          isActive
            ? "bg-slate-900 text-white shadow-sm"
            : "text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
      end={to === "/"}
    >
      <span className="text-base">{icon}</span>
      <span>{children}</span>
    </NavLink>
  );
}

export default function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-sm">
            <FiGrid />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">Task Management</div>
            <div className="text-xs text-slate-500">Everyday tasks, cleaner life</div>
          </div>
        </div>

        <div className="hidden w-[420px] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm md:flex">
          <FiSearch className="text-slate-400" />
          <input
            placeholder="Search (coming soon)…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
            Ctrl K
          </span>
        </div>

        <nav className="flex items-center gap-2">
          <NavItem to="/" icon={<FiHome />}>
            Home
          </NavItem>
          <NavItem to="/tasks" icon={<FiList />}>
            Tasks
          </NavItem>
          <NavItem to="/labs" icon={<FiArrowUpRight />}>
            Labs
          </NavItem>
        </nav>
      </div>
    </header>
  );
}

