import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Clock, Cpu, Bot, Cloud, Workflow } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import { dashboardStats } from '@/data/mockData';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';
const TRACK = 'rgba(255,255,255,0.07)';

const stats = [
  { label: 'Active Workflows', key: 'activeWorkflows', icon: Workflow },
  { label: 'Workflow Completion', key: 'workflowCompletionRate', icon: Activity, suffix: '%' },
  { label: 'AI Agents Running', key: 'aiAgentsRunning', icon: Bot },
  { label: 'Execution Latency', key: 'executionLatency', icon: Clock, suffix: 'ms' },
  { label: 'Integration Health', key: 'integrationHealth', icon: Cloud, suffix: '%' },
  { label: 'Automation Success', key: 'automationSuccess', icon: Zap, suffix: '%' },
] as const;

const footerMetrics = [
  { label: 'Inference Requests', key: 'inferenceRequests' },
  { label: 'API Calls Today', key: 'apiCalls' },
  { label: 'Productivity Score', key: 'productivityScore', suffix: '%' },
  { label: 'Processes Running', key: 'processesRunning' },
] as const;

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// One ring in the concentric gauge — a thin donut sits at a fixed radius band.
function GaugeRing({ value, radius, thickness, color }: { value: number; radius: number; thickness: number; color: string }) {
  const data = [
    { v: value, fill: color },
    { v: 100 - value, fill: TRACK },
  ];
  return (
    <Pie
      data={data}
      dataKey="v"
      cx="50%"
      cy="50%"
      innerRadius={radius - thickness}
      outerRadius={radius}
      startAngle={90}
      endAngle={-270}
      paddingAngle={0}
      stroke="none"
      isAnimationActive={false}
    >
      {data.map((d, i) => (
        <Cell key={i} fill={d.fill} />
      ))}
    </Pie>
  );
}

export default function InfrastructureHealth() {
  const [statsData, setStatsData] = useState(dashboardStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatsData((prev) => ({
        ...prev,
        cpuUsage: Math.min(100, Math.max(50, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        gpuUsage: Math.min(100, Math.max(60, prev.gpuUsage + (Math.random() - 0.5) * 3)),
        memoryUsage: Math.min(100, Math.max(30, prev.memoryUsage + (Math.random() - 0.5) * 2)),
        executionLatency: Math.floor(Math.max(30, Math.min(80, prev.executionLatency + (Math.random() - 0.5) * 10))),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative border border-white/10 bg-[#0A0612] p-6"
      style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Monitoring</p>
          <h2 className="text-lg font-semibold text-white">Infrastructure Health</h2>
        </div>
        <div className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rotate-45" style={{ background: HOT }} />
          <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: HOT }}>
            Healthy
          </span>
        </div>
      </div>

      {/* KPI strip — one accent color, distinguished by icon + label, not five hues */}
      <div className="mb-6 grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const value = statsData[stat.key as keyof typeof statsData];
          return (
            <div key={stat.key} className="bg-[#0A0612] p-4">
              <Icon className="mb-2 h-4 w-4" style={{ color: BRIGHT }} />
              <p className="text-2xl font-bold text-white">
                {typeof value === 'number' ? (stat.suffix === '%' ? value.toFixed(1) : value) : value}
                {stat.suffix && <span className="ml-1 text-sm text-white/40">{stat.suffix}</span>}
              </p>
              <p className="mt-1 text-xs text-white/40">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Concentric gauge replaces three duplicate pie cards */}
      <div className="flex flex-col items-center gap-6 border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-around">
        <div className="relative h-40 w-40 shrink-0">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            <PieChart width={160} height={160} style={{ position: 'absolute', inset: 0 }}>
              <GaugeRing value={statsData.cpuUsage} radius={78} thickness={10} color={HOT} />
              <GaugeRing value={statsData.gpuUsage} radius={62} thickness={10} color={BRIGHT} />
              <GaugeRing value={statsData.memoryUsage} radius={46} thickness={10} color={DEEP} />
            </PieChart>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl font-bold text-white">{statsData.cpuUsage.toFixed(0)}%</span>
            <span className="text-[10px] uppercase tracking-wide text-white/30">CPU</span>
          </div>
        </div>

        {/* legend as a small ledger instead of repeating the chart three times */}
        <div className="w-full max-w-[220px] space-y-3">
          {[
            { label: 'CPU Usage', value: statsData.cpuUsage, color: HOT },
            { label: 'GPU Usage', value: statsData.gpuUsage, color: BRIGHT },
            { label: 'Memory Usage', value: statsData.memoryUsage, color: DEEP },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="h-2 w-2 rotate-45 shrink-0" style={{ background: r.color }} />
              <span className="flex-1 text-sm text-white/60">{r.label}</span>
              <span className="font-mono text-sm font-semibold tabular-nums text-white">
                {r.value.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer metrics as a divided rail instead of four separate rounded boxes */}
      <div className="mt-4 grid grid-cols-2 gap-px bg-white/[0.06] pt-px md:grid-cols-4">
        {footerMetrics.map((metric) => {
          const value = statsData[metric.key as keyof typeof statsData];
          return (
            <div key={metric.label} className="bg-[#0A0612] p-3 text-center">
              <p className="font-mono text-lg font-bold text-white">
                {typeof value === 'number' ? formatNumber(value) : value}
                {metric.suffix}
              </p>
              <p className="mt-1 text-xs text-white/40">{metric.label}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}