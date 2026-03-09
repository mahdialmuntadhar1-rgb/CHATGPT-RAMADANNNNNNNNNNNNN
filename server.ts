import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("absuuuun.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed data if empty
const taskCount = db.prepare("SELECT COUNT(*) as count FROM tasks").get() as { count: number };
if (taskCount.count === 0) {
  db.prepare("INSERT INTO tasks (title, completed) VALUES (?, ?)").run("Complete project proposal", 1);
  db.prepare("INSERT INTO tasks (title, completed) VALUES (?, ?)").run("Review life compass goals", 0);
  db.prepare("INSERT INTO tasks (title, completed) VALUES (?, ?)").run("Morning meditation", 1);
}

const goalCount = db.prepare("SELECT COUNT(*) as count FROM goals").get() as { count: number };
if (goalCount.count === 0) {
  db.prepare("INSERT INTO goals (title, progress, category) VALUES (?, ?, ?)").run("Master React & TypeScript", 75, "Career");
  db.prepare("INSERT INTO goals (title, progress, category) VALUES (?, ?, ?)").run("Run a Half Marathon", 40, "Health");
  db.prepare("INSERT INTO goals (title, progress, category) VALUES (?, ?, ?)").run("Learn Arabic Calligraphy", 20, "Hobby");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/tasks", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks ORDER BY created_at DESC").all();
    res.json(tasks);
  });

  app.post("/api/tasks", (req, res) => {
    const { title } = req.body;
    const info = db.prepare("INSERT INTO tasks (title) VALUES (?)").run(title);
    res.json({ id: info.lastInsertRowid, title, completed: 0 });
  });

  app.patch("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    db.prepare("UPDATE tasks SET completed = ? WHERE id = ?").run(completed ? 1 : 0, id);
    res.json({ success: true });
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.get("/api/goals", (req, res) => {
    const goals = db.prepare("SELECT * FROM goals ORDER BY created_at DESC").all();
    res.json(goals);
  });

  app.post("/api/goals", (req, res) => {
    const { title, category } = req.body;
    const info = db.prepare("INSERT INTO goals (title, category) VALUES (?, ?)").run(title, category);
    res.json({ id: info.lastInsertRowid, title, category, progress: 0 });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
