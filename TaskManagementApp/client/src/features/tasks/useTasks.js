// Refactored useTasks hook to integrate with backend API
import { useState, useEffect, useCallback, useMemo } from "react";
import * as api from "./api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await api.fetchTasks();
        setTasks(data.tasks || []);
      } catch (e) {
        console.error("Failed to fetch tasks", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const normalized = useMemo(() => {
    // Assuming backend already returns normalized tasks
    return tasks;
  }, [tasks]);

  const addTask = useCallback(async (draft) => {
    const created = await api.createTask(draft);
    setTasks((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateTask = useCallback(async (id, patch) => {
    const updated = await api.updateTask(id, patch);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const removeTask = useCallback(async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleDone = useCallback(async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newStatus = task.status === "done" ? "open" : "done";
    await updateTask(id, { status: newStatus });
  }, [tasks, updateTask]);

  const clearCompleted = useCallback(async () => {
    const completedIds = tasks.filter((t) => t.status === "done").map((t) => t.id);
    await Promise.all(completedIds.map((id) => api.deleteTask(id)));
    setTasks((prev) => prev.filter((t) => t.status !== "done"));
  }, []);

  const exportTasks = useCallback(() => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      tasks: tasks,
    };
    return JSON.stringify(data, null, 2);
  }, [tasks]);

  const importTasks = useCallback((raw, { mode } = { mode: "merge" }) => {
    const parsed = JSON.parse(raw);
    const incoming = parsed?.tasks || [];
    setTasks((prev) => {
      if (mode === "replace") return incoming;
      const ids = new Set(prev.map((t) => t.id));
      const merged = [...prev];
      incoming.forEach((t) => {
        if (ids.has(t.id)) {
          // replace existing
          const idx = merged.findIndex((x) => x.id === t.id);
          if (idx >= 0) merged[idx] = t;
        } else {
          merged.push(t);
        }
      });
      return merged;
    });
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const open = tasks.filter((t) => t.status === "open").length;
    const done = tasks.filter((t) => t.status === "done").length;
    const today = new Date();
    const dueToday = tasks.filter((t) => {
      if (!t.dueDate || t.status !== "open") return false;
      const d = new Date(t.dueDate);
      return d.toDateString() === today.toDateString();
    }).length;
    return { total, open, done, dueToday };
  }, [tasks]);

  return {
    tasks: normalized,
    loading,
    stats,
    addTask,
    updateTask,
    removeTask,
    toggleDone,
    clearCompleted,
    exportTasks,
    importTasks,
  };
}
