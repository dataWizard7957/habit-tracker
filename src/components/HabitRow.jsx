import React, { useState } from "react";
import WeekGrid from "./WeekGrid"; 
import { calculateStreak } from "../utils/streak";

export default function HabitRow({ habit, weekDays, onDelete, onRename, toggleCheckin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);
  
  // Calculate today's date string once here to pass down
  const todayStr = new Date().toISOString().split("T")[0];

  const handleSaveRename = () => {
    onRename(habit.id, editName);
    setIsEditing(false);
  };

  const streakCount = calculateStreak(habit.checkins); 

  return (
    <div className="habit-row">
      <div className="habit-meta-cell">
        {isEditing ? (
          <input 
            className="rename-input"
            value={editName} 
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveRename}
            onKeyDown={(e) => e.key === "Enter" && handleSaveRename()}
            autoFocus
          />
        ) : (
          <span className="habit-name" onDoubleClick={() => setIsEditing(true)}>
            {habit.name}
          </span>
        )}

        <div className="habit-actions">
          <button onClick={() => setIsEditing(!isEditing)} className="btn-quiet" type="button">✏️</button>
          <button onClick={() => onDelete(habit.id)} className="btn-quiet btn-danger" type="button">🗑️</button>
        </div>
        
        <span className="streak-badge">🔥 {streakCount}</span>
      </div>

      <WeekGrid 
        habit={habit} 
        weekDays={weekDays} 
        toggleCheckin={toggleCheckin}
        todayStr={todayStr} // PASSING TODAY'S DATE
      />
    </div>
  );
}
