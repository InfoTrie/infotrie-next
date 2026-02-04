"use client";

import { useState } from "react";
import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site-config";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-gradient">Info</span>
            <span style={{ color: "var(--color-text)" }}>Trie</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() =>
                item.children ? setOpenDropdown(item.label) : null
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  color:
                    openDropdown === item.label
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    openDropdown === item.label
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)")
                }
              >
                {item.label}
                {item.children && (
                  <span className="ml-1 text-xs opacity-50">▾</span>
                )}
              </Link>

              {/* Dropdown */}
              {item.children && openDropdown === item.label && (
                <div
                  className="glass absolute top-full left-0 mt-1 min-w-[220px] rounded-xl p-2"
                  style={{ animation: "fadeInUp 0.2s ease-out" }}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-4 py-2.5 text-sm transition-colors"
                      style={{ color: "var(--color-text-muted)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-text)";
                        e.currentTarget.style.background =
                          "var(--color-surface-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-text-muted)";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* CTA */}
          <Link
            href="/contact"
            className="ml-4 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-text-dark)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--color-accent-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--color-accent)")
            }
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ color: "var(--color-text)" }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="glass border-t lg:hidden"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="mx-auto max-w-7xl px-6 py-4">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block py-3 text-base font-medium"
                  style={{ color: "var(--color-text)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 border-l" style={{ borderColor: "var(--color-border)" }}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 pl-4 text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-4 block rounded-lg py-3 text-center text-sm font-semibold"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-text-dark)",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
