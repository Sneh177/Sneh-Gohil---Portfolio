---
name: animation-on-scroll
description: Advanced scroll-driven animation system using Framer Motion spring physics, interactive cursor spotlights, scroll progress tracking, and cubic-bezier viewport reveals.
---

# Advanced Animation On Scroll & Viewport Reveal System

This skill outlines how modern, fluid, production-grade animations are constructed in React with Tailwind CSS and Framer Motion.

---

## 1. Core Architecture

### A. Scroll Progress Bar (`ScrollProgress.jsx`)
- Uses `useScroll` and `useSpring` with spring physics (`stiffness: 180`, `damping: 28`).
- Renders a top indicator line with gradient illumination.

```jsx
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none">
      <motion.div className="h-full bg-gradient-to-r from-neutral-500 via-white to-white origin-left" style={{ scaleX }} />
    </div>
  );
}
```

---

### B. Interactive Spotlight Card (`SpotlightCard.jsx`)
- Computes relative mouse coordinates `(clientX - left, clientY - top)`.
- Renders dynamic radial gradient overlay on dark cards (`radial-gradient(350px circle at Xpx Ypx, rgba(255,255,255,0.08), transparent 80%)`).
- Viewport entrance: `initial={{ opacity: 0, y: 30 }}`, `whileInView={{ opacity: 1, y: 0 }}` with easing `[0.16, 1, 0.3, 1]`.

---

### C. Smooth Viewport Reveal Wrapper (`RevealOnScroll.jsx`)
- Configurable directions: `'up'`, `'down'`, `'left'`, `'right'`, `'none'`.
- Cubic-bezier curves: `ease: [0.16, 1, 0.3, 1]`.
- Trigger margin: `viewport={{ once: true, margin: '-60px' }}`.

---

### D. Animated Career Timeline (`Experience.jsx`)
- Vertical timeline guide line with `scaleY: [0 -> 1]` and `origin-top`.
- Staggered timeline node dots with spring pop-in (`type: 'spring', stiffness: 300, damping: 20`).
- Text content sliding into place with custom stagger delays.

---

### E. Smooth Layout Tabs (`Skills.jsx`)
- Animated pill background using Framer Motion `layoutId="activeFilterPill"` with spring transitions.
- Interactive filtering with `AnimatePresence`.
