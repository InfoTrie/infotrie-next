import type { Metadata } from "next";
import Image from "next/image";
import { LeadCaptureForm, FormField } from "@/components/LeadCaptureForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Free Financial Data Sample Pack | InfoTrie",
  description:
    "Download free sample datasets including EOD prices, fundamentals, and corporate actions. Perfect for fintech startups and developers.",
};

const formFields: FormField[] = [
  {
    name: "email",
    label: "Work Email",
    type: "email",
    placeholder: "you@company.com",
    required: true,
  },
  {
    name: "company",
    label: "Company / Project",
    type: "text",
    placeholder: "Your company or project name",
    required: true,
  },
  {
    name: "useCase",
    label: "Use Case",
    type: "select",
    required: true,
    options: [
      { value: "trading-app", label: "Trading Application" },
      { value: "analytics", label: "Analytics Platform" },
      { value: "research", label: "Research / Academic" },
      { value: "portfolio", label: "Portfolio Management" },
      { value: "learning", label: "Learning / Personal Project" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "timeline",
    label: "Project Timeline",
    type: "select",
    options: [
      { value: "exploring", label: "Just Exploring" },
      { value: "1-3-months", label: "1-3 Months" },
      { value: "3-6-months", label: "3-6 Months" },
      { value: "immediate", label: "Immediate Need" },
    ],
  },
];

const datasets = [
  {
    icon: "📈",
    title: "End of Day Prices",
    description: "30 days of OHLCV data for 500+ US equities",
    format: "CSV, JSON",
  },
  {
    icon: "📊",
    title: "Fundamental Data",
    description: "Latest quarterly financials for 100 companies",
    format: "CSV, JSON",
  },
  {
    icon: "🏢",
    title: "Corporate Actions",
    description: "Dividends, splits, and M&A for 30 days",
    format: "CSV, JSON",
  },
  {
    icon: "📰",
    title: "News Feed Sample",
    description: "7 days of financial news with sentiment scores",
    format: "JSON",
  },
];

const codeExamples = [
  { lang: "Python", icon: "🐍" },
  { lang: "R", icon: "📊" },
  { lang: "JavaScript", icon: "⚡" },
  { lang: "cURL", icon: "💻" },
];

const includedItems = [
  "Sample datasets in CSV and JSON formats",
  "API documentation and quickstart guide",
  "Code examples in Python, R, and JavaScript",
  "30-day API trial access",
  "Slack community access",
];

export default function SampleDataPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(0, 212, 170, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(78, 205, 196, 0.08) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="accent-line" />
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-accent)" }}
                >
                  Free Download
                </span>
              </div>

              <h1
                className="text-4xl leading-tight md:text-5xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                Financial Data{" "}
                <span className="text-gradient">Sample Pack</span>
              </h1>

              <p
                className="mt-6 text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                Get started with free sample datasets, API documentation, and
                code examples. Perfect for fintech startups, developers, and
                researchers.
              </p>

              {/* Datasets Grid */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {datasets.map((dataset) => (
                  <div
                    key={dataset.title}
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div className="mb-2 text-2xl">{dataset.icon}</div>
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {dataset.title}
                    </h3>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {dataset.description}
                    </p>
                    <div
                      className="mt-2 text-xs font-mono"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {dataset.format}
                    </div>
                  </div>
                ))}
              </div>

              {/* Code Examples */}
              <div className="mt-8">
                <p
                  className="mb-3 text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Code Examples Included:
                </p>
                <div className="flex flex-wrap gap-2">
                  {codeExamples.map((ex) => (
                    <span
                      key={ex.lang}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text)",
                      }}
                    >
                      {ex.icon} {ex.lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust */}
              <div
                className="mt-8 flex items-center gap-4 border-t pt-8"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="relative h-10 w-10">
                  <Image
                    src={siteConfig.logos.main}
                    alt="InfoTrie"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Used by{" "}
                  <strong style={{ color: "var(--color-text)" }}>
                    1,000+ developers
                  </strong>{" "}
                  and fintech startups
                </p>
              </div>
            </div>

            {/* Right - Form */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h2
                className="mb-2 text-xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                Download Sample Pack
              </h2>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Get instant access to datasets and documentation.
              </p>

              <LeadCaptureForm
                fields={formFields}
                submitLabel="Download Free Pack"
                leadMagnet="financial-data-sample-pack"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section
        className="py-20"
        style={{ background: "var(--color-secondary)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                What&apos;s Included
              </h2>
              <p
                className="mt-4 text-lg"
                style={{ color: "var(--color-text-muted)" }}
              >
                Everything you need to start building with financial data.
              </p>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <ul className="space-y-4">
                {includedItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "var(--color-text)" }}
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
                      style={{
                        background: "var(--color-accent-soft)",
                        color: "var(--color-accent)",
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
