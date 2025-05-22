import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import SummaryButton from "./components/SummaryButton.jsx";
import { getTodos, addTodo, deleteTodo, updateTodo, summarizeTodos } from "./api/api.js";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch {
      setMessage({ type: "error", text: "Failed to load todos." });
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTodo(todo) {
    try {
      const newTodo = await addTodo(todo);
      setTodos(prev => [...prev, newTodo]);
      setMessage({ type: "success", text: "Todo added!" });
    } catch {
      setMessage({ type: "error", text: "Failed to add todo." });
    }
  }

  async function handleDeleteTodo(id) {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setMessage({ type: "success", text: "Todo deleted!" });
    } catch {
      setMessage({ type: "error", text: "Failed to delete todo." });
    }
  }

  async function handleEditTodo(id, newTask) {
    try {
      const updated = await updateTodo(id, newTask);
      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
      setMessage({ type: "success", text: "Todo updated!" });
    } catch {
      setMessage({ type: "error", text: "Failed to update todo." });
    }
  }

  async function handleSummarize() {
    setLoading(true);
    setMessage(null);
    try {
      await summarizeTodos();
      setMessage({ type: "success", text: "Summary sent to Slack!" });
    } catch {
      setMessage({ type: "error", text: "Failed to send summary." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo Summary Assistant</h1>
      
      {message && (
        <div
          style={{
            ...styles.message,
            ...(message.type === "error" ? styles.error : styles.success),
          }}
        >
          {message.text}
        </div>
      )}

      <TodoForm onAdd={handleAddTodo} />

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
      )}

      <SummaryButton onClick={handleSummarize} disabled={loading || todos.length === 0} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f7f9fc",
    borderRadius: 8,
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    padding: "1.5rem",
  },
  title: {
    textAlign: "center",
    color: "#222",
  },
  message: {
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: 5,
    fontWeight: "600",
    fontSize: "1rem",
  },
  error: {
    backgroundColor: "#ffe3e3",
    color: "#cc0000",
    border: "1px solid #cc0000",
  },
  success: {
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #155724",
  },
  loading: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#555",
  },
};
