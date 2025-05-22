import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
export async function getTodos() {
  const res = await axios.get(`${API_BASE}/todos`);
  return res.data;
}
export async function addTodo(todo) {
  const res = await axios.post(`${API_BASE}/todos`, todo);
  return res.data;
}
export async function deleteTodo(id) {
  await axios.delete(`${API_BASE}/todos/${id}`);
}
export async function updateTodo(id, updatedTask) {
  const res = await axios.put(`${API_BASE}/todos/${id}`, { task: updatedTask });
  return res.data;
}
export async function summarizeTodos() {
  const res = await axios.post(`${API_BASE}/todos/summarize`);
  return res.data;
}
