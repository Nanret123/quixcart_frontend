import { format } from "date-fns";

export const getFormattedDate = (date: string | Date) => {
  const parsedDate = new Date(date);

  return {
    year: format(parsedDate, "yyyy"), // e.g., "2025"
    month: format(parsedDate, "MMMM"), // e.g., "February"
    day: format(parsedDate, "dd"), // e.g., "20"
  };
};