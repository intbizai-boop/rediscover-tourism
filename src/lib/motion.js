import { useReducedMotion } from 'framer-motion';

/**
 * Shared Framer Motion variants for calm, Aman-style reveals.
 * Updated to be static (no animation) per request.
 */
export const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
};

export const fadeIn = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

/** Returns variants that collapse to static display. */
export function useRevealVariants() {
  return { container: stagger, item: fadeUp };
}
