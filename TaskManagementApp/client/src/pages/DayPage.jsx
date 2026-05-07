import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiClock, FiCircle, FiCode, FiTrash2, FiSave } from "react-icons/fi";

export default function DayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
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

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setTask(data.task);
      }
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setUpdating(false);
    }
  };

  const deleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this workspace? This will only remove it from the dashboard, not from your disk.")) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        navigate('/');
      }
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const openInVSCode = async () => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}/open`, { method: 'POST' });
    } catch (error) {
      console.error("Failed to open VS Code", error);
    }
  };

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
      <div className="flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit">
          <FiArrowLeft /> Back to Dashboard
        </Link>
        <div className="flex gap-4">
          <button 
            onClick={openInVSCode}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-pink hover:text-brand-pink/80 transition-colors"
          >
            <FiCode /> Open in VS Code
          </button>
          <button 
            onClick={deleteTask}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            <FiTrash2 /> Delete Workspace
          </button>
        </div>
      </div>

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
          <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Current Status</div>
        </div>
      </div>

      {/* Task Buttons Section */}
      {task.files && task.files.length > 0 && (
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FiCode className="text-indigo-600" /> Practice Tasks
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {task.files.map((file) => (
              <Link
                key={file.name}
                to={file.routePath}
                className="flex items-center justify-center p-4 rounded-xl font-semibold bg-slate-50 text-slate-700 hover:bg-brand-bg hover:text-brand-pink transition-all border border-slate-100 shadow-sm"
              >
                {file.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FiCheckCircle className="text-indigo-600" /> Manage Status
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { id: 'todo', label: 'To Do', icon: <FiCircle />, color: 'bg-slate-100 text-slate-600' },
              { id: 'in-progress', label: 'In Progress', icon: <FiClock />, color: 'bg-indigo-50 text-indigo-600' },
              { id: 'done', label: 'Completed', icon: <FiCheckCircle />, color: 'bg-green-50 text-green-600' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => updateStatus(s.id)}
                disabled={updating || task.status === s.id}
                className={`flex items-center justify-between p-4 rounded-xl font-semibold transition-all ${
                  task.status === s.id 
                    ? `${s.color} ring-2 ring-current ring-offset-2` 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="flex items-center gap-3">{s.icon} {s.label}</span>
                {task.status === s.id && <FiCheckCircle />}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiCode className="text-indigo-600" /> Workspace Tips
          </h3>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Folder: <strong>{task.folder}</strong>
          </p>
          <p className="text-slate-600 mb-4 leading-relaxed text-sm">
            1. Open VS Code to start coding.
          </p>
          <p className="text-slate-600 mb-4 leading-relaxed text-sm">
            2. Import your component in <code>AppRoutes.jsx</code>.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm italic border-l-4 border-indigo-100 pl-4">
            "Your workspace is ready. Every line of code brings you closer to mastery."
          </p>
        </div>
      </div>
    </div>
  );
}
