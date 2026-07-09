import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Server, Wifi, Database, Container, Box, Network, Gauge, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { infrastructureMetrics, dashboardStats } from '@/data/mockData';

const generateTimeData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${i}:00`,
    value: 50 + Math.random() * 40,
  }));
};

const MetricCard = ({ label, value, unit, icon: Icon, color, trend, data }: {
  label: string;
  value: number;
  unit: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  trend?: number;
  data?: { time: string; value: number }[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm text-white/50">{label}</span>
      </div>
      {trend !== undefined && (
        <span className={`flex items-center gap-1 text-xs ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
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
                <stop offset="0%" stopColor={color.includes('emerald') ? '#10b981' : color.includes('blue') ? '#3b82f6' : color.includes('purple') ? '#a855f7' : '#ff0088'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color.includes('emerald') ? '#10b981' : color.includes('blue') ? '#3b82f6' : color.includes('purple') ? '#a855f7' : '#ff0088'} stopOpacity={0} />
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
          <h1 className="text-2xl font-bold text-white">Infrastructure Monitoring</h1>
          <p className="text-white/50">Real-time system health and performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">All Systems Healthy</span>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="CPU Usage"
          value={metrics.cpu.current}
          unit="%"
          icon={Cpu}
          color="bg-gradient-to-br from-[#ff0088] to-[#ff1493]"
          trend={2.5}
          data={cpuData}
        />
        <MetricCard
          label="GPU Usage"
          value={metrics.gpu.current}
          unit="%"
          icon={Gauge}
          color="bg-gradient-to-br from-[#ff1493] to-[#ff4fa3]"
          trend={-1.2}
        />
        <MetricCard
          label="Memory Usage"
          value={metrics.memory.current}
          unit={`/${metrics.memory.max} GB`}
          icon={HardDrive}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend={0.8}
          data={memoryData}
        />
        <MetricCard
          label="Storage Used"
          value={(metrics.storage.current / metrics.storage.max) * 100}
          unit="%"
          icon={Database}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend={0.3}
        />
      </div>

      {/* Network & Inference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-white">Network Traffic</h3>
              <p className="text-sm text-white/50">Inbound & Outbound</p>
            </div>
            <Network className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-white/50 mb-1">Inbound</p>
              <p className="text-2xl font-bold text-emerald-400">{metrics.network.in.toFixed(0)} <span className="text-sm">Mbps</span></p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-white/50 mb-1">Outbound</p>
              <p className="text-2xl font-bold text-blue-400">{metrics.network.out.toFixed(0)} <span className="text-sm">Mbps</span></p>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Array.from({ length: 12 }, (_, i) => ({ time: `${i}:00`, in: 800 + Math.random() * 500, out: 500 + Math.random() * 400 }))}>
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} />
                <Tooltip contentStyle={{ background: '#151021', border: 'none', borderRadius: 12 }} />
                <Line type="monotone" dataKey="in" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="out" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-white">Inference Queue</h3>
              <p className="text-sm text-white/50">AI Model Requests</p>
            </div>
            <Activity className="w-5 h-5 text-[#ff0088]" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#ff0088]/10 border border-[#ff0088]/20">
              <p className="text-xs text-white/50 mb-1">Queued</p>
              <p className="text-2xl font-bold text-[#ff0088]">{metrics.inference.queue}</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-white/50 mb-1">Completed</p>
              <p className="text-2xl font-bold text-emerald-400">{metrics.inference.completed.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <p className="text-xs text-white/50 mb-1">Failed</p>
              <p className="text-2xl font-bold text-rose-400">{metrics.inference.failed}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Avg Response Time</span>
              <span className="text-white font-medium">42ms</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Throughput</span>
              <span className="text-white font-medium">1,250 req/s</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Cache Hit Rate</span>
              <span className="text-white font-medium">94.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Containers & Pods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Container className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-medium text-white">Containers</h3>
              <p className="text-xs text-white/50">Kubernetes pods</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: 'api-server', status: 'running', cpu: '45%', memory: '2.1GB' },
              { name: 'workflow-engine', status: 'running', cpu: '62%', memory: '4.2GB' },
              { name: 'agent-coordinator', status: 'running', cpu: '38%', memory: '1.8GB' },
              { name: 'data-processor', status: 'running', cpu: '71%', memory: '3.5GB' },
            ].map((container) => (
              <div key={container.name} className="flex items-center justify-between p-3 rounded-xl bg-black/20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm text-white">{container.name}</span>
                </div>
                <div className="text-xs text-white/50">
                  {container.cpu} / {container.memory}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Box className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-medium text-white">API Health</h3>
              <p className="text-xs text-white/50">Endpoint status</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { endpoint: '/api/v1/workflows', latency: 24, status: 'healthy' },
              { endpoint: '/api/v1/agents', latency: 18, status: 'healthy' },
              { endpoint: '/api/v1/integrations', latency: 32, status: 'healthy' },
              { endpoint: '/api/v1/inference', latency: 45, status: 'healthy' },
            ].map((api) => (
              <div key={api.endpoint} className="flex items-center justify-between p-3 rounded-xl bg-black/20">
                <span className="text-sm text-white font-mono">{api.endpoint}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50">{api.latency}ms</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-medium text-white">Services</h3>
              <p className="text-xs text-white/50">Running instances</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'PostgreSQL', status: 'primary', instances: 3 },
              { name: 'Redis', status: 'cluster', instances: 5 },
              { name: 'Kafka', status: 'broker', instances: 3 },
              { name: 'Elasticsearch', status: 'cluster', instances: 3 },
            ].map((service) => (
              <div key={service.name} className="p-3 rounded-xl bg-black/20 text-center">
                <p className="text-sm font-medium text-white">{service.name}</p>
                <p className="text-xs text-white/50">{service.instances} instances</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
