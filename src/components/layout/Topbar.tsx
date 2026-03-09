import { Compass, Menu, Search, Bell } from "lucide-react";
import { Button } from "../ui/Button";

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-2">
        <Compass className="text-black" size={24} />
        <span className="font-bold text-lg tracking-tight">Absuuuun</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu size={24} />
        </Button>
      </div>
    </div>
  );
};
