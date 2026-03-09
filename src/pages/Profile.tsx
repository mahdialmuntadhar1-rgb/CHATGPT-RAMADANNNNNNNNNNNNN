import { User, Mail, Shield, Bell, MapPin, Camera } from "lucide-react";
import { motion } from "motion/react";

export default function Profile() {
  const user = {
    name: "Mahdi Al-Muntadhar",
    email: "mahdialmuntadhar1@gmail.com",
    avatar: "https://picsum.photos/seed/user/200/200",
    role: "Life Explorer",
    location: "Baghdad, Iraq",
    joined: "March 2026"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-gray-500 mt-1">Manage your personal information and account settings.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-xl">
                <img src={user.avatar} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full border-2 border-white shadow-lg hover:bg-gray-800 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mt-1">{user.role}</p>
            
            <div className="mt-6 pt-6 border-t border-gray-50 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <User size={16} />
                <span>Joined {user.joined}</span>
              </div>
            </div>
          </div>

          <div className="bg-black text-white p-6 rounded-3xl shadow-xl shadow-black/10">
            <h4 className="font-bold mb-2">Pro Plan</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">Unlock advanced AI insights and unlimited goal tracking.</p>
            <button className="w-full py-2 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Settings */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Account Details</h3>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <User size={18} className="text-gray-400" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <Mail size={18} className="text-gray-400" />
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bio</label>
                <textarea 
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-medium outline-none focus:ring-2 focus:ring-black/5 min-h-[100px]"
                  placeholder="Tell us about yourself..."
                  defaultValue="Passionate about personal growth and using AI to navigate life's complexities."
                />
              </div>

              <button className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all">
                Save Changes
              </button>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Security & Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100">
                    <Shield size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Secure your account with 2FA.</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100">
                    <Bell size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Push Notifications</p>
                    <p className="text-xs text-gray-500">Get alerts for task deadlines.</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-black rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
