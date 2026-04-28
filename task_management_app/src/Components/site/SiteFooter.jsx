export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <span className="font-medium text-slate-900">Task Management App</span>{" "}
          <span className="text-slate-500">— built with React + Tailwind.</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span>UI: Info-style</span>
          <span className="hidden sm:inline">•</span>
          <span>Routes: /, /tasks, /labs</span>
        </div>
      </div>
    </footer>
  );
}

