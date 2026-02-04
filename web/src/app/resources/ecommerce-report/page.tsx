import type { Metadata } from "next";
import Image from "next/image";
import { LeadCaptureForm, FormField } from "@/components/LeadCaptureForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Global E-Commerce Trends Report Q1 2025 | Free Download",
  description:
    "Download our quarterly e-commerce intelligence report with marketplace trends, category benchmarks, and sample datasets from Amazon, eBay, and more.",
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
    label: "Company",
    type: "text",
    placeholder: "Your company name",
    required: true,
  },
  {
    name: "industry",
    label: "Industry",
    type: "select",
    required: true,
    options: [
      { value: "retail", label: "Retail / E-Commerce" },
      { value: "cpg", label: "Consumer Packaged Goods" },
      { value: "finance", label: "Finance / Investment" },
      { value: "consulting", label: "Consulting / Research" },
      { value: "technology", label: "Technology" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "marketplaces",
    label: "Marketplaces of Interest",
    type: "select",
    options: [
      { value: "amazon", label: "Amazon" },
      { value: "ebay", label: "eBay" },
      { value: "walmart", label: "Walmart" },
      { value: "alibaba", label: "Alibaba / AliExpress" },
      { value: "multiple", label: "Multiple Marketplaces" },
    ],
  },
];

const reportHighlights = [
  {
    icon: "📈",
    title: "Market Trends",
    description: "Q1 2025 marketplace growth rates and projections",
  },
  {
    icon: "🏆",
    title: "Category Rankings",
    description: "Top performing categories across major platforms",
  },
  {
    icon: "💰",
    title: "Pricing Intelligence",
    description: "Average selling prices and discount trends",
  },
  {
    icon: "📦",
    title: "Sample Dataset",
    description: "30-day product data from Amazon & eBay included",
  },
];

const marketplaces = [
  "Amazon",
  "eBay",
  "Walmart",
  "Alibaba",
  "Etsy",
  "Rakuten",
];

const stats = [
  { value: "50M+", label: "Products Analyzed" },
  { value: "10+", label: "Marketplaces" },
  { value: "45", label: "Pages of Insights" },
  { value: "30 Days", label: "Sample Data" },
];

export default function EcommerceReportPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 40%, rgba(200, 16, 46, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(212, 168, 83, 0.08) 0%, transparent 50%)",
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
                  Free Report + Sample Data
                </span>
              </div>

              <h1
                className="text-4xl leading-tight md:text-5xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                Global E-Commerce{" "}
                <span className="text-gradient">Trends Report</span>
              </h1>

              <p
                className="mt-6 text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                Our Q1 2025 quarterly report with comprehensive marketplace
                intelligence, category benchmarks, and a sample dataset to
                explore e-commerce analytics capabilities.
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="mt-1 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {reportHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div className="mb-2 text-2xl">{item.icon}</div>
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trust */}
              <div
                className="mt-8 flex items-center gap-4 border-t pt-8"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="relative h-10 w-10">
                  <Image
                    src={siteConfig.logos.mainRed}
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
                  E-commerce data from{" "}
                  <strong style={{ color: "var(--color-text)" }}>
                    200K+ sellers
                  </strong>{" "}
                  across 10+ marketplaces
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
                Download Free Report
              </h2>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Get the report + sample dataset instantly.
              </p>

              <LeadCaptureForm
                fields={formFields}
                submitLabel="Download Report & Data"
                leadMagnet="ecommerce-trends-q1-2025"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marketplaces Section */}
      <section
        className="py-20"
        style={{ background: "var(--color-secondary)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              Marketplaces Covered
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-lg"
              style={{ color: "var(--color-text-muted)" }}
            >
              Comprehensive analysis of the world&apos;s largest e-commerce
              platforms.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {marketplaces.map((marketplace) => (
              <div
                key={marketplace}
                className="rounded-xl px-8 py-4 text-center"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {marketplace}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
