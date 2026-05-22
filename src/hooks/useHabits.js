import { useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { load, save } from "../utils/storage";
import { getWeekDays } from "../utils/date";

// Safe hydration with explicit defaults
const savedData = load();
const initialState = {
  habits: savedData?.habits || [],
  weekOffset: 0 // Always initialize at 0 so today is current on app load
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        habits: [
          ...state.habits,
          {
            id: uuid(),
            name: action.payload,
            createdAt: Date.now(),
            checkins: {}
          }
        ]
      };

    case "DELETE":
      return {
        ...state,
        habits: state.habits.filter(h => h.id !== action.payload)
      };

    case "RENAME":
      return {
        ...state,
        habits: state.habits.map(h =>
          h.id === action.payload.id
            ? { ...h, name: action.payload.name }
            : h
        )
      };

    case "TOGGLE":
      return {
        ...state,
        habits: state.habits.map(h => {
          if (h.id !== action.payload.id) return h;
          const prev = h.checkins?.[action.payload.date];
          return {
            ...h,
            checkins: {
              ...h.checkins,
              [action.payload.date]: !prev
            }
          };
        })
      };

    case "SET_WEEK":
      return {
        ...state,
        weekOffset: action.payload
      };

    case "RESET_WEEK":
      return {
        ...state,
        weekOffset: 0
      };

    default:
      return state;
  }
}

export function useHabits() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Only persist the structural habit history data, not tracking offsets
  useEffect(() => {
    save({ habits: state.habits });
  }, [state.habits]);

  return {
    habits: state.habits,
    weekOffset: state.weekOffset,
    weekDays: getWeekDays(state.weekOffset),

    addHabit: (name) => dispatch({ type: "ADD", payload: name }),
    deleteHabit: (id) => dispatch({ type: "DELETE", payload: id }),
    renameHabit: (id, name) => dispatch({ type: "RENAME", payload: { id, name } }),
    toggleCheckin: (id, date) => dispatch({ type: "TOGGLE", payload: { id, date } }),
    
    // Explicit navigation controls for your header buttons
    nextWeek: () => dispatch({ type: "SET_WEEK", payload: state.weekOffset + 1 }),
    prevWeek: () => dispatch({ type: "SET_WEEK", payload: state.weekOffset - 1 }),
    resetWeek: () => dispatch({ type: "RESET_WEEK" })
  };
}
