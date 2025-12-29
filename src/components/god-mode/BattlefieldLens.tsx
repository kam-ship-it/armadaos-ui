import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { clsx } from 'clsx';

// --- Types ---
type BatchStatus = 'proposed' | 'approved' | 'in-progress' | 'verifying' | 'complete';

interface Batch {
  id: string;
  title: string;
  agent: string;
  status: BatchStatus;
  progress: number;
}

interface Agent {
  id: string;
  name: string;
  version: string;
  task: string;
  health: 'healthy' | 'degraded' | 'critical';
  arc: number;
}

interface Threat {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
}

// --- Mock Data ---
const INITIAL_BATCHES: Batch[] = [
  { id: 'BATCH-GM-04', title: 'Battlefield Lens', agent: 'Atlas 2', status: 'in-progress', progress: 65 },
  { id: 'BATCH-GM-05', title: 'Nexus Integration', agent: 'Atlas 2', status: 'approved', progress: 0 },
  { id: 'BATCH-136', title: 'Core Substrate Optimization', agent: 'COS', status: 'complete', progress: 100 },
  { id: 'BATCH-137', title: 'Security Audit', agent: 'Shadow', status: 'verifying', progress: 90 },
  { id: 'BATCH-138', title: 'Marketplace Expansion', agent: 'CMO', status: 'proposed', progress: 0 },
];

const AGENTS: Agent[] = [
  { id: 'cos', name: 'COS', version: 'v1.1', task: 'Orchestrating BATCH-138', health: 'healthy', arc: 450 },
  { id: 'atlas', name: 'Atlas 2', version: 'v2.0', task: 'Executing BATCH-GM-04', health: 'healthy', arc: 850 },
  { id: 'shadow', name: 'Shadow', version: 'v1.2', task: 'Verifying BATCH-137', health: 'healthy', arc: 320 },
  { id: 'nexus', name: 'Nexus', version: 'v1.0', task: 'Monitoring System', health: 'healthy', arc: 120 },
];

const THREATS: Threat[] = [
  { id: 't1', type: 'Security Anomaly', severity: 'low', message: 'Unusual traffic pattern detected in Sector 7', timestamp: '14:42' },
  { id: 't2', type: 'Economic Spike', severity: 'medium', message: 'ARC consumption rate +15% above baseline', timestamp: '14:30' },
];

// --- Components ---

function BatchCard({ batch }: { batch: Batch }) {
  const isVerifying = batch.status === 'verifying';
  
  return (
    <Reorder.Item
      value={batch}
      id={batch.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        boxShadow: isVerifying ? "0 0 15px rgba(139, 92, 246, 0.15)" : "none"
      }}
      whileHover={{ scale: 1.02, backgroundColor: '#1A1A1A' }}
      className={clsx(
        "bg-gm-surface border border-gm-border rounded-lg p-4 mb-3 cursor-grab active:cursor-grabbing group relative overflow-hidden",
        isVerifying && "border-gm-purple/50"
      )}
    >
      {/* Pulse Effect for Active Batches */}
      {batch.status === 'in-progress' && (
        <div className="absolute inset-0 bg-gm-purple/5 animate-pulse" />
      )}

      <div className="relative z-10 pointer-events-none">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-mono text-gm-secondary">{batch.id}</span>
          <div className={clsx(
            "w-2 h-2 rounded-full",
            batch.status === 'in-progress' ? "bg-gm-purple animate-pulse" : 
            batch.status === 'verifying' ? "bg-gm-yellow" :
            batch.status === 'complete' ? "bg-gm-green" : "bg-gm-muted"
          )} />
        </div>
        <h4 className="text-sm font-medium text-gm-text mb-3">{batch.title}</h4>
        
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gm-elevated flex items-center justify-center text-[10px] text-gm-secondary border border-gm-border">
              {batch.agent.charAt(0)}
            </div>
            <span className="text-xs text-gm-secondary">{batch.agent}</span>
          </div>
          <span className="text-xs font-mono text-gm-muted">{batch.progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-gm-bg rounded-full mt-3 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${batch.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={clsx(
              "h-full rounded-full",
              batch.status === 'complete' ? "bg-gm-green" : "bg-gm-purple"
            )}
          />
        </div>
      </div>
    </Reorder.Item>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-gm-surface border border-gm-border rounded-lg p-4 flex flex-col gap-3 relative overflow-hidden group"
    >
      {/* Health Glow */}
      <div className={clsx(
        "absolute top-0 right-0 w-16 h-16 blur-2xl opacity-10 transition-opacity group-hover:opacity-20",
        agent.health === 'healthy' ? "bg-gm-green" : "bg-gm-red"
      )} />

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gm-text font-medium">{agent.name}</h3>
          <span className="text-xs font-mono text-gm-secondary">{agent.version}</span>
        </div>
        <div className={clsx(
          "px-1.5 py-0.5 rounded text-[10px] font-mono uppercase border",
          agent.health === 'healthy' 
            ? "bg-gm-green/10 text-gm-green border-gm-green/20" 
            : "bg-gm-red/10 text-gm-red border-gm-red/20"
        )}>
          {agent.health}
        </div>
      </div>

      <div className="text-xs text-gm-secondary">
        <span className="text-gm-muted block mb-1">CURRENT TASK</span>
        {agent.task}
      </div>

      <div className="mt-auto pt-3 border-t border-gm-border flex justify-between items-center">
        <span className="text-[10px] font-mono text-gm-muted">ARC CONSUMPTION</span>
        <span className="text-xs font-mono text-gm-purple">{agent.arc}/hr</span>
      </div>
    </motion.div>
  );
}

function ThreatAlert({ threat }: { threat: Threat }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-3 p-3 border-b border-gm-border last:border-0 hover:bg-gm-elevated/50 transition-colors cursor-pointer group"
    >
      <div className={clsx(
        "w-1 h-full rounded-full shrink-0",
        threat.severity === 'critical' ? "bg-gm-red animate-pulse" :
        threat.severity === 'high' ? "bg-gm-red" :
        threat.severity === 'medium' ? "bg-gm-yellow" : "bg-gm-purple"
      )} />
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <span className={clsx(
            "text-xs font-bold uppercase tracking-wider",
            threat.severity === 'critical' || threat.severity === 'high' ? "text-gm-red" : "text-gm-text"
          )}>
            {threat.type}
          </span>
          <span className="text-[10px] font-mono text-gm-muted">{threat.timestamp}</span>
        </div>
        <p className="text-sm text-gm-secondary group-hover:text-gm-text transition-colors">
          {threat.message}
        </p>
      </div>
    </motion.div>
  );
}

export function BattlefieldLens() {
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  
  const columns: BatchStatus[] = ['proposed', 'approved', 'in-progress', 'verifying', 'complete'];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-mono font-light tracking-wider text-gm-text">THE BATTLEFIELD</h1>
          <p className="text-gm-secondary text-sm mt-1">Strategic Execution & Threat Monitoring</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-xs font-mono text-gm-muted">ACTIVE BATCHES</div>
            <div className="text-xl font-light text-gm-text">5</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-gm-muted">THREAT LEVEL</div>
            <div className="text-xl font-light text-gm-green">LOW</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        {/* Left: Batch Tracker (Kanban) */}
        <div className="flex-1 flex flex-col min-w-0">
          <h2 className="text-sm font-mono text-gm-secondary mb-4 uppercase tracking-widest">Batch Tracker</h2>
          <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
            {columns.map(status => (
              <div key={status} className="flex-1 min-w-[240px] flex flex-col bg-gm-bg/50 rounded-lg border border-gm-border/50">
                <div className="p-3 border-b border-gm-border/50 flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-gm-secondary uppercase">
                    {status.replace('-', ' ')}
                  </span>
                  <span className="text-[10px] bg-gm-elevated px-1.5 py-0.5 rounded text-gm-muted">
                    {batches.filter(b => b.status === status).length}
                  </span>
                </div>
                <div className="p-3 flex-1 overflow-y-auto">
                  <Reorder.Group 
                    axis="y" 
                    values={batches.filter(b => b.status === status)} 
                    onReorder={(newOrder) => {
                      // In a real app, we'd update the global state here.
                      // For this mock, we just update the local state to reflect the reorder within the column.
                      // This is a simplification for the UI demo.
                      const otherBatches = batches.filter(b => b.status !== status);
                      setBatches([...otherBatches, ...newOrder]);
                    }}
                    className="min-h-[100px]"
                  >
                    {batches
                      .filter(b => b.status === status)
                      .map(batch => (
                        <BatchCard key={batch.id} batch={batch} />
                      ))}
                  </Reorder.Group>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Agents & Threats */}
        <div className="w-[320px] flex flex-col gap-6 shrink-0">
          {/* Agent Army */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-mono text-gm-secondary uppercase tracking-widest">Agent Army</h2>
            <div className="grid grid-cols-1 gap-3">
              {AGENTS.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>

          {/* Threat Feed */}
          <div className="flex-1 flex flex-col min-h-0 bg-gm-surface border border-gm-border rounded-lg overflow-hidden">
            <div className="p-3 border-b border-gm-border bg-gm-elevated/30 flex justify-between items-center">
              <h2 className="text-sm font-mono text-gm-secondary uppercase tracking-widest">Threat Feed</h2>
              <div className="w-2 h-2 rounded-full bg-gm-green animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {THREATS.map(threat => (
                <ThreatAlert key={threat.id} threat={threat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
