import { useCallback } from 'react';
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
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Bot, Brain, Activity, Cpu, CheckCircle, Eye, Zap } from 'lucide-react';
import { aiAgents } from '@/data/mockData';
import { cn } from '@/utils/helpers';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';
const CANVAS = '#0A0612';

// Custom Node — notch corner instead of rounded-xl, so the graph matches
// the rest of the dashboard's shape language instead of introducing its own.
function CustomNode({ data }: { data: { label: string; icon: React.FC<{ className?: string }>; status: string } }) {
  const Icon = data.icon;
  return (
    <div
      className="relative min-w-[110px] border border-white/10 bg-[#0F0A1A]/95 px-4 py-3 backdrop-blur-xl"
      style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
    >
      <span
        className="absolute left-[2px] top-[2px] h-1 w-1 rotate-45"
        style={{ background: BRIGHT }}
      />
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center bg-white/5">
          <Icon className="h-4 w-4" style={{ color: HOT }} />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{data.label}</p>
          <p className="text-[10px] text-white/40">{data.status}</p>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

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

// Edges: just two tones now — HOT for the primary spine (erp/crm → alpha → decision),
// BRIGHT for everything downstream of the decision engine. Depth, not decoration.
const initialEdges: Edge[] = [
  { id: 'e-erp-alpha', source: 'erp', target: 'ai-alpha', animated: true, style: { stroke: HOT, strokeWidth: 2 } },
  { id: 'e-crm-alpha', source: 'crm', target: 'ai-alpha', animated: true, style: { stroke: HOT, strokeWidth: 2 } },
  { id: 'e-alpha-decision', source: 'ai-alpha', target: 'decision', animated: true, style: { stroke: HOT, strokeWidth: 2 } },
  { id: 'e-decision-rules', source: 'decision', target: 'rules', animated: true, style: { stroke: BRIGHT, strokeWidth: 2 } },
  { id: 'e-decision-automation', source: 'decision', target: 'automation', animated: true, style: { stroke: BRIGHT, strokeWidth: 2 } },
  { id: 'e-rules-finance', source: 'rules', target: 'finance', animated: true, style: { stroke: BRIGHT, strokeWidth: 2 } },
  { id: 'e-automation-hrms', source: 'automation', target: 'hrms', animated: true, style: { stroke: BRIGHT, strokeWidth: 2 } },
  { id: 'e-finance-hrms', source: 'finance', target: 'hrms', animated: true, style: { stroke: BRIGHT, strokeWidth: 2 } },
];

const agentIcons: Record<string, React.FC<{ className?: string }>> = {
  coordinator: Bot,
  planning: Brain,
  reasoning: Zap,
  validation: CheckCircle,
  execution: Activity,
  monitoring: Eye,
};

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

export default function AIWorkflowEngine() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: HOT } }, eds)),
    [setEdges]
  );

  const runningAgents = aiAgents.filter((a) => a.status === 'running' || a.status === 'idle');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden border border-white/10 bg-[#0A0612]"
      style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
    >
      <div className="border-b border-dashed border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Orchestration</p>
            <h2 className="text-lg font-semibold text-white">AI Workflow Intelligence Engine</h2>
            <p className="mt-0.5 text-sm text-white/40">Powered by NVIDIA SDK</p>
          </div>
          <div className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: HOT }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: HOT }} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: HOT }}>
              Live
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-[400px]">
        <div className="relative flex-1">
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
            <Background color="#2A2033" gap={16} />
            <MiniMap nodeColor={HOT} maskColor="rgba(10,6,18,0.85)" style={{ background: CANVAS }} />
            <Controls style={{ background: '#151021', borderRadius: 0 }} />
          </ReactFlow>
        </div>

        <div className="w-64 overflow-y-auto border-l border-dashed border-white/10 p-4">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Agent Roster</p>
          <div className="space-y-3">
            {runningAgents.slice(0, 6).map((agent) => {
              const Icon = agentIcons[agent.role] || Bot;
              const isRunning = agent.status === 'running';
              return (
                <div
                  key={agent.id}
                  className="border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-white/20"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center bg-white/5">
                      <Icon className="h-4 w-4" style={{ color: HOT }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-[10px] capitalize text-white/40">{agent.role}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 font-mono text-[10px]">
                    <div className="text-white/45">
                      <span className="font-medium text-white">{agent.memory.toFixed(1)}</span> GB
                    </div>
                    <div className="text-white/45">
                      <span className="font-medium text-white">{formatNumber(agent.tokens)}</span> tok
                    </div>
                    <div className="text-white/45">
                      <span className="font-medium text-white">{agent.latency}</span>ms
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 rotate-45"
                        style={{
                          background: isRunning ? HOT : 'transparent',
                          border: `1px solid ${isRunning ? HOT : DEEP}`,
                        }}
                      />
                      <span className="capitalize text-white/70">{agent.status}</span>
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