"use client";

import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/Section";
import {
  heroContent,
  keyMetrics,
  products,
  dataCategories,
  consultingServices,
  siteConfig,
} from "@/lib/site-config";

// ============================================================
// HERO
// ============================================================

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(200, 16, 46, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(212, 168, 83, 0.08) 0%, transparent 50%)",
        }}
      />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Decorative elements */}
      <div
        className="absolute top-1/4 right-10 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "rgba(200, 16, 46, 0.1)" }}
      />
      <div
        className="absolute bottom-1/4 left-10 h-48 w-48 rounded-full blur-3xl"
        style={{ background: "rgba(212, 168, 83, 0.08)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div>
            <div className="animate-fade-in-up mb-6 flex items-center gap-3">
              <div className="accent-line" />
              <span
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--color-text-muted)" }}
              >
                Since 2012 — Singapore · India · Europe
              </span>
            </div>
            <h1
              className="animate-fade-in-up animate-delay-100 text-5xl leading-tight md:text-6xl lg:text-7xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              Navigate the{" "}
              <span className="text-gradient">Sea of Data</span>
            </h1>
            <p
              className="animate-fade-in-up animate-delay-200 mt-6 max-w-xl text-lg leading-relaxed md:text-xl"
              style={{ color: "var(--color-text-muted)" }}
            >
              {heroContent.subheadline}
            </p>
            <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-wrap gap-4">
              <Link
                href={heroContent.cta.href}
                className="btn-primary rounded-lg px-8 py-4 text-sm"
              >
                {heroContent.cta.label}
              </Link>
              <Link
                href={heroContent.ctaSecondary.href}
                className="btn-secondary rounded-lg px-8 py-4 text-sm"
              >
                {heroContent.ctaSecondary.label}
              </Link>
            </div>
          </div>

          {/* Right - Stats Card */}
          <div className="animate-fade-in-up animate-delay-400">
            <div
              className="rounded-2xl p-8 lg:p-10"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                  <Image
                    src={siteConfig.logos.mainRed}
                    alt="InfoTrie"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text)",
                    }}
                  >
                    InfoTrie Platform
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Enterprise Data Intelligence
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {keyMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--color-surface-elevated)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div
                      className="text-3xl font-bold"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRODUCTS OVERVIEW
// ============================================================

function Products() {
  return (
    <Section variant="alt">
      <SectionHeader
        title="Our Products"
        subtitle="Three pillars of data intelligence — from collection to analysis to insight."
      />
      <div className="grid gap-8 md:grid-cols-3">
        {products.map((product, index) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className={`group card hover-lift rounded-2xl p-8 animate-fade-in-up animate-delay-${(index + 1) * 100}`}
          >
            <div
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl text-3xl"
              style={{
                background: "var(--color-accent-soft)",
              }}
            >
              {product.icon}
            </div>
            <h3
              className="text-xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              {product.name}
            </h3>
            <p
              className="mt-2 text-sm font-medium"
              style={{ color: "var(--color-accent)" }}
            >
              {product.tagline}
            </p>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {product.description}
            </p>
            <div
              className="mt-6 flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
              style={{ color: "var(--color-accent)" }}
            >
              Learn more
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// DATA CATEGORIES GRID
// ============================================================

function DataGrid() {
  return (
    <Section>
      <SectionHeader
        title="Data Solutions"
        subtitle="Comprehensive coverage across alternative, financial, and corporate data."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dataCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/data/${cat.slug}`}
            className="group rounded-xl p-6 transition-all duration-300"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-accent)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-border)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div className="mb-4 text-3xl">{cat.icon}</div>
            <h4
              className="text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {cat.name}
            </h4>
            <p
              className="mt-2 text-xs leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {cat.short}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// CONSULTING PREVIEW
// ============================================================

function Consulting() {
  return (
    <Section variant="alt">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left Content */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="accent-line" />
            <span
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-muted)" }}
            >
              Expert Services
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            Financial IT Consulting
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Expert advisory and delivery for financial IT and data projects.
            15+ years of real-world experience in complex treasury systems.
          </p>
          <Link
            href="/consulting"
            className="btn-primary mt-8 inline-block rounded-lg px-8 py-4 text-sm"
          >
            Explore Consulting Services
          </Link>
        </div>

        {/* Right - Services Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {consultingServices.map((svc, index) => (
            <div
              key={svc.title}
              className="rounded-xl p-6"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                style={{ background: "var(--color-gold-soft)" }}
              >
                {["💼", "🔄", "🤖", "📋"][index]}
              </div>
              <h4
                className="text-base font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                {svc.title}
              </h4>
              <p
                className="mt-2 text-xs leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {svc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// CTA
// ============================================================

function CTA() {
  return (
    <Section>
      <div
        className="relative overflow-hidden rounded-3xl p-12 md:p-16"
        style={{
          background:
            "linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-elevated) 100%)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Background decoration */}
        <div
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgba(200, 16, 46, 0.15)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full blur-3xl"
          style={{ background: "rgba(212, 168, 83, 0.1)" }}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            Ready to navigate the{" "}
            <span className="text-gradient">sea of data</span>?
          </h2>
          <p
            className="mt-6 text-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            Get in touch to discuss how InfoTrie can help you make better
            data-driven decisions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary rounded-lg px-10 py-4 text-sm"
            >
              Contact Us
            </Link>
            <Link
              href="/docs"
              className="btn-secondary rounded-lg px-10 py-4 text-sm"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <DataGrid />
      <Consulting />
      <CTA />
    </>
  );
}
