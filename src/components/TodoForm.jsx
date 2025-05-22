import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [task, setTask] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd({ task: task.trim() });
    setTask("");
  }

  return (
    <form onSubmit={submit} style={styles.form}>
      <input
        type="text"
        placeholder="Add new todo..."
        value={task}
        onChange={e => setTask(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    marginTop: "1rem",
  },
  input: {
    flexGrow: 1,
    padding: "8px 12px",
    fontSize: "1rem",
    borderRadius: 6,
    border: "1px solid #ccc",
    marginRight: 8,
  },
  button: {
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "600",
  },
};
