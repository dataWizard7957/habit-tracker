const KEY = "habit-tracker-v1";

export function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {
      habits: [],
      weekOffset: 0
    };
  } catch {
    return { habits: [], weekOffset: 0 };
  }
}

export function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
