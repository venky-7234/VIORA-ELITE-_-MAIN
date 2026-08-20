/**
 * Reusable animation variants & hooks for Viora Elite.
 * Only transform & opacity are animated for 60fps GPU performance.
 */

import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Shared easing ────────────────────────────────────────────────────────────
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

// ─── Viewport trigger hook ───────────────────────────────────────────────────
/** Returns a ref + boolean for one-shot viewport animation */
export function useReveal(amount = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    amount,
  });
  return { ref, isInView };
}

// ─── Shared Variants ──────────────────────────────────────────────────────────

/** Fade up – used for headings, paragraphs, sections */
export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT, delay },
  }),
};

/** Mobile-friendly fade up (smaller distance) */
export const fadeUpMobile = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT, delay },
  }),
};

/** Scale fade – used for CTA buttons */
export const scaleFade = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: EASE_OUT, delay },
  }),
};

/** Slide from left */
export const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

/** Slide from right */
export const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

/** Stagger container */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/** Stagger child (card) */
export const staggerChild = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};
