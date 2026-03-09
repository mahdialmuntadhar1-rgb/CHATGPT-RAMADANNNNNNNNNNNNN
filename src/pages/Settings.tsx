import { Settings, Moon, Sun, Globe, Lock, Eye, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

export default function SettingsPage() {
  const sections = [
    {
      title: "Appearance",
      items: [
        { icon: Moon, label: "Dark Mode", description: "Switch between light and dark themes", action: "Toggle" },
        { icon: Sun, label: "System Theme", description: "Sync with your device settings", action: "Toggle" },
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { icon: Lock, label: "Password", description: "Change your account password", action: "Button" },
        { icon: Eye, label: "Visibility", description: "Manage who can see your goals", action: "Select" },
      ]
    },
    {
      title: "General",
      items: [
        { icon: Globe, label: "Language", description: "Choose your preferred language", action: "Select" },
        { icon: HelpCircle, label: "Support", description: "Get help or report an issue", action: "Button" },
      ]
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-gray-500 mt-1">Customize your Absuuuun experience.</p>
      </header>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{section.title}</h3>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              {section.items.map((item, i) => (
                <div 
                  key={item.label} 
                  className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${i !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                      <item.icon size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  
                  {item.action === "Toggle" && (
                    <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  )}
                  {item.action === "Button" && (
                    <button className="text-xs font-bold text-black border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Manage
                    </button>
                  )}
                  {item.action === "Select" && (
                    <div className="text-xs font-bold text-gray-400 flex items-center gap-1 cursor-pointer hover:text-black transition-colors">
                      English
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
          <p className="text-xs text-gray-400 font-medium">Absuuuun Version 1.0.0 (Build 2026.03)</p>
          <button className="text-xs font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
