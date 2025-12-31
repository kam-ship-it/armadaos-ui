# BATCH-DESKTOP-01 MOCKUP ANALYSIS

**Source:** `/home/ubuntu/ArmadaOS/design/MOCKUP_DESKTOP_SHELL_OVERVIEW_V1.png`

---

## VISUAL ELEMENTS IDENTIFIED

### 1. SHELL (Background)

**Background Color:** Deep dark blue/navy (#0A0A0B with blue tint)
- Base: ArmadaOS onyx `#0A0A0B`
- Overlay: Subtle blue gradient

**Wallpaper Pattern:**
- Geometric line pattern (circuit board style)
- Diagonal lines forming abstract tech pattern
- Very subtle, low opacity (~5-10%)
- Color: Lighter blue/cyan on dark background
- Style: Futuristic, technical, clean

**Key Characteristics:**
- Full-screen coverage
- Dark theme (professional, premium feel)
- Subtle geometric overlay (not distracting)
- Tech-inspired aesthetic

---

### 2. TOP BAR (Right Side)

**Elements Visible:**
- System status: "SYSTEM OPTIMAL" (green text)
- CPU usage: "CPU 8%"
- Network latency: "NET 32ms"
- Time: "10:09 PM"
- Date indicator (small)

**Styling:**
- Fixed at top-right
- Semi-transparent background
- Green accent for "OPTIMAL" status
- White text for metrics
- Clean, minimal design

---

### 3. DOCK (Bottom Center)

**Visual Design:**
- Floating pill-shaped container
- Bottom-center alignment
- Frosted glass effect (backdrop-blur)
- Dark background with transparency
- Rounded corners (pill shape)
- Elevated appearance (shadow/glow)

**App Icons (5 visible):**
1. **God Mode** - Shield icon (purple/violet glow)
2. **The Store** - Shopping cart icon (blue/cyan)
3. **Boardroom** - People/team icon (multi-color)
4. **Settings** - Gear icon (gray/silver)
5. **Add** - Plus icon (gray, lighter background)

**Icon Styling:**
- Rounded square icons
- Consistent size (~48-56px)
- Icon + label below
- Spacing between icons (~16-24px)
- Labels in white text (small, clean font)

**Running Indicator:**
- Small dot under "God Mode" icon
- Violet/purple color (matches app theme)
- Glowing effect
- Positioned directly below icon, above label

**Hover State (Expected):**
- Scale up to 1.2x
- Spring animation (framer-motion)
- Smooth transition

---

### 4. WINDOWS (Overlays)

**Two windows visible:**
1. **The Store** (left) - App store interface
2. **God Mode** (right) - System dashboard

**Window Styling:**
- Dark background (slightly lighter than shell)
- Rounded corners
- Title bar with window controls (minimize, maximize, close)
- Frosted glass effect on title bar
- Drop shadow for depth
- Violet accent border on focused window (God Mode)

---

## COLOR PALETTE (From Mockup)

**Primary Colors:**
- Background: `#0A0A0B` (onyx)
- Wallpaper lines: `#1E2A3A` (subtle blue-gray)
- Dock background: `rgba(20, 25, 35, 0.8)` (dark with transparency)
- Text (primary): `#FFFFFF` (white)
- Text (secondary): `#A0A0A0` (gray)

**Accent Colors:**
- Violet/Purple: `#8B5CF6` (running indicator, borders)
- Cyan/Blue: `#06B6D4` (accents, icons)
- Green: `#10B981` (status indicators)

**Effects:**
- Backdrop blur: `blur(12px)` on Dock
- Drop shadow: `0 8px 32px rgba(0, 0, 0, 0.4)`
- Glow: `0 0 20px rgba(139, 92, 246, 0.5)` on running indicator

---

## IMPLEMENTATION PRIORITIES

### Phase 2: Shell Component
1. Full-screen container
2. Background color `#0A0A0B`
3. Basic structure

### Phase 3: Wallpaper
1. SVG geometric pattern (circuit board style)
2. Diagonal lines, abstract tech aesthetic
3. Low opacity overlay (~5-10%)
4. Subtle animation (optional, if time permits)

### Phase 4: Dock Component
1. Pill-shaped container at bottom-center
2. Frosted glass effect (`backdrop-blur`)
3. App icons from registry
4. Icon + label layout
5. Consistent spacing

### Phase 5: Running Indicators & Animations
1. Violet dot under running apps
2. Hover animation (1.2x scale, spring)
3. Smooth transitions

---

## ACCEPTANCE CRITERIA MAPPING

- [x] **Shell renders full-screen** → Phase 2
- [x] **Correct background color** → Phase 2
- [x] **Wallpaper displays** → Phase 3
- [x] **Dock at bottom-center** → Phase 4
- [x] **All apps from registry** → Phase 4
- [x] **Hover animation (1.2x, spring)** → Phase 5
- [x] **Running indicators (violet dot)** → Phase 5

---

## TECHNICAL NOTES

**Dependencies:**
- `framer-motion` for animations
- `backdrop-filter` CSS for frosted glass
- SVG for wallpaper pattern
- Zustand store for window state (running apps)

**App Registry:**
- File: `src/core/app-registry.json`
- Must dynamically load icons from registry
- Check `windowStore.windows` for running apps

**Responsive Considerations:**
- Dock should scale on smaller screens
- Icons should maintain aspect ratio
- Wallpaper should cover all screen sizes

---

**Analysis Complete. Ready for implementation.**
