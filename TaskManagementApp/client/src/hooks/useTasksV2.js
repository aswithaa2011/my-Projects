import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export function useTasksV2(dayId, workspaceId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(
    async (filters = {}) => {
      if (!dayId) return;
      setLoading(true);
      try {
        const { data } = await api.get(`/v2/tasks/day/${dayId}`, { params: filters });
        setTasks(data.tasks || []);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    },
    [dayId]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (payload) => {
    try {
      const { data } = await api.post("/v2/tasks", {
        ...payload,
        dayId,
        workspaceId,
      });
      setTasks((prev) => [data.task, ...prev]);
      toast.success("Task created!");
      return data.task;
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id, update) => {
    // Optimistic update
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, ...update } : t)));
    try {
      const { data } = await api.patch(`/v2/tasks/${id}`, update);
      setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
      if (update.status === "done") toast.success("Task completed! 🎉");
      return data.task;
    } catch (err) {
      // Rollback on error
      fetchTasks();
      toast.error(err.response?.data?.error || "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/v2/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete task");
    }
  };

  const clearCompleted = async () => {
    const ids = tasks.filter((t) => t.status === "done").map((t) => t._id);
    if (ids.length === 0) return;
    try {
      await api.post("/v2/tasks/bulk", { action: "clear-completed", ids });
      setTasks((prev) => prev.filter((t) => t.status !== "done"));
      toast.success(`Cleared ${ids.length} completed tasks`);
    } catch (err) {
      toast.error("Failed to clear completed tasks");
    }
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    clearCompleted,
    refetch: fetchTasks,
  };
}
