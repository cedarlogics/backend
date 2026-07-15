import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';

// Auth Store
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  avatar?: string;
  role: string;
}

function userFromFirebase(u: FirebaseUser): User {
  const displayName = u.displayName || '';
  const [firstName, ...rest] = displayName.split(' ');
  return {
    id: u.uid,
    email: u.email || '',
    firstName: firstName || '',
    lastName: rest.join(' ') || '',
    company: 'CedarLogics Inc.',
    role: 'Admin',
    avatar: u.photoURL || undefined,
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authInitialized: boolean;
  initAuth: () => () => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: Partial<User> & { password: string }) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      authInitialized: false,
      initAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            const user = userFromFirebase(firebaseUser);
            set({ user, isAuthenticated: true, isLoading: false, authInitialized: true });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false, authInitialized: true });
          }
        });
        return unsubscribe;
      },
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          await signInWithEmailAndPassword(auth, email, password);
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },
      signup: async (data) => {
        set({ isLoading: true });
        try {
          const cred = await createUserWithEmailAndPassword(auth, data.email || '', data.password);
          const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
          await updateProfile(cred.user, { displayName: fullName });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },
      googleLogin: async () => {
        set({ isLoading: true });
        try {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },
      logout: async () => {
        set({ isLoading: false });
        await signOut(auth);
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);

// Notification Store
interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  category: 'workflow' | 'integration' | 'agent' | 'system' | 'automation';
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  unreadCount: () => number;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'success', title: 'Workflow Deployed', message: 'Customer Onboarding workflow has been deployed successfully.', timestamp: new Date(Date.now() - 300000), read: false, category: 'workflow' },
  { id: '2', type: 'info', title: 'New Integration Available', message: 'Salesforce integration is now available for connection.', timestamp: new Date(Date.now() - 600000), read: false, category: 'integration' },
  { id: '3', type: 'warning', title: 'High Memory Usage', message: 'AI Agent Alpha is using 85% of allocated memory.', timestamp: new Date(Date.now() - 900000), read: false, category: 'agent' },
  { id: '4', type: 'error', title: 'Connection Failed', message: 'Unable to connect to Oracle ERP. Please check credentials.', timestamp: new Date(Date.now() - 1200000), read: false, category: 'integration' },
  { id: '5', type: 'success', title: 'Automation Complete', message: 'Invoice processing automation completed 150 tasks.', timestamp: new Date(Date.now() - 1800000), read: true, category: 'automation' },
  { id: '6', type: 'info', title: 'AI Decision Made', message: 'Workflow routing decision executed based on business rules.', timestamp: new Date(Date.now() - 2400000), read: true, category: 'workflow' },
  { id: '7', type: 'success', title: 'SAP Connected', message: 'SAP S/4HANA integration established successfully.', timestamp: new Date(Date.now() - 3600000), read: true, category: 'integration' },
  { id: '8', type: 'warning', title: 'API Rate Limit', message: 'Approaching rate limit for Microsoft 365 API.', timestamp: new Date(Date.now() - 4200000), read: false, category: 'system' },
  { id: '9', type: 'success', title: 'Agent Trained', message: 'AI Agent Beta has completed model training.', timestamp: new Date(Date.now() - 4800000), read: true, category: 'agent' },
  { id: '10', type: 'info', title: 'Workflow Created', message: 'New Expense Approval workflow created by John Smith.', timestamp: new Date(Date.now() - 5400000), read: true, category: 'workflow' },
  { id: '11', type: 'error', title: 'Sync Error', message: 'CRM data sync encountered validation errors.', timestamp: new Date(Date.now() - 6000000), read: false, category: 'integration' },
  { id: '12', type: 'success', title: 'Deployment Ready', message: 'HR Onboarding automation is ready for deployment.', timestamp: new Date(Date.now() - 7200000), read: true, category: 'automation' },
  { id: '13', type: 'info', title: 'System Update', message: 'Platform update v2.5.0 is now available.', timestamp: new Date(Date.now() - 86400000), read: false, category: 'system' },
  { id: '14', type: 'warning', title: 'License Expiring', message: 'Enterprise license expires in 30 days.', timestamp: new Date(Date.now() - 90000000), read: true, category: 'system' },
  { id: '15', type: 'success', title: 'Backup Complete', message: 'Daily backup completed successfully.', timestamp: new Date(Date.now() - 100000000), read: true, category: 'system' },
];

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: initialNotifications,
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false,
        };
        set((state) => ({ notifications: [newNotification, ...state.notifications] }));
      },
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },
      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
      clearAll: () => {
        set({ notifications: [] });
      },
      unreadCount: () => get().notifications.filter((n) => !n.read).length,
    }),
    { name: 'notification-storage' }
  )
);

// UI Store
interface UIState {
  sidebarCollapsed: boolean;
  theme: 'dark' | 'light';
  commandPaletteOpen: boolean;
  toggleSidebar: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleCommandPalette: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: 'dark',
      commandPaletteOpen: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTheme: (theme) => set({ theme }),
      toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
    }),
    { name: 'ui-storage' }
  )
);

// Workflow Store
interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused' | 'error';
  department: string;
  owner: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  lastRun: Date;
  executionTime: number;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

interface WorkflowState {
  workflows: Workflow[];
  selectedWorkflow: Workflow | null;
  setSelectedWorkflow: (workflow: Workflow | null) => void;
}

export const useWorkflowStore = create<WorkflowState>()((set) => ({
  workflows: [],
  selectedWorkflow: null,
  setSelectedWorkflow: (workflow) => set({ selectedWorkflow: workflow }),
}));
