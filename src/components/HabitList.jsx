import React, { useState } from "react";
import HabitRow from "./HabitRow";

// -------------------------------------------------------------
// Sub-Component: Grid Column Header
// -------------------------------------------------------------
function WeekGridHeader({ weekDays }) {
  const daysOfWeekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="habit-row header-row">
      {/* Structural spacer matching .habit-meta-cell width exactly */}
      <div className="habit-meta-spacer"></div>

      <div className="days-grid-row">
        {weekDays.map((dayDateString) => {
          const dateObj = new Date(dayDateString);
          let dayIndex = dateObj.getDay() - 1;
          if (dayIndex < 0) dayIndex = 6;

          const todayStr = new Date().toISOString().split("T")[0];
          const isToday = dayDateString === todayStr;

          return (
            <div key={dayDateString} className={`grid-header-cell ${isToday ? "active-day" : ""}`}>
              <span className="day-label">{daysOfWeekLabels[dayIndex]}</span>
              <span className="date-number">{dateObj.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Main Component: Habit Container Management
// -------------------------------------------------------------
export default function HabitList({ habits, weekDays, addHabit, deleteHabit, renameHabit, toggleCheckin }) {
  const [newHabitName, setNewHabitName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit(newHabitName.trim());
    setNewHabitName("");
  };

  return (
    <div className="habit-container">
      <form onSubmit={handleSubmit} className="add-habit-inline">
        <input 
          type="text" 
          placeholder="Add a new habit..." 
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
        />
        <button type="submit">Add Habit</button>
      </form>

      <div className="habit-grid-table">
        <WeekGridHeader weekDays={weekDays} />
        {habits.map((habit) => (
          <HabitRow 
            key={habit.id} 
            habit={habit} 
            weekDays={weekDays}
            onDelete={deleteHabit}
            onRename={renameHabit}
            toggleCheckin={toggleCheckin}
          />
        ))}
      </div>
    </div>
  );
}
