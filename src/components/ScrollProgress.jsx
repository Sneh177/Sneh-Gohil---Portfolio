import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-500 dark:via-indigo-400 dark:to-white origin-left shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_rgba(255,255,255,0.6)]"
        style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
      />
    </div>
  );
}
