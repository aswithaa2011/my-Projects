import { useMemo } from "react";
import { useLocalStorageState } from "../../shared/hooks/useLocalStorageState";
import { isSameDay, makeId, parseDateInput } from "./utils";

const STORAGE_KEY = "tm.tasks.v1";

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeTask(input) {
  const now = Date.now();
  return {
    id: input.id ?? makeId(),
    title: String(input.title ?? "").trim(),
    notes: String(input.notes ?? "").trim(),
    tags: Array.isArray(input.tags)
      ? input.tags
          .map((t) => String(t).trim())
          .filter(Boolean)
          .slice(0, 12)
      : [],
    priority: input.priority ?? "medium", // low | medium | high
    status: input.status ?? "open", // open | done
    dueDate: input.dueDate ?? null, // YYYY-MM-DD | null
    createdAt: input.createdAt ?? now,
    updatedAt: input.updatedAt ?? now,
  };
}

function sortTasks(a, b) {
  // open first, then due date (nearest), then updated desc
  if (a.status !== b.status) return a.status === "open" ? -1 : 1;

  const ad = a.dueDate ? parseDateInput(a.dueDate) : null;
  const bd = b.dueDate ? parseDateInput(b.dueDate) : null;
  if (ad && bd) return ad.getTime() - bd.getTime();
  if (ad && !bd) return -1;
  if (!ad && bd) return 1;

  return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
}

export function useTasks() {
  const [tasks, setTasks] = useLocalStorageState(STORAGE_KEY, []);

  const normalized = useMemo(
    () => (Array.isArray(tasks) ? tasks.map(normalizeTask).sort(sortTasks) : []),
    [tasks],
  );

  const actions = useMemo(() => {
    return {
      addTask: (draft) => {
        const t = normalizeTask({
          title: draft.title,
          notes: draft.notes,
          tags: draft.tags,
          priority: draft.priority,
          dueDate: draft.dueDate || null,
          status: "open",
        });
        setTasks((prev) => [t, ...(Array.isArray(prev) ? prev : [])]);
        return t;
      },
      updateTask: (id, patch) => {
        const now = Date.now();
        setTasks((prev) =>
          (Array.isArray(prev) ? prev : []).map((t) =>
            t.id === id ? normalizeTask({ ...t, ...patch, updatedAt: now }) : t,
          ),
        );
      },
      removeTask: (id) => {
        setTasks((prev) => (Array.isArray(prev) ? prev : []).filter((t) => t.id !== id));
      },
      toggleDone: (id) => {
        const now = Date.now();
        setTasks((prev) =>
          (Array.isArray(prev) ? prev : []).map((t) => {
            if (t.id !== id) return t;
            const next = t.status === "done" ? "open" : "done";
            return normalizeTask({ ...t, status: next, updatedAt: now });
          }),
        );
      },
      clearCompleted: () => {
        setTasks((prev) => (Array.isArray(prev) ? prev : []).filter((t) => t.status !== "done"));
      },
      exportTasks: () => {
        const data = {
          version: 1,
          exportedAt: new Date().toISOString(),
          tasks: safeArray(tasks),
        };
        return JSON.stringify(data, null, 2);
      },
      importTasks: (raw, { mode } = { mode: "merge" }) => {
        const parsed = JSON.parse(raw);
        const incoming = safeArray(parsed?.tasks).map(normalizeTask);
        setTasks((prev) => {
          const current = safeArray(prev).map(normalizeTask);
          if (mode === "replace") return incoming;

          // merge (by id) - incoming wins
          const byId = new Map(current.map((t) => [t.id, t]));
          for (const t of incoming) byId.set(t.id, t);
          return Array.from(byId.values());
        });
      },
    };
  }, [setTasks, tasks]);

  const stats = useMemo(() => {
    const total = normalized.length;
    const open = normalized.filter((t) => t.status === "open").length;
    const done = normalized.filter((t) => t.status === "done").length;
    const today = new Date();
    const dueToday = normalized.filter((t) => {
      if (!t.dueDate || t.status !== "open") return false;
      const d = parseDateInput(t.dueDate);
      if (!d) return false;
      return isSameDay(d, today);
    }).length;

    return { total, open, done, dueToday };
  }, [normalized]);

  return { tasks: normalized, stats, ...actions };
}

