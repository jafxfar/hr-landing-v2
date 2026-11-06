/** Shared ease for appear / stagger / reveal transitions */
export const motionEase = [0.16, 1, 0.3, 1] as const;

/** Default durations within the 200–600 ms project range */
export const MOTION_DURATION = {
  fast: 0.2,
  base: 0.4,
  slow: 0.5,
} as const;

export const STAGGER_STEP = 0.08;

export const REVEAL_OFFSET = 16;
