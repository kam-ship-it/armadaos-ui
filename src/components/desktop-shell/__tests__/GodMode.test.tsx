// BATCH-103: God Mode Tests - GOLD STANDARD

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GodMode } from '../GodMode';

describe('GodMode - Gold Standard Tests', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  // GM-01: Component Structure
  it('renders with correct DOM structure when visible', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    expect(screen.getByTestId('god-mode-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('god-mode-backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('god-mode-modal')).toBeInTheDocument();
    expect(screen.getByTestId('god-mode-search')).toBeInTheDocument();
    expect(screen.getByTestId('god-mode-results')).toBeInTheDocument();
  });

  // GM-02: Visibility State
  it('does not render when isVisible is false', () => {
    render(<GodMode isVisible={false} onClose={mockOnClose} />);
    
    expect(screen.queryByTestId('god-mode-overlay')).not.toBeInTheDocument();
  });

  // GM-03: Data Attribute
  it('has correct data-visible attribute', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    const overlay = screen.getByTestId('god-mode-overlay');
    expect(overlay).toHaveAttribute('data-visible', 'true');
  });

  // GM-04: Search Input Focus
  it('focuses search input when visible', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    const searchInput = screen.getByTestId('god-mode-search');
    expect(searchInput).toHaveFocus();
  });

  // GM-05: Search Input Placeholder
  it('has correct placeholder text', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    const searchInput = screen.getByTestId('god-mode-search');
    expect(searchInput).toHaveAttribute('placeholder', 'Search commands...');
  });

  // GM-06: Default Commands Render
  it('renders default commands on mount', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    expect(screen.getByTestId('god-mode-result-new-window')).toBeInTheDocument();
    expect(screen.getByTestId('god-mode-result-close-window')).toBeInTheDocument();
    expect(screen.getByTestId('god-mode-result-settings')).toBeInTheDocument();
    expect(screen.getByTestId('god-mode-result-help')).toBeInTheDocument();
  });

  // GM-07: Search Filtering
  it('filters commands based on search query', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    const searchInput = screen.getByTestId('god-mode-search');
    fireEvent.change(searchInput, { target: { value: 'window' } });
    
    expect(screen.getByTestId('god-mode-result-new-window')).toBeInTheDocument();
    expect(screen.getByTestId('god-mode-result-close-window')).toBeInTheDocument();
    expect(screen.queryByTestId('god-mode-result-settings')).not.toBeInTheDocument();
    expect(screen.queryByTestId('god-mode-result-help')).not.toBeInTheDocument();
  });

  // GM-08: No Results Message
  it('shows no results message when search has no matches', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    const searchInput = screen.getByTestId('god-mode-search');
    fireEvent.change(searchInput, { target: { value: 'xyz123nonexistent' } });
    
    expect(screen.getByText('No commands found')).toBeInTheDocument();
  });

  // GM-09: Backdrop Click Closes
  it('calls onClose when backdrop is clicked', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    const backdrop = screen.getByTestId('god-mode-backdrop');
    fireEvent.click(backdrop);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // GM-10: Escape Key Closes
  it('calls onClose when Escape key is pressed', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // GM-11: Arrow Down Navigation
  it('selects next item when Arrow Down is pressed', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    const firstItem = screen.getByTestId('god-mode-result-new-window');
    const secondItem = screen.getByTestId('god-mode-result-close-window');
    
    expect(firstItem).toHaveAttribute('data-selected', 'true');
    
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    
    expect(firstItem).toHaveAttribute('data-selected', 'false');
    expect(secondItem).toHaveAttribute('data-selected', 'true');
  });

  // GM-12: Arrow Up Navigation
  it('selects previous item when Arrow Up is pressed', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    // First go down to second item
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    
    const firstItem = screen.getByTestId('god-mode-result-new-window');
    const secondItem = screen.getByTestId('god-mode-result-close-window');
    
    expect(secondItem).toHaveAttribute('data-selected', 'true');
    
    // Then go back up
    fireEvent.keyDown(document, { key: 'ArrowUp' });
    
    expect(firstItem).toHaveAttribute('data-selected', 'true');
    expect(secondItem).toHaveAttribute('data-selected', 'false');
  });

  // GM-13: Command Click Closes
  it('calls onClose when command is clicked', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    const command = screen.getByTestId('god-mode-result-new-window');
    fireEvent.click(command);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // GM-14: Enter Key Executes
  it('closes God Mode when Enter is pressed', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    fireEvent.keyDown(document, { key: 'Enter' });
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // GM-15: Search Icon Renders
  it('renders search icon', () => {
    render(<GodMode isVisible={true} onClose={mockOnClose} />);
    
    const searchIcon = document.querySelector('.god-mode-search-icon');
    expect(searchIcon).toBeInTheDocument();
  });
});
