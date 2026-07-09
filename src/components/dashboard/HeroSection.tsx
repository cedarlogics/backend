import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const particles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 2,
}));

export default function HeroSection() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#10081d] via-[#0a0713] to-[#050308] border border-white/10 p-8"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff0088]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ff1493]/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#ff0088] opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff0088]/10 border border-[#ff0088]/20 text-sm text-[#ff0088] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ff0088] animate-pulse" />
              Live Platform Status
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Enterprise Workflow </span>
            <span className="bg-gradient-to-r from-[#ff0088] via-[#ff1493] to-[#ff69b4] bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/60 mb-6"
          >
            <span className="text-white font-medium">Automate.</span>{' '}
            <span className="text-[#ff0088] font-medium">Orchestrate.</span>{' '}
            <span className="text-white font-medium">Optimize.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/40 max-w-lg"
          >
            Connect your enterprise systems, deploy intelligent AI agents, and automate complex business processes with unprecedented efficiency.
          </motion.p>
        </div>

        <div className="hidden xl:block text-right">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <p className="text-white/50 text-sm mb-1">Current Time</p>
              <p className="text-3xl font-mono text-white">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })}
              </p>
              <p className="text-white/30 text-sm mt-1">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10"
      >
        {[
          { label: 'Active Workflows', value: '47', change: '+5' },
          { label: 'AI Agents Running', value: '8', change: '+2' },
          { label: 'Connected Systems', value: '24', change: '+3' },
          { label: 'Tasks Today', value: '12.5K', change: '+18%' },
        ].map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-emerald-400">{stat.change}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
