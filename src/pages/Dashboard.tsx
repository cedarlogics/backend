import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Workflow, Database, Bot, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/dashboard/HeroSection';
import EnterpriseConnections from '@/components/dashboard/EnterpriseConnections';
import AIWorkflowEngine from '@/components/dashboard/AIWorkflowEngine';
import InfrastructureHealth from '@/components/dashboard/InfrastructureHealth';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import ProductivityOverview from '@/components/dashboard/ProductivityOverview';
import WorkflowTable from '@/components/dashboard/WorkflowTable';

// Same tokens as the auth flow — nothing new added.
const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';
const DEEP = '#7A1247';

/**
 * The dashboard's signature shape: a single cut top-left corner instead of a
 * uniform border-radius. It reads as a chip/panel notch rather than a rounded
 * SaaS card, and it repeats everywhere so it becomes the dashboard's shape
 * identity instead of a one-off decoration. A small pink node marks the cut,
 * echoing the connector dots from the auth pipeline.
 */
function Panel({
  children,
  cut = 20,
  className = '',
  node = true,
}: {
  children: ReactNode;
  cut?: number;
  className?: string;
  node?: boolean;
}) {
  const outerClip = `polygon(${cut}px 0, 100% 0, 100% 100%, 0 100%, 0 ${cut}px)`;
  const innerCut = Math.max(cut - 1, 0);
  const innerClip = `polygon(${innerCut}px 0, 100% 0, 100% 100%, 0 100%, 0 ${innerCut}px)`;

  return (
    <div className={`relative ${className}`} style={{ clipPath: outerClip }}>
      <div className="absolute inset-0 bg-white/[0.08]" style={{ clipPath: outerClip }} />
      <div className="relative h-full bg-[#0A0612] p-[1px]" style={{ clipPath: outerClip }}>
        <div className="h-full bg-[#0A0612]" style={{ clipPath: innerClip }}>
          {children}
        </div>
      </div>
      {node && (
        <span
          className="absolute left-[3px] top-[3px] h-1 w-1 rotate-45"
          style={{ background: BRIGHT, boxShadow: `0 0 6px ${BRIGHT}` }}
        />
      )}
    </div>
  );
}

const quickActions = [
  {
    icon: Workflow,
    label: 'Create workflow',
    sub: 'Start from a template or a blank canvas',
    path: '/workflows',
  },
  {
    icon: Database,
    label: 'Connect system',
    sub: '40+ integrations',
    path: '/integrations',
  },
  {
    icon: Bot,
    label: 'Deploy AI agent',
    sub: 'Ship in minutes',
    path: '/ai-agents',
  },
];

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative space-y-8">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{ background: 'radial-gradient(circle at 88% -8%, rgba(122,18,71,0.25), transparent 45%)' }}
      />

      {/* live system status bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/35">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: BRIGHT }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: BRIGHT }} />
          </span>
          <span style={{ color: BRIGHT }}>Operational</span>
          <span className="text-white/20">/</span>
          <span className="normal-case tracking-normal text-white/30">All systems nominal</span>
        </div>
        <div className="hidden normal-case tracking-normal sm:block">
          {time.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} ·{' '}
          {time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <HeroSection />

      {/* Quick actions — cut-corner panels instead of rounded cards,
          one primary tile + two compact secondary tiles */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-3">
          <Panel cut={28} className="h-full">
            <Link
              to={quickActions[0].path}
              className="group relative flex h-full flex-col justify-between overflow-hidden p-6"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl"
                style={{ background: HOT }}
              />
              <div className="relative flex items-start justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center"
                  style={{ background: 'rgba(255,45,135,0.15)', clipPath: 'polygon(8px 0,100% 0,100% 100%,0 100%,0 8px)' }}
                >
                  <Workflow className="h-5 w-5" style={{ color: BRIGHT }} />
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70" />
              </div>
              <div className="relative mt-10">
                <div className="text-lg font-semibold text-white">{quickActions[0].label}</div>
                <div className="mt-1 text-sm text-white/45">{quickActions[0].sub}</div>
              </div>
            </Link>
          </Panel>
        </motion.div>

        <div className="flex flex-col gap-4 md:col-span-2">
          {quickActions.slice(1).map((action, idx) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx + 1) * 0.08 }}
              className="flex-1"
            >
              <Panel cut={14} className="h-full">
                <Link to={action.path} className="group flex h-full items-center gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/5">
                    <action.icon className="h-4 w-4 text-white/60" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{action.label}</div>
                    <div className="truncate text-xs text-white/35">{action.sub}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-white/60" />
                </Link>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main grid — labeled zones so the split encodes what's in each column */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionLabel index="01" label="Connectivity" />
          <EnterpriseConnections />
          <AIWorkflowEngine />
          <InfrastructureHealth />
        </div>
        <div className="relative space-y-6">
          <div className="absolute -left-3 top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />
          <SectionLabel index="02" label="Signal" />
          <ActivityTimeline />
          <ProductivityOverview />
        </div>
      </div>

      <div className="space-y-4">
        <SectionLabel index="03" label="Workflows" />
        <WorkflowTable />
      </div>
    </div>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
      <span style={{ color: BRIGHT }}>{index}</span>
      <span className="h-px flex-1 bg-white/[0.06]" />
      <span>{label}</span>
    </div>
  );
}