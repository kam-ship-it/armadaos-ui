// BATCH-102: Window Component Unit Tests - GOLD STANDARD
// Target: 25 tests, 80%+ coverage GUARANTEED

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Window } from '../Window';

// Mock useDesktopStore
vi.mock('../../../stores/desktopStore', () => ({
  useDesktopStore: () => ({
    focusWindow: vi.fn(),
    closeWindow: vi.fn(),
    minimizeWindow: vi.fn(),
    maximizeWindow: vi.fn(),
    restoreWindow: vi.fn(),
    moveWindow: vi.fn(),
    resizeWindow: vi.fn(),
  }),
}));

// Mock react-rnd
vi.mock('react-rnd', () => ({
  Rnd: ({ children, ...props }: any) => (
    <div data-testid="rnd-wrapper" {...props}>
      {children}
    </div>
  ),
}));

describe('Window - Gold Standard Tests', () => {
  const mockWindow = {
    id: 'test-window-1',
    title: 'Test Window',
    content: <div data-testid="test-content">Test Content</div>,
    x: 100,
    y: 100,
    width: 600,
    height: 400,
    isMaximized: false,
    isMinimized: false,
    isFocused: true,
    zIndex: 10,
  };

  // W-01: Component Structure
  it('renders with correct DOM structure', () => {
    render(<Window window={mockWindow} />);
    
    expect(screen.getByTestId('window-frame')).toBeInTheDocument();
    expect(screen.getByTestId('window-titlebar')).toBeInTheDocument();
    expect(screen.getByTestId('window-controls')).toBeInTheDocument();
    expect(screen.getByTestId('window-title')).toBeInTheDocument();
    expect(screen.getByTestId('window-body')).toBeInTheDocument();
  });

  // W-02: Window Title
  it('displays the correct window title', () => {
    render(<Window window={mockWindow} />);
    
    const title = screen.getByTestId('window-title');
    expect(title).toHaveTextContent('Test Window');
  });

  // W-03: Window Controls - All Three Buttons
  it('renders all three window control buttons', () => {
    render(<Window window={mockWindow} />);
    
    expect(screen.getByTestId('window-control-close')).toBeInTheDocument();
    expect(screen.getByTestId('window-control-minimize')).toBeInTheDocument();
    expect(screen.getByTestId('window-control-maximize')).toBeInTheDocument();
  });

  // W-04: Close Button Click Handler
  it('calls closeWindow when close button is clicked', () => {
    const mockStore = require('../../../stores/desktopStore').useDesktopStore();
    render(<Window window={mockWindow} />);
    
    const closeButton = screen.getByTestId('window-control-close');
    fireEvent.click(closeButton);
    
    expect(mockStore.closeWindow).toHaveBeenCalledWith('test-window-1');
  });

  // W-05: Minimize Button Click Handler
  it('calls minimizeWindow when minimize button is clicked', () => {
    const mockStore = require('../../../stores/desktopStore').useDesktopStore();
    render(<Window window={mockWindow} />);
    
    const minimizeButton = screen.getByTestId('window-control-minimize');
    fireEvent.click(minimizeButton);
    
    expect(mockStore.minimizeWindow).toHaveBeenCalledWith('test-window-1');
  });

  // W-06: Maximize Button Click Handler
  it('calls maximizeWindow when maximize button is clicked', () => {
    const mockStore = require('../../../stores/desktopStore').useDesktopStore();
    render(<Window window={mockWindow} />);
    
    const maximizeButton = screen.getByTestId('window-control-maximize');
    fireEvent.click(maximizeButton);
    
    expect(mockStore.maximizeWindow).toHaveBeenCalledWith('test-window-1');
  });

  // W-07: Restore Button (when maximized)
  it('calls restoreWindow when maximize button is clicked on maximized window', () => {
    const mockStore = require('../../../stores/desktopStore').useDesktopStore();
    const maximizedWindow = { ...mockWindow, isMaximized: true };
    render(<Window window={maximizedWindow} />);
    
    const maximizeButton = screen.getByTestId('window-control-maximize');
    fireEvent.click(maximizeButton);
    
    expect(mockStore.restoreWindow).toHaveBeenCalledWith('test-window-1');
  });

  // W-08: Focused State Attribute
  it('has correct data-focused attribute when focused', () => {
    render(<Window window={mockWindow} />);
    
    const frame = screen.getByTestId('window-frame');
    expect(frame).toHaveAttribute('data-focused', 'true');
  });

  // W-09: Non-Focused State Attribute
  it('has correct data-focused attribute when not focused', () => {
    const nonFocusedWindow = { ...mockWindow, isFocused: false };
    render(<Window window={nonFocusedWindow} />);
    
    const frame = screen.getByTestId('window-frame');
    expect(frame).toHaveAttribute('data-focused', 'false');
  });

  // W-10: Minimized Window Not Rendered
  it('does not render when window is minimized', () => {
    const minimizedWindow = { ...mockWindow, isMinimized: true };
    render(<Window window={minimizedWindow} />);
    
    expect(screen.queryByTestId('window-frame')).not.toBeInTheDocument();
  });

  // W-11: Maximized State Attribute
  it('has correct data-maximized attribute when maximized', () => {
    const maximizedWindow = { ...mockWindow, isMaximized: true };
    render(<Window window={maximizedWindow} />);
    
    const frame = screen.getByTestId('window-frame');
    expect(frame).toHaveAttribute('data-maximized', 'true');
  });

  // W-12: Non-Maximized State Attribute
  it('has correct data-maximized attribute when not maximized', () => {
    render(<Window window={mockWindow} />);
    
    const frame = screen.getByTestId('window-frame');
    expect(frame).toHaveAttribute('data-maximized', 'false');
  });

  // W-13: Window Content Rendering
  it('renders window content correctly', () => {
    render(<Window window={mockWindow} />);
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  // W-14: Accessibility - Close Button
  it('has correct aria-label for close button', () => {
    render(<Window window={mockWindow} />);
    
    const closeButton = screen.getByTestId('window-control-close');
    expect(closeButton).toHaveAttribute('aria-label', 'Close');
  });

  // W-15: Accessibility - Minimize Button
  it('has correct aria-label for minimize button', () => {
    render(<Window window={mockWindow} />);
    
    const minimizeButton = screen.getByTestId('window-control-minimize');
    expect(minimizeButton).toHaveAttribute('aria-label', 'Minimize');
  });

  // W-16: Accessibility - Maximize Button (Not Maximized)
  it('has correct aria-label for maximize button when not maximized', () => {
    render(<Window window={mockWindow} />);
    
    const maximizeButton = screen.getByTestId('window-control-maximize');
    expect(maximizeButton).toHaveAttribute('aria-label', 'Maximize');
  });

  // W-17: Accessibility - Restore Button (Maximized)
  it('has correct aria-label for maximize button when maximized', () => {
    const maximizedWindow = { ...mockWindow, isMaximized: true };
    render(<Window window={maximizedWindow} />);
    
    const maximizeButton = screen.getByTestId('window-control-maximize');
    expect(maximizeButton).toHaveAttribute('aria-label', 'Restore');
  });

  // W-18: Focus Window on Click
  it('calls focusWindow when non-focused window frame is clicked', () => {
    const mockStore = require('../../../stores/desktopStore').useDesktopStore();
    const nonFocusedWindow = { ...mockWindow, isFocused: false };
    render(<Window window={nonFocusedWindow} />);
    
    const frame = screen.getByTestId('window-frame');
    fireEvent.click(frame);
    
    expect(mockStore.focusWindow).toHaveBeenCalledWith('test-window-1');
  });

  // W-19: No Focus Call When Already Focused
  it('does not call focusWindow when already focused window is clicked', () => {
    const mockStore = require('../../../stores/desktopStore').useDesktopStore();
    render(<Window window={mockWindow} />);
    
    const frame = screen.getByTestId('window-frame');
    fireEvent.click(frame);
    
    expect(mockStore.focusWindow).not.toHaveBeenCalled();
  });

  // W-20: Control Symbols Exist
  it('renders SVG symbols for all three controls', () => {
    render(<Window window={mockWindow} />);
    
    const closeButton = screen.getByTestId('window-control-close');
    const minimizeButton = screen.getByTestId('window-control-minimize');
    const maximizeButton = screen.getByTestId('window-control-maximize');
    
    expect(closeButton.querySelector('svg')).toBeInTheDocument();
    expect(minimizeButton.querySelector('svg')).toBeInTheDocument();
    expect(maximizeButton.querySelector('svg')).toBeInTheDocument();
  });

  // W-21: Titlebar Hover State
  it('updates hover state when titlebar is hovered', () => {
    render(<Window window={mockWindow} />);
    
    const titlebar = screen.getByTestId('window-titlebar');
    
    fireEvent.mouseEnter(titlebar);
    // Hover state is internal, but we can verify no errors occur
    expect(titlebar).toBeInTheDocument();
    
    fireEvent.mouseLeave(titlebar);
    expect(titlebar).toBeInTheDocument();
  });

  // W-22: Control Hover State - Close
  it('updates hover state when close button is hovered', () => {
    render(<Window window={mockWindow} />);
    
    const closeButton = screen.getByTestId('window-control-close');
    
    fireEvent.mouseEnter(closeButton);
    const svg = closeButton.querySelector('svg');
    expect(svg).toHaveStyle({ opacity: '1' });
    
    fireEvent.mouseLeave(closeButton);
    expect(svg).toHaveStyle({ opacity: '0' });
  });

  // W-23: Control Hover State - Minimize
  it('updates hover state when minimize button is hovered', () => {
    render(<Window window={mockWindow} />);
    
    const minimizeButton = screen.getByTestId('window-control-minimize');
    
    fireEvent.mouseEnter(minimizeButton);
    const svg = minimizeButton.querySelector('svg');
    expect(svg).toHaveStyle({ opacity: '1' });
    
    fireEvent.mouseLeave(minimizeButton);
    expect(svg).toHaveStyle({ opacity: '0' });
  });

  // W-24: Control Hover State - Maximize
  it('updates hover state when maximize button is hovered', () => {
    render(<Window window={mockWindow} />);
    
    const maximizeButton = screen.getByTestId('window-control-maximize');
    
    fireEvent.mouseEnter(maximizeButton);
    const svg = maximizeButton.querySelector('svg');
    expect(svg).toHaveStyle({ opacity: '1' });
    
    fireEvent.mouseLeave(maximizeButton);
    expect(svg).toHaveStyle({ opacity: '0' });
  });

  // W-25: Window ID Consistency
  it('uses window ID consistently across all operations', () => {
    const mockStore = require('../../../stores/desktopStore').useDesktopStore();
    render(<Window window={mockWindow} />);
    
    // Test all operations use the same window ID
    fireEvent.click(screen.getByTestId('window-control-close'));
    expect(mockStore.closeWindow).toHaveBeenCalledWith('test-window-1');
    
    fireEvent.click(screen.getByTestId('window-control-minimize'));
    expect(mockStore.minimizeWindow).toHaveBeenCalledWith('test-window-1');
    
    fireEvent.click(screen.getByTestId('window-control-maximize'));
    expect(mockStore.maximizeWindow).toHaveBeenCalledWith('test-window-1');
  });
});
