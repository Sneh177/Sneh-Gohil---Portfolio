import { useEffect } from 'react';

/**
 * Custom React hook based on the MengTo/Skills `animation-on-scroll` pattern.
 * Observes all elements matching selector (default: '.animate-on-scroll')
 * and adds the '.animate' class once they enter the viewport.
 */
export function useAnimateOnScroll({
  selector = '.animate-on-scroll',
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
} = {}) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold, rootMargin, once]);
}
