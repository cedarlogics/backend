import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Workflow,
  Bot,
  Plug,
  Server,
  BarChart3,
  Settings,
  ChevronLeft,
  LogOut,
} from 'lucide-react';
import { useUIStore, useAuthStore } from '@/store';
import { cn } from '@/utils/helpers';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Workflow, label: 'Workflows', path: '/workflows' },
  { icon: Bot, label: 'AI Agents', path: '/ai-agents' },
  { icon: Plug, label: 'Integrations', path: '/integrations' },
  { icon: Server, label: 'Infrastructure', path: '/infrastructure' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

const bottomMenuItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
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
      className="fixed left-0 top-0 h-full bg-[#0A0612] border-r border-white/[0.06] z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-white/[0.06] bg-white/5">
        <motion.div
          initial={false}
          animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
          className="flex items-center gap-3"
        >
          <img
            src="/Logo.png"
            alt="CedarLogics"
            className="w-12 h-12 rounded-md object-contain"
          />
          <div className="leading-tight">
            <div className="text-white font-semibold tracking-tight text-[16px] whitespace-nowrap">CedarLogics</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 whitespace-nowrap">Console</div>
          </div>
        </motion.div>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/5 transition-colors"
        >
          <motion.div
            initial={false}
            animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
          >
            <ChevronLeft className="w-4 h-4 text-white/50" />
          </motion.div>
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 transition-all duration-200 group relative',
                isActive
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
              )
            }
            style={({ isActive }) =>
              isActive
                ? { background: `${HOT}12` }
                : undefined
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px]"
                    style={{ background: HOT }}
                  />
                )}
                <item.icon
                  className="w-5 h-5 flex-shrink-0"
                  style={isActive ? { color: BRIGHT } : undefined}
                />
                <motion.span
                  initial={false}
                  animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                  className="whitespace-nowrap text-sm"
                >
                  {item.label}
                </motion.span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="p-3 border-t border-white/[0.06] space-y-1">
        {bottomMenuItems.map((item) => (
          <NavLink
            key={item.path + item.label}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2.5 text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-colors"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <motion.span
              initial={false}
              animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
              className="whitespace-nowrap text-sm"
            >
              {item.label}
            </motion.span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-white/40 hover:text-rose-400 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <motion.span
            initial={false}
            animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
            className="whitespace-nowrap text-sm"
          >
            Logout
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}
