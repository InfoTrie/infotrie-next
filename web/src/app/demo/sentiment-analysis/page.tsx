"use client";

import Image from "next/image";
import { LeadCaptureForm, FormField } from "@/components/LeadCaptureForm";
import { siteConfig } from "@/lib/site-config";

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
    name: "useCase",
    label: "Primary Use Case",
    type: "select",
    required: true,
    options: [
      { value: "trading-signals", label: "Trading Signals" },
      { value: "risk-management", label: "Risk Management" },
      { value: "research", label: "Investment Research" },
      { value: "portfolio-monitoring", label: "Portfolio Monitoring" },
      { value: "market-analysis", label: "Market Analysis" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "assets",
    label: "Assets of Interest",
    type: "select",
    options: [
      { value: "equities", label: "Equities" },
      { value: "forex", label: "Forex" },
      { value: "crypto", label: "Cryptocurrency" },
      { value: "commodities", label: "Commodities" },
      { value: "multiple", label: "Multiple Asset Classes" },
    ],
  },
  {
    name: "volume",
    label: "Expected API Calls / Month",
    type: "select",
    options: [
      { value: "under-10k", label: "Under 10,000" },
      { value: "10k-100k", label: "10,000 - 100,000" },
      { value: "100k-1m", label: "100,000 - 1,000,000" },
      { value: "over-1m", label: "Over 1,000,000" },
    ],
  },
];

const features = [
  {
    icon: "⚡",
    title: "Real-Time Scores",
    description: "Sub-second sentiment updates across 100,000+ assets",
  },
  {
    icon: "🌍",
    title: "Global Coverage",
    description: "2,000+ news sources in 15+ languages",
  },
  {
    icon: "📊",
    title: "Historical Data",
    description: "Backtest with data going back to 2012",
  },
  {
    icon: "🔌",
    title: "Easy Integration",
    description: "REST API with Python, R, and Java SDKs",
  },
];

const metrics = [
  { value: "100K+", label: "Assets Covered" },
  { value: "2,000+", label: "News Sources" },
  { value: "<100ms", label: "Latency" },
  { value: "99.9%", label: "Uptime SLA" },
];

export default function SentimentAnalysisDemoPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(0, 212, 170, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(78, 205, 196, 0.08) 0%, transparent 50%)",
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
                  14-Day Free Trial
                </span>
              </div>

              <h1
                className="text-4xl leading-tight md:text-5xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                FinSentS{" "}
                <span className="text-gradient">Sentiment Analysis</span>
              </h1>

              <p
                className="mt-6 text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                Experience real-time sentiment analysis for financial markets.
                Get access to our full platform with historical data for 14 days
                &mdash; no credit card required.
              </p>

              {/* Metrics */}
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      className="mt-1 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <span className="text-xl">{feature.icon}</span>
                    <div>
                      <h3
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust */}
              <div
                className="mt-10 flex items-center gap-4 border-t pt-8"
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
                  Powering sentiment analysis for{" "}
                  <strong style={{ color: "var(--color-text)" }}>
                    hedge funds, banks, and fintechs
                  </strong>{" "}
                  since 2012
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
                Start Your Free Trial
              </h2>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Full access for 14 days. No credit card required.
              </p>

              <LeadCaptureForm
                fields={formFields}
                submitLabel="Start Free Trial"
                leadMagnet="finsents-demo-14-day"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
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
              What You&apos;ll Get Access To
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-lg"
              style={{ color: "var(--color-text-muted)" }}
            >
              Full platform access with real-time and historical sentiment data.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Sentiment Dashboard",
                description:
                  "Real-time sentiment scores, trends, and alerts for your watchlist.",
                icon: "📊",
              },
              {
                title: "Historical API Access",
                description:
                  "Backtest your strategies with 10+ years of sentiment data.",
                icon: "📈",
              },
              {
                title: "Custom Alerts",
                description:
                  "Get notified when sentiment shifts for key assets.",
                icon: "🔔",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-6"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="mb-4 text-3xl">{item.icon}</div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
