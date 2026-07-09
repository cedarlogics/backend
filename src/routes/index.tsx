import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
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
    element: <MainLayout><Dashboard /></MainLayout>,
  },
  {
    path: '/workflows',
    element: <MainLayout><Workflows /></MainLayout>,
  },
  {
    path: '/integrations',
    element: <MainLayout><Integrations /></MainLayout>,
  },
  {
    path: '/ai-agents',
    element: <MainLayout><AIAgents /></MainLayout>,
  },
  {
    path: '/infrastructure',
    element: <MainLayout><Infrastructure /></MainLayout>,
  },
  {
    path: '/analytics',
    element: <MainLayout><Analytics /></MainLayout>,
  },
  {
    path: '/settings',
    element: <MainLayout><Settings /></MainLayout>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
