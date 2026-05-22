import React from "react";

export default function DayCell({ isChecked, isToday, isDisabled, onToggle }) {
  // We use the class name "today" to match your components.css selector (.day-cell.today)
  const classNames = [
    "day-cell",
    isChecked ? "checked" : "",
    isToday ? "today" : "",
    isDisabled ? "disabled" : ""
  ].filter(Boolean).join(" ");

  return (
    <button 
      className={classNames}
      onClick={isDisabled ? undefined : onToggle}
      disabled={isDisabled}
      type="button"
      aria-label={isToday ? "Today's check-in" : "Check-in"}
    >
      {isChecked && <span className="day-cell-icon">✓</span>}
    </button>
  );
}
