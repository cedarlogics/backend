import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, authInitialized } = useAuthStore();

  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0612]">
        <div className="w-5 h-5 border-2 border-white/20 border-t-[#FF5CA8] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
