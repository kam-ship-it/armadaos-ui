import React from 'react';

/**
 * Wallpaper - Geometric circuit board pattern overlay
 * 
 * Features:
 * - Subtle abstract geometric pattern
 * - Diagonal lines forming tech-inspired design
 * - Low opacity (~5-10%)
 * - SVG-based for crisp rendering
 * 
 * Pattern inspired by circuit boards and technical diagrams
 * with diagonal lines, nodes, and connections
 */
export const Wallpaper: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none">
      <svg
        className="block w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Circuit board pattern */}
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="400"
            height="400"
            patternUnits="userSpaceOnUse"
          >
            {/* Diagonal lines (main grid) */}
            <line x1="0" y1="0" x2="400" y2="400" stroke="#1E2A3A" strokeWidth="1" opacity="0.3" />
            <line x1="100" y1="0" x2="400" y2="300" stroke="#1E2A3A" strokeWidth="1" opacity="0.25" />
            <line x1="0" y1="100" x2="300" y2="400" stroke="#1E2A3A" strokeWidth="1" opacity="0.25" />
            <line x1="200" y1="0" x2="400" y2="200" stroke="#1E2A3A" strokeWidth="1" opacity="0.2" />
            <line x1="0" y1="200" x2="200" y2="400" stroke="#1E2A3A" strokeWidth="1" opacity="0.2" />
            
            {/* Reverse diagonal lines */}
            <line x1="0" y1="400" x2="400" y2="0" stroke="#1E2A3A" strokeWidth="1" opacity="0.3" />
            <line x1="100" y1="400" x2="400" y2="100" stroke="#1E2A3A" strokeWidth="1" opacity="0.25" />
            <line x1="0" y1="300" x2="300" y2="0" stroke="#1E2A3A" strokeWidth="1" opacity="0.25" />
            
            {/* Horizontal lines (subtle) */}
            <line x1="0" y1="100" x2="400" y2="100" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.15" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.15" />
            <line x1="0" y1="300" x2="400" y2="300" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.15" />
            
            {/* Vertical lines (subtle) */}
            <line x1="100" y1="0" x2="100" y2="400" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.15" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.15" />
            <line x1="300" y1="0" x2="300" y2="400" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.15" />
            
            {/* Circuit nodes (small circles at intersections) */}
            <circle cx="100" cy="100" r="2" fill="#1E2A3A" opacity="0.4" />
            <circle cx="200" cy="200" r="2" fill="#1E2A3A" opacity="0.4" />
            <circle cx="300" cy="300" r="2" fill="#1E2A3A" opacity="0.4" />
            <circle cx="100" cy="300" r="2" fill="#1E2A3A" opacity="0.4" />
            <circle cx="300" cy="100" r="2" fill="#1E2A3A" opacity="0.4" />
            
            {/* Accent nodes (slightly larger, cyan tint) */}
            <circle cx="150" cy="150" r="3" fill="#06B6D4" opacity="0.2" />
            <circle cx="250" cy="250" r="3" fill="#06B6D4" opacity="0.2" />
            <circle cx="150" cy="250" r="3" fill="#06B6D4" opacity="0.2" />
            <circle cx="250" cy="150" r="3" fill="#06B6D4" opacity="0.2" />
            
            {/* Small connecting lines (circuit traces) */}
            <line x1="100" y1="100" x2="150" y2="150" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.2" />
            <line x1="150" y1="150" x2="200" y2="200" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.2" />
            <line x1="200" y1="200" x2="250" y2="250" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.2" />
            <line x1="250" y1="250" x2="300" y2="300" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.2" />
            
            {/* Abstract geometric shapes (very subtle) */}
            <rect x="50" y="50" width="30" height="30" fill="none" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.1" />
            <rect x="320" y="320" width="30" height="30" fill="none" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.1" />
            <polygon points="180,80 200,100 180,120 160,100" fill="none" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.1" />
            <polygon points="220,280 240,300 220,320 200,300" fill="none" stroke="#1E2A3A" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>
        
        {/* Apply pattern to full screen */}
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" opacity="0.08" />
      </svg>
    </div>
  );
};
