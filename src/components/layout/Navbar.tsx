import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Plus,
  X,
} from 'lucide-react';
import { useAuthStore, useNotificationStore, useUIStore } from '@/store';
import { formatTime } from '@/utils/helpers';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { notifications, unreadCount, markAllAsRead, markAsRead, deleteNotification, clearAll } = useNotificationStore();
  const { toggleCommandPalette } = useUIStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

  const unread = unreadCount();

  return (
    <header className="sticky top-0 z-40 bg-[#0a0713]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              onClick={toggleCommandPalette}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/5 transition-all cursor-pointer hover:border-[#ff0088]/30 hover:shadow-lg hover:shadow-[#ff0088]/10"
            >
              <Search className="w-4 h-4 text-white/40" />
              <span className="text-white/40 text-sm">Search workflows, agents, integrations...</span>
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
                  {selectedNotification ? (
                    (() => {
                      const n = notifications.find((x) => x.id === selectedNotification);
                      if (!n) return null;
                      return (
                        <div>
                          <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <button onClick={() => setSelectedNotification(null)} className="text-xs text-[#ff0088] hover:text-[#ff1493]">
                              ← Back
                            </button>
                            <button
                              onClick={() => { deleteNotification(n.id); setSelectedNotification(null); }}
                              className="text-xs text-rose-400 hover:text-rose-300"
                            >
                              Delete
                            </button>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`w-2 h-2 rounded-full ${
                                n.type === 'success' ? 'bg-emerald-400' : n.type === 'error' ? 'bg-rose-400' : n.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                              }`} />
                              <span className="text-xs text-white/40 capitalize">{n.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{n.title}</h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-4">{n.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/30">{formatTime(n.timestamp)}</span>
                              {!n.read && (
                                <button
                                  onClick={() => markAsRead(n.id)}
                                  className="text-xs text-[#ff0088] hover:text-[#ff1493]"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <>
                      <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        <div className="flex items-center gap-3">
                          <button onClick={markAllAsRead} className="text-xs text-[#ff0088] hover:text-[#ff1493]">
                            Mark all read
                          </button>
                          <button onClick={clearAll} className="text-xs text-rose-400 hover:text-rose-300">
                            Clear all
                          </button>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-white/30 text-sm">No notifications</div>
                        ) : (
                          notifications.slice(0, 8).map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() => { setSelectedNotification(notification.id); if (!notification.read) markAsRead(notification.id); }}
                              className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                                !notification.read ? 'bg-[#ff0088]/5' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
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
                                  <p className={`text-sm font-medium truncate ${notification.read ? 'text-white/60' : 'text-white'}`}>
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-white/50 truncate">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-white/30 mt-1">
                                    {formatTime(notification.timestamp)}
                                  </p>
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                                  className="p-1 rounded hover:bg-white/10 flex-shrink-0"
                                >
                                  <X className="w-3 h-3 text-white/30 hover:text-rose-400" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
