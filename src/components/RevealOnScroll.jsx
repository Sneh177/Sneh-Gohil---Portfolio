import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  duration = 0.35,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = 20,
}) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion) return { opacity: 0 };
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  const getTargetPosition = () => {
    if (shouldReduceMotion) return { opacity: 1 };
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getTargetPosition()}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : Math.min(Math.max(duration, 0.15), 0.5),
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
