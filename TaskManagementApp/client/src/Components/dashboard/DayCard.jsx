import { Link } from 'react-router-dom';

export default function DayCard({ task }) {
  const { _id, name, status } = task;

  // Calculate generic progress based on status since it's a single folder/workspace now
  const progress = status === 'done' ? 100 : status === 'in-progress' ? 50 : 0;
  
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Link to={`/day/${_id}`} className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 block">
      {/* Decorative background shapes */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-bg/80 rounded-full" />
      
      <div className="flex justify-between items-start mb-6 z-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          {name}
        </h2>
        
        {/* Progress Ring */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
            <circle
              className="text-slate-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="24"
              cy="24"
            />
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
          <span className="absolute text-[10px] font-bold text-slate-700">
            {progress}%
          </span>
        </div>
      </div>

      <div className="flex gap-1.5 mb-6 z-10">
        <div
          className={`w-3 h-3 rounded-full ${
            status === 'done' ? 'bg-status-done' :
            status === 'in-progress' ? 'bg-status-active' : 'bg-status-todo'
          }`}
          title={status}
        />
      </div>

      <div className="mt-auto z-10">
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-brand-pink/30 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
          {status.replace('-', ' ')}
        </div>
      </div>
    </Link>
  );
}
