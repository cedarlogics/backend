import { useCallback } from 'react';
import ReactFlow, {
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  Panel,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Database, Users, Bot, Zap, GitBranch, Download } from 'lucide-react';


const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';
const CANVAS = '#0A0612';

const initialNodes: Node[] = [
  { id: 'trigger-1', type: 'trigger', position: { x: 100, y: 100 }, data: { label: 'Trigger', description: 'Manual trigger' } },
  { id: 'erp-1', type: 'erp', position: { x: 100, y: 250 }, data: { label: 'SAP ERP', description: 'Fetch data' } },
  { id: 'decision-1', type: 'decision', position: { x: 350, y: 175 }, data: { label: 'Decision', description: 'Check status' } },
  { id: 'agent-1', type: 'agent', position: { x: 600, y: 100 }, data: { label: 'AI Agent', description: 'Process data' } },
  { id: 'crm-1', type: 'crm', position: { x: 600, y: 300 }, data: { label: 'Salesforce', description: 'Update record' } },
];

const initialEdges: Edge[] = [
  { id: 'e-trigger-erp', source: 'trigger-1', target: 'erp-1', animated: true },
  { id: 'e-erp-decision', source: 'erp-1', target: 'decision-1', animated: true },
  { id: 'e-decision-agent', source: 'decision-1', target: 'agent-1', label: 'Yes', animated: true },
  { id: 'e-decision-crm', source: 'decision-1', target: 'crm-1', label: 'No', animated: true },
];

// One node chrome, five clip-path "kinds" — role is read from silhouette, not color.
// trigger: notch corner (matches the rest of the dashboard's default panel shape)
// erp/crm (data sources): single flat corner, no notch — grounded, static
// decision: both top corners cut — a fork shape
// agent: notch corner + filled icon badge (the one node type that gets the brand's full-strength accent, since agents are this product's hero concept)
type NodeKind = 'trigger' | 'erp' | 'crm' | 'agent' | 'decision';

const kindClip: Record<NodeKind, string> = {
  trigger: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)',
  erp: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)',
  crm: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)',
  decision: 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%, 0 10px)',
  agent: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)',
};

function FlowNode({ kind, icon: Icon, data }: { kind: NodeKind; icon: React.FC<{ className?: string }>; data: { label: string; description: string } }) {
  const isAgent = kind === 'agent';
  return (
    <div
      className="min-w-[160px] border bg-[#0F0A1A]/95 px-4 py-3 backdrop-blur-xl"
      style={{
        clipPath: kindClip[kind],
        borderColor: isAgent ? 'rgba(255,45,135,0.35)' : 'rgba(255,255,255,0.1)',
        boxShadow: isAgent ? `0 0 24px ${HOT}22` : undefined,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center"
          style={{ background: isAgent ? `${HOT}26` : 'rgba(255,255,255,0.06)' }}
        >
          <Icon className="h-5 w-5" style={{ color: isAgent ? HOT : BRIGHT }} />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{data.label}</p>
          <p className="text-xs text-white/40">{data.description}</p>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = {
  trigger: ({ data }: any) => <FlowNode kind="trigger" icon={Zap} data={data} />,
  erp: ({ data }: any) => <FlowNode kind="erp" icon={Database} data={data} />,
  crm: ({ data }: any) => <FlowNode kind="crm" icon={Users} data={data} />,
  agent: ({ data }: any) => <FlowNode kind="agent" icon={Bot} data={data} />,
  decision: ({ data }: any) => <FlowNode kind="decision" icon={GitBranch} data={data} />,
};

const nodePalette: { type: NodeKind; label: string; icon: React.FC<{ className?: string }> }[] = [
  { type: 'trigger', label: 'Trigger', icon: Zap },
  { type: 'erp', label: 'ERP', icon: Database },
  { type: 'crm', label: 'CRM', icon: Users },
  { type: 'agent', label: 'AI Agent', icon: Bot },
  { type: 'decision', label: 'Decision', icon: GitBranch },
];

function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useReactFlow();
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: HOT, strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow') as NodeKind;
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: nodePalette.find((n) => n.type === type)?.label || type, description: 'New node' },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const exportWorkflow = () => {
    const workflow = { nodes, edges };
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-[calc(100vh-180px)]">
      {/* Node palette */}
      <div className="w-64 overflow-y-auto border-r border-dashed border-white/10 p-4">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Drag to add</p>
        <div className="space-y-2">
          {nodePalette.map((node) => {
            const isAgent = node.type === 'agent';
            return (
              <div
                key={node.type}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/reactflow', node.type);
                  e.dataTransfer.effectAllowed = 'move';
                }}
                className="cursor-grab border bg-white/[0.03] p-3 transition-transform active:cursor-grabbing hover:scale-[1.02]"
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
                  borderColor: isAgent ? 'rgba(255,45,135,0.3)' : 'rgba(255,255,255,0.1)',
                }}
              >
                <div className="flex items-center gap-3">
                  <node.icon className="h-4 w-4" style={{ color: isAgent ? HOT : BRIGHT }} />
                  <span className="text-sm text-white">{node.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          defaultEdgeOptions={{ style: { stroke: HOT, strokeWidth: 2 } }}
        >
          <Background color="#2A2033" gap={16} />
          <MiniMap nodeColor={HOT} maskColor="rgba(10,6,18,0.85)" style={{ background: CANVAS }} />
          <Controls style={{ background: '#151021', borderRadius: 0 }} />
          <Panel position="top-right" className="flex gap-2">
            <button
              onClick={exportWorkflow}
              className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 text-white/70 transition-colors hover:text-white"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default function Workflows() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Builder</p>
        <h1 className="text-2xl font-bold text-white">Workflow Builder</h1>
        <p className="text-white/40">Design and automate enterprise workflows</p>
      </div>

      <div
        className="relative overflow-hidden border border-white/10 bg-[#0A0612]"
        style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
      >
        <ReactFlowProvider>
          <WorkflowBuilder />
        </ReactFlowProvider>
      </div>
    </motion.div>
  );
}