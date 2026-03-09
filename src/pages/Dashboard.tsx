import { useState, useEffect } from "react";
import { 
  Target, 
  TrendingUp, 
  Clock, 
  Plus, 
  Compass,
  Zap,
  CheckCircle2
} from "lucide-react";
import { motion } from "motion/react";
import { Goal, Task } from "../types";
import { CompassChart } from "../components/dashboard/CompassChart";
import { GoalCard } from "../components/dashboard/GoalCard";
import { RamadanTracker } from "../components/dashboard/RamadanTracker";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";

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
        setTasks(tasksData.slice(0, 5));
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
          <h2 className="text-3xl font-bold tracking-tight">Marhaba, Mahdi.</h2>
          <p className="text-gray-500 mt-1">Your life compass is pointing towards growth today.</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          New Goal
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6">
              <div className={stat.color}>
                <stat.icon size={24} />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Goals Section */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Compass size={20} className="text-emerald-500" />
              Life Compass
            </h3>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black">View All</Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="sm:col-span-2">
              <CardHeader>
                <h4 className="font-bold text-sm text-gray-500 uppercase tracking-widest">Balance Overview</h4>
              </CardHeader>
              <CardContent>
                <CompassChart />
              </CardContent>
            </Card>

            {goals.length > 0 ? goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            )) : (
              <div className="col-span-2 py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">No active goals. Start by adding one!</p>
              </div>
            )}
          </div>
        </section>

        {/* Recent Activity / Tasks */}
        <section className="space-y-6">
          <RamadanTracker />
          
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 size={20} className="text-blue-500" />
              Quick Tasks
            </h3>
          </div>

          <Card className="p-6 space-y-4">
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
            <Button variant="outline" className="w-full border-dashed mt-4">
              + Add Quick Task
            </Button>
          </Card>

          {/* AI Tip Card */}
          <Card className="bg-emerald-50 border-emerald-100 p-6">
            <div className="flex items-center gap-2 text-emerald-700 mb-2">
              <TrendingUp size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">AI Insight</span>
            </div>
            <p className="text-sm text-emerald-900 font-medium leading-relaxed">
              "Marhaba! You've been very consistent with your Health goals. Try to balance it with some Social activities this weekend."
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
