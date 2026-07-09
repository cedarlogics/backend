import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Workflow,
  Cpu,
  Plug,
  Bot,
  Server,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  LogOut,
  Zap,
} from 'lucide-react';
import { useUIStore, useAuthStore } from '@/store';
import { cn } from '@/utils/helpers';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Workflow, label: 'Workflows', path: '/workflows' },
  { icon: Bot, label: 'AI Agents', path: '/ai-agents' },
  { icon: Plug, label: 'Integrations', path: '/integrations' },
  { icon: Zap, label: 'Automation', path: '/workflows' },
  { icon: Server, label: 'Infrastructure', path: '/infrastructure' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

const bottomMenuItems = [
  { icon: Users, label: 'Users', path: '/settings' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help Center', path: '/settings' },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 256 }}
      className="fixed left-0 top-0 h-full bg-[#0a0713]/80 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col"
    >
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <motion.div
          initial={false}
          animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0088] to-[#ff69b4] flex items-center justify-center shadow-lg shadow-[#ff0088]/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white whitespace-nowrap">CedarLogics</span>
        </motion.div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-white/5 transition-colors"
        >
          <motion.div
            initial={false}
            animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
          >
            <ChevronLeft className="w-4 h-4 text-white/50" />
          </motion.div>
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                isActive
                  ? 'bg-gradient-to-r from-[#ff0088]/20 to-transparent text-white border border-[#ff0088]/30'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <motion.span
              initial={false}
              animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
              className="whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5 space-y-1">
        {bottomMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <motion.span
              initial={false}
              animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
              className="whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-rose-400 hover:bg-rose-400/10 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <motion.span
            initial={false}
            animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
            className="whitespace-nowrap"
          >
            Logout
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}
