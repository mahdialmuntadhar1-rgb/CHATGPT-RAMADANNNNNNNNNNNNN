import { useState, useEffect } from "react";
import { 
  Target, 
  TrendingUp, 
  Clock, 
  Plus, 
  ArrowUpRight,
  Compass,
  Zap,
  CheckCircle2,
  CheckSquare
} from "lucide-react";
import { motion } from "motion/react";

interface Goal {
  id: number;
  title: string;
  progress: number;
  category: string;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalsRes, tasksRes] = await Promise.all([
          fetch("/api/goals"),
          fetch("/api/tasks")
        ]);
        const goalsData = await goalsRes.json();
        const tasksData = await tasksRes.json();
        setGoals(goalsData);
        setTasks(tasksData.slice(0, 5)); // Show only top 5 recent tasks
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Active Goals", value: goals.length, icon: Target, color: "text-blue-500" },
    { label: "Tasks Done", value: tasks.filter(t => t.completed).length, icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Focus Score", value: "84%", icon: Zap, color: "text-amber-500" },
    { label: "Days Active", value: "12", icon: Clock, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Good morning, Mahdi.</h2>
          <p className="text-gray-500 mt-1">Here's what's happening on your life compass today.</p>
        </div>
        <button className="bg-black text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg shadow-black/5">
          <Plus size={18} />
          New Goal
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className={stat.color}>
              <stat.icon size={24} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Goals Section */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Compass size={20} className="text-emerald-500" />
              Life Goals
            </h3>
            <button className="text-sm font-semibold text-gray-400 hover:text-black transition-colors">View All</button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {goals.length > 0 ? goals.map((goal) => (
              <div key={goal.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group hover:border-black/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-wider rounded-full text-gray-500">
                    {goal.category}
                  </span>
                  <ArrowUpRight size={16} className="text-gray-300 group-hover:text-black transition-colors" />
                </div>
                <h4 className="font-bold text-lg mb-4">{goal.title}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-gray-500">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      className="h-full bg-black rounded-full"
                    />
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-2 py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">No active goals. Start by adding one!</p>
              </div>
            )}
          </div>
        </section>

        {/* Recent Activity / Tasks */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckSquare size={20} className="text-blue-500" />
              Quick Tasks
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            {tasks.length > 0 ? tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 group">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-black border-black' : 'border-gray-200 group-hover:border-gray-400'}`}>
                  {task.completed && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <span className={`text-sm font-medium flex-1 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {task.title}
                </span>
              </div>
            )) : (
              <p className="text-sm text-gray-400 text-center py-4">No tasks for today.</p>
            )}
            <button className="w-full py-3 border-2 border-dashed border-gray-100 rounded-xl text-sm font-semibold text-gray-400 hover:border-gray-200 hover:text-gray-600 transition-all mt-4">
              + Add Quick Task
            </button>
          </div>

          {/* AI Tip Card */}
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-700 mb-2">
              <TrendingUp size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">AI Insight</span>
            </div>
            <p className="text-sm text-emerald-900 font-medium leading-relaxed">
              "You're most productive between 9 AM and 11 AM. Try scheduling your 'Deep Work' for tomorrow morning."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
