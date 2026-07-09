import { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import CommandPalette from '@/components/ui/CommandPalette';
import { useUIStore } from '@/store';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-[#050308] text-white flex">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Navbar />
        <main className="flex-1 overflow-auto p-6 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff0088]/5 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff1493]/5 rounded-full blur-[128px]" />
          </div>
          <div className="relative z-10">{children}</div>
        </main>
      </div>
      <NotificationPanel />
      <CommandPalette />
    </div>
  );
}
