/**
 * Silky smooth animated scroll to top using requestAnimationFrame with cubic ease-in-out curve.
 * Overcomes native browser scroll snapping and provides cinematic gliding motion.
 */
export const smoothScrollToTop = (duration = 400) => {
  if (typeof window === 'undefined') return;

  // Immediate jump if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, 0);
    return;
  }

  const start = window.pageYOffset || document.documentElement.scrollTop;
  if (start <= 0) return;

  const startTime = 'now' in window.performance ? performance.now() : Date.now();

  // Cubic Ease-in-Out curve for smooth gliding
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const step = () => {
    const now = 'now' in window.performance ? performance.now() : Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, Math.round(start * (1 - ease)));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};
