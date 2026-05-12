export async function fetchTasks() {
  const res = await fetch('http://localhost:5000/api/tasks');
  const data = await res.json();
  if (!data.success) throw new Error('Failed to fetch tasks');
  return data.tasks;
}

export async function createTask(task) {
  const res = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to create task');
  return data.task;
}

export async function updateTask(id, updates) {
  const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to update task');
  return data.task;
}

export async function deleteTask(id) {
  const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to delete task');
  return data;
}
