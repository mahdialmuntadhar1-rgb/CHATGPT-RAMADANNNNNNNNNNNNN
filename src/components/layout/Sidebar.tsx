import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageSquare, 
  CheckSquare, 
  User, 
  Settings, 
  Compass,
  History,
  LogOut
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../ui/Button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: MessageSquare, label: "AI Navigator", path: "/chat" },
  { icon: CheckSquare, label: "Task Planner", path: "/tasks" },
  { icon: History, label: "History", path: "/history" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 p-6 border-r border-gray-200 bg-white sticky top-0 h-screen">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
          <Compass className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Absuuuun</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                active ? "bg-black text-white shadow-lg" : "text-gray-500 hover:bg-gray-100 hover:text-black"
              )}>
                <item.icon size={20} className={cn("transition-transform duration-200", active ? "scale-110" : "group-hover:scale-110")} />
                <span className="font-medium">{item.label}</span>
                {active && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">Mahdi Al-Muntadhar</p>
            <p className="text-xs text-gray-500 truncate">Explorer Mode</p>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};
