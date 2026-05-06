import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiClock, FiCircle, FiCode } from "react-icons/fi";

export default function DayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all tasks and find the one with this ID (in a real app, you'd have a GET /api/tasks/:id route)
    const fetchTask = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tasks");
        const data = await res.json();
        if (data.success) {
          const foundTask = data.tasks.find(t => t._id === id);
          if (foundTask) setTask(foundTask);
        }
      } catch (error) {
        console.error("Failed to fetch task", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 animate-pulse text-slate-500 font-bold">Loading Workspace...</div>;
  }

  if (!task) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Workspace not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-brand-pink underline">
          Go back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit">
        <FiArrowLeft /> Back to Dashboard
      </Link>

      <div className="flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {task.name}
          </h1>
          <p className="text-slate-500 mt-2 flex items-center gap-2">
            <FiCode /> Folder: <span className="font-mono text-xs bg-slate-100 p-1 rounded">{task.folder}</span>
          </p>
        </div>
        <div className="text-right">
          <div className={`text-xl font-bold capitalize ${
            task.status === 'done' ? 'text-status-done' :
            task.status === 'in-progress' ? 'text-status-active' : 'text-slate-400'
          }`}>
            {task.status.replace('-', ' ')}
          </div>
          <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Status</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold mb-4">How to use this Workspace</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          When you created this workspace, a folder named <strong>{task.folder}</strong> was generated in your <code>client/src/pages</code> directory and automatically opened in VS Code.
        </p>
        <p className="text-slate-600 leading-relaxed">
          To view your React component output here, simply import it into your <code>AppRoutes.jsx</code> and assign it a route!
        </p>
      </div>
    </div>
  );
}
