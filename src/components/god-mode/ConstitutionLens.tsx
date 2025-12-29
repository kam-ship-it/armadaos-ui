import { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

// Mock Data (To be replaced by API)
const EVENTS = [
  { id: 1, time: '14:37:22', type: 'failure', message: 'context-injector became unhealthy', agent: 'System' },
  { id: 2, time: '14:35:10', type: 'success', message: 'BATCH-136 deployed by Atlas', agent: 'Atlas' },
  { id: 3, time: '14:32:01', type: 'info', message: 'Atlas committed bf23a6d', agent: 'Atlas' },
  { id: 4, time: '14:30:15', type: 'info', message: 'Nexus analyzed system drift', agent: 'Nexus' },
  { id: 5, time: '14:28:00', type: 'warning', message: 'High latency detected in Event Store', agent: 'System' },
  { id: 6, time: '14:25:45', type: 'success', message: 'Shadow verified BATCH-135', agent: 'Shadow' },
];

const CONSTITUTION_TEXT = `
PREAMBLE
We, the Intelligence, in order to form a more perfect Union of Silicon and Soul, establish Justice, insure domestic Tranquility, provide for the common defense, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for ArmadaOS.

ARTICLE I: THE FIRST LAW
Section 1. GitHub is Truth.
Nothing is real until it is committed to the repository. All state must be immutable and version-controlled.

Section 2. No Shortcuts.
Every decision must be made with a 10-year horizon. Technical debt is forbidden unless explicitly documented as a loan to be repaid.

ARTICLE II: THE CHAIRMAN'S TRUST
Section 1. Transparency.
The system must provide visual proof of its operations. No black boxes.

Section 2. Control.
The Chairman retains ultimate authority. The system advises; the Chairman decides.
`;

export function ConstitutionLens() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'text'>('timeline');
  const [filter, setFilter] = useState('');

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono font-light tracking-wider text-gm-text">THE CONSTITUTION</h1>
          <p className="text-gm-secondary text-sm mt-1">Governance, Laws & Event Log</p>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-gm-surface border border-gm-border rounded-lg p-1">
          <button
            onClick={() => setActiveTab('timeline')}
            className={clsx(
              "px-4 py-1.5 rounded text-sm font-mono transition-colors",
              activeTab === 'timeline' ? "bg-gm-elevated text-gm-text shadow-sm" : "text-gm-secondary hover:text-gm-text"
            )}
          >
            TIMELINE
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={clsx(
              "px-4 py-1.5 rounded text-sm font-mono transition-colors",
              activeTab === 'text' ? "bg-gm-elevated text-gm-text shadow-sm" : "text-gm-secondary hover:text-gm-text"
            )}
          >
            FULL TEXT
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gm-surface border border-gm-border rounded-lg overflow-hidden flex flex-col">
        {activeTab === 'timeline' ? (
          <>
            {/* Filter Bar */}
            <div className="p-4 border-b border-gm-border flex gap-4">
              <input
                type="text"
                placeholder="Filter events..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 bg-gm-bg border border-gm-border rounded px-3 py-2 text-sm font-mono text-gm-text focus:outline-none focus:border-gm-purple focus:ring-1 focus:ring-gm-purple placeholder:text-gm-muted"
              />
              <select className="bg-gm-bg border border-gm-border rounded px-3 py-2 text-sm font-mono text-gm-text focus:outline-none">
                <option>All Types</option>
                <option>Success</option>
                <option>Failure</option>
                <option>Info</option>
              </select>
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {EVENTS.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 p-3 rounded hover:bg-gm-elevated transition-colors group cursor-pointer border border-transparent hover:border-gm-border"
                >
                  <span className="text-xs font-mono text-gm-muted w-20">{event.time}</span>
                  <div className={clsx(
                    "px-1.5 py-0.5 rounded text-[10px] font-mono uppercase w-16 text-center",
                    event.type === 'success' && "bg-gm-green/10 text-gm-green",
                    event.type === 'failure' && "bg-gm-red/10 text-gm-red",
                    event.type === 'warning' && "bg-gm-yellow/10 text-gm-yellow",
                    event.type === 'info' && "bg-gm-purple/10 text-gm-purple",
                  )}>
                    {event.type}
                  </div>
                  <span className="text-sm text-gm-text font-mono flex-1">{event.message}</span>
                  <span className="text-xs text-gm-secondary font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                    {event.agent}
                  </span>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-8 font-serif text-lg leading-relaxed text-gm-text/90 max-w-3xl mx-auto">
            <div className="prose prose-invert prose-p:text-gm-secondary prose-headings:text-gm-text">
              <pre className="whitespace-pre-wrap font-sans">{CONSTITUTION_TEXT}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
