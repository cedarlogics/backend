import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  MessageSquare,
  Plus,
  Sun,
  Moon,
  ChevronDown,
  Settings,
  User,
  LogOut,
  Grid3X3,
} from 'lucide-react';
import { useAuthStore, useNotificationStore, useUIStore } from '@/store';
import { formatTime } from '@/utils/helpers';

export default function Navbar() {
  const { user } = useAuthStore();
  const { notifications, unreadCount, markAllAsRead } = useNotificationStore();
  const { toggleCommandPalette } = useUIStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const unread = unreadCount();

  return (
    <header className="sticky top-0 z-40 bg-[#0a0713]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border transition-all ${
                searchFocused ? 'border-[#ff0088]/50 shadow-lg shadow-[#ff0088]/10' : 'border-white/5'
              }`}
            >
              <Search className="w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search workflows, agents, integrations..."
                className="bg-transparent border-none outline-none text-white placeholder-white/40 w-64 text-sm"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <kbd className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/10 text-xs text-white/50">
                <span>⌘</span>
                <span>K</span>
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/70">All systems operational</span>
          </div>

          <button className="p-2.5 rounded-xl bg-gradient-to-r from-[#ff0088] to-[#ff69b4] text-white hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Bell className="w-4 h-4 text-white/70" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-[#ff0088] text-white rounded-full">
                  {unread}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-96 rounded-2xl bg-[#151021] border border-white/10 shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-[#ff0088] hover:text-[#ff1493]"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-white/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success'
                                ? 'bg-emerald-400'
                                : notification.type === 'error'
                                ? 'bg-rose-400'
                                : notification.type === 'warning'
                                ? 'bg-amber-400'
                                : 'bg-blue-400'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-white/50 truncate">
                              {notification.message}
                            </p>
                            <p className="text-xs text-white/30 mt-1">
                              {formatTime(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff0088] to-[#ff69b4] flex items-center justify-center text-white text-sm font-bold">
                {user?.firstName?.[0] || 'A'}
              </div>
              <ChevronDown className="w-4 h-4 text-white/50" />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#151021] border border-white/10 shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/5">
                    <p className="font-medium text-white">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-white/50">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    {[
                      { icon: User, label: 'Profile', action: () => {} },
                      { icon: Settings, label: 'Settings', action: () => {} },
                      { icon: Grid3X3, label: 'Workspace', action: () => {} },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
