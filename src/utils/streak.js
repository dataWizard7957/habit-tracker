import { subDays, format } from "date-fns";

export function calculateStreak(checkins) {
  let streak = 0;
  let day = new Date();
  
  const todayKey = format(day, "yyyy-MM-dd");
  const yesterdayKey = format(subDays(day, 1), "yyyy-MM-dd");

  // Case 1: Neither today nor yesterday is checked -> Streak is officially broken
  if (!checkins?.[todayKey] && !checkins?.[yesterdayKey]) {
    return 0;
  }

  // Case 2: Today is unchecked but yesterday IS checked -> Start counting from yesterday
  if (!checkins?.[todayKey] && checkins?.[yesterdayKey]) {
    day = subDays(day, 1);
  }

  // Loop backward through time day-by-day
  while (true) {
    const key = format(day, "yyyy-MM-dd");

    if (!checkins?.[key]) break; // Hit a missing day? Stop counting immediately.

    streak++;
    day = subDays(day, 1); // Move back exactly 1 day segment
  }

  return streak;
}
