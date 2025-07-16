export function getMissingFields({ title, description, dueDate }) {
  const missing = [];
  if (title.trim() === "") {
    missing.push("Title");
  }
  if (description.trim() === "") {
    missing.push("Description");
  }
  if (dueDate.trim() === "") {
    missing.push("Due Date");
  }
  return missing;
}