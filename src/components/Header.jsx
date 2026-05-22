import React from "react";

export default function Header({ weekOffset, prevWeek, nextWeek, resetWeek, weekDays }) {
  const currentYear = new Date().getFullYear();

  // Theme toggle logic with persistence
  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem("app-theme", newTheme); // Persistence
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const options = { month: 'short', day: 'numeric', year: year !== currentYear ? 'numeric' : undefined };
    return date.toLocaleDateString('en-US', options);
  };

  const firstDay = formatDate(weekDays?.[0]);
  const lastDay = formatDate(weekDays?.[6]);
  const displayYear = weekDays?.[0] ? new Date(weekDays[0]).getFullYear() : currentYear;

  return (
    <div className="header">
      <div>
        <h1>Habit Tracker</h1>
        {firstDay && lastDay && (
          <p className="week-range-indicator">
            {firstDay} — {lastDay} {displayYear !== currentYear ? "" : currentYear}
          </p>
        )}
      </div>

      <div className="nav">
        {/* Theme Toggle Button */}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
           🌙
        </button>

        <button className="btn-nav" onClick={prevWeek} aria-label="Previous Week">←</button>
        <button 
          className="btn-nav"
          onClick={resetWeek} 
          disabled={weekOffset === 0}
        >
          Today
        </button>
        <button 
          className="btn-nav"
          onClick={nextWeek} 
          disabled={weekOffset >= 0}
          aria-label="Next Week"
        >
          →
        </button>
      </div>
    </div>
  );
}
