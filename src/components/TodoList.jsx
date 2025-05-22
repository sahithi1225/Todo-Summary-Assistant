import React, { useState } from "react";

export default function TodoList({ todos, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function startEditing(todo) {
    setEditingId(todo.id);
    setEditValue(todo.task);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditValue("");
  }

  async function saveEdit(id) {
    if (editValue.trim() === "") return; // don't allow empty
    await onEdit(id, editValue.trim());
    setEditingId(null);
    setEditValue("");
  }

  return (
    <ul style={styles.list}>
      {todos.map(todo => (
        <li key={todo.id} style={styles.item}>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                style={styles.input}
                onKeyDown={e => {
                  if (e.key === "Enter") saveEdit(todo.id);
                  if (e.key === "Escape") cancelEditing();
                }}
                autoFocus
              />
              <button onClick={() => saveEdit(todo.id)} style={styles.saveBtn}>Save</button>
              <button onClick={cancelEditing} style={styles.cancelBtn}>Cancel</button>
            </>
          ) : (
            <>
              <span style={styles.taskText}>{todo.task}</span>
              <div>
                <button onClick={() => startEditing(todo)} style={styles.editBtn}>Edit</button>
                <button onClick={() => onDelete(todo.id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 6,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  taskText: {
    flexGrow: 1,
    fontSize: "1rem",
    color: "#333",
    userSelect: "none",
  },
  input: {
    flexGrow: 1,
    fontSize: "1rem",
    padding: "6px 8px",
    borderRadius: 4,
    border: "1px solid #ccc",
    marginRight: 8,
  },
  editBtn: {
    marginRight: 8,
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    padding: "5px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    padding: "5px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
  saveBtn: {
    marginRight: 8,
    backgroundColor: "#388e3c",
    color: "white",
    border: "none",
    padding: "5px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#757575",
    color: "white",
    border: "none",
    padding: "5px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
};
