import { addDays, startOfWeek, format } from "date-fns";

export function getWeekDays(offset = 0) {
  const base = addDays(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    offset * 7
  );

  return Array.from({ length: 7 }).map((_, i) =>
    format(addDays(base, i), "yyyy-MM-dd")
  );
}

export function getToday() {
  return format(new Date(), "yyyy-MM-dd");
}
