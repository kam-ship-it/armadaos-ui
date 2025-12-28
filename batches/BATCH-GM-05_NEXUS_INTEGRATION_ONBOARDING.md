# BATCH-GM-05: NEXUS INTEGRATION & ONBOARDING

**Batch ID:** BATCH-GM-05
**Title:** Nexus Integration & Onboarding
**Assigned To:** Atlas 2 (UX/UI)
**Priority:** P0 - HIGHEST
**Status:** 🟡 READY FOR EXECUTION
**Created:** December 28, 2025
**Author:** COS v1.1

---

## EXECUTIVE SUMMARY

This batch implements the full Nexus chat integration and the first-time user onboarding flow. Nexus is the AI co-pilot that guides the Chairman through God Mode, providing explanations, analysis, and recommendations.

**Estimated Hours:** 24-32
**Dependencies:** BATCH-GM-01, GM-02, GM-03, GM-04 (all lenses)
**DoD Criteria:** P13-001, P13-002 (Boot Sequence, Onboarding)

---

## ACCEPTANCE CRITERIA

| ID | Criterion | Verification |
|:---|:----------|:-------------|
| AC-01 | Nexus Panel has functional chat interface | Interaction test |
| AC-02 | User can send messages to Nexus and receive responses | API integration test |
| AC-03 | Nexus Guide capability works (component explanations) | Interaction test |
| AC-04 | Nexus Interpreter capability works (causal chain) | Interaction test |
| AC-05 | Nexus Challenge capability works (pre-mortem) | Interaction test |
| AC-06 | Onboarding flow has 5 screens per spec | Visual inspection |
| AC-07 | Onboarding is guided by Nexus | Interaction test |
| AC-08 | Onboarding can be skipped after first completion | Interaction test |

---

## DELIVERABLES

### 1. Components to Create

| Component | Path | Purpose |
|:----------|:-----|:--------|
| `useNexus.ts` | `src/hooks/useNexus.ts` | Nexus API hook |
| `NexusChat.tsx` | `src/components/god-mode/nexus/NexusChat.tsx` | Chat interface |
| `NexusMessage.tsx` | `src/components/god-mode/nexus/NexusMessage.tsx` | Single message |
| `NexusInput.tsx` | `src/components/god-mode/nexus/NexusInput.tsx` | Message input |
| `NexusContext.tsx` | `src/components/god-mode/nexus/NexusContext.tsx` | Contextual display |
| `Onboarding.tsx` | `src/components/god-mode/onboarding/Onboarding.tsx` | Onboarding container |
| `OnboardingStep.tsx` | `src/components/god-mode/onboarding/OnboardingStep.tsx` | Single step |
| `OnboardingProgress.tsx` | `src/components/god-mode/onboarding/OnboardingProgress.tsx` | Progress indicator |

### 2. Nexus Panel Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           NEXUS PANEL                                    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ NEXUS                                                    [Collapse] ││
│  ├─────────────────────────────────────────────────────────────────────┤│
│  │                                                                       ││
│  │  ┌───────────────────────────────────────────────────────────────┐  ││
│  │  │ 🤖 NEXUS                                                      │  ││
│  │  │                                                                │  ││
│  │  │ Welcome to God Mode, Chairman. I'm Nexus, your AI co-pilot.  │  ││
│  │  │ I can help you understand the system, analyze events, and    │  ││
│  │  │ challenge your plans.                                         │  ││
│  │  │                                                                │  ││
│  │  │ What would you like to explore?                               │  ││
│  │  └───────────────────────────────────────────────────────────────┘  ││
│  │                                                                       ││
│  │  ┌───────────────────────────────────────────────────────────────┐  ││
│  │  │ 👤 YOU                                                        │  ││
│  │  │                                                                │  ││
│  │  │ What's the health status of the system?                       │  ││
│  │  └───────────────────────────────────────────────────────────────┘  ││
│  │                                                                       ││
│  │  ┌───────────────────────────────────────────────────────────────┐  ││
│  │  │ 🤖 NEXUS                                                      │  ││
│  │  │                                                                │  ││
│  │  │ The system is currently **healthy**. All 8 deployed services │  ││
│  │  │ are operational:                                              │  ││
│  │  │                                                                │  ││
│  │  │ • event-store: ● Healthy                                      │  ││
│  │  │ • validator: ● Healthy                                        │  ││
│  │  │ • the-one-gateway: ● Healthy                                  │  ││
│  │  │ ...                                                           │  ││
│  │  └───────────────────────────────────────────────────────────────┘  ││
│  │                                                                       ││
│  ├─────────────────────────────────────────────────────────────────────┤│
│  │ [Type a message...]                                         [Send] ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3. useNexus Hook

```typescript
// src/hooks/useNexus.ts

interface NexusMessage {
  id: string;
  role: 'user' | 'nexus';
  content: string;
  timestamp: Date;
  capability?: 'guide' | 'interpret' | 'challenge' | 'explain' | 'query';
  context?: Record<string, any>;
}

interface UseNexusReturn {
  messages: NexusMessage[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  triggerGuide: (componentId: string) => Promise<void>;
  triggerInterpret: (eventId: string) => Promise<void>;
  triggerChallenge: (batchId: string) => Promise<void>;
  triggerExplain: (articleId: string) => Promise<void>;
  clearMessages: () => void;
}

export function useNexus(): UseNexusReturn {
  const [messages, setMessages] = useState<NexusMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: NexusMessage = {
      id: uuid(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Send to API
    setIsLoading(true);
    try {
      const response = await fetch('/v1/nexus/query', {
        method: 'POST',
        body: JSON.stringify({ query: content }),
      });
      const data = await response.json();
      
      // Add Nexus response
      const nexusMessage: NexusMessage = {
        id: uuid(),
        role: 'nexus',
        content: data.response,
        timestamp: new Date(),
        capability: 'query',
      };
      setMessages(prev => [...prev, nexusMessage]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerGuide = async (componentId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/v1/nexus/guide?component_id=${componentId}`);
      const data = await response.json();
      
      const nexusMessage: NexusMessage = {
        id: uuid(),
        role: 'nexus',
        content: data.explanation,
        timestamp: new Date(),
        capability: 'guide',
        context: { componentId },
      };
      setMessages(prev => [...prev, nexusMessage]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Similar implementations for triggerInterpret, triggerChallenge, triggerExplain
  
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    triggerGuide,
    triggerInterpret,
    triggerChallenge,
    triggerExplain,
    clearMessages: () => setMessages([]),
  };
}
```

### 4. Nexus Capabilities

| Capability | Trigger | API Endpoint | Purpose |
|:-----------|:--------|:-------------|:--------|
| **Guide** | Hover on component | `GET /v1/nexus/guide?component_id={}` | Explain component |
| **Interpret** | Click event | `GET /v1/nexus/interpret?event_id={}` | Causal chain analysis |
| **Challenge** | Click batch | `GET /v1/nexus/challenge?batch_id={}` | Pre-mortem analysis |
| **Explain** | Click article | `GET /v1/nexus/explain?article_id={}` | Article explanation |
| **Query** | Chat message | `POST /v1/nexus/query` | General query |

### 5. Onboarding Flow (5 Screens)

#### Screen 1: Welcome

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                         [ARMADA LOGO]                                   │
│                                                                          │
│                    WELCOME TO GOD MODE                                  │
│                                                                          │
│        You now have complete visibility into the Immutable Computer.    │
│                                                                          │
│        I'm Nexus, your AI co-pilot. I'll guide you through              │
│        everything you need to know.                                     │
│                                                                          │
│                                                                          │
│                         [Let's Begin →]                                 │
│                                                                          │
│                          ○ ○ ○ ○ ○                                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Screen 2: The Pulse

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                          THE PULSE                                      │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  [System: ●]  [ARC: $X,XXX]  [Loops: X]  [Alerts: X]               ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                         ↑ This is highlighted                           │
│                                                                          │
│        This is The Pulse - your real-time system status bar.           │
│                                                                          │
│        • System Health: Green means all systems operational            │
│        • ARC Treasury: Your current balance                            │
│        • Open Loops: Tasks awaiting your decision                      │
│        • Alerts: Important notifications from Nexus                    │
│                                                                          │
│                         [Next →]                                        │
│                                                                          │
│                          ● ○ ○ ○ ○                                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Screen 3: The Lenses

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                         THE 3 LENSES                                    │
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                     │
│  │ 🏗️          │  │ 📜          │  │ ⚔️          │                     │
│  │ Architecture│  │ Constitution│  │ Battlefield │                     │
│  │             │  │             │  │             │                     │
│  │ View all 42 │  │ View the    │  │ View batch  │                     │
│  │ components  │  │ event log   │  │ progress    │                     │
│  └─────────────┘  └─────────────┘  └─────────────┘                     │
│                                                                          │
│        God Mode has 3 Lenses, each showing a different view:           │
│                                                                          │
│        • Architecture: The raw health of all components                │
│        • Constitution: The immutable record of all events              │
│        • Battlefield: Strategic execution and threats                  │
│                                                                          │
│                         [Next →]                                        │
│                                                                          │
│                          ● ● ○ ○ ○                                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Screen 4: Nexus

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                           NEXUS                                         │
│                                                                          │
│                         [🤖 Avatar]                                     │
│                                                                          │
│        I'm always here in the right panel, ready to help.              │
│                                                                          │
│        You can ask me anything:                                         │
│        • "What's wrong with the system?"                               │
│        • "Explain this event"                                          │
│        • "Challenge this batch plan"                                   │
│        • "What should I focus on?"                                     │
│                                                                          │
│        I'll also proactively alert you to important issues.            │
│                                                                          │
│                         [Next →]                                        │
│                                                                          │
│                          ● ● ● ○ ○                                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Screen 5: First Mission

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                       YOUR FIRST MISSION                                │
│                                                                          │
│        Let's start by checking the health of the Core Substrate.       │
│                                                                          │
│        1. Click on "The Architecture" lens in the left nav             │
│        2. Find the "Core Substrate" tier                               │
│        3. Click to see all 10 components                               │
│                                                                          │
│        I'll be here if you need help.                                  │
│                                                                          │
│                                                                          │
│                    [Enter God Mode →]                                   │
│                                                                          │
│                          ● ● ● ● ●                                      │
│                                                                          │
│                      [Skip onboarding]                                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6. Onboarding State Management

```typescript
interface OnboardingState {
  hasCompletedOnboarding: boolean;
  currentStep: number;
  skipped: boolean;
}

// Store in localStorage
const ONBOARDING_KEY = 'armadaos_onboarding_complete';

function useOnboarding() {
  const [state, setState] = useState<OnboardingState>(() => {
    const stored = localStorage.getItem(ONBOARDING_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      hasCompletedOnboarding: false,
      currentStep: 0,
      skipped: false,
    };
  });

  const completeOnboarding = () => {
    const newState = { ...state, hasCompletedOnboarding: true };
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(newState));
    setState(newState);
  };

  const skipOnboarding = () => {
    const newState = { ...state, hasCompletedOnboarding: true, skipped: true };
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(newState));
    setState(newState);
  };

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  return {
    ...state,
    completeOnboarding,
    skipOnboarding,
    nextStep,
  };
}
```

---

## API ENDPOINTS REQUIRED

| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/nexus/query` | POST | General chat query |
| `/v1/nexus/guide?component_id={}` | GET | Component explanation |
| `/v1/nexus/interpret?event_id={}` | GET | Causal chain analysis |
| `/v1/nexus/challenge?batch_id={}` | GET | Pre-mortem analysis |
| `/v1/nexus/explain?article_id={}` | GET | Article explanation |
| `/v1/nexus/alerts` | GET | Attention queue |

**Contract Location:** `armadaos-ui/docs/ARMADAOS_API_CONTRACT_V1.yaml`

---

## KEYBOARD SHORTCUTS (CPO REQUIREMENT)

God Mode must support keyboard navigation for power users.

### Global Shortcuts

| Key | Action | Implementation |
|:----|:-------|:---------------|
| `1` | Switch to Architecture Lens | `useHotkeys('1', () => navigate('/god-mode/architecture'))` |
| `2` | Switch to Constitution Lens | `useHotkeys('2', () => navigate('/god-mode/constitution'))` |
| `3` | Switch to Battlefield Lens | `useHotkeys('3', () => navigate('/god-mode/battlefield'))` |
| `N` | Focus Nexus input | `useHotkeys('n', () => nexusInputRef.current?.focus())` |
| `Esc` | Close modals/panels | `useHotkeys('escape', () => closeActiveModal())` |
| `?` | Show keyboard shortcuts help | `useHotkeys('shift+/', () => setShowShortcutsHelp(true))` |

### Implementation

```typescript
// src/hooks/useGodModeShortcuts.ts
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';

export function useGodModeShortcuts() {
  const navigate = useNavigate();
  
  // Lens switching
  useHotkeys('1', () => navigate('/god-mode/architecture'));
  useHotkeys('2', () => navigate('/god-mode/constitution'));
  useHotkeys('3', () => navigate('/god-mode/battlefield'));
  
  // Nexus focus
  useHotkeys('n', (e) => {
    e.preventDefault();
    document.getElementById('nexus-input')?.focus();
  });
  
  // Help
  useHotkeys('shift+/', () => {
    // Show shortcuts modal
  });
}
```

### Keyboard Shortcuts Help Modal

When user presses `?`, display a modal showing all available shortcuts.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      KEYBOARD SHORTCUTS                          [X]   │
│                                                                          │
│  NAVIGATION                                                             │
│  1          Switch to Architecture Lens                                 │
│  2          Switch to Constitution Lens                                 │
│  3          Switch to Battlefield Lens                                  │
│                                                                          │
│  NEXUS                                                                  │
│  N          Focus Nexus chat input                                      │
│                                                                          │
│  GENERAL                                                                │
│  Esc        Close modal or panel                                        │
│  ?          Show this help                                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Acceptance Criteria (Added)

| ID | Criterion | Verification |
|:---|:----------|:-------------|
| AC-09 | Keyboard shortcuts 1/2/3 switch lenses | Interaction test |
| AC-10 | Keyboard shortcut N focuses Nexus input | Interaction test |
| AC-11 | Keyboard shortcut ? shows help modal | Interaction test |

---

## LOADING STATES (CPO REQUIREMENT)

All components must implement proper loading states. Reference `specs/GOD_MODE_ERROR_STATES_V1.md` for patterns.

### Required Loading States

| Component | Loading State | Pattern |
|:----------|:--------------|:--------|
| NexusChat | "Connecting to Nexus..." | Centered spinner |
| NexusMessage | Typing indicator | Animated dots |
| NexusInput | Disabled during send | Grayed out |
| Onboarding | Full-screen loader | Spinner + "Loading..." |

### Nexus Typing Indicator

```typescript
// Show when Nexus is "thinking"
{isLoading && (
  <div className="flex items-center gap-1 text-gray-400">
    <span className="animate-bounce">.</span>
    <span className="animate-bounce delay-100">.</span>
    <span className="animate-bounce delay-200">.</span>
  </div>
)}
```

---

## REFERENCE DOCUMENTS

| Document | Path | Purpose |
|:---------|:-----|:--------|
| Error States | `specs/GOD_MODE_ERROR_STATES_V1.md` | Loading/error patterns |
| Nexus Agent Spec | `agents/nexus/NEXUS_GOLD_STANDARD_BRIEF_V2.md` | Nexus capabilities |
| Nexus Prompts | `specs/NEXUS_PROMPT_ENGINEERING_V1.md` | System prompts |
| CMO Experience Spec | `comms/CMO_CPO_UXUI_SYNC_COMPLETE_EXPERIENCE_SPEC_V1.md` | Voice and tone |
| Onboarding Wireframes | `mockups/GOD_MODE_WIREFRAME_ONBOARDING_*.png` | Visual reference |

---

## VERIFICATION CHECKLIST

Before marking complete:

- [ ] Nexus Panel renders correctly
- [ ] Chat messages send and receive
- [ ] Guide capability works on component hover
- [ ] Interpret capability works on event click
- [ ] Challenge capability works on batch click
- [ ] Explain capability works on article click
- [ ] Onboarding shows on first visit
- [ ] Onboarding has 5 screens
- [ ] Onboarding can be skipped
- [ ] Onboarding state persists
- [ ] Nexus typing indicator shows during loading

---

## SHADOW L3 GATE

This is the final batch. Shadow L3 verification confirms God Mode Console is complete.

**Verification criteria:**
- All 16 DoD criteria (P13-001 to P13-016) met
- All Nexus capabilities functional
- Onboarding flow complete
- Full integration testing passed

---

*BATCH-GM-05 - Nexus Integration & Onboarding*
*Atlas 2 - Execute with 0% ambiguity*
