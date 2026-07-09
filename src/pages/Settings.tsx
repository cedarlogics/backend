import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, User, Shield, Bell, Palette, CreditCard, Building2, Plug, Moon, Sun, Globe, Mail, Lock, Key, Smartphone, Save } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useAuthStore, useUIStore } from '@/store';

const tabs = [
  { id: 'general', label: 'General', icon: SettingsIcon },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'integrations', label: 'Integrations', icon: Plug },
];

const apiKeys = [
  { id: '1', name: 'Production API Key', key: 'sk_prod_****************************************', created: '2024-01-15', lastUsed: '2 hours ago' },
  { id: '2', name: 'Development API Key', key: 'sk_dev_****************************************', created: '2024-02-20', lastUsed: '5 minutes ago' },
];

export default function Settings() {
  const { user } = useAuthStore();
  const { theme, setTheme } = useUIStore();
  const [activeTab, setActiveTab] = useState('general');
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
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/50">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left',
                  activeTab === tab.id
                    ? 'bg-[#ff0088]/20 text-white border border-[#ff0088]/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h2 className="text-lg font-medium text-white mb-6">Profile Settings</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue={user?.firstName}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#ff0088]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue={user?.lastName}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#ff0088]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#ff0088]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Company</label>
                      <input
                        type="text"
                        defaultValue={user?.company}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#ff0088]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Timezone</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#ff0088]/50">
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC-8 (Pacific Time)</option>
                        <option>UTC+0 (GMT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Language</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#ff0088]/50">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>
                  <button className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff0088] to-[#ff69b4] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h2 className="text-lg font-medium text-white mb-6">Appearance</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-white/70 mb-3">Theme</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setTheme('dark')}
                        className={cn(
                          'p-4 rounded-xl border transition-colors flex items-center gap-4',
                          theme === 'dark'
                            ? 'bg-[#ff0088]/20 border-[#ff0088]/30'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        )}
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#0a0713] border border-white/10 flex items-center justify-center">
                          <Moon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-white">Dark</p>
                          <p className="text-xs text-white/50">Default dark theme</p>
                        </div>
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        className={cn(
                          'p-4 rounded-xl border transition-colors flex items-center gap-4',
                          theme === 'light'
                            ? 'bg-[#ff0088]/20 border-[#ff0088]/30'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        )}
                      >
                        <div className="w-12 h-12 rounded-xl bg-white border border-white/10 flex items-center justify-center">
                          <Sun className="w-6 h-6 text-amber-500" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-white">Light</p>
                          <p className="text-xs text-white/50">Light theme</p>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-3">Accent Color</label>
                    <div className="flex gap-3">
                      {['#ff0088', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'].map((color) => (
                        <button
                          key={color}
                          className="w-10 h-10 rounded-xl border-2 border-white/20 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h2 className="text-lg font-medium text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/[0.07] transition-colors">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-white/50" />
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
              </motion.div>
            )}

            {activeTab === 'api' && (
              <motion.div
                key="api"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-white">API Keys</h2>
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff0088] to-[#ff69b4] text-white font-medium hover:opacity-90 transition-opacity">
                    Generate New Key
                  </button>
                </div>
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-white">{key.name}</p>
                          <p className="text-sm font-mono text-white/50 mt-1">{key.key}</p>
                          <div className="flex gap-4 mt-2 text-xs text-white/40">
                            <span>Created: {key.created}</span>
                            <span>Last used: {key.lastUsed}</span>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg bg-rose-400/10 text-rose-400 text-sm hover:bg-rose-400/20 transition-colors">
                          Revoke
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h2 className="text-lg font-medium text-white mb-6">Security Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-white/50" />
                        <div>
                          <p className="font-medium text-white">Password</p>
                          <p className="text-xs text-white/40">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-white/50" />
                        <div>
                          <p className="font-medium text-white">Two-Factor Authentication</p>
                          <p className="text-xs text-emerald-400">Enabled</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {(activeTab === 'billing' || activeTab === 'company' || activeTab === 'integrations') && (() => {
                const tab = tabs.find(t => t.id === activeTab);
                const Icon = tab?.icon;
                return (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-12 rounded-2xl bg-white/5 border border-white/10 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                      {Icon && <Icon className="w-8 h-8 text-white/30" />}
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
                    <p className="text-white/50">This section is coming soon</p>
                  </motion.div>
                );
              })()}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
