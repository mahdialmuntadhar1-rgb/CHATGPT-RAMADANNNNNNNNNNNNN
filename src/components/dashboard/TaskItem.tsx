import { CheckCircle2, Circle, Trash2, MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import { Task } from "../../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: any) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-black/10 transition-all"
  >
    <button 
      onClick={() => onToggle(task.id, task.completed)}
      className={`transition-colors ${task.completed ? 'text-emerald-500' : 'text-gray-300 hover:text-gray-400'}`}
    >
      {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
    </button>
    
    <span className={`flex-1 font-medium transition-all ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
      {task.title}
    </span>

    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        onClick={() => onDelete(task.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
      >
        <Trash2 size={18} />
      </button>
      <button className="p-2 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-50">
        <MoreVertical size={18} />
      </button>
    </div>
  </motion.div>
);
