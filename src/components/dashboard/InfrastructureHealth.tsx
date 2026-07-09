import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Zap,
  Clock,
  BarChart3,
  Cpu,
  Server,
  Database,
  TrendingUp,
  Workflow,
  Bot,
  Cloud,
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { dashboardStats } from '@/data/mockData';

const stats = [
  { label: 'Active Workflows', key: 'activeWorkflows', icon: Workflow, color: 'text-[#ff0088]', bg: 'bg-[#ff0088]/10', border: 'border-[#ff0088]/20' },
  { label: 'Workflow Completion', key: 'workflowCompletionRate', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', suffix: '%' },
  { label: 'AI Agents Running', key: 'aiAgentsRunning', icon: Bot, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  { label: 'Execution Latency', key: 'executionLatency', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', suffix: 'ms' },
  { label: 'Integration Health', key: 'integrationHealth', icon: Cloud, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20', suffix: '%' },
  { label: 'Automation Success', key: 'automationSuccess', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', suffix: '%' },
];

const resourceStats = [
  { label: 'CPU Usage', key: 'cpuUsage', color: '#ff0088' },
  { label: 'GPU Usage', key: 'gpuUsage', color: '#ff1493' },
  { label: 'Memory Usage', key: 'memoryUsage', color: '#ff4fa3' },
];

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

  const pieData = [
    { name: 'Used', value: statsData.cpuUsage, color: '#ff0088' },
    { name: 'Free', value: 100 - statsData.cpuUsage, color: 'rgba(255,255,255,0.1)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-3xl bg-gradient-to-br from-[#151021] to-[#10081d] border border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Infrastructure Health</h2>
          <p className="text-sm text-white/50">Real-time system monitoring</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-emerald-400">Healthy</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const value = statsData[stat.key as keyof typeof statsData];
          return (
            <div
              key={stat.key}
              className={`p-4 rounded-2xl ${stat.bg} border ${stat.border}`}
            >
              <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold text-white">
                {typeof value === 'number' ? (stat.suffix === '%' ? value.toFixed(1) : stat.suffix === 'ms' ? value : value) : value}
                {stat.suffix && <span className="text-sm text-white/50 ml-1">{stat.suffix}</span>}
              </p>
              <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* CPU Pie Chart */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white">CPU Usage</p>
            <p className="text-lg font-bold text-[#ff0088]">{statsData.cpuUsage.toFixed(0)}%</p>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#ff0088" />
                  <Cell fill="rgba(255,255,255,0.1)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GPU Pie Chart */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white">GPU Usage</p>
            <p className="text-lg font-bold text-[#ff1493]">{statsData.gpuUsage.toFixed(0)}%</p>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Used', value: statsData.gpuUsage, color: '#ff1493' },
                    { name: 'Free', value: 100 - statsData.gpuUsage, color: 'rgba(255,255,255,0.1)' },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#ff1493" />
                  <Cell fill="rgba(255,255,255,0.1)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Memory Pie Chart */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white">Memory Usage</p>
            <p className="text-lg font-bold text-[#ff4fa3]">{statsData.memoryUsage.toFixed(0)}%</p>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Used', value: statsData.memoryUsage, color: '#ff4fa3' },
                    { name: 'Free', value: 100 - statsData.memoryUsage, color: 'rgba(255,255,255,0.1)' },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#ff4fa3" />
                  <Cell fill="rgba(255,255,255,0.1)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
        {[
          { label: 'Inference Requests', value: statsData.inferenceRequests, color: 'text-[#ff0088]' },
          { label: 'API Calls Today', value: statsData.apiCalls, color: 'text-blue-400' },
          { label: 'Productivity Score', value: statsData.productivityScore, suffix: '%' },
          { label: 'Processes Running', value: statsData.processesRunning },
        ].map((metric) => (
          <div key={metric.label} className="text-center p-3 rounded-xl bg-white/5">
            <p className={`text-lg font-bold ${metric.color || 'text-white'}`}>
              {typeof metric.value === 'number' ? formatNumber(metric.value) : metric.value}
              {metric.suffix}
            </p>
            <p className="text-xs text-white/40 mt-1">{metric.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
