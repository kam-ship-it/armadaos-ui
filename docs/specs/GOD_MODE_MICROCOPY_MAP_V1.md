# GOD MODE: MICROCOPY MAP V1

**Document ID:** SPEC-CPO-GODMODE-MICROCOPY-V1-20251228
**Author:** CPO
**Status:** ✅ **GOLD STANDARD**

**Purpose:** This document maps the specific microcopy from the `MICROCOPY_BIBLE_V1.md` to every screen, element, and state within the God Mode Console. This ensures perfect alignment between the CMO-defined voice and the CPO-defined UX.

---

## 1. GLOBAL ELEMENTS

| Element | UI Text / Copy | Source (Microcopy Bible) |
|:---|:---|:---|
| **Nexus Chat Placeholder** | `Ask Nexus anything...` | Custom (derived from principle) |
| **Nexus Attention Queue Title** | `Attention Queue` | Custom (derived from principle) |
| **Nexus Welcome (First Time)** | `Good morning, Chairman. Here's what needs your attention:` | Custom (derived from principle) |

---

## 2. ONBOARDING FLOW

| Screen | Element | UI Text / Copy | Source (Microcopy Bible) |
|:---|:---|:---|:---|
| **1. Welcome** | Headline | `Welcome to God Mode` | Custom (derived from "Clear, Not Clever") |
| | Subtitle | `Your command center for the Immutable Supercomputer` | Custom |
| | Feature 1 Title | `See Everything` | Custom |
| | Feature 1 Body | `Monitor all 42 components in real-time` | Custom |
| | Feature 2 Title | `Understand Everything` | Custom |
| | Feature 2 Body | `Nexus explains what it all means` | Custom |
| | Feature 3 Title | `Control Everything` | Custom |
| | Feature 3 Body | `Take action with confidence` | Custom |
| | Primary CTA | `Begin Tour` | Custom (derived from "Evocative, Not Dry") |
| | Secondary CTA | `Skip onboarding` | Custom |
| **2. The Pulse** | Headline | `This is The Pulse` | Custom |
| | Body | `Your at-a-glance system status. The green orb means all systems are healthy. If something needs attention, it will turn yellow or red.` | Custom |
| | Primary CTA | `Next` | Custom |
| | Secondary CTA | `Back` | Custom |
| **3. The Lenses** | Headline | `The 3 Lenses` | Custom |
| | Body | `God Mode has three views into your system: 1. Architecture... 2. Constitution... 3. Battlefield...` | Custom |
| **4. Nexus** | Headline | `Meet Nexus` | Custom |
| | Body | `I am your AI co-pilot. I will help you understand what is happening, predict problems before they occur, and guide you through any action...` | Custom (derived from "Human, Not Robotic") |
| **5. First Mission** | Headline | `You are ready.` | Custom |
| | Subtitle | `God Mode is now fully unlocked.` | Custom |
| | Mission Title | `Your First Mission` | Custom |
| | Mission Body | `Review the current system health. Click on The Architecture lens to see all 42 components.` | Custom |
| | Primary CTA | `Enter God Mode` | Custom |

---

## 3. LENS 1: THE ARCHITECTURE

| Element | UI Text / Copy | Source (Microcopy Bible) |
|:---|:---|:---|
| **Lens Title** | `THE ARCHITECTURE` | Custom |
| **Tier Card Title** | `CORE SUBSTRATE ({x}/{y} Healthy)` | Custom |
| **Component Card Title** | `Component: {component_name}` | Custom |
| **Action Button: Restart** | `Restart Service` | Custom |
| **Action Button: View Logs** | `View Full Logs` | Custom |
| **Nexus Explanation Title** | `OVERVIEW: {component_name}` | Custom |

---

## 4. LENS 2: THE CONSTITUTION

| Element | UI Text / Copy | Source (Microcopy Bible) |
|:---|:---|:---|
| **Lens Title** | `THE CONSTITUTION` | Custom |
| **Subtitle** | `Chronicle of Governance & System Events` | Custom |
| **Search Placeholder** | `Search events...` | Custom |
| **Event Type: FAILURE** | `[FAILURE]` | Custom |
| **Event Type: SUCCESS** | `[SUCCESS]` | Custom |
| **Event Type: INFO** | `[INFO]` | Custom |
| **Event Type: APPROVAL** | `[APPROVAL]` | Custom |
| **Event Type: VIOLATION** | `[VIOLATION]` | Custom |
| **Nexus Explanation Title** | `CAUSAL CHAIN ANALYSIS` | Custom |

---

## 5. LENS 3: THE BATTLEFIELD

| Element | UI Text / Copy | Source (Microcopy Bible) |
|:---|:---|:---|
| **Lens Title** | `THE BATTLEFIELD` | Custom |
| **Section Title: Batch Tracker** | `BATCH TRACKER` | Custom |
| **Section Title: Agent Army** | `AGENT ARMY` | Custom |
| **Section Title: Threat Feed** | `THREAT FEED` | Custom |
| **Agent Status: Active** | `Active` | Custom (derived from Agent Status) |
| **Agent Status: Idle** | `Idle` | Custom (derived from Agent Status) |
| **Agent Status: Monitoring** | `Monitoring` | Custom |
| **Nexus CTA: Pre-Mortem** | `Run Pre-Mortem` | Custom |

---

## 6. ERROR & EMPTY STATES

| Context | Headline | Body Text | Source (Microcopy Bible) |
|:---|:---|:---|:---|
| **Timeline: No Events Found** | `Nothing Found.` | The system couldn't find any events for your query. Try rephrasing or broadening your search. | Empty States: Search Not Found |
| **Architecture: Component Unreachable** | `Component Unreachable` | God Mode cannot connect to this component. It may be offline or experiencing network issues. | Custom (derived from Error Messages) |
| **Nexus: Cannot Answer** | `I cannot answer that.` | I do not have enough information to provide a confident answer to your question. | Custom |
| **Threat Feed: Empty** | `All Quiet.` | The Threat Feed is clear. No active threats have been detected. | Custom (derived from Empty States) |
