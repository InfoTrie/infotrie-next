// ============================================================
// Design Tokens
// Centralized theme: colors, typography, spacing.
// Tailwind classes reference these via CSS variables in globals.css.
// ============================================================

export const theme = {
  colors: {
    // Primary brand palette — deep navy + electric teal
    primary: "#0A1628",     // Deep navy (backgrounds, headers)
    secondary: "#12263A",   // Slightly lighter navy
    accent: "#00D4AA",      // Electric teal (CTAs, highlights)
    accentHover: "#00B894", // Teal hover state
    accentSoft: "#00D4AA1A", // Teal with low opacity

    // Text
    text: "#E8ECF1",        // Primary text on dark
    textMuted: "#8899AA",   // Secondary/muted text
    textDark: "#0A1628",    // Text on light backgrounds

    // Surfaces
    surface: "#0F1D32",     // Card backgrounds
    surfaceHover: "#162440", // Card hover state
    border: "#1E3350",      // Subtle borders

    // Semantic
    success: "#00D4AA",
    warning: "#FFB347",
    error: "#FF6B6B",
    info: "#4ECDC4",
  },

  fonts: {
    // Display: distinctive, modern serif for headlines
    display: "'DM Serif Display', Georgia, serif",
    // Body: clean, professional sans-serif
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    // Mono: for code, data, API references
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  // Breakpoints (matches Tailwind defaults)
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
} as const;
