import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/Card";
import { Goal } from "../../types";

export const GoalCard = ({ goal }: any) => (
  <Card className="group">
    <CardContent>
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
    </CardContent>
  </Card>
);
