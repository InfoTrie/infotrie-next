"use client";

import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import {
  ShoppingCart,
  Tag,
  PaintBrush,
  Factory,
  Storefront,
  Package,
  Globe,
  TShirt,
  Plug,
  Lightning,
  Broadcast,
  Lock,
  Envelope,
  Desktop,
  Buildings,
  ChartBar,
  Target,
  Link as LinkIcon,
  Users,
  ChatCircle,
  TrendUp,
  ClipboardText,
  ArrowLeft,
  GlobeHemisphereEast,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

// ============================================================
// DATA DEFINITIONS
// ============================================================

const marketplaces: { name: string; icon: Icon }[] = [
  { name: "Amazon", icon: ShoppingCart },
  { name: "eBay", icon: Tag },
  { name: "Etsy", icon: PaintBrush },
  { name: "Alibaba", icon: Factory },
  { name: "Rakuten", icon: GlobeHemisphereEast },
  { name: "Walmart", icon: Storefront },
  { name: "AliExpress", icon: Package },
  { name: "JD.com", icon: GlobeHemisphereEast },
  { name: "MercadoLibre", icon: Globe },
  { name: "Poshmark", icon: TShirt },
];

const platforms = [
  { name: "Shopify", description: "Store analytics & product data" },
  { name: "Magento", description: "Enterprise e-commerce insights" },
  { name: "WooCommerce", description: "WordPress shop intelligence" },
];

const deliveryMethods: { name: string; icon: Icon }[] = [
  { name: "REST API", icon: Plug },
  { name: "Streaming API", icon: Lightning },
  { name: "Feed API", icon: Broadcast },
  { name: "SFTP", icon: Lock },
  { name: "Email", icon: Envelope },
  { name: "UI Export", icon: Desktop },
];

const dataFormats = [".json", ".xml", ".csv", ".xls", ".sql", ".txt", ".bin"];

const useCases: { title: string; description: string; icon: Icon }[] = [
  {
    title: "Retail Intelligence",
    description:
      "Monitor pricing trends, product availability, and competitive positioning across major marketplaces.",
    icon: Buildings,
  },
  {
    title: "Market Research",
    description:
      "Analyze consumer behavior, product reviews, and market trends to inform strategic decisions.",
    icon: ChartBar,
  },
  {
    title: "Competitive Intelligence",
    description:
      "Track competitor products, pricing strategies, and market share across e-commerce platforms.",
    icon: Target,
  },
  {
    title: "B2B Data Enrichment",
    description:
      "Enhance your business data with seller information, ratings, and contact details.",
    icon: LinkIcon,
  },
];

const keyStats = [
  { value: "200K+", label: "Seller Ratings" },
  { value: "10+", label: "Marketplaces" },
  { value: "7+", label: "Years of Data" },
  { value: "Global", label: "Coverage" },
];

const dataCoverage: { title: string; items: string[]; icon: Icon }[] = [
  {
    title: "Product Data",
    items: [
      "Product listings & descriptions",
      "Pricing & price history",
      "Availability & stock levels",
      "Product categories & attributes",
    ],
    icon: Package,
  },
  {
    title: "Seller Intelligence",
    items: [
      "200K+ seller ratings",
      "Seller contact information",
      "Store performance metrics",
      "Seller reputation scores",
    ],
    icon: Users,
  },
  {
    title: "Consumer Insights",
    items: [
      "Product reviews & ratings",
      "Customer sentiment analysis",
      "Purchase trends",
      "Q&A data",
    ],
    icon: ChatCircle,
  },
  {
    title: "Market Trends",
    items: [
      "Category trends",
      "Seasonal patterns",
      "Trending products",
      "Market share data",
    ],
    icon: TrendUp,
  },
  {
    title: "Competitive Data",
    items: [
      "Competitor pricing",
      "Product comparisons",
      "Market positioning",
      "Share of search",
    ],
    icon: Target,
  },
  {
    title: "Industry Reports",
    items: [
      "E-commerce statistics",
      "Industry benchmarks",
      "Market forecasts",
      "Consumer behavior trends",
    ],
    icon: ClipboardText,
  },
];

// ============================================================
// HERO SECTION
// ============================================================

function Hero() {
  return (
    <section className="relative overflow-hidden pt-24">
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(0, 212, 170, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(78, 205, 196, 0.06) 0%, transparent 50%)",
        }}
      />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Link
          href="/data"
          className="mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          <ArrowLeft size={16} weight="bold" /> Back to Data Solutions
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="accent-line" />
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                Data Solutions
              </span>
            </div>
            <h1
              className="text-4xl leading-tight md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              E-Commerce <span className="text-gradient">Data Analytics</span>
            </h1>
            <p
              className="mt-6 text-lg leading-relaxed md:text-xl"
              style={{ color: "var(--color-text-muted)" }}
            >
              Automate and interpret raw e-commerce datasets into useful,
              structured insights. We gather information from all major
              marketplaces and e-commerce platforms into meaningful, accurate
              data.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-primary rounded-lg px-7 py-3.5 text-sm"
              >
                Request Sample Data
              </Link>
              <Link
                href="/docs"
                className="btn-secondary rounded-lg px-7 py-3.5 text-sm"
              >
                View Documentation
              </Link>
            </div>
          </div>

          {/* Key Stats */}
          <div
            className="grid grid-cols-2 gap-6 rounded-2xl border p-8"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-3xl font-bold md:text-4xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-accent)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-1 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// USE CASES SECTION
// ============================================================

function UseCases() {
  return (
    <Section variant="alt">
      <SectionHeader
        title="Use Cases"
        subtitle="Transform e-commerce data into actionable business intelligence."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {useCases.map((useCase) => {
          const IconComponent = useCase.icon;
          return (
            <div
              key={useCase.title}
              className="rounded-2xl border p-8 transition-all"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: "var(--color-accent-soft)" }}
              >
                <IconComponent
                  size={28}
                  weight="duotone"
                  style={{ color: "var(--color-accent)" }}
                />
              </div>
              <h3
                className="text-xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                {useCase.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {useCase.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ============================================================
// MARKETPLACES SECTION
// ============================================================

function Marketplaces() {
  return (
    <Section>
      <SectionHeader
        title="Supported Marketplaces"
        subtitle="Comprehensive coverage of the world's largest e-commerce platforms."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {marketplaces.map((marketplace) => {
          const IconComponent = marketplace.icon;
          return (
            <div
              key={marketplace.name}
              className="flex flex-col items-center rounded-xl border p-6 text-center transition-all hover:border-[var(--color-accent)]"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ background: "var(--color-accent-soft)" }}
              >
                <IconComponent
                  size={24}
                  weight="duotone"
                  style={{ color: "var(--color-accent)" }}
                />
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                {marketplace.name}
              </span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ============================================================
// PLATFORMS SECTION
// ============================================================

function Platforms() {
  return (
    <Section variant="alt">
      <SectionHeader
        title="E-Commerce Platforms"
        subtitle="Native support for leading e-commerce platforms."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="rounded-xl border p-8 text-center"
            style={{
              borderColor: "var(--color-border)",
            }}
          >
            <h4
              className="text-xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              {platform.name}
            </h4>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {platform.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// DATA DELIVERY SECTION
// ============================================================

function DataDelivery() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Delivery Methods */}
        <div>
          <h3
            className="mb-6 text-2xl md:text-3xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            Flexible Delivery Methods
          </h3>
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Access your data the way that works best for your infrastructure.
            From real-time APIs to batch exports, we support multiple delivery
            options.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {deliveryMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={method.name}
                  className="flex items-center gap-3 rounded-lg border p-4"
                  style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <IconComponent
                    size={20}
                    weight="duotone"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {method.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Formats */}
        <div>
          <h3
            className="mb-6 text-2xl md:text-3xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            Multiple Data Formats
          </h3>
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Receive data in the format that integrates seamlessly with your
            existing workflows and analytics tools.
          </p>
          <div className="flex flex-wrap gap-3">
            {dataFormats.map((format) => (
              <span
                key={format}
                className="rounded-lg border px-4 py-2 font-mono text-sm"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-accent)",
                }}
              >
                {format}
              </span>
            ))}
          </div>

          {/* Compliance */}
          <div
            className="mt-8 rounded-xl border p-6"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-accent-soft)",
            }}
          >
            <h4
              className="mb-2 text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Data Privacy Compliance
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              We follow data privacy laws and regulations including{" "}
              <strong style={{ color: "var(--color-accent)" }}>GDPR</strong> and{" "}
              <strong style={{ color: "var(--color-accent)" }}>CCPA</strong> to
              ensure your data operations remain compliant.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// DATA COVERAGE SECTION
// ============================================================

function DataCoverage() {
  return (
    <Section variant="alt">
      <SectionHeader
        title="What Data We Collect"
        subtitle="Comprehensive e-commerce data to power your analytics."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dataCoverage.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.title}
              className="rounded-xl border p-6"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: "var(--color-accent-soft)" }}
                >
                  <IconComponent
                    size={20}
                    weight="duotone"
                    style={{ color: "var(--color-accent)" }}
                  />
                </div>
                <h4
                  className="text-lg"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text)",
                  }}
                >
                  {category.title}
                </h4>
              </div>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span style={{ color: "var(--color-accent)" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ============================================================
// CTA SECTION
// ============================================================

function CTA() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className="text-3xl md:text-4xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
          }}
        >
          Ready to unlock e-commerce insights?
        </h2>
        <p
          className="mt-4 text-lg"
          style={{ color: "var(--color-text-muted)" }}
        >
          Get in touch to discuss how our e-commerce data can power your
          business decisions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="btn-primary rounded-lg px-8 py-4 text-sm"
          >
            Request a Demo
          </Link>
          <Link
            href="/data"
            className="btn-secondary rounded-lg px-8 py-4 text-sm"
          >
            Explore Other Data
          </Link>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// PAGE COMPONENT
// ============================================================

export default function ECommerceAnalyticsPage() {
  return (
    <>
      <Hero />
      <UseCases />
      <Marketplaces />
      <Platforms />
      <DataDelivery />
      <DataCoverage />
      <CTA />
    </>
  );
}
