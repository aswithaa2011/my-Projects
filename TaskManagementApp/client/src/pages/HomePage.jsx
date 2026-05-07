import React, { useState, useEffect } from "react";
import SummaryCard from "../components/dashboard/SummaryCard";
import DayCard from "../components/dashboard/DayCard";
import CreateTaskModal from "../components/dashboard/CreateTaskModal";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Calculate stats
  const done = tasks.filter(t => t.status === 'done').length;
  const active = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;

  return (
    <div className="flex flex-col gap-10">
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreated={handleTaskCreated} 
      />

      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[2.5rem] font-bold text-slate-900 tracking-tight leading-none">
            Good morning, <span className="text-brand-pink font-serif italic pr-2">Sprint</span>
          </h1>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-sidebar hover:bg-brand-sidebar-hover text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-all transform hover:scale-105"
        >
          + Create New Task
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Completed" count={done} variant="completed" />
        <SummaryCard title="In Progress" count={active} variant="inProgress" />
        <SummaryCard title="To Do" count={todo} variant="todo" />
      </div>

      {/* Days Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-bold animate-pulse">Loading Workspaces...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <DayCard 
              key={task._id}
              task={task}
            />
          ))}
        </div>
      )}
    </div>
  );
}


