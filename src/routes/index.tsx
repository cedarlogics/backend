import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Workflows from '@/pages/Workflows';
import Integrations from '@/pages/Integrations';
import AIAgents from '@/pages/AIAgents';
import Infrastructure from '@/pages/Infrastructure';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout><Login /></AuthLayout>,
  },
  {
    path: '/signup',
    element: <AuthLayout><Signup /></AuthLayout>,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>,
  },
  {
    path: '/workflows',
    element: <ProtectedRoute><MainLayout><Workflows /></MainLayout></ProtectedRoute>,
  },
  {
    path: '/integrations',
    element: <ProtectedRoute><MainLayout><Integrations /></MainLayout></ProtectedRoute>,
  },
  {
    path: '/ai-agents',
    element: <ProtectedRoute><MainLayout><AIAgents /></MainLayout></ProtectedRoute>,
  },
  {
    path: '/infrastructure',
    element: <ProtectedRoute><MainLayout><Infrastructure /></MainLayout></ProtectedRoute>,
  },
  {
    path: '/analytics',
    element: <ProtectedRoute><MainLayout><Analytics /></MainLayout></ProtectedRoute>,
  },
  {
    path: '/settings',
    element: <ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
