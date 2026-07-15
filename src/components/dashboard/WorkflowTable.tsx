import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Workflow,
} from 'lucide-react';
import { workflows } from '@/data/mockData';
import { formatTime, cn } from '@/utils/helpers';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';

const columns = [
  { key: 'name', label: 'Workflow', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'executionTime', label: 'Execution Time', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'priority', label: 'Priority', sortable: true },
  { key: 'lastRun', label: 'Last Run', sortable: true },
  { key: 'actions', label: '', sortable: false },
];

// Status carried by bracket + marker weight, not five badge colors.
function StatusTag({ status }: { status: string }) {
  const map: Record<string, { fill: boolean; dashed: boolean; color: string }> = {
    active: { fill: true, dashed: false, color: HOT },
    paused: { fill: false, dashed: false, color: BRIGHT },
    error: { fill: true, dashed: false, color: DEEP },
    idle: { fill: false, dashed: true, color: 'rgba(255,255,255,0.3)' },
  };
  const s = map[status] || map.idle;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide" style={{ color: s.color }}>
      <span
        className="h-1.5 w-1.5 rotate-45"
        style={{
          background: s.fill ? s.color : 'transparent',
          border: `1px ${s.dashed ? 'dashed' : 'solid'} ${s.color}`,
        }}
      />
      {status}
    </span>
  );
}

// Priority as bracket depth — [!], [!!], [!!!] — rather than a third badge palette.
function PriorityTag({ priority }: { priority: string }) {
  const marks: Record<string, string> = { low: '!', medium: '!!', high: '!!!', critical: '!!!!' };
  const emphasis: Record<string, string> = {
    low: 'text-white/40',
    medium: 'text-white/60',
    high: '',
    critical: '',
  };
  const style = priority === 'high' || priority === 'critical' ? { color: HOT } : undefined;
  return (
    <span className={cn('font-mono text-xs', emphasis[priority] || 'text-white/50')} style={style}>
      [{marks[priority] || '!'}] {priority}
    </span>
  );
}

export default function WorkflowTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, string>>({});
  const pageSize = 5;

  const filteredWorkflows = workflows.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.department.toLowerCase().includes(search.toLowerCase()) ||
      w.owner.toLowerCase().includes(search.toLowerCase())
  );

  const getStatus = (id: string, fallback: string) => statusOverrides[id] || fallback;

  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey as keyof typeof a];
    const bVal = b[sortKey as keyof typeof b];
    if (aVal == null || bVal == null) return 0;
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const paginatedWorkflows = sortedWorkflows.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(sortedWorkflows.length / pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="relative overflow-hidden border border-white/10 bg-[#0A0612]"
      style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
    >
      <div className="border-b border-dashed border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Registry</p>
            <h2 className="text-lg font-semibold text-white">Workflows</h2>
            <p className="mt-0.5 text-sm text-white/40">{filteredWorkflows.length} total</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search workflows..."
              className="w-64 border border-white/10 bg-white/[0.03] py-2 pl-10 pr-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dashed border-white/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    'px-6 py-4 text-left font-mono text-[11px] uppercase tracking-wider text-white/40',
                    col.sortable && 'cursor-pointer hover:text-white/70'
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable &&
                      sortKey === col.key &&
                      (sortDir === 'asc' ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedWorkflows.map((workflow, idx) => {
              const currentStatus = getStatus(workflow.id, workflow.status);
              return (
              <motion.tr
                key={workflow.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-dashed border-white/10 transition-colors last:border-b-0 hover:bg-white/[0.03]"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-white/5">
                      <Workflow className="h-4 w-4" style={{ color: HOT }} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{workflow.name}</p>
                      <p className="truncate text-xs text-white/40">{workflow.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-white/60">{workflow.department}</span>
                </td>
                <td className="px-6 py-4">
                  <StatusTag status={currentStatus} />
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-white/60">
                    {workflow.executionTime > 0 ? `${workflow.executionTime}s` : '—'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-white/60">{workflow.owner}</span>
                </td>
                <td className="px-6 py-4">
                  <PriorityTag priority={workflow.priority} />
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-white/40">{formatTime(workflow.lastRun)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {currentStatus === 'active' && (
                      <button
                        onClick={() => setStatusOverrides(prev => ({ ...prev, [workflow.id]: 'paused' }))}
                        className="p-1.5 text-white/50 transition-colors hover:text-white"
                        title="Pause"
                      >
                        <Pause className="h-4 w-4" />
                      </button>
                    )}
                    {currentStatus === 'paused' && (
                      <button
                        onClick={() => setStatusOverrides(prev => ({ ...prev, [workflow.id]: 'active' }))}
                        className="p-1.5 transition-colors hover:text-white"
                        style={{ color: BRIGHT }}
                        title="Resume"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                    )}
                    {currentStatus === 'error' && (
                      <button
                        onClick={() => setStatusOverrides(prev => ({ ...prev, [workflow.id]: 'active' }))}
                        className="p-1.5 transition-colors hover:text-white"
                        style={{ color: HOT }}
                        title="Retry"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    )}
                    
                  </div>
                </td>
              </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-white/10 p-4">
        <p className="text-sm text-white/40">
          {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sortedWorkflows.length)} of {sortedWorkflows.length}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-2 text-white/50 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={cn(
                'flex h-8 w-8 items-center justify-center font-mono text-sm transition-colors',
                p === page ? 'text-white' : 'text-white/40 hover:text-white/70'
              )}
              style={p === page ? { border: `1px solid ${HOT}`, color: HOT } : undefined}
            >
              {p + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className="p-2 text-white/50 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}