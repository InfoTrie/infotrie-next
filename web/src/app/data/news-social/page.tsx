"use client";

import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/Section";
import {
  Newspaper,
  Globe,
  TwitterLogo,
  LinkedinLogo,
  ChatCircle,
  TrendUp,
  Brain,
  ChartBar,
  Target,
  Buildings,
  Clock,
  Lightning,
  Plug,
  Broadcast,
  Lock,
  Envelope,
  Desktop,
  Bell,
  Users,
  ArrowLeft,
  MagnifyingGlass,
  Funnel,
  Database,
} from "@/lib/icons";
import type { Icon } from "@/lib/icons";
import { MEDIA_BASE_URL } from "@/lib/site-config";

// ============================================================
// DATA DEFINITIONS
// ============================================================

const keyStats = [
  { value: "100K+", label: "News Sources" },
  { value: "500M+", label: "Social Posts/Day" },
  { value: "15+", label: "Years of History" },
  { value: "195+", label: "Countries Covered" },
];

const dataSources: { name: string; icon: Icon; description: string }[] = [
  { name: "Global News", icon: Newspaper, description: "Major news outlets & publications" },
  { name: "Social Media", icon: ChatCircle, description: "Twitter/X, Reddit, forums" },
  { name: "Professional Networks", icon: LinkedinLogo, description: "LinkedIn posts & articles" },
  { name: "Blogs & Forums", icon: Globe, description: "Industry blogs & discussions" },
  { name: "Press Releases", icon: Bell, description: "Official company announcements" },
  { name: "Regulatory Filings", icon: Buildings, description: "SEC, central bank filings" },
];

const useCases: { title: string; description: string; icon: Icon }[] = [
  {
    title: "Sentiment Analysis",
    description:
      "Track market sentiment in real-time across news and social media to anticipate market movements and investor behavior.",
    icon: Brain,
  },
  {
    title: "Event Detection",
    description:
      "Automatically detect breaking news, corporate events, and market-moving announcements as they happen.",
    icon: Lightning,
  },
  {
    title: "Risk Monitoring",
    description:
      "Monitor reputation risks, ESG concerns, and negative news coverage for your portfolio companies.",
    icon: Target,
  },
  {
    title: "Competitive Intelligence",
    description:
      "Track competitor mentions, product launches, and market positioning across all media channels.",
    icon: ChartBar,
  },
];

const deliveryMethods: { name: string; icon: Icon }[] = [
  { name: "REST API", icon: Plug },
  { name: "Streaming API", icon: Lightning },
  { name: "Feed API", icon: Broadcast },
  { name: "SFTP", icon: Lock },
  { name: "Email Alerts", icon: Envelope },
  { name: "Dashboard", icon: Desktop },
];

const dataFormats = [".json", ".xml", ".csv", ".parquet", ".avro"];

const dataCoverage: { title: string; items: string[]; icon: Icon }[] = [
  {
    title: "News Content",
    items: [
      "Full article text & metadata",
      "Headlines & summaries",
      "Publication timestamp",
      "Source credibility scores",
    ],
    icon: Newspaper,
  },
  {
    title: "Social Media",
    items: [
      "Post content & engagement",
      "Author profiles & influence",
      "Hashtags & mentions",
      "Retweets & shares",
    ],
    icon: ChatCircle,
  },
  {
    title: "Sentiment Scores",
    items: [
      "Document-level sentiment",
      "Entity-level sentiment",
      "Aspect-based analysis",
      "Emotion detection",
    ],
    icon: Brain,
  },
  {
    title: "Entity Recognition",
    items: [
      "Company & ticker mapping",
      "People & executives",
      "Locations & events",
      "Products & services",
    ],
    icon: Users,
  },
  {
    title: "Topic Classification",
    items: [
      "Industry categories",
      "Event types",
      "Custom taxonomies",
      "Trending topics",
    ],
    icon: Funnel,
  },
  {
    title: "Historical Archive",
    items: [
      "15+ years of news",
      "Social media history",
      "Time-series data",
      "Backtesting support",
    ],
    icon: Database,
  },
];

const sampleDataPreview = `{
  "article_id": "news_2024_abc123",
  "title": "Tech Giant Reports Record Q4 Earnings",
  "source": "Financial Times",
  "published_at": "2024-01-15T14:30:00Z",
  "sentiment": {
    "score": 0.78,
    "label": "positive",
    "confidence": 0.94
  },
  "entities": [
    { "name": "Apple Inc", "ticker": "AAPL", "type": "company" },
    { "name": "Tim Cook", "type": "person", "role": "CEO" }
  ],
  "topics": ["earnings", "technology", "quarterly_results"]
}`;

// ============================================================
// HERO / OVERVIEW SECTION
// ============================================================

function Hero() {
  return (
    <section className="relative overflow-hidden pt-24">
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(185, 28, 28, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(220, 38, 38, 0.04) 0%, transparent 50%)",
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
          {/* Left: Package Info */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="accent-line" />
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                Data Package
              </span>
            </div>
            <h1
              className="text-4xl leading-tight md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              News & Social <span className="text-gradient">Media Data</span>
            </h1>
            <p
              className="mt-6 text-lg leading-relaxed md:text-xl"
              style={{ color: "var(--color-text-muted)" }}
            >
              Real-time and historical news and social media data with NLP enrichments.
              Monitor global sentiment, detect events, and extract insights from 100K+
              sources across 195 countries.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact?package=news-social"
                className="btn-primary rounded-lg px-7 py-3.5 text-sm"
              >
                Request Trial Access
              </Link>
              <Link
                href="/demo/sentiment-analysis"
                className="btn-secondary rounded-lg px-7 py-3.5 text-sm"
              >
                Live Demo
              </Link>
            </div>
          </div>

          {/* Right: Key Stats + Sample Data Preview */}
          <div className="space-y-6">
            {/* Key Stats */}
            <div
              className="grid grid-cols-2 gap-4 rounded-2xl border p-6"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              {keyStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl font-bold md:text-3xl"
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

            {/* Sample Data Preview */}
            <div
              className="rounded-2xl border p-4"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded"
                  style={{ background: "var(--color-accent-soft)" }}
                >
                  <MagnifyingGlass size={14} style={{ color: "var(--color-accent)" }} />
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                  Sample Data Preview
                </span>
              </div>
              <pre
                className="overflow-x-auto rounded-lg p-4 text-xs leading-relaxed"
                style={{
                  background: "var(--color-surface-elevated)",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {sampleDataPreview}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DATA SOURCES SECTION
// ============================================================

function DataSources() {
  return (
    <Section variant="alt">
      <SectionHeader
        title="Data Sources"
        subtitle="Comprehensive coverage across news, social media, and professional networks."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {dataSources.map((source) => {
          const IconComponent = source.icon;
          return (
            <div
              key={source.name}
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
                {source.name}
              </span>
              <span
                className="mt-1 text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {source.description}
              </span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ============================================================
// USE CASES SECTION
// ============================================================

function UseCases() {
  return (
    <Section>
      <SectionHeader
        title="Use Cases"
        subtitle="Transform unstructured text into actionable intelligence."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {useCases.map((useCase) => {
          const IconComponent = useCase.icon;
          return (
            <div
              key={useCase.title}
              className="rounded-2xl border p-8 transition-all hover:border-[var(--color-accent)]"
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
// DATA COVERAGE SECTION
// ============================================================

function DataCoverageSection() {
  return (
    <Section variant="alt">
      <SectionHeader
        title="What's Included"
        subtitle="Rich metadata and NLP enrichments with every data point."
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
            Flexible Delivery
          </h3>
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Access real-time streams or historical archives through multiple
            delivery channels optimized for your infrastructure.
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
            Data Formats
          </h3>
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Receive data in formats that integrate seamlessly with your
            analytics pipelines and data warehouses.
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

          {/* Update Frequency */}
          <div
            className="mt-8 rounded-xl border p-6"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-accent-soft)",
            }}
          >
            <div className="flex items-center gap-3">
              <Clock size={24} weight="duotone" style={{ color: "var(--color-accent)" }} />
              <div>
                <h4
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Real-Time Updates
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Sub-second latency for breaking news and social media streams
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// CTA SECTION
// ============================================================

function CTA() {
  return (
    <Section variant="alt">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className="text-3xl md:text-4xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
          }}
        >
          Ready to harness news & social data?
        </h2>
        <p
          className="mt-4 text-lg"
          style={{ color: "var(--color-text-muted)" }}
        >
          Start with a free trial to explore our data coverage and quality.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact?package=news-social"
            className="btn-primary rounded-lg px-8 py-4 text-sm"
          >
            Request Trial Access
          </Link>
          <Link
            href="/resources/sample-data"
            className="btn-secondary rounded-lg px-8 py-4 text-sm"
          >
            Download Sample Data
          </Link>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// PAGE COMPONENT
// ============================================================

export default function NewsSocialDataPage() {
  return (
    <>
      <Hero />
      <DataSources />
      <UseCases />
      <DataCoverageSection />
      <DataDelivery />
      <CTA />
    </>
  );
}
