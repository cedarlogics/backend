import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, Zap, Eye, CheckCircle, Activity, Pause, Play, FileText, MoreHorizontal, Clock, Cpu, Database } from 'lucide-react';
import { aiAgents } from '@/data/mockData';
import { formatTime } from '@/utils/helpers';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';

const roleIcons: Record<string, React.FC<{ className?: string }>> = {
  coordinator: Bot,
  planning: Brain,
  reasoning: Zap,
  validation: CheckCircle,
  execution: Activity,
  monitoring: Eye,
};

function formatTokens(tokens: number): string {
  if (tokens >= 1000000) return (tokens / 1000000).toFixed(1) + 'M';
  if (tokens >= 1000) return (tokens / 1000).toFixed(0) + 'K';
  return tokens.toString();
}

export default function AIAgents() {
  const [deploying, setDeploying] = useState(false);
  const runningCount = aiAgents.filter(a => a.status === 'running').length;

  const handleDeploy = () => {
    if (deploying) return;
    setDeploying(true);
    setTimeout(() => setDeploying(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Agents</p>
          <h1 className="text-2xl font-bold text-white">AI Agents</h1>
          <p className="text-white/40">Manage and monitor your AI agents</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: HOT }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: HOT }} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: HOT }}>
              {runningCount} Running
            </span>
          </div>
          <button
            onClick={handleDeploy}
            className="flex items-center gap-2 border px-4 py-2 transition-colors"
            style={{ borderColor: `${HOT}4D`, background: `${HOT}1A`, color: HOT }}
          >
            <Bot className="h-4 w-4" />
            Deploy Agent
          </button>
        </div>
      </div>

      {deploying && (
        <div className="relative h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{ background: `linear-gradient(90deg, transparent, ${HOT}, ${BRIGHT}, transparent)` }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
          />
        </div>
      )}

      {/* Summary KPI strip */}
      <div className="grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-4">
        {[
          { label: 'Total Agents', value: aiAgents.length, icon: Bot },
          { label: 'Running', value: runningCount, icon: Activity },
          { label: 'Total Memory', value: `${aiAgents.reduce((s, a) => s + a.memory, 0).toFixed(1)} GB`, icon: Database },
          { label: 'Avg Latency', value: `${Math.round(aiAgents.reduce((s, a) => s + a.latency, 0) / aiAgents.length)}ms`, icon: Clock },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0A0612] p-4">
            <stat.icon className="mb-2 h-4 w-4" style={{ color: BRIGHT }} />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {aiAgents.map((agent, idx) => {
          const Icon = roleIcons[agent.role] || Bot;
          const isRunning = agent.status === 'running';
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative border border-white/10 bg-[#0A0612] overflow-hidden hover:border-white/20 transition-colors cursor-pointer"
              style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)' }}
            >
              <span
                className="absolute left-[3px] top-[3px] h-1 w-1 rotate-45"
                style={{ background: BRIGHT, boxShadow: `0 0 6px ${BRIGHT}` }}
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-white/5">
                      <Icon className="h-5 w-5" style={{ color: HOT }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{agent.name}</h3>
                      <p className="text-xs capitalize text-white/40">{agent.role}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rotate-45"
                      style={{
                        background: isRunning ? HOT : 'transparent',
                        border: `1px solid ${isRunning ? HOT : DEEP}`,
                      }}
                    />
                    <span className="font-mono text-[10px] uppercase text-white/60">{agent.status}</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="border border-white/10 bg-white/[0.02] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">Current Task</p>
                    <p className="text-sm text-white truncate">{agent.currentTask}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                    <div className="border border-white/10 bg-white/[0.02] p-2">
                      <p className="text-white/45">
                        <span className="font-medium text-white">{agent.memory}</span>/{agent.memoryMax} GB
                      </p>
                    </div>
                    <div className="border border-white/10 bg-white/[0.02] p-2">
                      <p className="text-white/45">
                        <span className="font-medium text-white">{agent.latency}</span>ms
                      </p>
                    </div>
                    <div className="border border-white/10 bg-white/[0.02] p-2">
                      <p className="text-white/45">
                        <span className="font-medium text-white">{formatTokens(agent.tokens)}</span> tok
                      </p>
                    </div>
                    <div className="border border-white/10 bg-white/[0.02] p-2">
                      <p className="text-white/45">
                        <span className="font-medium text-white">{agent.health}%</span> health
                      </p>
                    </div>
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
