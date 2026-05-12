import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkspaces = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/workspaces");
      setWorkspaces(data.workspaces || []);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to load workspaces");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const createWorkspace = async (payload) => {
    try {
      const { data } = await api.post("/workspaces", payload);
      setWorkspaces((prev) => [data.workspace, ...prev]);
      toast.success("Workspace created!");
      return data.workspace;
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create workspace");
      throw err;
    }
  };

  const deleteWorkspace = async (id) => {
    try {
      await api.delete(`/workspaces/${id}`);
      setWorkspaces((prev) => prev.filter((w) => w._id !== id));
      toast.success("Workspace deleted");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete workspace");
    }
  };

  return { workspaces, loading, createWorkspace, deleteWorkspace, refetch: fetchWorkspaces };
}
