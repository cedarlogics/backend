import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Workflow, Bot, Plug, Settings, ArrowRight, Esc } from 'lucide-react';
import { useUIStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const commands = [
  { icon: Workflow, label: 'Create New Workflow', path: '/workflows', shortcut: 'W' },
  { icon: Bot, label: 'Deploy AI Agent', path: '/ai-agents', shortcut: 'A' },
  { icon: Plug, label: 'Connect Integration', path: '/integrations', shortcut: 'I' },
  { icon: Settings, label: 'Open Settings', path: '/settings', shortcut: ',' },
  { icon: Workflow, label: 'View Workflows', path: '/workflows' },
  { icon: Bot, label: 'View AI Agents', path: '/ai-agents' },
  { icon: Plug, label: 'View Integrations', path: '/integrations' },
  { icon: Workflow, label: 'Infrastructure Monitor', path: '/infrastructure' },
  { icon: Workflow, label: 'Analytics Dashboard', path: '/analytics' },
];

export default function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette } = useUIStore();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }

      if (commandPaletteOpen) {
        if (e.key === 'Escape') {
          toggleCommandPalette();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const cmd = filteredCommands[selectedIndex];
          if (cmd) {
            navigate(cmd.path);
            toggleCommandPalette();
            setSearch('');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, filteredCommands, selectedIndex, navigate, toggleCommandPalette]);

  useEffect(() => {
    if (commandPaletteOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setSelectedIndex(0);
  }, [commandPaletteOpen, search]);

  const handleSelect = (path: string) => {
    navigate(path);
    toggleCommandPalette();
    setSearch('');
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCommandPalette}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
          >
            <div className="rounded-2xl bg-[#151021] border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
                <Search className="w-5 h-5 text-white/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-lg"
                />
                <div className="flex items-center gap-1 text-xs text-white/40">
                  <kbd className="px-2 py-1 rounded-lg bg-white/10">Esc</kbd>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-white/40">No commands found</div>
                ) : (
                  filteredCommands.map((cmd, idx) => (
                    <button
                      key={cmd.label}
                      onClick={() => handleSelect(cmd.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                        idx === selectedIndex
                          ? 'bg-[#ff0088]/20 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <cmd.icon className="w-4 h-4" />
                      <span className="flex-1 text-left">{cmd.label}</span>
                      {cmd.shortcut && (
                        <kbd className="px-2 py-0.5 rounded bg-white/10 text-xs text-white/50">
                          {cmd.shortcut}
                        </kbd>
                      )}
                      <ArrowRight className="w-4 h-4 text-white/30" />
                    </button>
                  ))
                )}
              </div>
              <div className="px-4 py-3 border-t border-white/5 flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">↵</kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">Esc</kbd>
                  <span>Close</span>
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
