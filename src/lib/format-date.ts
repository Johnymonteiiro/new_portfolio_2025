/**
 * Formats a date string (YYYY-MM-DD) or Date object for display in pt-BR locale.
 * Handles the "T00:00:00" timezone offset issue by appending it when a string is provided.
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "—";

  const d =
    typeof date === "string"
      ? new Date(date + "T00:00:00")
      : date;

  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
