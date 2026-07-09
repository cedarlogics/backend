import { motion } from 'framer-motion';
import { TrendingUp, Clock, DollarSign, Users, Bot, Zap, CheckCircle } from 'lucide-react';
import { dashboardStats } from '@/data/mockData';

const productivityCards = [
  {
    label: 'Tasks Automated',
    value: 'tasksAutomated',
    icon: CheckCircle,
    color: 'from-[#ff0088]/20 to-[#ff1493]/10',
    border: 'border-[#ff0088]/20',
    valueColor: 'text-[#ff0088]',
  },
  {
    label: 'Hours Saved',
    value: 'hoursSaved',
    icon: Clock,
    color: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/20',
    valueColor: 'text-emerald-400',
    suffix: 'hrs',
  },
  {
    label: 'Cost Reduction',
    value: 'costReduction',
    icon: DollarSign,
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/20',
    valueColor: 'text-blue-400',
    suffix: '%',
  },
  {
    label: 'Processes Running',
    value: 'processesRunning',
    icon: Zap,
    color: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/20',
    valueColor: 'text-amber-400',
  },
  {
    label: 'Employees Assisted',
    value: 'employeesAssisted',
    icon: Users,
    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/20',
    valueColor: 'text-purple-400',
  },
  {
    label: 'AI Decisions',
    value: 'aiDecisions',
    icon: Bot,
    color: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/20',
    valueColor: 'text-cyan-400',
  },
];

export default function ProductivityOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="rounded-3xl bg-gradient-to-br from-[#151021] to-[#10081d] border border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Productivity Overview</h2>
          <p className="text-sm text-white/50">AI-driven improvements</p>
        </div>
        <TrendingUp className="w-5 h-5 text-emerald-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {productivityCards.map((card, idx) => {
          const Icon = card.icon;
          const value = dashboardStats[card.value as keyof typeof dashboardStats];
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${card.color} border ${card.border}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${card.valueColor}`} />
                <span className="text-xs text-emerald-400">+12%</span>
              </div>
              <p className={`text-2xl font-bold ${card.valueColor}`}>
                {formatNumber(value as number)}
                {card.suffix && <span className="text-sm text-white/50 ml-1">{card.suffix}</span>}
              </p>
              <p className="text-xs text-white/50 mt-1">{card.label}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
