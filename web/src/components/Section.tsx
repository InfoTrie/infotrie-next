import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Use "default" for primary background, "alt" for secondary surface */
  variant?: "default" | "alt";
}

/**
 * Section — reusable page section wrapper with consistent spacing.
 * Provides max-width container, padding, and optional alternate background.
 */
export function Section({
  children,
  className = "",
  id,
  variant = "default",
}: SectionProps) {
  const bg =
    variant === "alt"
      ? "var(--color-secondary)"
      : "var(--color-primary)";

  return (
    <section
      id={id}
      className={`py-20 md:py-32 ${className}`}
      style={{ background: bg }}
    >
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

/**
 * SectionHeader — consistent heading style for sections
 */
export function SectionHeader({
  title,
  subtitle,
  centered = true,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mx-auto mt-4 max-w-2xl text-lg"
          style={{ color: "var(--color-text-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
