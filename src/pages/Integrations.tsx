import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Check, Database, Users, Mail, Cloud, FolderOpen, Plug, Plus, MoreHorizontal, Settings, ExternalLink } from 'lucide-react';
import { integrations } from '@/data/mockData';
import { cn } from '@/utils/helpers';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Database,
  Users,
  Mail,
  Cloud,
  FolderOpen,
};

const categoryColors: Record<string, string> = {
  ERP: 'from-blue-500/20 to-blue-600/10 border-blue-500/20',
  CRM: 'from-purple-500/20 to-purple-600/10 border-purple-500/20',
  Collaboration: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/20',
  Cloud: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20',
  Database: 'from-amber-500/20 to-amber-600/10 border-amber-500/20',
  Storage: 'from-rose-500/20 to-rose-600/10 border-rose-500/20',
};

const categories = ['All', 'ERP', 'CRM', 'Collaboration', 'Cloud', 'Database', 'Storage'];

export default function Integrations() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'installed' | 'available'>('all');

  const filteredIntegrations = integrations.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || i.category === activeCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'installed' && i.installed) ||
      (filterStatus === 'available' && !i.installed);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-white/50">Connect and manage your enterprise systems</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff0088] to-[#ff69b4] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Request Integration
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Available', value: integrations.length, color: 'text-white' },
          { label: 'Installed', value: integrations.filter(i => i.installed).length, color: 'text-emerald-400' },
          { label: 'Active', value: integrations.filter(i => i.status === 'active').length, color: 'text-blue-400' },
          { label: 'Categories', value: new Set(integrations.map(i => i.category)).size, color: 'text-purple-400' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search integrations..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#ff0088]/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'installed', 'available'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as 'all' | 'installed' | 'available')}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                filterStatus === status
                  ? 'bg-[#ff0088] text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
              activeCategory === cat
                ? 'bg-white/10 text-white border border-white/20'
                : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredIntegrations.map((integration, idx) => {
          const Icon = iconMap[integration.icon] || Database;
          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={cn(
                'rounded-2xl border overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer',
                categoryColors[integration.category] || 'from-white/5 to-white/[0.02] border-white/10'
              )}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {integration.installed && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-xs">
                      <Check className="w-3 h-3" />
                      Installed
                    </span>
                  )}
                </div>

                <h3 className="font-medium text-white mb-1">{integration.name}</h3>
                <p className="text-xs text-white/40 mb-3">{integration.description}</p>

                <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                  <span className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    {integration.rating}
                  </span>
                  <span>{integration.installs} installs</span>
                </div>

                <div className="flex gap-2">
                  {integration.installed ? (
                    <>
                      <button className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm">
                        {integration.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                      <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button className="w-full py-2 rounded-xl bg-gradient-to-r from-[#ff0088] to-[#ff69b4] text-white font-medium hover:opacity-90 transition-opacity text-sm">
                      Install
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
