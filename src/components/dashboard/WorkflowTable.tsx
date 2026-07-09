import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Trash2,
  Workflow,
} from 'lucide-react';
import { workflows } from '@/data/mockData';
import { formatTime, cn, getStatusColor, getPriorityColor } from '@/utils/helpers';

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

export default function WorkflowTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const filteredWorkflows = workflows.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.department.toLowerCase().includes(search.toLowerCase()) ||
    w.owner.toLowerCase().includes(search.toLowerCase())
  );

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
      className="rounded-3xl bg-gradient-to-br from-[#151021] to-[#10081d] border border-white/10 overflow-hidden"
    >
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Workflows</h2>
            <p className="text-sm text-white/50">{filteredWorkflows.length} total workflows</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search workflows..."
              className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#ff0088]/50 transition-colors w-64"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    'px-6 py-4 text-left text-xs font-medium text-white/50 uppercase tracking-wider',
                    col.sortable && 'cursor-pointer hover:text-white/70'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedWorkflows.map((workflow, idx) => (
              <motion.tr
                key={workflow.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff0088]/20 to-[#ff69b4]/20 flex items-center justify-center">
                      <Workflow className="w-4 h-4 text-[#ff0088]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{workflow.name}</p>
                      <p className="text-xs text-white/40">{workflow.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-white/70">{workflow.department}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium border', getStatusColor(workflow.status))}>
                    {workflow.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-white/70">
                    {workflow.executionTime > 0 ? `${workflow.executionTime}s` : '-'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-white/70">{workflow.owner}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium border', getPriorityColor(workflow.priority))}>
                    {workflow.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-white/50">{formatTime(workflow.lastRun)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {workflow.status === 'active' && (
                      <button className="p-1.5 rounded-lg hover:bg-amber-400/10 text-amber-400 transition-colors">
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                    {workflow.status === 'paused' && (
                      <button className="p-1.5 rounded-lg hover:bg-emerald-400/10 text-emerald-400 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    {workflow.status === 'error' && (
                      <button className="p-1.5 rounded-lg hover:bg-blue-400/10 text-blue-400 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-white/5 flex items-center justify-between">
        <p className="text-sm text-white/50">
          Showing {page * pageSize + 1} - {Math.min((page + 1) * pageSize, sortedWorkflows.length)} of {sortedWorkflows.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={cn(
                'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                p === page
                  ? 'bg-[#ff0088] text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              )}
            >
              {p + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
