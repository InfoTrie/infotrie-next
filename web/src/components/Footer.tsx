import Link from "next/link";
import { siteConfig, navigation } from "@/lib/site-config";

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: "var(--color-secondary)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient">Info</span>
              <span style={{ color: "var(--color-text)" }}>Trie</span>
            </span>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {siteConfig.description}
            </p>
            <div className="mt-4 flex gap-3">
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 transition-colors"
                  style={{
                    background: "var(--color-surface)",
                    color: "var(--color-text-muted)",
                  }}
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text)" }}
            >
              Products
            </h4>
            <ul className="space-y-2">
              {["FinSentS", "DocuTrie", "iFeed API"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products/${item.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text)" }}
            >
              Data Solutions
            </h4>
            <ul className="space-y-2">
              {[
                "Financial Data",
                "Sentiment Analysis",
                "Alternative Data",
                "Corporate Actions",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/data/${item.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text)" }}
            >
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Consulting", href: "/consulting" },
                { label: "Documentation", href: "/docs" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 border-t pt-8 text-center text-sm"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          {siteConfig.copyright}
        </div>
      </div>
    </footer>
  );
}
