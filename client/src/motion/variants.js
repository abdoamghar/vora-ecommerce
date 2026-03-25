/** Shared motion presets — luxury-timed easing */
export const easeLux = [0.22, 1, 0.36, 1];

export function pageSpring(reduceMotion) {
  if (reduceMotion) {
    return { duration: 0 };
  }
  return { duration: 0.42, ease: easeLux };
}

export const staggerFast = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 }
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeLux }
  }
};

export const fadeUpReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } }
};
