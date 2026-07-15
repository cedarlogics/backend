import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Server, Wifi, Database, Container, Box, Network, Gauge, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { infrastructureMetrics } from '@/data/mockData';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';

const generateTimeData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${i}:00`,
    value: 50 + Math.random() * 40,
  }));
};

const MetricCard = ({ label, value, unit, icon: Icon, trend, data }: {
  label: string;
  value: number;
  unit: string;
  icon: React.FC<{ className?: string }>;
  trend?: number;
  data?: { time: string; value: number }[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative border border-white/10 bg-[#0A0612] p-4 hover:border-white/20 transition-colors"
    style={{ clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)' }}
  >
    <span
      className="absolute left-[2px] top-[2px] h-1 w-1 rotate-45"
      style={{ background: BRIGHT, boxShadow: `0 0 4px ${BRIGHT}` }}
    />
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center bg-white/5">
          <Icon className="h-4 w-4" style={{ color: HOT }} />
        </div>
        <span className="text-sm text-white/50">{label}</span>
      </div>
      {trend !== undefined && (
        <span className={`flex items-center gap-1 font-mono text-[11px] ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(trend).toFixed(1)}%
        </span>
      )}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-white">{value.toFixed(1)}</span>
      <span className="text-sm text-white/40">{unit}</span>
    </div>
    {data && (
      <div className="h-16 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={HOT} stopOpacity={0.3} />
                <stop offset="100%" stopColor={HOT} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="none" fill={`url(#gradient-${label})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )}
  </motion.div>
);

export default function Infrastructure() {
  const [metrics, setMetrics] = useState(infrastructureMetrics);
  const [cpuData, setCpuData] = useState(generateTimeData());
  const [memoryData, setMemoryData] = useState(generateTimeData());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpu: { ...prev.cpu, current: Math.min(100, Math.max(40, prev.cpu.current + (Math.random() - 0.5) * 8)) },
        gpu: { ...prev.gpu, current: Math.min(100, Math.max(50, prev.gpu.current + (Math.random() - 0.5) * 5)) },
        memory: { ...prev.memory, current: Math.min(32, Math.max(8, prev.memory.current + (Math.random() - 0.5) * 2)) },
        network: { ...prev.network, in: Math.max(500, prev.network.in + (Math.random() - 0.5) * 200), out: Math.max(300, prev.network.out + (Math.random() - 0.5) * 150) },
      }));
      setCpuData((prev) => [...prev.slice(1), { time: `${new Date().getMinutes()}`, value: 50 + Math.random() * 40 }]);
      setMemoryData((prev) => [...prev.slice(1), { time: `${new Date().getMinutes()}`, value: 50 + Math.random() * 40 }]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Monitoring</p>
          <h1 className="text-2xl font-bold text-white">Infrastructure Monitoring</h1>
          <p className="text-white/40">Real-time system health and performance</p>
        </div>
        <div className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rotate-45" style={{ background: HOT }} />
          <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: HOT }}>
            All Systems Healthy
          </span>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="CPU Usage"
          value={metrics.cpu.current}
          unit="%"
          icon={Cpu}
          trend={2.5}
          data={cpuData}
        />
        <MetricCard
          label="GPU Usage"
          value={metrics.gpu.current}
          unit="%"
          icon={Gauge}
          trend={-1.2}
        />
        <MetricCard
          label="Memory Usage"
          value={metrics.memory.current}
          unit={`/${metrics.memory.max} GB`}
          icon={HardDrive}
          trend={0.8}
          data={memoryData}
        />
        <MetricCard
          label="Storage Used"
          value={(metrics.storage.current / metrics.storage.max) * 100}
          unit="%"
          icon={Database}
          trend={0.3}
        />
      </div>

      {/* Network & Inference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="relative border border-white/10 bg-[#0A0612] p-6"
          style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Traffic</p>
              <h3 className="font-semibold text-white">Network Traffic</h3>
              <p className="text-sm text-white/40">Inbound & Outbound</p>
            </div>
            <Network className="h-5 w-5" style={{ color: BRIGHT }} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/40 mb-1">Inbound</p>
              <p className="text-2xl font-bold text-emerald-400">{metrics.network.in.toFixed(0)} <span className="text-sm">Mbps</span></p>
            </div>
            <div className="border border-blue-400/20 bg-blue-400/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/40 mb-1">Outbound</p>
              <p className="text-2xl font-bold text-blue-400">{metrics.network.out.toFixed(0)} <span className="text-sm">Mbps</span></p>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Array.from({ length: 12 }, (_, i) => ({ time: `${i}:00`, in: 800 + Math.random() * 500, out: 500 + Math.random() * 400 }))}>
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.15)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.15)" fontSize={10} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 0 }} />
                <Line type="monotone" dataKey="in" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="out" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="relative border border-white/10 bg-[#0A0612] p-6"
          style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Queue</p>
              <h3 className="font-semibold text-white">Inference Queue</h3>
              <p className="text-sm text-white/40">AI Model Requests</p>
            </div>
            <Activity className="h-5 w-5" style={{ color: HOT }} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-white/10 bg-white/[0.02] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/40 mb-1">Queued</p>
              <p className="text-2xl font-bold text-white">{metrics.inference.queue}</p>
            </div>
            <div className="border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/40 mb-1">Completed</p>
              <p className="text-2xl font-bold text-emerald-400">{metrics.inference.completed.toLocaleString()}</p>
            </div>
            <div className="border border-rose-400/20 bg-rose-400/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/40 mb-1">Failed</p>
              <p className="text-2xl font-bold text-rose-400">{metrics.inference.failed}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { label: 'Avg Response Time', value: '42ms' },
              { label: 'Throughput', value: '1,250 req/s' },
              { label: 'Cache Hit Rate', value: '94.2%' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-dashed border-white/10 py-2 text-sm last:border-b-0">
                <span className="text-white/50">{item.label}</span>
                <span className="font-mono font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Containers & Pods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Containers',
            subtitle: 'Kubernetes pods',
            icon: Container,
            iconColor: BRIGHT,
            items: [
              { name: 'api-server', status: 'running', cpu: '45%', memory: '2.1GB' },
              { name: 'workflow-engine', status: 'running', cpu: '62%', memory: '4.2GB' },
              { name: 'agent-coordinator', status: 'running', cpu: '38%', memory: '1.8GB' },
              { name: 'data-processor', status: 'running', cpu: '71%', memory: '3.5GB' },
            ],
          },
          {
            title: 'API Health',
            subtitle: 'Endpoint status',
            icon: Box,
            iconColor: BRIGHT,
            items: [
              { name: '/api/v1/workflows', status: '24ms' },
              { name: '/api/v1/agents', status: '18ms' },
              { name: '/api/v1/integrations', status: '32ms' },
              { name: '/api/v1/inference', status: '45ms' },
            ],
          },
          {
            title: 'Services',
            subtitle: 'Running instances',
            icon: Server,
            iconColor: BRIGHT,
            items: [
              { name: 'PostgreSQL', status: '3' },
              { name: 'Redis', status: '5' },
              { name: 'Kafka', status: '3' },
              { name: 'Elasticsearch', status: '3' },
            ],
          },
        ].map((section) => (
          <div
            key={section.title}
            className="relative border border-white/10 bg-[#0A0612] p-6"
            style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="h-5 w-5" style={{ color: section.iconColor }} />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{section.subtitle}</p>
                <h3 className="font-semibold text-white">{section.title}</h3>
              </div>
            </div>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between border border-white/10 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rotate-45" style={{ background: HOT }} />
                    <span className="text-sm text-white">{item.name}</span>
                  </div>
                  <span className="font-mono text-xs text-white/50">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
