export function makeId() {
  try {
    return crypto.randomUUID();
  } catch {
    return String(Date.now() + Math.random());
  }
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function parseDateInput(value) {
  if (!value) return null;
  const d = new Date(value);
  // `YYYY-MM-DD` parses as UTC in some engines; normalize via components.
  const [y, m, day] = value.split("-").map(Number);
  if (Number.isFinite(y) && Number.isFinite(m) && Number.isFinite(day)) {
    return new Date(y, m - 1, day);
  }
  return Number.isNaN(d.getTime()) ? null : d;
}

