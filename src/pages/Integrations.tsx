import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Check, Database, Users, Mail, Cloud, FolderOpen, Plug, Plus, MoreHorizontal, Settings, ExternalLink } from 'lucide-react';
import { integrations } from '@/data/mockData';
import { cn } from '@/utils/helpers';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Database,
  Users,
  Mail,
  Cloud,
  FolderOpen,
};

const categories = ['All', 'ERP', 'CRM', 'Collaboration', 'Cloud', 'Database', 'Storage'];

export default function Integrations() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'installed' | 'available'>('all');
  const [requesting, setRequesting] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleRequest = () => {
    if (requesting) return;
    setRequesting(true);
    setTimeout(() => setRequesting(false), 3000);
  };

  const handleCardAction = (id: string) => {
    if (processingId) return;
    setProcessingId(id);
    setTimeout(() => setProcessingId(null), 2000);
  };

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
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Connect</p>
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-white/40">Connect and manage your enterprise systems</p>
        </div>
        <button
          onClick={handleRequest}
          className="flex items-center gap-2 border px-4 py-2 transition-colors"
          style={{ borderColor: `${HOT}4D`, background: `${HOT}1A`, color: HOT }}
        >
          <Plus className="h-4 w-4" />
          Request Integration
        </button>
      </div>

      {requesting && (
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

      {/* Stats — divided rail */}
      <div className="grid grid-cols-4 gap-px bg-white/[0.06]">
        {[
          { label: 'Total Available', value: integrations.length },
          { label: 'Installed', value: integrations.filter(i => i.installed).length },
          { label: 'Active', value: integrations.filter(i => i.status === 'active').length },
          { label: 'Categories', value: new Set(integrations.map(i => i.category)).size },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0A0612] p-4 text-center">
            <p className="font-mono text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search integrations..."
            className="w-full border border-white/10 bg-white/[0.03] py-2 pl-10 pr-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
          />
        </div>
        <div className="flex gap-1">
          {['all', 'installed', 'available'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as 'all' | 'installed' | 'available')}
              className={cn(
                'px-4 py-2 font-mono text-[11px] uppercase tracking-wide transition-colors border',
                filterStatus === status
                  ? 'text-white'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:text-white/70'
              )}
              style={filterStatus === status ? { borderColor: `${HOT}4D`, background: `${HOT}1A`, color: HOT } : undefined}
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
              'whitespace-nowrap px-4 py-2 font-mono text-[11px] uppercase tracking-wide transition-colors border',
              activeCategory === cat
                ? 'border-white/20 bg-white/[0.06] text-white'
                : 'border-white/10 bg-white/[0.02] text-white/40 hover:text-white/70'
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
          const isInstalled = integration.installed;
          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="relative border border-white/10 bg-[#0A0612] overflow-hidden hover:border-white/20 transition-colors cursor-pointer"
              style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)' }}
            >
              <span
                className="absolute left-[3px] top-[3px] h-1 w-1 rotate-45"
                style={{ background: BRIGHT, boxShadow: `0 0 4px ${BRIGHT}` }}
              />
              {processingId === integration.id && (
                <div className="absolute top-0 left-0 w-full h-px overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${HOT}, ${BRIGHT}, transparent)` }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'linear' }}
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5">
                    <Icon className="h-6 w-6" style={{ color: HOT }} />
                  </div>
                  {isInstalled && (
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase" style={{ color: HOT }}>
                      <span className="h-1.5 w-1.5 rotate-45" style={{ background: HOT }} />
                      Installed
                    </span>
                  )}
                </div>

                <h3 className="font-medium text-white mb-1">{integration.name}</h3>
                <p className="text-xs text-white/40 mb-3">{integration.description}</p>

                <div className="flex items-center justify-between font-mono text-[10px] text-white/40 mb-4">
                  <span className="flex items-center gap-1">
                    <span style={{ color: HOT }}>&#9733;</span>
                    {integration.rating}
                  </span>
                  <span>{integration.installs} installs</span>
                </div>

                <div className="flex gap-2">
                  {isInstalled ? (
                    <>
                      <button
                        onClick={() => handleCardAction(integration.id)}
                        className="flex-1 py-2 border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:text-white text-sm"
                      >
                        {processingId === integration.id ? 'Activating...' : integration.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                      
                    </>
                  ) : (
                    <button
                      onClick={() => handleCardAction(integration.id)}
                      className="w-full py-2 border transition-colors text-sm"
                      style={{ borderColor: `${HOT}4D`, background: `${HOT}1A`, color: HOT }}
                    >
                      {processingId === integration.id ? 'Installing...' : 'Install'}
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
