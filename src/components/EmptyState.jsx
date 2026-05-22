import React, { useState } from "react";

export default function EmptyState({ onAdd }) {
  const [habitName, setHabitName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAdd(habitName); // This calls the addHabit function
      setHabitName(""); // Reset the input
    }
  };

  return (
    <div className="empty-state">
      <h2>No habits yet!</h2>
      <p>Start your streak by adding your first habit.</p>
      <form onSubmit={handleSubmit} className="add-habit-inline">
        <input 
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="e.g., Daily Coding"
        />
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
}
