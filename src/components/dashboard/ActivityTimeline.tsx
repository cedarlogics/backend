import { motion } from 'framer-motion';
import { Workflow, Plug, Bot, Rocket, Zap, Brain, Clock } from 'lucide-react';
import { activityLogs } from '@/data/mockData';
import { formatTime, cn } from '@/utils/helpers';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  workflow: Workflow,
  integration: Plug,
  agent: Bot,
  deployment: Rocket,
  automation: Zap,
  decision: Brain,
};

// Status reads as marker *shape*, not a new color — everything stays in the pink family.
const statusMarker: Record<string, { fill: boolean; dashed: boolean; ring: string; icon: string }> = {
  success: { fill: true, dashed: false, ring: HOT, icon: '#0A0612' },
  info: { fill: false, dashed: false, ring: BRIGHT, icon: BRIGHT },
  warning: { fill: false, dashed: true, ring: BRIGHT, icon: BRIGHT },
  error: { fill: true, dashed: false, ring: DEEP, icon: '#FFFFFF' },
};

export default function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative border border-white/10 bg-[#0A0612] p-6"
      style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Manifest</p>
          <h2 className="text-lg font-semibold text-white">Activity Timeline</h2>
        </div>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider" style={{ color: HOT }}>
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: HOT }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: HOT }} />
          </span>
          Live
        </span>
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2">
        {activityLogs.map((log, idx) => {
          const Icon = iconMap[log.type] || Workflow;
          const marker = statusMarker[log.status] || statusMarker.info;
          const isLast = idx === activityLogs.length - 1;
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative pl-9"
            >
              {!isLast && (
                <div
                  className="absolute bottom-0 left-[11px] top-8 border-l border-dashed"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                />
              )}

              <div
                className="absolute left-0 top-1 flex h-[22px] w-[22px] rotate-45 items-center justify-center"
                style={{
                  background: marker.fill ? marker.ring : 'transparent',
                  border: `1.5px ${marker.dashed ? 'dashed' : 'solid'} ${marker.ring}`,
                }}
              >
                <Icon className="h-3 w-3 -rotate-45" style={{ color: marker.icon }} />
              </div>

              <div
                className={cn(
                  'border-b border-dashed border-white/10 py-3 pl-2 transition-colors hover:bg-white/[0.03]',
                  isLast && 'border-b-0'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{log.title}</p>
                    <p className="mt-0.5 truncate text-xs text-white/40">{log.description}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-white/30">
                    <Clock className="h-3 w-3" />
                    {formatTime(log.timestamp)}
                  </span>
                </div>
                {log.user && log.user !== 'System' && (
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-white/25">{log.user}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}