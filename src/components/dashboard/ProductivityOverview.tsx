import { motion } from 'framer-motion';
import { Clock, DollarSign, Users, Bot, Zap, CheckCircle } from 'lucide-react';
import { dashboardStats } from '@/data/mockData';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';

const ledgerRows = [
  { label: 'Hours Saved', value: 'hoursSaved', icon: Clock, suffix: 'hrs', trend: '+12%' },
  { label: 'Cost Reduction', value: 'costReduction', icon: DollarSign, suffix: '%', trend: '+4%' },
  { label: 'Processes Running', value: 'processesRunning', icon: Zap, trend: '+8%' },
  { label: 'Employees Assisted', value: 'employeesAssisted', icon: Users, trend: '+6%' },
  { label: 'AI Decisions', value: 'aiDecisions', icon: Bot, trend: '+21%' },
] as const;

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export default function ProductivityOverview() {
  const flagship = dashboardStats.tasksAutomated as number;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="relative border border-white/10 bg-[#0A0612] p-6"
      style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Receipt · Auto-generated</p>
      <h2 className="mt-0.5 text-lg font-semibold text-white">Productivity Overview</h2>

      {/* flagship stat leads the receipt instead of six identical tiles */}
      <div className="mt-5 flex items-end justify-between border-b border-dashed border-white/15 pb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/40">Tasks Automated</p>
          <p className="mt-1 text-4xl font-bold tabular-nums" style={{ color: HOT }}>
            {formatNumber(flagship)}
          </p>
        </div>
        <CheckCircle className="h-8 w-8" style={{ color: BRIGHT }} />
      </div>

      {/* remaining stats as ledger rows with dotted leaders */}
      <div className="mt-2">
        {ledgerRows.map((row, idx) => {
          const Icon = row.icon;
          const value = dashboardStats[row.value as keyof typeof dashboardStats];
          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 * idx }}
              className="flex items-center gap-3 border-b border-dashed border-white/10 py-2.5 last:border-b-0"
            >
              <Icon className="h-4 w-4 shrink-0 text-white/40" />
              <span className="whitespace-nowrap text-sm text-white/60">{row.label}</span>
              <span className="-translate-y-0.5 flex-1 border-b border-dotted border-white/15" />
              <span className="font-mono text-sm font-semibold tabular-nums text-white">
                {formatNumber(value as number)}
                {row.suffix && <span className="text-white/40">{row.suffix}</span>}
              </span>
              <span className="font-mono text-[11px]" style={{ color: BRIGHT }}>
                [{row.trend}]
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}