import React, { useState, useEffect } from "react";
import { 
  CheckSquare, 
  Plus, 
  Calendar, 
  Filter
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { Task } from "../types";
import { TaskItem } from "../components/dashboard/TaskItem";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask })
      });
      const data = await res.json();
      setTasks([data, ...tasks]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (id: number, completed: boolean) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
      });
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Task Planner</h2>
          <p className="text-gray-500 mt-1">Organize your day and stay on track with your goals.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter size={20} />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar size={20} />
          </Button>
        </div>
      </header>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="relative">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-lg focus:ring-2 focus:ring-black/5 transition-all outline-none shadow-sm"
        />
        <Button
          type="submit"
          disabled={!newTask.trim()}
          className="absolute right-2 top-2 bottom-2"
        >
          Add Task
        </Button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          ))}
        </AnimatePresence>

        {!loading && tasks.length === 0 && (
          <Card className="text-center py-20 border-dashed">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="text-gray-300" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
            <p className="text-gray-500">You have no tasks remaining. Enjoy your free time!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
