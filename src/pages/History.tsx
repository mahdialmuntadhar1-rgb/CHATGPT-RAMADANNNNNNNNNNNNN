import { History, Clock, MessageSquare, Target, CheckSquare } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function HistoryPage() {
  const activities = [
    { id: 1, type: "chat", title: "Career Guidance Session", date: "Today, 10:45 AM", icon: MessageSquare, color: "text-emerald-500" },
    { id: 2, type: "goal", title: "Master React & TypeScript", date: "Yesterday, 4:20 PM", icon: Target, color: "text-blue-500", detail: "Progress updated to 75%" },
    { id: 3, type: "task", title: "Morning meditation", date: "Yesterday, 8:00 AM", icon: CheckSquare, color: "text-purple-500", detail: "Completed" },
    { id: 4, type: "chat", title: "Ramadan Productivity Tips", date: "2 days ago", icon: MessageSquare, color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Activity History</h2>
        <p className="text-gray-500 mt-1">Review your past sessions and progress updates.</p>
      </header>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="p-0 overflow-hidden">
            <CardContent className="p-6 flex items-center gap-6">
              <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 ${activity.color}`}>
                <activity.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-gray-900">{activity.title}</h4>
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    {activity.date}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{activity.detail || `Session in ${activity.type}`}</p>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-10">
        <Button variant="outline">Load More Activity</Button>
      </div>
    </div>
  );
}
