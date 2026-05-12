import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export function useDays(workspaceId) {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDays = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const { data } = await api.get(`/days/${workspaceId}`);
      setDays(data.days || []);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to load days");
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    fetchDays();
  }, [fetchDays]);

  const createDay = async (label) => {
    try {
      const { data } = await api.post("/days", { label, workspaceId });
      setDays((prev) => [...prev, data.day]);
      toast.success(`${label} created!`);
      return data.day;
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create day");
      throw err;
    }
  };

  const deleteDay = async (id) => {
    try {
      await api.delete(`/days/${id}`);
      setDays((prev) => prev.filter((d) => d._id !== id));
      toast.success("Day deleted");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete day");
    }
  };

  return { days, loading, createDay, deleteDay, refetch: fetchDays };
}
