import { useDraggable } from '@dnd-kit/core';
import { Batch } from './mockData';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Activity, User } from 'lucide-react';

interface BatchCardProps {
  batch: Batch;
}

const priorityColors = {
  P0: 'text-red-500 border-red-500/20 bg-red-500/10',
  P1: 'text-amber-500 border-amber-500/20 bg-amber-500/10',
  P2: 'text-blue-500 border-blue-500/20 bg-blue-500/10',
};

export function BatchCard({ batch }: BatchCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: batch.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layoutId={batch.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      whileHover={{ scale: 1.02, borderColor: 'var(--gm-violet)' }}
      className={cn(
        "p-4 rounded-lg border bg-[var(--gm-surface)] cursor-grab active:cursor-grabbing group relative overflow-hidden touch-none",
        isDragging ? "border-[var(--gm-violet)] shadow-lg shadow-[var(--gm-violet)]/30" : "border-[var(--gm-graphite)]",
        batch.status === 'in-progress' && "animate-pulse-subtle"
      )}
    >
      {/* Progress Bar Background */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-[var(--gm-violet)] transition-all duration-500"
        style={{ width: `${batch.progress}%` }}
      />

      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-[10px] text-[var(--gm-silver)] uppercase tracking-wider">
          {batch.id}
        </span>
        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded border", priorityColors[batch.priority])}>
          {batch.priority}
        </span>
      </div>

      <h4 className="text-sm font-bold text-[var(--gm-snow)] mb-3 group-hover:text-white transition-colors">
        {batch.title}
      </h4>

      <div className="flex items-center justify-between text-xs text-[var(--gm-silver)]">
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3" />
          <span>{batch.agent}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3" />
          <span>{batch.progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
