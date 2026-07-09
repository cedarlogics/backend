import { motion } from 'framer-motion';
import { Workflow, Plug, Bot, Rocket, Zap, Brain, Clock } from 'lucide-react';
import { activityLogs } from '@/data/mockData';
import { formatTime, cn } from '@/utils/helpers';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  workflow: Workflow,
  integration: Plug,
  agent: Bot,
  deployment: Rocket,
  automation: Zap,
  decision: Brain,
};

const statusColors: Record<string, string> = {
  success: 'bg-emerald-400',
  info: 'bg-blue-400',
  warning: 'bg-amber-400',
  error: 'bg-rose-400',
};

const statusGlow: Record<string, string> = {
  success: 'shadow-emerald-400/50',
  info: 'shadow-blue-400/50',
  warning: 'shadow-amber-400/50',
  error: 'shadow-rose-400/50',
};

export default function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-3xl bg-gradient-to-br from-[#151021] to-[#10081d] border border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Activity Timeline</h2>
          <p className="text-sm text-white/50">Live workflow events</p>
        </div>
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#ff0088]/10 border border-[#ff0088]/20 text-sm text-[#ff0088]">
          <span className="w-2 h-2 rounded-full bg-[#ff0088] animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {activityLogs.map((log, idx) => {
          const Icon = iconMap[log.type] || Workflow;
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative pl-8"
            >
              {/* Timeline line */}
              {idx !== activityLogs.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
              )}

              {/* Dot */}
              <div
                className={cn(
                  'absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center',
                  statusColors[log.status],
                  'shadow-lg',
                  statusGlow[log.status]
                )}
              >
                <Icon className="w-3 h-3 text-white" />
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-white text-sm">{log.title}</p>
                    <p className="text-xs text-white/50 mt-1">{log.description}</p>
                  </div>
                  <span className="text-xs text-white/30 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(log.timestamp)}
                  </span>
                </div>
                {log.user && log.user !== 'System' && (
                  <p className="text-xs text-white/40 mt-2">by {log.user}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
