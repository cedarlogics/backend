import { motion } from 'framer-motion';
import {
  Zap,
  Plus,
  ArrowRight,
  Database,
  Users,
  UserCog,
  CreditCard,
  Mail,
  Cloud,
  Activity,
  Cpu,
  Bot,
  Workflow,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/dashboard/HeroSection';
import EnterpriseConnections from '@/components/dashboard/EnterpriseConnections';
import AIWorkflowEngine from '@/components/dashboard/AIWorkflowEngine';
import InfrastructureHealth from '@/components/dashboard/InfrastructureHealth';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import ProductivityOverview from '@/components/dashboard/ProductivityOverview';
import WorkflowTable from '@/components/dashboard/WorkflowTable';

const quickActions = [
  { icon: Workflow, label: 'Create Workflow', path: '/workflows', color: 'from-[#ff0088] to-[#ff1493]' },
  { icon: Database, label: 'Connect System', path: '/integrations', color: 'from-[#ff4fa3] to-[#ff69b4]' },
  { icon: Bot, label: 'Deploy AI Agent', path: '/ai-agents', color: 'from-[#ff69b4] to-[#ff85c2]' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <HeroSection />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, idx) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              to={action.path}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all hover:shadow-lg hover:shadow-[#ff0088]/5"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-white">{action.label}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EnterpriseConnections />
          <AIWorkflowEngine />
          <InfrastructureHealth />
        </div>
        <div className="space-y-6">
          <ActivityTimeline />
          <ProductivityOverview />
        </div>
      </div>

      <WorkflowTable />
    </div>
  );
}
