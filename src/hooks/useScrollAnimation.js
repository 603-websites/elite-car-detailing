import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px', ...options });

  return { ref, isInView };
}

// Reusable animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};
