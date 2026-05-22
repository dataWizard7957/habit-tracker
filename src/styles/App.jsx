import React, { useEffect } from "react";
import Header from "./components/Header";
import HabitList from "./components/HabitList";
import EmptyState from "./components/EmptyState";
import { useHabits } from "./hooks/useHabits";

export default function App() {
  // Initialize theme from localStorage on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const {
    habits,
    weekDays,
    weekOffset,
    nextWeek,
    prevWeek,
    resetWeek,
    addHabit,
    deleteHabit,
    renameHabit,
    toggleCheckin
  } = useHabits();

  return (
    <div className="app">
      <Header 
        weekOffset={weekOffset} 
        prevWeek={prevWeek} 
        nextWeek={nextWeek} 
        resetWeek={resetWeek}
        weekDays={weekDays} 
      />

      {habits.length === 0 ? (
        <EmptyState onAdd={addHabit} />
      ) : (
        <HabitList
          habits={habits}
          weekDays={weekDays}
          addHabit={addHabit}
          deleteHabit={deleteHabit}
          renameHabit={renameHabit}
          toggleCheckin={toggleCheckin}
        />
      )}
    </div>
  );
}
