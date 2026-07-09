import { motion } from 'framer-motion';
import { Bot, Brain, Zap, Eye, CheckCircle, Activity, Pause, Play, FileText, MoreHorizontal, Clock, Cpu, Database } from 'lucide-react';
import { aiAgents } from '@/data/mockData';
import { cn, formatTime } from '@/utils/helpers';

const roleIcons: Record<string, React.FC<{ className?: string }>> = {
  coordinator: Bot,
  planning: Brain,
  reasoning: Zap,
  validation: CheckCircle,
  execution: Activity,
  monitoring: Eye,
};

const roleColors: Record<string, string> = {
  coordinator: 'from-[#ff0088]/20 to-[#ff1493]/10 border-[#ff0088]/30',
  planning: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
  reasoning: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  validation: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
  execution: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
  monitoring: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
};

const statusColors: Record<string, string> = {
  running: 'text-emerald-400 bg-emerald-400/10',
  idle: 'text-amber-400 bg-amber-400/10',
  stopped: 'text-slate-400 bg-slate-400/10',
  error: 'text-rose-400 bg-rose-400/10',
};

export default function AIAgents() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Agents</h1>
          <p className="text-white/50">Manage and monitor your AI agents</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/50 mr-2">Running:</span>
            <span className="text-emerald-400 font-bold">{aiAgents.filter(a => a.status === 'running').length}</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff0088] to-[#ff69b4] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Deploy Agent
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Agents', value: aiAgents.length, icon: Bot, color: 'text-[#ff0088]' },
          { label: 'Running', value: aiAgents.filter(a => a.status === 'running').length, icon: Activity, color: 'text-emerald-400' },
          { label: 'Total Memory', value: `${aiAgents.reduce((s, a) => s + a.memory, 0).toFixed(1)} GB`, icon: Database, color: 'text-blue-400' },
          { label: 'Avg Latency', value: `${Math.round(aiAgents.reduce((s, a) => s + a.latency, 0) / aiAgents.length)}ms`, icon: Clock, color: 'text-amber-400' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {aiAgents.map((agent, idx) => {
          const Icon = roleIcons[agent.role] || Bot;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`rounded-2xl bg-gradient-to-br ${roleColors[agent.role]} border overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                      {agent.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{agent.name}</h3>
                      <p className="text-xs text-white/50 capitalize">{agent.role}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[agent.status]}`}>
                    {agent.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-2 rounded-xl bg-black/20">
                    <p className="text-xs text-white/40 mb-1">Current Task</p>
                    <p className="text-sm text-white truncate">{agent.currentTask}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-black/20">
                      <p className="text-white/40">Memory</p>
                      <p className="text-white font-medium">{agent.memory}/{agent.memoryMax} GB</p>
                    </div>
                    <div className="p-2 rounded-xl bg-black/20">
                      <p className="text-white/40">Latency</p>
                      <p className="text-white font-medium">{agent.latency}ms</p>
                    </div>
                    <div className="p-2 rounded-xl bg-black/20">
                      <p className="text-white/40">Tokens</p>
                      <p className="text-white font-medium">{formatTokens(agent.tokens)}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-black/20">
                      <p className="text-white/40">Health</p>
                      <div className="flex items-center gap-1">
                        <div className="flex-1 h-1.5 rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#ff0088] to-[#ff69b4]"
                            style={{ width: `${agent.health}%` }}
                          />
                        </div>
                        <span className="text-white">{agent.health}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                      <FileText className="w-4 h-4 mx-auto" />
                    </button>
                    {agent.status === 'running' ? (
                      <button className="flex-1 py-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 hover:bg-amber-400/20 transition-colors">
                        <Pause className="w-4 h-4 mx-auto" />
                      </button>
                    ) : (
                      <button className="flex-1 py-2 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 hover:bg-emerald-400/20 transition-colors">
                        <Play className="w-4 h-4 mx-auto" />
                      </button>
                    )}
                    <button className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                      <MoreHorizontal className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function formatTokens(tokens: number): string {
  if (tokens >= 1000000) return (tokens / 1000000).toFixed(1) + 'M';
  if (tokens >= 1000) return (tokens / 1000).toFixed(0) + 'K';
  return tokens.toString();
}
