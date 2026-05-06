import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="text-sm font-semibold text-indigo-600">404</div>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-2 text-slate-600">
        The page you’re looking for doesn’t exist (or it was moved during the new
        folder structure upgrade).
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
        >
          Go home
        </Link>
        <Link
          to="/tasks"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Open tasks
        </Link>
        <Link
          to="/labs"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Browse labs
        </Link>
      </div>
    </div>
  );
}

