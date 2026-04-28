import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiClock, FiLayers } from "react-icons/fi";

function Stat({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-600">{label}</div>
        <div className="grid size-9 place-items-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

function Feature({ title, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-indigo-600">
          <FiCheckCircle />
        </div>
        <div>
          <div className="text-base font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.18),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.12),transparent_55%)]" />
        <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600">
              <span className="size-2 rounded-full bg-emerald-500" />
              Everyday Task System
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Organize your day like an information dashboard.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              A clean, modern UI for daily task work—plus a separate “Labs” area
              for your practice pages (Day10–Day20) so the main app feels
              professional.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/tasks"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Open Tasks <FiArrowRight />
              </Link>
              <Link
                to="/labs"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Browse Labs <FiLayers />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Stat label="Focus blocks" value="Plan + Execute" icon={<FiClock />} />
            <Stat label="Structure" value="App + Labs" icon={<FiLayers />} />
            <Stat label="Routing" value="Clean URLs" icon={<FiArrowRight />} />
            <Stat label="Style" value="Info Website" icon={<FiCheckCircle />} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Feature title="Modern layout system">
          Sticky navbar, consistent spacing, and a footer—so every page feels
          like a real product website.
        </Feature>
        <Feature title="Labs separated from main app">
          Your Day10–Day20 pages stay accessible under <span className="font-medium">/labs</span>{" "}
          (old URLs still redirect).
        </Feature>
        <Feature title="Ready for real features">
          This structure makes it easier to add authentication, categories,
          task status, and analytics later.
        </Feature>
      </section>
    </div>
  );
}

