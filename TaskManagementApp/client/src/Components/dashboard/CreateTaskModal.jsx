import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function CreateTaskModal({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, status: 'todo' })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create task');
      }
      
      onCreated(data.task);
      setName('');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <div className="p-6 pb-0 flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create Workspace</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <form onSubmit={handleCreate} className="p-6">
          {error && <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{error}</div>}
          
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Workspace Name
            </label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Day 9"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 rounded-xl outline-none transition-all font-medium text-slate-900"
              disabled={loading}
            />
            <p className="text-xs text-slate-400 mt-2">
              This will create a new workspace to track your tasks.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] py-3 bg-brand-sidebar hover:bg-brand-sidebar-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex justify-center items-center"
              disabled={loading || !name.trim()}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                'Create Workspace'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
