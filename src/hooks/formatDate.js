/**
 * formatDate
 * ISO string ko "12 Jun 2024" format mein convert karta hai.
 */
export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
