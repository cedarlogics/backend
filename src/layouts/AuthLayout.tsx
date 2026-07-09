import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050308] flex">
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff0088]/20 via-[#0a0713] to-[#10081d]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ff0088]/30 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff1493]/20 rounded-full blur-[128px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#ff69b4]/25 rounded-full blur-[80px] animate-pulse delay-500" />
        </div>
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-[#ff0088] to-[#ff69b4] shadow-lg shadow-[#ff0088]/30 mb-6">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-[#ff85c2] to-white bg-clip-text text-transparent mb-4">
                CedarLogics Console
              </h1>
              <p className="text-xl text-white/60 max-w-md">
                Enterprise Workflow Intelligence Platform
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { icon: '🔌', label: 'Connect Systems', value: '50+' },
                { icon: '🤖', label: 'AI Agents', value: '25+' },
                { icon: '⚡', label: 'Automations', value: '100+' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#ff0088]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#ff1493]/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10 w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
