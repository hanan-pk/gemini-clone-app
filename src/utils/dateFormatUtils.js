export function formatChatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();

  // Strip time for accurate date comparison
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const msInDay = 86400000;
  const diffDays = Math.floor((nowOnly - dateOnly) / msInDay);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return `${date.getDate()} ${date.toLocaleString("en-US", {
    month: "short",
  })}`; // eg: "2 Aug"
}
