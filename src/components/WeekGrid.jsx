import React from "react";
import DayCell from "./DayCell";

/**
 * WeekGrid Component
 * Responsible for mapping habit check-in data to individual cell components.
 */
export default function WeekGrid({ habit, weekDays, toggleCheckin }) {
  // 1. Establish today's exact date template string (YYYY-MM-DD)
  // This matches the format typically used in your weekDays array.
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="days-grid-row">
      {weekDays.map((dateString) => {
        // 2. Check if the date exists and is true in the habit's checkin data
        // We use the optional chaining operator to handle potential undefined checkins
        const isChecked = !!habit.checkins?.[dateString]; 
        
        // 3. Define the chronological status for each cell
        const isToday = dateString === todayStr;
        const isFutureDay = dateString > todayStr;

        // 4. Render the individual cell with the calculated state
        return (
          <DayCell
            key={dateString}
            dateStr={dateString}
            isChecked={isChecked}
            isToday={isToday}        // Now passed to DayCell for class naming
            isDisabled={isFutureDay} // Future days are visually locked/disabled
            onToggle={() => toggleCheckin(habit.id, dateString)}
          />
        );
      })}
    </div>
  );
}
