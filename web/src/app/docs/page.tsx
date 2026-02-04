import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "Documentation",
  description: "InfoTrie API documentation — get started with iFeed API, alternative data, financial data, and more.",
};

const docSections = [
  {
    title: "Getting Started",
    description: "Try your first API call and understand authentication.",
    href: "/docs/getting-started",
    icon: "🚀",
  },
  {
    title: "Alternative Data",
    description: "E-commerce, job postings, web scraping, and custom data pipelines.",
    href: "/docs/alternative-data",
    icon: "🌐",
  },
  {
    title: "Financial Data",
    description: "EOD, fundamentals, corporate actions, and company profiles.",
    href: "/docs/financial-data",
    icon: "💹",
  },
  {
    title: "News & Social Media",
    description: "Real-time news feeds and social media monitoring.",
    href: "/docs/news-social",
    icon: "📰",
  },
  {
    title: "Static Data",
    description: "Exchanges, indexes, commodities, forex pairs, and crypto.",
    href: "/docs/static-data",
    icon: "📋",
  },
  {
    title: "Sentiment Analysis",
    description: "FinSentS API — sentiment scores, buzz metrics, and alerts.",
    href: "/docs/sentiment",
    icon: "🧠",
  },
];

export default function DocsPage() {
  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          title="Documentation"
          subtitle="Everything you need to integrate InfoTrie data into your systems."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docSections.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="rounded-xl border p-8 transition-all hover:border-[var(--color-accent)]"
              style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
            >
              <div className="mb-4 text-3xl">{doc.icon}</div>
              <h3
                className="text-lg"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                {doc.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {doc.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick start code block */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h3
            className="mb-4 text-xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            Quick Start
          </h3>
          <div
            className="overflow-x-auto rounded-xl border p-6"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <pre className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              <code>{`# Try your first API call
curl -X GET \\
  "https://api.infotrie.com/v1/sentiment?ticker=AAPL" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`}</code>
            </pre>
          </div>
        </div>
      </Section>
    </div>
  );
}
