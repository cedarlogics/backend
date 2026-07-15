import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Download, ArrowUpRight, ArrowDownRight, Zap, Users, DollarSign, Clock, Target } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { monthlyAnalytics, departmentPerformance, dashboardStats } from '@/data/mockData';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';
const COLORS = ['#FF2D87', '#FF5CA8', '#7A1247', '#ff69b4', '#ff85c2', '#ffa0d0'];

const KPICards = [
  { label: 'Total Workflows', value: dashboardStats.activeWorkflows * 3, change: 15, icon: BarChart3 },
  { label: 'Automation Rate', value: '87%', change: 4.2, icon: Zap },
  { label: 'Cost Savings', value: '$420K', change: 28, icon: DollarSign },
  { label: 'Time Saved', value: '4,200', change: 32, icon: Clock, unit: 'hours' },
  { label: 'AI Accuracy', value: '98.5%', change: 2.1, icon: Target },
  { label: 'Active Users', value: 850, change: 12, icon: Users },
];

export default function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Intelligence</p>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-white/40">Business insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const data = { kpis: KPICards.map(k => ({ label: k.label, value: k.value, change: k.change })), monthlyAnalytics, departmentPerformance };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'analytics.json';
              link.style.display = 'none';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 text-white/70 transition-colors hover:text-white"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-3 lg:grid-cols-6">
        {KPICards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0A0612] p-4"
            >
              <Icon className="mb-2 h-4 w-4" style={{ color: BRIGHT }} />
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{kpi.value}</span>
                <span className={`flex items-center gap-1 font-mono text-[11px] ${kpi.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {kpi.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {kpi.change}%
                </span>
              </div>
              <p className="mt-1 text-xs text-white/40">{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow Executions */}
        <div
          className="relative border border-white/10 bg-[#0A0612] p-6"
          style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
        >
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Execution</p>
            <h3 className="text-lg font-semibold text-white">Workflow Executions</h3>
            <p className="text-sm text-white/40">Monthly execution trends</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAnalytics}>
                <defs>
                  <linearGradient id="colorWorkflows" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={HOT} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={HOT} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 0 }} />
                <Area type="monotone" dataKey="workflows" stroke={HOT} fillOpacity={1} fill="url(#colorWorkflows)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance */}
        <div
          className="relative border border-white/10 bg-[#0A0612] p-6"
          style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
        >
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Breakdown</p>
            <h3 className="text-lg font-semibold text-white">Department Performance</h3>
            <p className="text-sm text-white/40">Automation by department</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis type="category" dataKey="department" stroke="rgba(255,255,255,0.3)" fontSize={12} width={80} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 0 }} />
                <Bar dataKey="automation" fill={HOT} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Efficiency */}
        <div
          className="relative border border-white/10 bg-[#0A0612] p-6"
          style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)' }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">Trend</p>
          <h3 className="font-semibold text-white mb-4">AI Efficiency Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 0 }} />
                <Line type="monotone" dataKey="efficiency" stroke={BRIGHT} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Reduction */}
        <div
          className="relative border border-white/10 bg-[#0A0612] p-6"
          style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)' }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">Savings</p>
          <h3 className="font-semibold text-white mb-4">Cost Reduction</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 0 }} />
                <Bar dataKey="cost" fill={BRIGHT} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution */}
        <div
          className="relative border border-white/10 bg-[#0A0612] p-6"
          style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)' }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">Split</p>
          <h3 className="font-semibold text-white mb-4">Workflow Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="workflows"
                >
                  {departmentPerformance.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 0 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Business Metrics — divided rail */}
      <div className="grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-4">
        {[
          { label: 'Total Tasks Automated', value: dashboardStats.tasksAutomated.toLocaleString(), change: '+15%' },
          { label: 'Hours Saved This Month', value: dashboardStats.hoursSaved.toLocaleString(), change: '+22%' },
          { label: 'Cost Reduction %', value: `${dashboardStats.costReduction}%`, change: '+8%' },
          { label: 'AI Decisions Made', value: dashboardStats.aiDecisions.toLocaleString(), change: '+34%' },
        ].map((metric) => (
          <div key={metric.label} className="bg-[#0A0612] p-4 text-center">
            <p className="font-mono text-lg font-bold text-white">{metric.value}</p>
            <p className="mt-1 text-xs text-white/40">{metric.label}</p>
            <span className="font-mono text-[11px]" style={{ color: BRIGHT }}>[{metric.change}]</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
