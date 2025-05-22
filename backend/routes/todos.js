const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const { summarizeTodos } = require("../utils/openai");
const { sendToSlack } = require("../utils/slack");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET todos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /todos error:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST todos
router.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }
    const result = await pool.query(
      "INSERT INTO todos (task) VALUES ($1) RETURNING *",
      [task]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("POST /todos error:", err);
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// DELETE todos
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /todos/:id error:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Edit todos
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required for update" });
    }

    const result = await pool.query(
      "UPDATE todos SET task = $1 WHERE id = $2 RETURNING *",
      [task, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /todos/:id error:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// POST summarize
router.post("/summarize", async (req, res) => {
  try {
    const result = await pool.query("SELECT task FROM todos");
    const todos = result.rows.map((row) => row.task);

    const summary = await summarizeTodos(todos);
    await sendToSlack(summary);
    res.json({ message: "Summary sent to Slack", summary });
  } catch (err) {
    console.error("POST /todos/summarize error:", err);
    res.status(500).json({ error: "Failed to summarize or send to Slack" });
  }
});

module.exports = router;
