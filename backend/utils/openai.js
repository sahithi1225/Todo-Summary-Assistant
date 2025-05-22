async function summarizeTodos(todos) {
  if (!todos || todos.length === 0) {
    return "You have no todos. Enjoy your free time!";
  }

  const total = todos.length;
  const preview = todos
    .slice(0, 3)
    .map((t, i) => `${i + 1}. ${t.task || t}`)
    .join("\n");

  return `You have ${total} todos in total.\nHere are a few:\n${preview}${total > 3 ? "\n...and more!" : ""}`;
}

module.exports = { summarizeTodos };
