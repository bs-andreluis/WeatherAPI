// storage.js
// Simple wrapper around localStorage for search history
const KEY = "weather_lookup_history_v1";


export function getHistory() {
try {
const raw = localStorage.getItem(KEY);
return raw ? JSON.parse(raw) : [];
} catch (e) {
return [];
}
}


export function saveSearch(city) {
try {
const list = getHistory();
// avoid duplicates keeping most recent first
const filtered = list.filter(c => c.toLowerCase() !== city.toLowerCase());
filtered.unshift(city);
// keep only last 8
localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, 8)));
} catch (e) {
// noop
}
}