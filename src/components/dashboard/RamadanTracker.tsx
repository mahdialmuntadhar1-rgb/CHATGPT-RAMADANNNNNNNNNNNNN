import { Moon, Sun, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/Card";

export const RamadanTracker = () => {
  // Mock data for Ramadan 2026
  const data = {
    day: 20,
    suhoor: "04:42 AM",
    iftar: "06:12 PM",
    progress: 66,
  };

  return (
    <Card className="bg-indigo-900 text-white border-none shadow-xl shadow-indigo-500/20">
      <CardHeader className="border-indigo-800/50">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <Moon size={16} className="text-amber-400" />
            Ramadan 1447 AH
          </h4>
          <span className="text-[10px] font-bold bg-indigo-800 px-2 py-1 rounded-full">Day {data.day}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-800/50 p-4 rounded-2xl border border-indigo-700/50">
            <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1">Suhoor</p>
            <div className="flex items-center gap-2">
              <Sun size={16} className="text-amber-400" />
              <span className="text-lg font-bold">{data.suhoor}</span>
            </div>
          </div>
          <div className="bg-indigo-800/50 p-4 rounded-2xl border border-indigo-700/50">
            <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1">Iftar</p>
            <div className="flex items-center gap-2">
              <Moon size={16} className="text-amber-400" />
              <span className="text-lg font-bold">{data.iftar}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-indigo-300">
            <span>Month Progress</span>
            <span>{data.progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-indigo-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"
              style={{ width: `${data.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-indigo-300 font-medium">
          <MapPin size={12} />
          <span>Baghdad, Iraq</span>
          <span className="mx-1">•</span>
          <Clock size={12} />
          <span>Next: Iftar in 4h 12m</span>
        </div>
      </CardContent>
    </Card>
  );
};
