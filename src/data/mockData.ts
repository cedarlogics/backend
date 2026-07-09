// Mock Data for CedarLogics Console

export interface EnterpriseConnection {
  id: string;
  name: string;
  category: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'pending';
  latency?: number;
  requests?: number;
  health?: number;
  lastSync?: Date;
}

export const enterpriseConnections: EnterpriseConnection[] = [
  { id: '1', name: 'SAP S/4HANA', category: 'ERP', icon: 'Database', status: 'connected', latency: 45, requests: 15420, health: 99.2, lastSync: new Date() },
  { id: '2', name: 'Oracle ERP Cloud', category: 'ERP', icon: 'Database', status: 'connected', latency: 62, requests: 8930, health: 98.5, lastSync: new Date() },
  { id: '3', name: 'Microsoft Dynamics', category: 'ERP', icon: 'Database', status: 'pending', latency: 0, requests: 0, health: 0 },
  { id: '4', name: 'Salesforce', category: 'CRM', icon: 'Users', status: 'connected', latency: 38, requests: 24500, health: 99.8, lastSync: new Date() },
  { id: '5', name: 'HubSpot', category: 'CRM', icon: 'Users', status: 'connected', latency: 52, requests: 12800, health: 97.5, lastSync: new Date() },
  { id: '6', name: 'Zoho CRM', category: 'CRM', icon: 'Users', status: 'disconnected', latency: 0, requests: 0, health: 0 },
  { id: '7', name: 'Workday', category: 'HRMS', icon: 'UserCog', status: 'connected', latency: 58, requests: 5600, health: 98.9, lastSync: new Date() },
  { id: '8', name: 'BambooHR', category: 'HRMS', icon: 'UserCog', status: 'pending', latency: 0, requests: 0, health: 0 },
  { id: '9', name: 'QuickBooks', category: 'Finance', icon: 'CreditCard', status: 'connected', latency: 42, requests: 8900, health: 99.1, lastSync: new Date() },
  { id: '10', name: 'Xero', category: 'Finance', icon: 'CreditCard', status: 'connected', latency: 35, requests: 6200, health: 98.8, lastSync: new Date() },
  { id: '11', name: 'Microsoft 365', category: 'Collaboration', icon: 'Mail', status: 'connected', latency: 28, requests: 45000, health: 99.9, lastSync: new Date() },
  { id: '12', name: 'Google Workspace', category: 'Collaboration', icon: 'Mail', status: 'connected', latency: 32, requests: 38000, health: 99.7, lastSync: new Date() },
  { id: '13', name: 'Slack', category: 'Collaboration', icon: 'MessageSquare', status: 'connected', latency: 22, requests: 62000, health: 99.9, lastSync: new Date() },
  { id: '14', name: 'AWS S3', category: 'Storage', icon: 'Cloud', status: 'connected', latency: 48, requests: 28500, health: 99.5, lastSync: new Date() },
  { id: '15', name: 'Azure Blob Storage', category: 'Storage', icon: 'Cloud', status: 'connected', latency: 55, requests: 15200, health: 98.2, lastSync: new Date() },
  { id: '16', name: 'Google Cloud Storage', category: 'Storage', icon: 'Cloud', status: 'disconnected', latency: 0, requests: 0, health: 0 },
];

export interface AIAgent {
  id: string;
  name: string;
  role: 'coordinator' | 'planning' | 'reasoning' | 'validation' | 'execution' | 'monitoring';
  status: 'running' | 'idle' | 'stopped' | 'error';
  memory: number;
  memoryMax: number;
  tokens: number;
  latency: number;
  currentTask: string;
  health: number;
  inferenceCount: number;
  lastActive: Date;
  avatar: string;
}

export const aiAgents: AIAgent[] = [
  { id: '1', name: 'Agent Alpha', role: 'coordinator', status: 'running', memory: 4.2, memoryMax: 8, tokens: 125000, latency: 45, currentTask: 'Orchestrating ERP workflow', health: 98, inferenceCount: 15420, lastActive: new Date(), avatar: '🤖' },
  { id: '2', name: 'Agent Beta', role: 'planning', status: 'running', memory: 3.8, memoryMax: 8, tokens: 89000, latency: 52, currentTask: 'Planning CRM sync strategy', health: 95, inferenceCount: 8930, lastActive: new Date(), avatar: '🧠' },
  { id: '3', name: 'Agent Gamma', role: 'reasoning', status: 'running', memory: 5.1, memoryMax: 8, tokens: 210000, latency: 38, currentTask: 'Analyzing business rules', health: 99, inferenceCount: 24500, lastActive: new Date(), avatar: '⚡' },
  { id: '4', name: 'Agent Delta', role: 'validation', status: 'idle', memory: 2.4, memoryMax: 8, tokens: 45000, latency: 28, currentTask: 'Awaiting validation tasks', health: 100, inferenceCount: 12800, lastActive: new Date(Date.now() - 300000), avatar: '✓' },
  { id: '5', name: 'Agent Epsilon', role: 'execution', status: 'running', memory: 6.2, memoryMax: 8, tokens: 340000, latency: 65, currentTask: 'Executing workflow automation', health: 92, inferenceCount: 5600, lastActive: new Date(), avatar: '⚡' },
  { id: '6', name: 'Agent Zeta', role: 'monitoring', status: 'running', memory: 1.8, memoryMax: 4, tokens: 28000, latency: 22, currentTask: 'Monitoring system health', health: 100, inferenceCount: 8900, lastActive: new Date(), avatar: '👁️' },
  { id: '7', name: 'Agent Eta', role: 'coordinator', status: 'idle', memory: 0, memoryMax: 8, tokens: 0, latency: 0, currentTask: 'Standby', health: 100, inferenceCount: 6200, lastActive: new Date(Date.now() - 600000), avatar: '🤖' },
  { id: '8', name: 'Agent Theta', role: 'planning', status: 'stopped', memory: 0, memoryMax: 8, tokens: 0, latency: 0, currentTask: 'Maintenance mode', health: 0, inferenceCount: 4500, lastActive: new Date(Date.now() - 3600000), avatar: '🧠' },
  { id: '9', name: 'Agent Iota', role: 'reasoning', status: 'running', memory: 4.5, memoryMax: 8, tokens: 156000, latency: 48, currentTask: 'Processing decision trees', health: 96, inferenceCount: 18200, lastActive: new Date(), avatar: '⚡' },
  { id: '10', name: 'Agent Kappa', role: 'validation', status: 'running', memory: 2.9, memoryMax: 8, tokens: 72000, latency: 35, currentTask: 'Validating data integrity', health: 98, inferenceCount: 9500, lastActive: new Date(), avatar: '✓' },
  { id: '11', name: 'Agent Lambda', role: 'execution', status: 'error', memory: 3.2, memoryMax: 8, tokens: 54000, latency: 0, currentTask: 'Error: Connection timeout', health: 45, inferenceCount: 3200, lastActive: new Date(Date.now() - 1800000), avatar: '⚡' },
  { id: '12', name: 'Agent Mu', role: 'monitoring', status: 'running', memory: 1.5, memoryMax: 4, tokens: 18000, latency: 18, currentTask: 'Real-time metrics analysis', health: 100, inferenceCount: 28500, lastActive: new Date(), avatar: '👁️' },
];

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused' | 'error';
  department: string;
  owner: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  lastRun: Date;
  executionTime: number;
  successRate: number;
  runsCount: number;
  automationType: string;
}

export const workflows: Workflow[] = [
  { id: '1', name: 'Customer Onboarding', description: 'Automated customer onboarding workflow', status: 'active', department: 'Sales', owner: 'John Smith', priority: 'high', lastRun: new Date(), executionTime: 45, successRate: 98.5, runsCount: 1250, automationType: 'Process' },
  { id: '2', name: 'Invoice Processing', description: 'Automated invoice validation and processing', status: 'active', department: 'Finance', owner: 'Sarah Johnson', priority: 'critical', lastRun: new Date(Date.now() - 300000), executionTime: 32, successRate: 99.2, runsCount: 5200, automationType: 'Finance' },
  { id: '3', name: 'Employee Onboarding', description: 'New employee onboarding automation', status: 'active', department: 'HR', owner: 'Mike Wilson', priority: 'high', lastRun: new Date(Date.now() - 600000), executionTime: 120, successRate: 97.8, runsCount: 450, automationType: 'HR' },
  { id: '4', name: 'Lead Qualification', description: 'AI-powered lead scoring and qualification', status: 'active', department: 'Marketing', owner: 'Emily Davis', priority: 'medium', lastRun: new Date(Date.now() - 900000), executionTime: 28, successRate: 94.5, runsCount: 3800, automationType: 'Sales' },
  { id: '5', name: 'Inventory Sync', description: 'Real-time inventory synchronization', status: 'paused', department: 'Operations', owner: 'Tom Brown', priority: 'medium', lastRun: new Date(Date.now() - 86400000), executionTime: 85, successRate: 92.0, runsCount: 2100, automationType: 'Operations' },
  { id: '6', name: 'Support Ticket Routing', description: 'Intelligent ticket routing and assignment', status: 'active', department: 'Support', owner: 'Lisa Chen', priority: 'high', lastRun: new Date(Date.now() - 1800000), executionTime: 15, successRate: 96.5, runsCount: 15000, automationType: 'Support' },
  { id: '7', name: 'Contract Renewal', description: 'Automated contract renewal process', status: 'draft', department: 'Sales', owner: 'John Smith', priority: 'medium', lastRun: new Date(Date.now() - 86400000 * 7), executionTime: 0, successRate: 0, runsCount: 0, automationType: 'Sales' },
  { id: '8', name: 'Report Generation', description: 'Automated weekly report generation', status: 'active', department: 'Analytics', owner: 'Alex Turner', priority: 'low', lastRun: new Date(Date.now() - 86400000), executionTime: 180, successRate: 100, runsCount: 52, automationType: 'Analytics' },
  { id: '9', name: 'Data Backup', description: 'Scheduled data backup automation', status: 'active', department: 'IT', owner: 'Chris Lee', priority: 'critical', lastRun: new Date(Date.now() - 3600000), executionTime: 420, successRate: 99.9, runsCount: 365, automationType: 'IT' },
  { id: '10', name: 'Compliance Check', description: 'Regulatory compliance monitoring', status: 'active', department: 'Legal', owner: 'Jessica White', priority: 'critical', lastRun: new Date(Date.now() - 7200000), executionTime: 95, successRate: 100, runsCount: 730, automationType: 'Legal' },
  { id: '11', name: 'Expense Approval', description: 'Automated expense approval workflow', status: 'error', department: 'Finance', owner: 'Sarah Johnson', priority: 'high', lastRun: new Date(Date.now() - 86400000 * 2), executionTime: 0, successRate: 85.2, runsCount: 2800, automationType: 'Finance' },
  { id: '12', name: 'Marketing Campaign', description: 'Campaign automation workflow', status: 'paused', department: 'Marketing', owner: 'Emily Davis', priority: 'medium', lastRun: new Date(Date.now() - 86400000 * 3), executionTime: 45, successRate: 91.5, runsCount: 850, automationType: 'Marketing' },
];

export interface ActivityLog {
  id: string;
  type: 'workflow' | 'integration' | 'agent' | 'deployment' | 'automation' | 'decision';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  status: 'success' | 'info' | 'warning' | 'error';
}

export const activityLogs: ActivityLog[] = [
  { id: '1', type: 'workflow', title: 'Workflow Created', description: 'Customer Onboarding workflow created', timestamp: new Date(Date.now() - 180000), user: 'John Smith', status: 'success' },
  { id: '2', type: 'integration', title: 'SAP Connected', description: 'SAP S/4HANA integration established', timestamp: new Date(Date.now() - 300000), user: 'System', status: 'success' },
  { id: '3', type: 'agent', title: 'AI Decision Made', description: 'Agent Alpha processed business rules', timestamp: new Date(Date.now() - 420000), user: 'Agent Alpha', status: 'info' },
  { id: '4', type: 'deployment', title: 'Deployment Complete', description: 'Invoice Processing v2.1 deployed', timestamp: new Date(Date.now() - 600000), user: 'Sarah Johnson', status: 'success' },
  { id: '5', type: 'automation', title: 'Automation Completed', description: 'Employee onboarding completed for 5 users', timestamp: new Date(Date.now() - 900000), user: 'System', status: 'success' },
  { id: '6', type: 'decision', title: 'Decision Tree Executed', description: 'Lead qualification decision executed', timestamp: new Date(Date.now() - 1200000), user: 'Agent Gamma', status: 'info' },
  { id: '7', type: 'integration', title: 'CRM Sync Complete', description: 'Salesforce data synchronization successful', timestamp: new Date(Date.now() - 1500000), user: 'System', status: 'success' },
  { id: '8', type: 'workflow', title: 'Workflow Paused', description: 'Inventory Sync workflow paused for maintenance', timestamp: new Date(Date.now() - 1800000), user: 'Tom Brown', status: 'warning' },
  { id: '9', type: 'agent', title: 'Agent Status Changed', description: 'Agent Lambda encountered connection error', timestamp: new Date(Date.now() - 2100000), user: 'System', status: 'error' },
  { id: '10', type: 'automation', title: 'Backup Complete', description: 'Daily backup finished successfully', timestamp: new Date(Date.now() - 3600000), user: 'System', status: 'success' },
];

export interface Integration {
  id: string;
  name: string;
  category: string;
  icon: string;
  installed: boolean;
  status?: 'active' | 'inactive';
  version?: string;
  description: string;
  rating: number;
  installs: string;
}

export const integrations: Integration[] = [
  { id: '1', name: 'SAP S/4HANA', category: 'ERP', icon: 'Database', installed: true, status: 'active', version: '2.1.0', description: 'Enterprise resource planning platform', rating: 4.8, installs: '10K+' },
  { id: '2', name: 'Oracle ERP Cloud', category: 'ERP', icon: 'Database', installed: true, status: 'active', version: '1.8.5', description: 'Cloud-based ERP solution', rating: 4.6, installs: '8K+' },
  { id: '3', name: 'Salesforce', category: 'CRM', icon: 'Users', installed: true, status: 'active', version: '3.2.1', description: 'Customer relationship management', rating: 4.9, installs: '50K+' },
  { id: '4', name: 'HubSpot', category: 'CRM', icon: 'Users', installed: true, status: 'active', version: '2.5.0', description: 'Marketing and sales platform', rating: 4.7, installs: '25K+' },
  { id: '5', name: 'Microsoft 365', category: 'Collaboration', icon: 'Mail', installed: true, status: 'active', version: '4.0.0', description: 'Productivity and collaboration suite', rating: 4.8, installs: '100K+' },
  { id: '6', name: 'Google Workspace', category: 'Collaboration', icon: 'Mail', installed: true, status: 'active', version: '3.8.2', description: 'Cloud productivity suite', rating: 4.7, installs: '80K+' },
  { id: '7', name: 'Slack', category: 'Collaboration', icon: 'MessageSquare', installed: true, status: 'active', version: '2.0.5', description: 'Team messaging platform', rating: 4.8, installs: '60K+' },
  { id: '8', name: 'Workday', category: 'HRMS', icon: 'UserCog', installed: true, status: 'active', version: '2.3.0', description: 'Human capital management', rating: 4.5, installs: '15K+' },
  { id: '9', name: 'Snowflake', category: 'Database', icon: 'Database', installed: false, description: 'Cloud data warehouse', rating: 4.8, installs: '20K+' },
  { id: '10', name: 'MongoDB Atlas', category: 'Database', icon: 'Database', installed: false, description: 'Cloud MongoDB service', rating: 4.6, installs: '30K+' },
  { id: '11', name: 'AWS', category: 'Cloud', icon: 'Cloud', installed: true, status: 'active', version: '5.1.0', description: 'Amazon Web Services', rating: 4.9, installs: '200K+' },
  { id: '12', name: 'Azure', category: 'Cloud', icon: 'Cloud', installed: true, status: 'active', version: '4.5.0', description: 'Microsoft Azure', rating: 4.7, installs: '150K+' },
  { id: '13', name: 'Dropbox', category: 'Storage', icon: 'FolderOpen', installed: false, description: 'Cloud storage platform', rating: 4.4, installs: '40K+' },
  { id: '14', name: 'PostgreSQL', category: 'Database', icon: 'Database', installed: false, description: 'Relational database', rating: 4.7, installs: '50K+' },
];

export const infrastructureMetrics = {
  cpu: { current: 68, max: 100, history: [45, 52, 48, 55, 62, 58, 68] },
  gpu: { current: 82, max: 100, history: [75, 78, 80, 82, 85, 83, 82] },
  memory: { current: 12.4, max: 32, history: [10.2, 11.5, 11.8, 12.1, 12.4, 12.2, 12.4] },
  storage: { current: 2.8, max: 4, history: [2.1, 2.3, 2.5, 2.6, 2.7, 2.75, 2.8] },
  network: { in: 1250, out: 890, history: [800, 920, 1050, 1150, 1200, 1220, 1250] },
  inference: { queue: 45, completed: 15420, failed: 12, history: [12000, 13500, 14200, 14800, 15200, 15350, 15420] },
};

export const dashboardStats = {
  activeWorkflows: 47,
  workflowCompletionRate: 98.2,
  aiAgentsRunning: 8,
  executionLatency: 42,
  integrationHealth: 99.1,
  automationSuccess: 97.5,
  cpuUsage: 68,
  gpuUsage: 82,
  memoryUsage: 38,
  inferenceRequests: 15420,
  apiCalls: 284500,
  productivityScore: 94.5,
  tasksAutomated: 12500,
  hoursSaved: 4200,
  costReduction: 28,
  processesRunning: 156,
  employeesAssisted: 850,
  aiDecisions: 28500,
};

export const monthlyAnalytics = [
  { month: 'Jan', workflows: 120, automation: 85, efficiency: 92, cost: 12500 },
  { month: 'Feb', workflows: 145, automation: 95, efficiency: 93, cost: 11800 },
  { month: 'Mar', workflows: 180, automation: 120, efficiency: 94, cost: 10500 },
  { month: 'Apr', workflows: 210, automation: 145, efficiency: 95, cost: 9800 },
  { month: 'May', workflows: 250, automation: 180, efficiency: 96, cost: 8500 },
  { month: 'Jun', workflows: 290, automation: 210, efficiency: 97, cost: 7200 },
];

export const departmentPerformance = [
  { department: 'Sales', workflows: 25, efficiency: 96, automation: 85 },
  { department: 'Finance', workflows: 18, efficiency: 94, automation: 78 },
  { department: 'HR', workflows: 12, efficiency: 98, automation: 92 },
  { department: 'Marketing', workflows: 20, efficiency: 91, automation: 72 },
  { department: 'Operations', workflows: 15, efficiency: 95, automation: 88 },
  { department: 'Support', workflows: 22, efficiency: 93, automation: 80 },
];

export const users = [
  { id: '1', name: 'John Smith', email: 'john@cedarlogics.com', role: 'Admin', department: 'IT', avatar: '', status: 'active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@cedarlogics.com', role: 'Manager', department: 'Finance', avatar: '', status: 'active' },
  { id: '3', name: 'Mike Wilson', email: 'mike@cedarlogics.com', role: 'User', department: 'HR', avatar: '', status: 'active' },
  { id: '4', name: 'Emily Davis', email: 'emily@cedarlogics.com', role: 'Manager', department: 'Marketing', avatar: '', status: 'active' },
  { id: '5', name: 'Tom Brown', email: 'tom@cedarlogics.com', role: 'User', department: 'Operations', avatar: '', status: 'inactive' },
  { id: '6', name: 'Lisa Chen', email: 'lisa@cedarlogics.com', role: 'Admin', department: 'Support', avatar: '', status: 'active' },
  { id: '7', name: 'Alex Turner', email: 'alex@cedarlogics.com', role: 'User', department: 'Analytics', avatar: '', status: 'active' },
  { id: '8', name: 'Chris Lee', email: 'chris@cedarlogics.com', role: 'Manager', department: 'IT', avatar: '', status: 'active' },
  { id: '9', name: 'Jessica White', email: 'jessica@cedarlogics.com', role: 'User', department: 'Legal', avatar: '', status: 'active' },
  { id: '10', name: 'David Kim', email: 'david@cedarlogics.com', role: 'User', department: 'Sales', avatar: '', status: 'active' },
];
