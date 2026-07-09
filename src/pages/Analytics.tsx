import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, Filter, ArrowUpRight, ArrowDownRight, Zap, Users, DollarSign, Clock, Target } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { monthlyAnalytics, departmentPerformance, dashboardStats } from '@/data/mockData';

const COLORS = ['#ff0088', '#ff1493', '#ff4fa3', '#ff69b4', '#ff85c2', '#ffa0d0'];

const KPICards = [
  { label: 'Total Workflows', value: dashboardStats.activeWorkflows * 3, change: 15, icon: BarChart3, color: 'from-[#ff0088]' },
  { label: 'Automation Rate', value: '87%', change: 4.2, icon: Zap, color: 'from-emerald-400' },
  { label: 'Cost Savings', value: '$420K', change: 28, icon: DollarSign, color: 'from-blue-400' },
  { label: 'Time Saved', value: '4,200', change: 32, icon: Clock, color: 'from-purple-400', unit: 'hours' },
  { label: 'AI Accuracy', value: '98.5%', change: 2.1, icon: Target, color: 'from-cyan-400' },
  { label: 'Active Users', value: 850, change: 12, icon: Users, color: 'from-amber-400' },
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
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-white/50">Business insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {KPICards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${kpi.color} to-transparent text-white`} />
                <span className={`flex items-center gap-1 text-xs ${kpi.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {kpi.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}%
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <p className="text-xs text-white/50">{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow Executions */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-white">Workflow Executions</h3>
              <p className="text-sm text-white/50">Monthly execution trends</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAnalytics}>
                <defs>
                  <linearGradient id="colorWorkflows" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff0088" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff0088" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 12 }} />
                <Area type="monotone" dataKey="workflows" stroke="#ff0088" fillOpacity={1} fill="url(#colorWorkflows)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-white">Department Performance</h3>
              <p className="text-sm text-white/50">Automation by department</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis type="category" dataKey="department" stroke="rgba(255,255,255,0.5)" fontSize={12} width={80} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 12 }} />
                <Bar dataKey="automation" fill="#ff0088" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Efficiency */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-medium text-white mb-4">AI Efficiency Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={10} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 12 }} />
                <Line type="monotone" dataKey="efficiency" stroke="#ff69b4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Reduction */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-medium text-white mb-4">Cost Reduction</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={10} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 12 }} />
                <Bar dataKey="cost" fill="#ff1493" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-medium text-white mb-4">Workflow Distribution</h3>
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
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Business Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks Automated', value: dashboardStats.tasksAutomated.toLocaleString(), change: '+15%' },
          { label: 'Hours Saved This Month', value: dashboardStats.hoursSaved.toLocaleString(), change: '+22%' },
          { label: 'Cost Reduction %', value: `${dashboardStats.costReduction}%`, change: '+8%' },
          { label: 'AI Decisions Made', value: dashboardStats.aiDecisions.toLocaleString(), change: '+34%' },
        ].map((metric) => (
          <div key={metric.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/50">{metric.label}</span>
              <span className="text-xs text-emerald-400">{metric.change}</span>
            </div>
            <p className="text-xl font-bold text-white">{metric.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
