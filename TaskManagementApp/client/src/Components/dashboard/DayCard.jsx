import { Link } from 'react-router-dom';
import { FiCode } from 'react-icons/fi';

export default function DayCard({ task }) {
  const { _id, name, status, files = [] } = task;

  const progress = status === 'done' ? 100 : status === 'in-progress' ? 50 : 0;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;


  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-bg/80 rounded-full" />

      {/* Header */}
      <div className="flex justify-between items-start mb-4 z-10">
        <Link to={`/day/${_id}`} className="hover:underline">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight hover:text-brand-pink transition-colors">
            {name}
          </h2>
        </Link>

        <div className="flex items-center gap-2">

          {/* Progress Ring */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
              <circle className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="24" cy="24" />
              <circle
                className="text-brand-pink transition-all duration-1000 ease-out"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="24"
                cy="24"
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-slate-700">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Status dot */}
      <div className="flex gap-1.5 mb-4 z-10">
        <div
          className={`w-3 h-3 rounded-full ${
            status === 'done' ? 'bg-status-done' :
            status === 'in-progress' ? 'bg-status-active' : 'bg-status-todo'
          }`}
          title={status}
        />
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{status.replace('-', ' ')}</span>
      </div>

      {/* Sub-task file buttons */}
      {files.length > 0 ? (
        <div className="flex flex-wrap gap-2 z-10 mb-4">
          {files.map((file) => (
            <Link
              key={file.name}
              to={file.routePath}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-600 hover:bg-brand-bg hover:text-brand-pink transition-all border border-slate-100"
            >
              {file.name}
            </Link>
          ))}
        </div>
      ) : (
        <Link to={`/day/${_id}`} className="text-xs text-slate-400 z-10 mb-4 hover:text-brand-pink transition-colors">
          Click to view day →
        </Link>
      )}

      {/* Progress bar */}
      <div className="mt-auto z-10">
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-pink/30 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
