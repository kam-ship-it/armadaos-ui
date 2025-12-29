import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

// Mock Data (To be replaced by API)
const TIERS = [
  {
    id: 'core-substrate',
    name: 'CORE SUBSTRATE',
    status: 'healthy',
    count: 10,
    components: [
      { id: 'the-one-gateway', name: 'The One Gateway', status: 'healthy', metric: '2.4k req/s' },
      { id: 'auth-service', name: 'Auth Service', status: 'healthy', metric: '99.9% uptime' },
      { id: 'event-store', name: 'Event Store', status: 'healthy', metric: '12ms latency' },
    ]
  },
  {
    id: 'core-services',
    name: 'CORE SERVICES',
    status: 'degraded',
    count: 16,
    components: [
      { id: 'nexus-agent', name: 'Nexus Agent', status: 'healthy', metric: 'Active' },
      { id: 'atlas-agent', name: 'Atlas Agent', status: 'degraded', metric: 'High Load' },
    ]
  },
  {
    id: 'infrastructure',
    name: 'INFRASTRUCTURE',
    status: 'healthy',
    count: 16,
    components: [
      { id: 'k8s-cluster', name: 'K8s Cluster', status: 'healthy', metric: '42 nodes' },
      { id: 'postgres-db', name: 'Postgres DB', status: 'healthy', metric: '45% storage' },
    ]
  }
];

export function ArchitectureLens() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono font-light tracking-wider text-gm-text">THE ARCHITECTURE</h1>
          <p className="text-gm-secondary text-sm mt-1">System Hierarchy & Component Status</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 rounded bg-gm-surface border border-gm-border text-xs font-mono text-gm-secondary">
            TOTAL COMPONENTS: 42
          </div>
          <div className="px-3 py-1 rounded bg-gm-surface border border-gm-border text-xs font-mono text-gm-green">
            HEALTHY: 41
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <AnimatePresence mode="wait">
          {TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              layoutId={tier.id}
              onClick={() => setSelectedTier(selectedTier === tier.id ? null : tier.id)}
              className={clsx(
                "bg-gm-surface border border-gm-border rounded-lg p-6 cursor-pointer transition-all hover:border-gm-purple/50 group relative overflow-hidden",
                selectedTier && selectedTier !== tier.id && "opacity-50 scale-95",
                selectedTier === tier.id && "ring-1 ring-gm-purple"
              )}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gm-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-mono text-sm tracking-widest text-gm-secondary uppercase">{tier.name}</h3>
                  <div className={clsx(
                    "w-2 h-2 rounded-full",
                    tier.status === 'healthy' ? "bg-gm-green shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-gm-yellow shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                  )} />
                </div>

                <div className="text-3xl font-light text-gm-text mb-2">{tier.count}</div>
                <div className="text-xs text-gm-muted font-mono">COMPONENTS ACTIVE</div>

                {/* Component Dots */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {Array.from({ length: tier.count }).map((_, i) => (
                    <div 
                      key={i} 
                      className={clsx(
                        "w-1.5 h-1.5 rounded-full transition-colors",
                        i < tier.count - 1 ? "bg-gm-muted/30" : (tier.status === 'healthy' ? "bg-gm-green" : "bg-gm-yellow")
                      )} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail View (Expanded) */}
      <AnimatePresence>
        {selectedTier && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gm-surface border border-gm-border rounded-lg p-6 mt-6"
          >
            <h3 className="font-mono text-sm text-gm-secondary mb-4">
              {TIERS.find(t => t.id === selectedTier)?.name} // COMPONENT DETAIL
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TIERS.find(t => t.id === selectedTier)?.components.map((comp) => (
                <div key={comp.id} className="bg-gm-bg border border-gm-border rounded p-4 hover:border-gm-purple/30 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gm-text font-medium">{comp.name}</span>
                    <div className={clsx(
                      "px-1.5 py-0.5 rounded text-[10px] font-mono uppercase",
                      comp.status === 'healthy' ? "bg-gm-green/10 text-gm-green" : "bg-gm-yellow/10 text-gm-yellow"
                    )}>
                      {comp.status}
                    </div>
                  </div>
                  <div className="text-xs text-gm-secondary font-mono">{comp.metric}</div>
                  
                  {/* Sparkline Placeholder */}
                  <div className="mt-3 h-8 flex items-end gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-full bg-gm-purple/20 rounded-t-sm" 
                        style={{ height: `${Math.random() * 100}%` }} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
