import { useCallback, useState, useMemo } from 'react';
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
import {
  Database,
  Users,
  Bot,
  Brain,
  Zap,
  GitBranch,
  ArrowRight,
  Square,
  Hexagon,
  Save,
  Play,
  Download,
  Upload,
} from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: 'trigger-1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { label: 'Trigger', description: 'Manual trigger' },
  },
  {
    id: 'erp-1',
    type: 'erp',
    position: { x: 100, y: 250 },
    data: { label: 'SAP ERP', description: 'Fetch data' },
  },
  {
    id: 'decision-1',
    type: 'decision',
    position: { x: 350, y: 175 },
    data: { label: 'Decision', description: 'Check status' },
  },
  {
    id: 'agent-1',
    type: 'agent',
    position: { x: 600, y: 100 },
    data: { label: 'AI Agent', description: 'Process data' },
  },
  {
    id: 'crm-1',
    type: 'crm',
    position: { x: 600, y: 300 },
    data: { label: 'Salesforce', description: 'Update record' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e-trigger-erp', source: 'trigger-1', target: 'erp-1', animated: true },
  { id: 'e-erp-decision', source: 'erp-1', target: 'decision-1', animated: true },
  { id: 'e-decision-agent', source: 'decision-1', target: 'agent-1', label: 'Yes', animated: true },
  { id: 'e-decision-crm', source: 'decision-1', target: 'crm-1', label: 'No', animated: true },
];

// Custom Node Components
const TriggerNode = ({ data }: { data: { label: string; description: string } }) => (
  <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 shadow-lg">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
        <Zap className="w-5 h-5 text-emerald-400" />
      </div>
      <div>
        <p className="font-medium text-white text-sm">{data.label}</p>
        <p className="text-xs text-white/40">{data.description}</p>
      </div>
    </div>
  </div>
);

const ERPNode = ({ data }: { data: { label: string; description: string } }) => (
  <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 shadow-lg">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center">
        <Database className="w-5 h-5 text-blue-400" />
      </div>
      <div>
        <p className="font-medium text-white text-sm">{data.label}</p>
        <p className="text-xs text-white/40">{data.description}</p>
      </div>
    </div>
  </div>
);

const CRMNode = ({ data }: { data: { label: string; description: string } }) => (
  <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 shadow-lg">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-purple-500/30 flex items-center justify-center">
        <Users className="w-5 h-5 text-purple-400" />
      </div>
      <div>
        <p className="font-medium text-white text-sm">{data.label}</p>
        <p className="text-xs text-white/40">{data.description}</p>
      </div>
    </div>
  </div>
);

const AgentNode = ({ data }: { data: { label: string; description: string } }) => (
  <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-[#ff0088]/20 to-[#ff69b4]/10 border border-[#ff0088]/30 shadow-lg shadow-[#ff0088]/20">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#ff0088]/30 flex items-center justify-center">
        <Bot className="w-5 h-5 text-[#ff0088]" />
      </div>
      <div>
        <p className="font-medium text-white text-sm">{data.label}</p>
        <p className="text-xs text-white/40">{data.description}</p>
      </div>
    </div>
  </div>
);

const DecisionNode = ({ data }: { data: { label: string; description: string } }) => (
  <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 shadow-lg">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center">
        <GitBranch className="w-5 h-5 text-amber-400" />
      </div>
      <div>
        <p className="font-medium text-white text-sm">{data.label}</p>
        <p className="text-xs text-white/40">{data.description}</p>
      </div>
    </div>
  </div>
);

const nodeTypes = {
  trigger: TriggerNode,
  erp: ERPNode,
  crm: CRMNode,
  agent: AgentNode,
  decision: DecisionNode,
};

const nodePalette = [
  { type: 'trigger', label: 'Trigger', icon: Zap, color: 'emerald' },
  { type: 'erp', label: 'ERP', icon: Database, color: 'blue' },
  { type: 'crm', label: 'CRM', icon: Users, color: 'purple' },
  { type: 'agent', label: 'AI Agent', icon: Bot, color: 'pink' },
  { type: 'decision', label: 'Decision', icon: GitBranch, color: 'amber' },
];

function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#ff0088', strokeWidth: 2 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: nodePalette.find((n) => n.type === type)?.label || type,
          description: 'New node',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const exportWorkflow = () => {
    const workflow = { nodes, edges };
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-[calc(100vh-180px)] flex">
      {/* Node Palette */}
      <div className="w-64 p-4 border-r border-white/5 overflow-y-auto">
        <h3 className="text-sm font-medium text-white mb-4">Drag to Add</h3>
        <div className="space-y-2">
          {nodePalette.map((node) => (
            <div
              key={node.type}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow', node.type);
                e.dataTransfer.effectAllowed = 'move';
              }}
              className={`p-3 rounded-xl bg-${node.color}-500/10 border border-${node.color}-500/20 cursor-grab hover:scale-[1.02] active:cursor-grabbing transition-transform`}
            >
              <div className="flex items-center gap-3">
                <node.icon className={`w-5 h-5 text-${node.color}-400`} />
                <span className="text-sm text-white">{node.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
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
          defaultEdgeOptions={{
            style: { stroke: '#ff0088', strokeWidth: 2 },
          }}
        >
          <Background color="#333" gap={16} />
          <MiniMap
            nodeColor="#ff0088"
            maskColor="rgba(0,0,0,0.8)"
            style={{ background: '#0a0713' }}
          />
          <Controls style={{ background: '#151021', borderRadius: 12 }} />
          <Panel position="top-right" className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
            <button className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4" />
              Run
            </button>
            <button
              onClick={exportWorkflow}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Workflow Builder</h1>
          <p className="text-white/50">Design and automate enterprise workflows</p>
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-[#151021] to-[#10081d] border border-white/10 overflow-hidden">
        <ReactFlowProvider>
          <WorkflowBuilder />
        </ReactFlowProvider>
      </div>
    </motion.div>
  );
}
