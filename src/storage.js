// STORAGE: tiny helpers around the browser's localStorage (taught in Week 6).
// localStorage only stores text, so we convert with JSON.stringify / JSON.parse.

// All the localStorage keys used by ClassVibe, in one place.
export const KEYS = {
  checkins: 'classvibe_checkins',
  votes: 'classvibe_votes',
  myVote: 'classvibe_myVote',
  suggestions: 'classvibe_suggestions',
  completed: 'classvibe_completed',
};

// Read a saved value. If nothing is saved (or it is broken), return the fallback.
export function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved === null ? fallback : JSON.parse(saved);
  } catch (error) {
    return fallback;
  }
}

// Save a value as text.
export function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Could not save to localStorage', error);
  }
}

// Remove every ClassVibe entry.
export function clearAllData() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
