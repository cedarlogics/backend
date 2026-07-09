import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Check, Trash2, Filter } from 'lucide-react';
import { useNotificationStore } from '@/store';
import { cn, formatTime } from '@/utils/helpers';

const categories = ['all', 'workflow', 'integration', 'agent', 'system', 'automation'];
const typeIcons: Record<string, string> = {
  workflow: '⚡',
  integration: '🔌',
  agent: '🤖',
  system: '⚙️',
  automation: '🚀',
};

export default function NotificationPanel() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotificationStore();
  const [filter, setFilter] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const filteredNotifications = notifications.filter(
    (n) => filter === 'all' || n.category === filter
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff0088] to-[#ff69b4] shadow-lg shadow-[#ff0088]/30 flex items-center justify-center hover:scale-105 transition-transform z-40"
      >
        <Bell className="w-6 h-6 text-white" />
        {unreadCount() > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-white text-[#ff0088] rounded-full">
            {unreadCount()}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 h-full w-96 bg-[#0a0713]/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ff0088]/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-[#ff0088]" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">Notifications</h2>
                    <p className="text-xs text-white/50">{unreadCount()} unread</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>

              <div className="p-4 flex items-center gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors',
                      filter === cat
                        ? 'bg-[#ff0088] text-white'
                        : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 text-white/40">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'p-4 rounded-2xl border transition-colors',
                        notification.read
                          ? 'bg-white/5 border-white/5'
                          : 'bg-[#ff0088]/5 border-[#ff0088]/20'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{typeIcons[notification.category]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <p className={cn(
                              'font-medium text-sm',
                              notification.read ? 'text-white/70' : 'text-white'
                            )}>
                              {notification.title}
                            </p>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 rounded hover:bg-white/10 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-white/30 hover:text-rose-400" />
                            </button>
                          </div>
                          <p className="text-xs text-white/50 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-white/30">
                              {formatTime(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="flex items-center gap-1 text-xs text-[#ff0088] hover:text-[#ff1493] transition-colors"
                              >
                                <Check className="w-3 h-3" />
                                Mark read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-white/5">
                <button
                  onClick={markAllAsRead}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm"
                >
                  Mark all as read
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
