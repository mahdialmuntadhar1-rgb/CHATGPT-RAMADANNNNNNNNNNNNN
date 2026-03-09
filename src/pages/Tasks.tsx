import React, { useState, useEffect } from "react";
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Calendar, 
  Filter,
  MoreVertical,
  CheckCircle2,
  Circle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

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
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-black transition-colors">
            <Filter size={20} />
          </button>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-black transition-colors">
            <Calendar size={20} />
          </button>
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
        <button
          type="submit"
          disabled={!newTask.trim()}
          className="absolute right-2 top-2 bottom-2 px-6 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-black/10 transition-all"
            >
              <button 
                onClick={() => toggleTask(task.id, task.completed)}
                className={`transition-colors ${task.completed ? 'text-emerald-500' : 'text-gray-300 hover:text-gray-400'}`}
              >
                {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
              
              <span className={`flex-1 font-medium transition-all ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {task.title}
              </span>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-50">
                  <MoreVertical size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!loading && tasks.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="text-gray-300" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
            <p className="text-gray-500">You have no tasks remaining. Enjoy your free time!</p>
          </div>
        )}
      </div>
    </div>
  );
}
