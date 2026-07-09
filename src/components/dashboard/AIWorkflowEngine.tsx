import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Bot, Brain, Activity, Cpu, CheckCircle, Eye, Zap } from 'lucide-react';
import { aiAgents } from '@/data/mockData';
import { cn } from '@/utils/helpers';

// Custom Node Component
function CustomNode({ data }: { data: { label: string; icon: React.FC<{ className?: string }>; status: string } }) {
  const Icon = data.icon;
  return (
    <div className="px-4 py-3 rounded-xl bg-[#151021]/90 backdrop-blur-xl border border-white/10 shadow-xl min-w-[100px]">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff0088]/20 to-[#ff69b4]/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#ff0088]" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{data.label}</p>
          <p className="text-[10px] text-white/40">{data.status}</p>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  { id: 'erp', type: 'custom', position: { x: 50, y: 150 }, data: { label: 'ERP', icon: Cpu, status: 'Connected' } },
  { id: 'crm', type: 'custom', position: { x: 50, y: 300 }, data: { label: 'CRM', icon: Cpu, status: 'Connected' } },
  { id: 'ai-alpha', type: 'custom', position: { x: 250, y: 100 }, data: { label: 'AI Alpha', icon: Bot, status: 'Running' } },
  { id: 'decision', type: 'custom', position: { x: 450, y: 200 }, data: { label: 'Decision Engine', icon: Brain, status: 'Active' } },
  { id: 'rules', type: 'custom', position: { x: 450, y: 350 }, data: { label: 'Business Rules', icon: Activity, status: 'Active' } },
  { id: 'automation', type: 'custom', position: { x: 650, y: 150 }, data: { label: 'Automation', icon: Zap, status: 'Processing' } },
  { id: 'finance', type: 'custom', position: { x: 650, y: 300 }, data: { label: 'Finance', icon: Cpu, status: 'Connected' } },
  { id: 'hrms', type: 'custom', position: { x: 850, y: 225 }, data: { label: 'HRMS', icon: Cpu, status: 'Connected' } },
];

const initialEdges: Edge[] = [
  { id: 'e-erp-alpha', source: 'erp', target: 'ai-alpha', animated: true, style: { stroke: '#ff0088', strokeWidth: 2 } },
  { id: 'e-crm-alpha', source: 'crm', target: 'ai-alpha', animated: true, style: { stroke: '#ff0088', strokeWidth: 2 } },
  { id: 'e-alpha-decision', source: 'ai-alpha', target: 'decision', animated: true, style: { stroke: '#ff1493', strokeWidth: 2 } },
  { id: 'e-decision-rules', source: 'decision', target: 'rules', animated: true, style: { stroke: '#ff4fa3', strokeWidth: 2 } },
  { id: 'e-decision-automation', source: 'decision', target: 'automation', animated: true, style: { stroke: '#ff69b4', strokeWidth: 2 } },
  { id: 'e-rules-finance', source: 'rules', target: 'finance', animated: true, style: { stroke: '#ff69b4', strokeWidth: 2 } },
  { id: 'e-automation-hrms', source: 'automation', target: 'hrms', animated: true, style: { stroke: '#ff85c2', strokeWidth: 2 } },
  { id: 'e-finance-hrms', source: 'finance', target: 'hrms', animated: true, style: { stroke: '#ff85c2', strokeWidth: 2 } },
];

const agentIcons: Record<string, React.FC<{ className?: string }>> = {
  coordinator: Bot,
  planning: Brain,
  reasoning: Zap,
  validation: CheckCircle,
  execution: Activity,
  monitoring: Eye,
};

export default function AIWorkflowEngine() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#ff0088' } }, eds)),
    [setEdges]
  );

  const runningAgents = aiAgents.filter((a) => a.status === 'running' || a.status === 'idle');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-3xl bg-gradient-to-br from-[#151021] to-[#10081d] border border-white/10 overflow-hidden"
    >
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">AI Workflow Intelligence Engine</h2>
            <p className="text-sm text-white/50">Powered by NVIDIA SDK</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#ff0088]/10 border border-[#ff0088]/20">
            <span className="w-2 h-2 rounded-full bg-[#ff0088] animate-pulse" />
            <span className="text-sm text-[#ff0088]">Live Orchestration</span>
          </div>
        </div>
      </div>

      <div className="flex h-[400px]">
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Background color="#333" gap={16} />
            <MiniMap
              nodeColor="#ff0088"
              maskColor="rgba(0,0,0,0.8)"
              style={{ background: '#0a0713' }}
            />
            <Controls style={{ background: '#151021', borderRadius: 12 }} />
          </ReactFlow>
        </div>

        <div className="w-64 border-l border-white/5 p-4 overflow-y-auto">
          <h3 className="text-sm font-medium text-white mb-4">AI Agent Cards</h3>
          <div className="space-y-3">
            {runningAgents.slice(0, 6).map((agent) => {
              const Icon = agentIcons[agent.role] || Bot;
              return (
                <div
                  key={agent.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff0088]/20 to-[#ff69b4]/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#ff0088]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-[10px] text-white/40 capitalize">{agent.role}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="text-white/50">
                      <span className="text-white font-medium">{agent.memory.toFixed(1)}</span> GB
                    </div>
                    <div className="text-white/50">
                      <span className="text-white font-medium">{formatNumber(agent.tokens)}</span> tokens
                    </div>
                    <div className="text-white/50">
                      <span className="text-white font-medium">{agent.latency}</span>ms
                    </div>
                    <div className="flex items-center gap-1">
                      <span
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          agent.status === 'running' ? 'bg-emerald-400' : 'bg-amber-400'
                        )}
                      />
                      <span className="text-white">{agent.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}
