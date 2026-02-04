"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigation, siteConfig } from "@/lib/site-config";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
      style={{
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
            <Image
              src={siteConfig.logos.main}
              alt="InfoTrie"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "var(--color-accent)" }}>Info</span>
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
                className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
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
                  <span
                    className="ml-1.5 inline-block text-[10px] transition-transform duration-200"
                    style={{
                      transform:
                        openDropdown === item.label
                          ? "rotate(180deg)"
                          : "rotate(0)",
                    }}
                  >
                    ▼
                  </span>
                )}
              </Link>

              {/* Dropdown */}
              {item.children && openDropdown === item.label && (
                <div
                  className="absolute top-full left-0 mt-2 min-w-[260px] rounded-xl p-2 shadow-2xl animate-fade-in"
                  style={{
                    background: "var(--color-surface-elevated)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-200"
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
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* CTA Button */}
          <Link
            href="/contact"
            className="ml-6 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300"
            style={{
              background: "var(--color-accent)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent-hover)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(0, 212, 170, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-accent)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            background: mobileOpen
              ? "var(--color-surface)"
              : "transparent",
            color: "var(--color-text)",
          }}
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {mobileOpen ? (
              <path d="M6 6l10 10M6 16L16 6" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="animate-fade-in border-t lg:hidden"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="mx-auto max-w-7xl px-6 py-6">
            {navigation.map((item) => (
              <div key={item.label} className="mb-2">
                <Link
                  href={item.href}
                  className="block rounded-lg py-3 px-4 text-base font-medium transition-colors"
                  style={{ color: "var(--color-text)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div
                    className="ml-4 mt-1 border-l-2 pl-4"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2.5 text-sm transition-colors"
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
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
              <Link
                href="/contact"
                className="block rounded-lg py-3.5 text-center text-sm font-semibold transition-all"
                style={{
                  background: "var(--color-accent)",
                  color: "white",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
