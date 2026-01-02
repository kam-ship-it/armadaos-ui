// BATCH-103: God Mode Component - GOLD STANDARD
// Implements Section 3.6 of Desktop Shell Specification V2

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import './GodMode.css';

interface Command {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  action: () => void;
  keywords: string[];
}

interface GodModeProps {
  isVisible: boolean;
  onClose: () => void;
}

export const GodMode: React.FC<GodModeProps> = ({ isVisible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredCommands, setFilteredCommands] = useState<Command[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sample commands (in production, fetch from API)
  const commands: Command[] = [
    {
      id: 'new-window',
      label: 'New Window',
      icon: '🪟',
      shortcut: '⌘N',
      action: () => console.log('New Window'),
      keywords: ['window', 'new', 'create'],
    },
    {
      id: 'close-window',
      label: 'Close Window',
      icon: '✕',
      shortcut: '⌘W',
      action: () => console.log('Close Window'),
      keywords: ['window', 'close', 'exit'],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      shortcut: '⌘,',
      action: () => console.log('Settings'),
      keywords: ['settings', 'preferences', 'config'],
    },
    {
      id: 'help',
      label: 'Help',
      icon: '❓',
      shortcut: '⌘?',
      action: () => console.log('Help'),
      keywords: ['help', 'support', 'docs'],
    },
  ];

  // Focus search input when visible
  useEffect(() => {
    if (isVisible && searchInputRef.current) {
      searchInputRef.current.focus();
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isVisible]);

  // Filter commands based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCommands(commands);
    } else {
      const filtered = commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cmd.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredCommands(filtered);
      setSelectedIndex(0);
    }
  }, [searchQuery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, filteredCommands, selectedIndex, onClose]);

  if (!isVisible) return null;

  return (
    <div
      id="god-mode-overlay"
      data-testid="god-mode-overlay"
      data-visible={isVisible}
      className="god-mode-overlay"
    >
      <div
        id="god-mode-backdrop"
        data-testid="god-mode-backdrop"
        className="god-mode-backdrop"
        onClick={onClose}
      />
      <div
        id="god-mode-modal"
        data-testid="god-mode-modal"
        className="god-mode-modal"
      >
        <div className="god-mode-search-container">
          <Search className="god-mode-search-icon" size={24} />
          <input
            ref={searchInputRef}
            id="god-mode-search"
            data-testid="god-mode-search"
            type="text"
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div
          id="god-mode-results"
          data-testid="god-mode-results"
          className="god-mode-results"
        >
          {filteredCommands.map((cmd, index) => (
            <div
              key={cmd.id}
              data-testid={`god-mode-result-${cmd.id}`}
              data-selected={index === selectedIndex}
              className="god-mode-result-item"
              onClick={() => {
                cmd.action();
                onClose();
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span className="god-mode-result-icon">{cmd.icon}</span>
              <span className="god-mode-result-label">{cmd.label}</span>
              {cmd.shortcut && (
                <span className="god-mode-result-shortcut">{cmd.shortcut}</span>
              )}
            </div>
          ))}
          {filteredCommands.length === 0 && (
            <div className="god-mode-no-results">
              <p>No commands found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
