/**
 * Responsive Breakpoints Configuration
 *
 * Defines the breakpoints for responsive design across different device sizes.
 * These breakpoints are used by Unistyles to apply conditional styling.
 */

export const breakpoints = {
  xs: 0, // Extra small devices (portrait phones)
  sm: 576, // Small devices (landscape phones)
  md: 768, // Medium devices (tablets)
  lg: 992, // Large devices (small desktops)
  xl: 1200, // Extra large devices (large desktops)
  '2xl': 1400, // Extra extra large devices (very large desktops)
} as const;

// Common device breakpoint helpers
export const deviceBreakpoints = {
  mobile: breakpoints.xs,
  mobileLandscape: breakpoints.sm,
  tablet: breakpoints.md,
  tabletLandscape: breakpoints.lg,
  desktop: breakpoints.xl,
  largeDesktop: breakpoints['2xl'],
} as const;

// Media query helpers for common use cases
export const mediaQueries = {
  mobileOnly: `max-width: ${breakpoints.sm - 1}px`,
  tabletUp: `min-width: ${breakpoints.md}px`,
  tabletOnly: `min-width: ${breakpoints.md}px and max-width: ${breakpoints.lg - 1}px`,
  desktopUp: `min-width: ${breakpoints.lg}px`,
  largeDesktopUp: `min-width: ${breakpoints.xl}px`,
} as const;
