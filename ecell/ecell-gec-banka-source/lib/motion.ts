"use client";

import { Variants, Transition } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.5;

export const transition: Transition = {
  duration: DURATION,
  ease: EASE,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition,
  },
};

/** Hook that returns reduced-motion-aware variants */
export function useMotionVariants() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return {
      fadeUp: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      } as Variants,
      stagger: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      } as Variants,
      scaleIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      } as Variants,
      transition: { duration: 0.01 } as Transition,
    };
  }

  return { fadeUp, stagger, scaleIn, transition };
}
