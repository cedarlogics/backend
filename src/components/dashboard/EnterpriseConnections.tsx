import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  Users,
  UserCog,
  CreditCard,
  Mail,
  Cloud,
  Plug,
  Server,
  ArrowRight,
} from 'lucide-react';
import { enterpriseConnections } from '@/data/mockData';
import { cn } from '@/utils/helpers';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Database,
  Users,
  UserCog,
  CreditCard,
  Mail,
  Cloud,
  Server,
};

// Category is a label, not a mood — one mono tag replaces six background colors.
const categoryTag: Record<string, string> = {
  ERP: 'ERP',
  CRM: 'CRM',
  HRMS: 'HR',
  Finance: 'FIN',
  Collaboration: 'COL',
  Storage: 'STO',
};

function Notch({
  children,
  cut = 20,
  className = '',
}: {
  children: React.ReactNode;
  cut?: number;
  className?: string;
}) {
  const clip = `polygon(${cut}px 0, 100% 0, 100% 100%, 0 100%, 0 ${cut}px)`;
  return (
    <div className={className} style={{ clipPath: clip }}>
      {children}
    </div>
  );
}

export default function EnterpriseConnections() {
  const navigate = useNavigate();
  const connectedCount = enterpriseConnections.filter((c) => c.status === 'connected').length;
  const totalCount = enterpriseConnections.length;
  const pct = Math.round((connectedCount / totalCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative border border-white/10 bg-[#0A0612] p-6"
      style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Systems</p>
          <h2 className="text-lg font-semibold text-white">Enterprise Connections</h2>
        </div>

        {/* progress as a bracketed fraction + bar instead of an SVG donut */}
        <div className="text-right">
          <p className="font-mono text-xl font-bold tabular-nums text-white">
            {connectedCount}
            <span className="text-white/30">/{totalCount}</span>
          </p>
          <div className="mt-1.5 h-1 w-24 bg-white/[0.08]">
            <div
              className="h-full"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${HOT}, ${BRIGHT})` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {enterpriseConnections.slice(0, 12).map((connection, idx) => {
          const Icon = iconMap[connection.icon] || Database;
          const isConnected = connection.status === 'connected';
          const isPending = connection.status === 'pending';

          return (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04 }}
            >
              <Notch
                cut={12}
                className={cn(
                  'group relative border bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]',
                  isConnected ? 'border-white/10' : 'border-dashed border-white/10 opacity-70'
                )}
              >
                <span
                  className="absolute right-2 top-2 font-mono text-[9px] tracking-wide text-white/25"
                >
                  {categoryTag[connection.category] || '—'}
                </span>

                <div className="flex flex-col items-center pt-1 text-center">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center bg-white/5">
                    <Icon className="h-4 w-4 text-white/80" />
                  </div>
                  <p className="max-w-full truncate text-xs font-medium text-white">{connection.name}</p>

                  {/* status as marker shape, not color */}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rotate-45"
                      style={{
                        background: isConnected ? HOT : 'transparent',
                        border: `1px ${isPending ? 'dashed' : 'solid'} ${
                          isConnected ? HOT : isPending ? BRIGHT : 'rgba(255,255,255,0.2)'
                        }`,
                      }}
                    />
                    <span
                      className="font-mono text-[10px] uppercase"
                      style={{
                        color: isConnected ? BRIGHT : isPending ? BRIGHT : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {connection.status}
                    </span>
                  </div>
                </div>
              </Notch>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-dashed border-white/10 pt-4">
        <p className="text-sm text-white/40">
          <span className="font-medium text-white">{connectedCount}</span> of {totalCount} systems connected
        </p>
        <button
          onClick={() => navigate('/integrations')}
          className="flex items-center gap-2 text-sm transition-colors hover:text-white"
          style={{ color: HOT }}
        >
          <Plug className="h-4 w-4" />
          Connect new system
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}