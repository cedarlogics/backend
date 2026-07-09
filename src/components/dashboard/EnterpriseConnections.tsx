import { motion } from 'framer-motion';
import {
  Database,
  Users,
  UserCog,
  CreditCard,
  Mail,
  Cloud,
  Plug,
  Server,
  ArrowRight,
} from 'lucide-react';
import { enterpriseConnections } from '@/data/mockData';
import { cn, getStatusColor } from '@/utils/helpers';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Database,
  Users,
  UserCog,
  CreditCard,
  Mail,
  Cloud,
  Server,
};

const categoryColors: Record<string, string> = {
  ERP: 'from-blue-500/20 to-blue-600/10 border-blue-500/20',
  CRM: 'from-purple-500/20 to-purple-600/10 border-purple-500/20',
  HRMS: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20',
  Finance: 'from-amber-500/20 to-amber-600/10 border-amber-500/20',
  Collaboration: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/20',
  Storage: 'from-rose-500/20 to-rose-600/10 border-rose-500/20',
};

export default function EnterpriseConnections() {
  const connectedCount = enterpriseConnections.filter((c) => c.status === 'connected').length;
  const totalCount = enterpriseConnections.length;

  // Group by category
  const categories = ['ERP', 'CRM', 'HRMS', 'Finance', 'Collaboration', 'Storage'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-3xl bg-gradient-to-br from-[#151021] to-[#10081d] border border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Enterprise Connections</h2>
          <p className="text-sm text-white/50">Connected Enterprise Systems</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(connectedCount / totalCount) * 175.93} 175.93`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff0088" />
                  <stop offset="100%" stopColor="#ff69b4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {Math.round((connectedCount / totalCount) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {enterpriseConnections.slice(0, 12).map((connection, idx) => {
          const Icon = iconMap[connection.icon] || Database;
          return (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                'group relative p-4 rounded-2xl bg-gradient-to-br border transition-all hover:scale-105 cursor-pointer',
                categoryColors[connection.category] || 'from-white/5 to-white/[0.02] border-white/10'
              )}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110',
                    connection.status === 'connected'
                      ? 'bg-white/10'
                      : connection.status === 'pending'
                      ? 'bg-amber-400/20'
                      : 'bg-white/5 opacity-50'
                  )}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-medium text-white truncate max-w-full">{connection.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      connection.status === 'connected'
                        ? 'bg-emerald-400'
                        : connection.status === 'pending'
                        ? 'bg-amber-400 animate-pulse'
                        : 'bg-white/20'
                    )}
                  />
                  <span
                    className={cn(
                      'text-[10px]',
                      connection.status === 'connected'
                        ? 'text-emerald-400'
                        : connection.status === 'pending'
                        ? 'text-amber-400'
                        : 'text-white/30'
                    )}
                  >
                    {connection.status}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
        <div className="text-sm text-white/50">
          <span className="text-white font-medium">{connectedCount}</span> of {totalCount} systems connected
        </div>
        <button className="flex items-center gap-2 text-sm text-[#ff0088] hover:text-[#ff1493] transition-colors">
          <Plug className="w-4 h-4" />
          Connect New System
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
