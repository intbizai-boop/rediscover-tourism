import { useReducedMotion } from 'framer-motion';

/**
 * Shared Framer Motion variants for calm, Aman-style reveals.
 * Animates transform + opacity only (compositor-friendly).
 * Honors prefers-reduced-motion via the hook below.
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: 'easeOut' } },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/** Returns variants that collapse to a simple fade when reduced motion is preferred. */
export function useRevealVariants() {
  const reduce = useReducedMotion();
  if (reduce) {
    return { container: fadeIn, item: fadeIn };
  }
  return { container: stagger, item: fadeUp };
}
