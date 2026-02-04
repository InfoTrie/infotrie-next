import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const productLinks = [
    { label: "FinSentS", href: "/products/finsents" },
    { label: "DocuTrie", href: "/products/docutrie" },
    { label: "iFeed API", href: "/products/ifeed-api" },
  ];

  const dataLinks = [
    { label: "Alternative Data", href: "/data/alternative" },
    { label: "Financial Data", href: "/data/financial" },
    { label: "Sentiment Analysis", href: "/data/sentiment" },
    { label: "E-Commerce Analytics", href: "/data/ecommerce" },
    { label: "Corporate Actions", href: "/data/corporate-actions" },
  ];

  const companyLinks = [
    { label: "Data Specialist", href: "/data-specialist" },
    { label: "Consulting", href: "/consulting" },
    { label: "Documentation", href: "/docs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer
      style={{
        background: "var(--color-secondary)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                <Image
                  src={siteConfig.logos.mainRed}
                  alt="InfoTrie"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span style={{ color: "var(--color-accent)" }}>Info</span>
                <span style={{ color: "var(--color-text)" }}>Trie</span>
              </span>
            </Link>
            <p
              className="mt-6 max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {siteConfig.description}
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    background: "var(--color-surface)",
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--color-accent)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--color-border)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-text-muted)";
                  }}
                  aria-label="LinkedIn"
                >
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text)" }}
            >
              Products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--color-text-muted)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--color-accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--color-text-muted)")
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Solutions */}
          <div>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text)" }}
            >
              Data Solutions
            </h4>
            <ul className="space-y-3">
              {dataLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--color-text-muted)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--color-accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--color-text-muted)")
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--color-text-muted)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--color-accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--color-text-muted)")
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
              <p
                className="text-xs uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                Headquarters
              </p>
              <p
                className="mt-1 text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                {siteConfig.contact.headquarters}
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                + India · Europe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          background: "var(--color-primary)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p
            className="text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            {siteConfig.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
