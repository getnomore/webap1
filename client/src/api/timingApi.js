const BASE = '/api/timing';

async function apiFetch(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const fetchAudiences = () => apiFetch('/audiences');
export const fetchTimezones = () => apiFetch('/timezones');
export const fetchHeatmap = (audience, timezone) =>
  apiFetch(`/heatmap?audience=${audience}&timezone=${encodeURIComponent(timezone)}`);
export const fetchTopSlots = (audience, timezone, limit = 5) =>
  apiFetch(`/top-slots?audience=${audience}&timezone=${encodeURIComponent(timezone)}&limit=${limit}`);
export const fetchDayBreakdown = (audience, timezone, day) =>
  apiFetch(`/day-breakdown?audience=${audience}&timezone=${encodeURIComponent(timezone)}&day=${encodeURIComponent(day)}`);
export const fetchTips = (audience) => apiFetch(`/tips?audience=${audience}`);
