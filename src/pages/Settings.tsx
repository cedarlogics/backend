import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Lock, Smartphone, Key, Save } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useAuthStore, useUIStore } from '@/store';

const HOT = '#FF2D87';
const BRIGHT = '#FF5CA8';

const apiKeys = [
  { id: '1', name: 'Production API Key', key: 'sk_prod_****************************************', created: '2024-01-15', lastUsed: '2 hours ago' },
  { id: '2', name: 'Development API Key', key: 'sk_dev_****************************************', created: '2024-02-20', lastUsed: '5 minutes ago' },
];

export default function Settings() {
  const { user } = useAuthStore();
  const { theme, setTheme } = useUIStore();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    workflow: true,
    agent: true,
    system: false,
    marketing: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-4xl"
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Config</p>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/40">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <div
        className="relative border border-white/10 bg-[#0A0612] p-6"
        style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
      >
        <div className="mb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Identity</p>
          <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wide text-white/40 mb-2">First Name</label>
            <input
              type="text"
              defaultValue={user?.firstName}
              className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wide text-white/40 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue={user?.lastName}
              className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wide text-white/40 mb-2">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wide text-white/40 mb-2">Company</label>
            <input
              type="text"
              defaultValue={user?.company}
              className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wide text-white/40 mb-2">Timezone</label>
            <select
              className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition-colors focus:border-white/30"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
            >
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC+0 (GMT)</option>
            </select>
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wide text-white/40 mb-2">Language</label>
            <select
              className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition-colors focus:border-white/30"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
            >
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
        <button
          className="mt-6 flex items-center gap-2 border px-6 py-2.5 font-medium transition-colors"
          style={{ borderColor: `${HOT}4D`, background: `${HOT}1A`, color: HOT }}
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>


      {/* Security */}
      <div
        className="relative border border-white/10 bg-[#0A0612] p-6"
        style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
      >
        <div className="mb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Access</p>
          <h2 className="text-lg font-semibold text-white">Security Settings</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-white/5">
                <Lock className="h-4 w-4 text-white/60" />
              </div>
              <div>
                <p className="font-medium text-white">Password</p>
                <p className="text-xs text-white/40">Last changed 30 days ago</p>
              </div>
            </div>
            <button className="border border-white/10 bg-white/[0.03] px-4 py-2 text-white/70 transition-colors hover:text-white">
              Change
            </button>
          </div>
          <div className="flex items-center justify-between border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-white/5">
                <Smartphone className="h-4 w-4 text-white/60" />
              </div>
              <div>
                <p className="font-medium text-white">Two-Factor Authentication</p>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase" style={{ color: HOT }}>
                  <span className="h-1.5 w-1.5 rotate-45" style={{ background: HOT }} />
                  Enabled
                </span>
              </div>
            </div>
            <button className="border border-white/10 bg-white/[0.03] px-4 py-2 text-white/70 transition-colors hover:text-white">
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div
        className="relative border border-white/10 bg-[#0A0612] p-6"
        style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
      >
        <div className="mb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Alerts</p>
          <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
        </div>
        <div className="space-y-2">
          {Object.entries(notifications).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between border border-white/10 bg-white/[0.02] p-4 cursor-pointer transition-colors hover:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-white/5">
                  <Bell className="h-4 w-4 text-white/50" />
                </div>
                <div>
                  <p className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-xs text-white/40">Receive {key} notifications</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#ff0088] focus:ring-[#ff0088]/50"
              />
            </label>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div
        className="relative border border-white/10 bg-[#0A0612] p-6"
        style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)' }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Access</p>
            <h2 className="text-lg font-semibold text-white">API Keys</h2>
          </div>
          <button
            className="flex items-center gap-2 border px-4 py-2 transition-colors"
            style={{ borderColor: `${HOT}4D`, background: `${HOT}1A`, color: HOT }}
          >
            <Key className="h-4 w-4" />
            Generate New Key
          </button>
        </div>
        <div className="space-y-3">
          {apiKeys.map((key) => (
            <div key={key.id} className="border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-white">{key.name}</p>
                  <p className="mt-1 font-mono text-sm text-white/50">{key.key}</p>
                  <div className="mt-2 flex gap-4 font-mono text-[10px] text-white/40">
                    <span>Created: {key.created}</span>
                    <span>Last used: {key.lastUsed}</span>
                  </div>
                </div>
                <button className="border border-rose-400/20 bg-rose-400/10 px-3 py-1.5 text-sm text-rose-400 transition-colors hover:bg-rose-400/20">
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    
    </motion.div>
  );
}
