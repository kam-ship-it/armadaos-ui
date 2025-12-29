import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Icons (using SVG directly to avoid lucide dependency if not installed, or install lucide-react)
// Using simple SVG icons for now to ensure zero external deps issues
const Icons = {
  Architecture: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  Constitution: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 22v-6.5" />
      <path d="M6 22v-6.5" />
      <path d="M18 22v-6.5" />
    </svg>
  ),
  Battlefield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 22 1-1h3l9-9" />
      <path d="M3 21v-3l9-9" />
      <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.9.9" />
      <path d="m2 22 5-5" />
      <path d="m20 3-3 3" />
    </svg>
  )
};

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function LeftNav() {
  const navItems = [
    { name: 'Architecture', path: '/god-mode/architecture', icon: Icons.Architecture },
    { name: 'Constitution', path: '/god-mode/constitution', icon: Icons.Constitution },
    { name: 'Battlefield', path: '/god-mode/battlefield', icon: Icons.Battlefield },
  ];

  return (
    <nav className="w-[60px] h-full bg-gm-surface border-r border-gm-border flex flex-col items-center py-4 gap-6 z-20">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => cn(
            "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 group relative",
            isActive 
              ? "bg-gm-purple/10 text-gm-purple shadow-[0_0_10px_rgba(139,92,246,0.3)]" 
              : "text-gm-secondary hover:text-gm-text hover:bg-gm-elevated"
          )}
        >
          {({ isActive }) => (
            <>
              <item.icon />
              
              {/* Tooltip */}
              <div className="absolute left-14 px-2 py-1 bg-gm-surface border border-gm-border rounded text-xs font-mono text-gm-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                {item.name}
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gm-purple rounded-r-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
