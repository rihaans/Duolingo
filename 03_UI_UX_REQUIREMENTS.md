# UI/UX Requirements - Duolingo Design System

## DESIGN PHILOSOPHY

Duolingo's design is characterized by:
- **Playful & Friendly**: Rounded corners, bright colors, cheerful illustrations
- **Clear & Simple**: Clean layouts, minimal clutter, obvious actions
- **Encouraging**: Positive reinforcement, celebrations, gentle corrections
- **Gamified**: Progress indicators, rewards, achievements everywhere
- **Accessible**: Large touch targets, high contrast, clear typography
- **Delightful**: Smooth animations, sound effects, micro-interactions

---

## COLOR SYSTEM (EXACT DUOLINGO COLORS)

### Primary Brand Colors (USE THESE EXACT HEX VALUES)

```css
:root {
  /* Primary Green (Duolingo's signature color) */
  --duo-green: #58CC02;
  --duo-green-hover: #58A700;
  --duo-green-dark: #478600;
  --duo-green-light: #89E219;
  
  /* Secondary Blue */
  --duo-blue: #1CB0F6;
  --duo-blue-hover: #14A0E0;
  --duo-blue-dark: #0E8EC4;
  --duo-blue-light: #4EC3FF;
  
  /* Error/Danger Red */
  --duo-red: #FF4B4B;
  --duo-red-hover: #EA2B2B;
  --duo-red-dark: #D41F1F;
  --duo-red-light: #FF6B6B;
  
  /* Warning/Streak Yellow */
  --duo-yellow: #FFC800;
  --duo-yellow-hover: #FFB800;
  --duo-yellow-dark: #FFA700;
  --duo-yellow-light: #FFD43B;
  
  /* Premium Purple */
  --duo-purple: #CE82FF;
  --duo-purple-hover: #B669E8;
  --duo-purple-dark: #9F4FD6;
  
  /* Neutral Grays */
  --duo-gray-50: #F7F7F7;
  --duo-gray-100: #E5E5E5;
  --duo-gray-200: #CECECE;
  --duo-gray-300: #AFAFAF;
  --duo-gray-400: #8C8C8C;
  --duo-gray-500: #6E6E6E;
  --duo-gray-600: #525252;
  --duo-gray-700: #4B4B4B;
  --duo-gray-800: #3C3C3C;
  --duo-gray-900: #2B2B2B;
  
  /* Semantic Colors */
  --duo-correct: #58CC02;
  --duo-incorrect: #FF4B4B;
  --duo-bg-correct: #D7FFB8;
  --duo-bg-incorrect: #FFD7D7;
  --duo-bg-warning: #FFF4CC;
  
  /* Background Colors */
  --duo-bg-primary: #FFFFFF;
  --duo-bg-secondary: #F7F7F7;
  --duo-bg-tertiary: #E5E5E5;
  
  /* Text Colors */
  --duo-text-primary: #3C3C3C;
  --duo-text-secondary: #777777;
  --duo-text-tertiary: #AFAFAF;
  --duo-text-white: #FFFFFF;
  
  /* Border Colors */
  --duo-border-light: #E5E5E5;
  --duo-border-medium: #CECECE;
  --duo-border-dark: #AFAFAF;
}
```

### Color Usage Guidelines

**Primary Actions (Buttons, CTAs):**
- Use `--duo-green` for primary buttons
- Use `--duo-green-hover` on hover
- Use `--duo-green-dark` for bottom shadow/border

**Secondary Actions:**
- Use white background with gray border
- Use `--duo-blue` for informational buttons

**Danger/Error:**
- Use `--duo-red` for errors, incorrect answers
- Use `--duo-bg-incorrect` for error backgrounds

**Success/Correct:**
- Use `--duo-green` for correct answers
- Use `--duo-bg-correct` for success backgrounds

**Warnings:**
- Use `--duo-yellow` for warnings, streaks
- Use `--duo-bg-warning` for warning backgrounds

**Disabled States:**
- Use `--duo-gray-200` for background
- Use `--duo-gray-400` for text

---

## TYPOGRAPHY SYSTEM

### Font Family

```css
/* Import Nunito from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

:root {
  --font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

body {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Font Sizes & Weights

```css
/* Headings */
.heading-1 {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.2;
  color: var(--duo-text-primary);
}

.heading-2 {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--duo-text-primary);
}

.heading-3 {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--duo-text-primary);
}

/* Body Text */
.body-large {
  font-size: 19px;
  font-weight: 400;
  line-height: 1.5;
}

.body-regular {
  font-size: 17px;
  font-weight: 400;
  line-height: 1.5;
}

.body-small {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
}

/* UI Text */
.text-bold {
  font-weight: 700;
}

.text-semibold {
  font-weight: 600;
}

.text-extrabold {
  font-weight: 800;
}

/* Button Text */
.button-text {
  font-size: 17px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### Typography Guidelines
- Use **bold weights** (700-800) for important UI elements
- Use **regular weight** (400) for body text
- **Uppercase** for buttons only
- Large, friendly, readable sizes
- Generous line-height for readability

---

## BUTTON STYLES (EXACT DUOLINGO DESIGN)

### Primary Button (Green)

```css
.btn-primary {
  /* Background */
  background: linear-gradient(180deg, #58CC02 0%, #58A700 100%);
  
  /* Border */
  border: none;
  border-bottom: 4px solid #478600;
  border-radius: 16px;
  
  /* Text */
  color: #FFFFFF;
  font-size: 17px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  /* Spacing */
  padding: 16px 32px;
  
  /* Effects */
  cursor: pointer;
  transition: all 0.1s ease;
  box-shadow: none;
}

.btn-primary:hover {
  background: linear-gradient(180deg, #58A700 0%, #478600 100%);
  border-bottom-width: 2px;
  transform: translateY(2px);
}

.btn-primary:active {
  border-bottom-width: 0;
  transform: translateY(4px);
}

.btn-primary:disabled {
  background: linear-gradient(180deg, #E5E5E5 0%, #CECECE 100%);
  border-bottom-color: #AFAFAF;
  color: #AFAFAF;
  cursor: not-allowed;
  transform: none;
}
```

### Secondary Button (White/Gray)

```css
.btn-secondary {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-bottom: 4px solid #CECECE;
  border-radius: 16px;
  
  color: #4B4B4B;
  font-size: 17px;
  font-weight: 700;
  text-transform: uppercase;
  
  padding: 16px 32px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.btn-secondary:hover {
  background: #F7F7F7;
  border-bottom-width: 2px;
  transform: translateY(2px);
}

.btn-secondary:active {
  border-bottom-width: 0;
  transform: translateY(4px);
}
```

### Danger Button (Red)

```css
.btn-danger {
  background: linear-gradient(180deg, #FF4B4B 0%, #EA2B2B 100%);
  border: none;
  border-bottom: 4px solid #D41F1F;
  border-radius: 16px;
  
  color: #FFFFFF;
  font-size: 17px;
  font-weight: 700;
  text-transform: uppercase;
  
  padding: 16px 32px;
  cursor: pointer;
  transition: all 0.1s ease;
}
```

### Button Sizes

```css
/* Large Button */
.btn-large {
  padding: 18px 48px;
  font-size: 19px;
  border-radius: 18px;
}

/* Small Button */
.btn-small {
  padding: 12px 24px;
  font-size: 15px;
  border-radius: 12px;
  border-bottom-width: 3px;
}

/* Full Width */
.btn-full {
  width: 100%;
}
```

### Button Guidelines
- Always use 3D effect (bottom border shadow)
- Gradient backgrounds for colored buttons
- Rounded corners (16px standard)
- Press animation (translateY)
- Bold, uppercase text
- Generous padding

---

## CARD STYLES

### Standard Card

```css
.duo-card {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.duo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.duo-card-clickable {
  cursor: pointer;
}

.duo-card-clickable:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
```

### Skill Card (Learning Path Node)

```css
.skill-node {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid transparent;
  background: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

/* States */
.skill-node.locked {
  background: #E5E5E5;
  border-color: #CECECE;
}

.skill-node.available {
  background: linear-gradient(135deg, #FFD43B 0%, #FFC800 100%);
  border-color: #FFB800;
}

.skill-node.in-progress {
  background: linear-gradient(135deg, #4EC3FF 0%, #1CB0F6 100%);
  border-color: #14A0E0;
}

.skill-node.completed {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-color: #FF8C00;
}

.skill-node:hover:not(.locked) {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.16);
}
```

---

## LAYOUT COMPONENTS

### Dashboard Layout

```
┌─────────────────────────────────────────────┐
│  [Avatar] [Username]    [🔥 15] [❤️ 5] [🔔] │  Top Bar (60px)
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────┐                       │
│  │  Daily Goal      │                       │
│  │  Circular Widget │                       │
│  └──────────────────┘                       │
│                                             │
│           Learning Path                     │  Main Content
│         (Skill Tree Vertical)               │
│                                             │
│              Unit 1                         │
│            ┌────────┐                       │
│            │  👋    │ Basics 1              │
│            └────────┘                       │
│                |                            │
│            ┌────────┐                       │
│            │  📚    │ Basics 2              │
│            └────────┘                       │
│                                             │
├─────────────────────────────────────────────┤
│ [🏠 Home] [💪 Practice] [🏆] [👤 Profile]   │  Bottom Nav (Mobile)
└─────────────────────────────────────────────┘
```

### Lesson Layout

```
┌─────────────────────────────────────────────┐
│  [X]  ━━━━━━●━━━━━━━━━━━  ❤️❤️❤️❤️❤️         │  Header (80px)
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│           Question Content                  │
│         (Varies by question type)           │
│                                             │  Main Area
│                                             │
│         [Answer Input/Options]              │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│  [Skip]                         [Check]     │  Footer (80px)
└─────────────────────────────────────────────┘
```

### Profile Layout

```
┌─────────────────────────────────────────────┐
│            [Profile Header]                 │
│        [Avatar] [Username]                  │
│         Learning Spanish                    │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  2,450   │ │  Level   │ │   🔥     │    │
│  │    XP    │ │    8     │ │   15     │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│                                             │
│  Statistics                                 │
│  • Lessons completed: 45                    │
│  • Time practiced: 8 hours                  │
│  • Accuracy: 87%                            │
│                                             │
│  Achievements (12/25)                       │
│  🎓 🔥 🌟 🦉 ⏰ 🏆                          │
│                                             │
└─────────────────────────────────────────────┘
```

---

## SPECIFIC UI COMPONENTS

### 1. Daily Goal Widget (Circular Progress)

**Design:**
```css
.daily-goal-widget {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 20px auto;
}

.circular-progress {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    #58CC02 0deg,
    #58CC02 var(--progress-degrees),
    #E5E5E5 var(--progress-degrees),
    #E5E5E5 360deg
  );
  position: relative;
}

.circular-progress::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: white;
  border-radius: 50%;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #3C3C3C;
}
```

**States:**
- Incomplete: Gray circle with partial green fill
- Complete: Full green circle with checkmark

### 2. Hearts Display

**Design:**
```css
.hearts-container {
  display: flex;
  gap: 4px;
  align-items: center;
}

.heart {
  font-size: 24px;
}

.heart.full {
  color: #FF4B4B;
}

.heart.empty {
  color: #E5E5E5;
}

/* Animation when heart lost */
@keyframes heartBreak {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(0) rotate(45deg); opacity: 0; }
}

.heart.breaking {
  animation: heartBreak 0.5s ease forwards;
}
```

**Display:**
- Full hearts: ❤️ (red, solid)
- Empty hearts: 🤍 (gray outline)
- Show 5 hearts total
- Hearts remain visible when empty

### 3. Streak Flame Icon

**Design:**
```css
.streak-flame {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #FFF4CC;
  border-radius: 12px;
  border: 2px solid #FFC800;
}

.flame-icon {
  font-size: 20px;
}

.streak-count {
  font-size: 17px;
  font-weight: 700;
  color: #3C3C3C;
}

/* Flame colors based on streak length */
.flame-icon.short {
  color: #FF8C00; /* 0-6 days: Orange */
}

.flame-icon.medium {
  color: #FF4500; /* 7-29 days: Red-Orange */
}

.flame-icon.long {
  color: #1E90FF; /* 30+ days: Blue */
}
```

### 4. XP Badge Animation

**Design:**
```css
.xp-badge {
  display: inline-block;
  padding: 8px 16px;
  background: #FFD43B;
  border: 2px solid #FFC800;
  border-radius: 20px;
  font-size: 17px;
  font-weight: 700;
  color: #3C3C3C;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Appear animation */
@keyframes xpAppear {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.xp-badge.appearing {
  animation: xpAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 5. Progress Bar (Lesson Header)

**Design:**
```css
.lesson-progress-bar {
  width: 100%;
  height: 16px;
  background: #E5E5E5;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #58CC02 0%, #89E219 100%);
  transition: width 0.3s ease;
  border-radius: 8px;
}

.progress-indicator {
  position: absolute;
  top: 50%;
  left: var(--progress-position);
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  border: 3px solid #58CC02;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

### 6. Skill Connection Lines

**Design:**
```css
.skill-connection {
  width: 4px;
  height: 60px;
  margin: 0 auto;
  position: relative;
}

.skill-connection.locked {
  background: repeating-linear-gradient(
    0deg,
    #E5E5E5,
    #E5E5E5 8px,
    transparent 8px,
    transparent 16px
  );
}

.skill-connection.unlocked {
  background: linear-gradient(180deg, #58CC02 0%, #478600 100%);
}
```

### 7. Answer Option Button

**Design:**
```css
.answer-option {
  width: 100%;
  padding: 20px;
  background: #FFFFFF;
  border: 3px solid #E5E5E5;
  border-radius: 16px;
  font-size: 19px;
  font-weight: 600;
  color: #3C3C3C;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.answer-option:hover {
  background: #F7F7F7;
  border-color: #CECECE;
  transform: scale(1.02);
}

.answer-option.selected {
  background: #D7FFB8;
  border-color: #58CC02;
  border-width: 4px;
}

.answer-option.correct {
  background: #D7FFB8;
  border-color: #58CC02;
}

.answer-option.incorrect {
  background: #FFD7D7;
  border-color: #FF4B4B;
}
```

### 8. Feedback Overlay (Correct Answer)

**Design:**
```css
.feedback-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: slideUp 0.3s ease;
}

.feedback-overlay.correct {
  background: rgba(87, 204, 2, 0.95);
}

.feedback-overlay.incorrect {
  background: rgba(255, 75, 75, 0.95);
}

.feedback-icon {
  font-size: 80px;
  margin-bottom: 20px;
  animation: iconBounce 0.5s ease;
}

.feedback-text {
  font-size: 32px;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 20px;
}

.feedback-xp {
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes iconBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
```

---

## ANIMATION SPECIFICATIONS

### 1. Page Transitions

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.page-enter {
  animation: fadeIn 0.3s ease;
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.component-enter {
  animation: slideUp 0.4s ease;
}
```

### 2. Button Press Animation

```jsx
// Using Framer Motion
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
>
  Check
</motion.button>
```

### 3. Modal Slide Up

```jsx
// Using Framer Motion
<motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%" }}
  transition={{ type: "spring", damping: 25, stiffness: 200 }}
>
  {/* Modal content */}
</motion.div>
```

### 4. Confetti (Lesson Complete)

```jsx
import Confetti from 'react-confetti';

<Confetti
  width={window.innerWidth}
  height={window.innerHeight}
  numberOfPieces={200}
  recycle={false}
  colors={['#58CC02', '#1CB0F6', '#FFC800', '#FF4B4B', '#CE82FF']}
/>
```

### 5. XP Counter Animation

```jsx
// Count up animation
const [displayXP, setDisplayXP] = useState(0);

useEffect(() => {
  let start = 0;
  const end = earnedXP;
  const duration = 1000; // 1 second
  const increment = end / (duration / 16); // 60fps
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= end) {
      setDisplayXP(end);
      clearInterval(timer);
    } else {
      setDisplayXP(Math.floor(start));
    }
  }, 16);
  
  return () => clearInterval(timer);
}, [earnedXP]);
```

### 6. Heart Loss Animation

```css
@keyframes heartBreak {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: scale(1.2) rotate(-10deg);
  }
  50% {
    transform: scale(1.1) rotate(10deg);
  }
  75% {
    transform: scale(0.8) rotate(-5deg);
    opacity: 0.5;
  }
  100% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
}

.heart.losing {
  animation: heartBreak 0.6s ease forwards;
}
```

### 7. Skill Unlock Animation

```css
@keyframes skillUnlock {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.skill-node.unlocking {
  animation: skillUnlock 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 8. Level Up Celebration

```jsx
// Using Framer Motion
<motion.div
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
>
  <div className="level-badge">
    <div className="level-number">{newLevel}</div>
  </div>
</motion.div>
```

---

## RESPONSIVE DESIGN

### Breakpoints

```css
/* Mobile First Approach */

/* Small Mobile */
@media (max-width: 375px) {
  .skill-node { width: 60px; height: 60px; }
  .btn-primary { padding: 14px 24px; font-size: 15px; }
}

/* Mobile */
@media (max-width: 640px) {
  /* Bottom navigation visible */
  .bottom-nav { display: flex; }
  .sidebar { display: none; }
  
  /* Stacked layouts */
  .lesson-container { flex-direction: column; }
  
  /* Smaller elements */
  .skill-node { width: 70px; height: 70px; }
  .heading-1 { font-size: 24px; }
  .heading-2 { font-size: 20px; }
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  .skill-node { width: 80px; height: 80px; }
  .container { max-width: 768px; }
}

/* Desktop */
@media (min-width: 1025px) {
  /* Sidebar navigation visible */
  .sidebar { display: flex; }
  .bottom-nav { display: none; }
  
  /* Larger elements */
  .skill-node { width: 90px; height: 90px; }
  .container { max-width: 1200px; }
  
  /* Multi-column layouts */
  .stats-grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Mobile-Specific Patterns

**Bottom Navigation:**
```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: #FFFFFF;
  border-top: 2px solid #E5E5E5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  color: #777777;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
}

.nav-item.active {
  color: #58CC02;
}

.nav-icon {
  font-size: 24px;
}
```

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Generous padding around buttons
- Larger tap areas for mobile

---

## ACCESSIBILITY

### Keyboard Navigation
```css
/* Focus States */
*:focus {
  outline: 3px solid #1CB0F6;
  outline-offset: 2px;
}

button:focus,
a:focus {
  outline: 3px solid #1CB0F6;
  outline-offset: 3px;
}

.answer-option:focus {
  border-color: #1CB0F6;
  border-width: 4px;
}
```

### Screen Readers
```jsx
// ARIA labels
<button aria-label="Close lesson">
  <X size={24} />
</button>

<div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
  Progress: {progress}%
</div>

// Skip to main content
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Color Contrast
- All text meets WCAG AA standards (4.5:1 for normal text)
- Important UI elements have 3:1 contrast
- Don't rely on color alone for information

---

## ICONOGRAPHY

### Icon Usage Guidelines

**Icon Sources:**
- Lucide React (recommended)
- Heroicons
- Emoji for mascot and celebrations

**Icon Sizes:**
```css
.icon-small { width: 16px; height: 16px; }
.icon-medium { width: 24px; height: 24px; }
.icon-large { width: 32px; height: 32px; }
.icon-xlarge { width: 48px; height: 48px; }
```

**Common Icons:**
- Home: 🏠 or House icon
- Practice: 💪 or Dumbbell icon
- Leaderboard: 🏆 or Trophy icon
- Profile: 👤 or User icon
- Close: X icon
- Check: ✓ icon
- Lock: 🔒 or Lock icon
- Flame: 🔥
- Heart: ❤️
- Star: ⭐

---

## MASCOT CHARACTER (DUO OWL)

### Character Guidelines

**Visual Style:**
- Friendly, round owl character
- Large eyes
- Simple, clean design
- Bright green color (#58CC02)

**Expressions/Poses:**
- **Happy/Default**: Smiling, wings down
- **Celebrating**: Arms up, confetti around
- **Sad/Concerned**: Frowning, wings down
- **Excited**: Jumping, sparkles around
- **Encouraging**: Thumbs up
- **Thinking**: Hand on chin

**Where to Use:**
- Welcome screen
- Lesson complete celebration
- Streak reminder
- Empty states
- Error messages
- Tutorial tooltips

**Implementation:**
- SVG illustrations
- Lottie animations (optional)
- Static images for simple poses
- Animated GIFs for celebrations

---

## LOADING STATES

### Spinner

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E5E5E5;
  border-top: 4px solid #58CC02;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Skeleton Loaders

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #E5E5E5 0%,
    #F7F7F7 50%,
    #E5E5E5 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 20px;
  margin-bottom: 8px;
}

.skeleton-heading {
  height: 32px;
  width: 60%;
  margin-bottom: 16px;
}

.skeleton-button {
  height: 48px;
  width: 120px;
}
```

---

## EMPTY STATES

### Design Guidelines

**Structure:**
- Illustration or icon (large, centered)
- Heading (explaining state)
- Description text (helpful, encouraging)
- CTA button (action to take)

**Example:**
```jsx
<div className="empty-state">
  <img src="/duo-empty.svg" alt="" className="empty-illustration" />
  <h2>No lessons completed yet</h2>
  <p>Start your first lesson to begin your learning journey!</p>
  <button className="btn-primary">Start Learning</button>
</div>
```

---

## ERROR STATES

### Error Messages

```css
.error-message {
  padding: 16px;
  background: #FFD7D7;
  border: 2px solid #FF4B4B;
  border-radius: 12px;
  color: #D41F1F;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
}

.error-icon {
  color: #FF4B4B;
  font-size: 24px;
}
```

### Toast Notifications

```jsx
// Using react-hot-toast
toast.success('Lesson complete!', {
  icon: '🎉',
  style: {
    background: '#58CC02',
    color: '#FFFFFF',
    fontWeight: 600,
    borderRadius: '16px',
    padding: '16px',
  },
});

toast.error('Oops! Something went wrong', {
  icon: '❌',
  style: {
    background: '#FF4B4B',
    color: '#FFFFFF',
    fontWeight: 600,
    borderRadius: '16px',
    padding: '16px',
  },
});
```

---

## FINAL UI CHECKLIST

Before considering UI complete, verify:
- [ ] All colors match Duolingo palette exactly
- [ ] Nunito font loaded and applied
- [ ] Buttons have 3D effect (bottom shadow)
- [ ] All buttons have press animation
- [ ] Cards have proper rounded corners (16px)
- [ ] Skill nodes are circular with proper states
- [ ] Progress bars are green with smooth transitions
- [ ] Hearts display correctly (5 hearts, red when full)
- [ ] Streak flame changes color based on length
- [ ] XP badges have appear animation
- [ ] Feedback overlays are full-screen with proper colors
- [ ] Confetti appears on lesson complete
- [ ] All icons are consistent in size and style
- [ ] Responsive on mobile (320px+), tablet, desktop
- [ ] Touch targets are 44x44px minimum on mobile
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus states are visible
- [ ] Loading states implemented
- [ ] Empty states have helpful messages
- [ ] Error messages are clear and friendly

---

**This UI specification is comprehensive and production-ready. Follow it precisely to create a pixel-perfect Duolingo clone! 🎨**
