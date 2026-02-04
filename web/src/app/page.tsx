"use client";

import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import {
  heroContent,
  keyMetrics,
  products,
  dataCategories,
  consultingServices,
} from "@/lib/site-config";

// ============================================================
// HERO
// ============================================================

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0, 212, 170, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(78, 205, 196, 0.06) 0%, transparent 50%)",
        }}
      />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-32">
        <div className="max-w-3xl">
          <p
            className="animate-fade-in-up mb-6 text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--color-accent)" }}
          >
            Since 2012 — Singapore · India · Europe
          </p>
          <h1
            className="animate-fade-in-up animate-delay-100 text-5xl leading-tight md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            {heroContent.headline}
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
              className="rounded-lg px-7 py-3.5 text-sm font-semibold transition-all"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-text-dark)",
              }}
            >
              {heroContent.cta.label}
            </Link>
            <Link
              href={heroContent.ctaSecondary.href}
              className="rounded-lg border px-7 py-3.5 text-sm font-semibold transition-all"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              {heroContent.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY METRICS
// ============================================================

function Metrics() {
  return (
    <Section variant="alt">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {keyMetrics.map((metric, i) => (
          <div key={metric.label} className="text-center">
            <div
              className="text-4xl font-bold md:text-5xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-accent)" }}
            >
              {metric.value}
            </div>
            <div
              className="mt-2 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================
// PRODUCTS OVERVIEW
// ============================================================

function Products() {
  return (
    <Section>
      <SectionHeader
        title="Our Products"
        subtitle="Three pillars of data intelligence — from collection to analysis to insight."
      />
      <div className="grid gap-8 md:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group rounded-2xl border p-8 transition-all"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
            onMouseEnter={(e) => {
              // Handled via CSS group-hover in production; inline for simplicity
            }}
          >
            <div className="mb-4 text-4xl">{product.icon}</div>
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
              className="mt-1 text-sm font-medium"
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
            <span
              className="mt-6 inline-block text-sm font-medium"
              style={{ color: "var(--color-accent)" }}
            >
              Learn more →
            </span>
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
    <Section variant="alt">
      <SectionHeader
        title="Data Solutions"
        subtitle="Comprehensive coverage across alternative, financial, and corporate data."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dataCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/data/${cat.slug}`}
            className="rounded-xl border p-5 transition-all hover:border-[var(--color-accent)]"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="mb-3 text-2xl">{cat.icon}</div>
            <h4
              className="text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {cat.name}
            </h4>
            <p
              className="mt-1 text-xs leading-relaxed"
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
    <Section>
      <SectionHeader
        title="Consulting"
        subtitle="Expert advisory and delivery for financial IT and data projects."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {consultingServices.map((svc) => (
          <div
            key={svc.title}
            className="rounded-xl border p-8"
            style={{
              borderColor: "var(--color-border)",
            }}
          >
            <h4
              className="text-lg"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              {svc.title}
            </h4>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {svc.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/consulting"
          className="inline-block rounded-lg border px-7 py-3.5 text-sm font-semibold transition-all"
          style={{
            borderColor: "var(--color-accent)",
            color: "var(--color-accent)",
          }}
        >
          Explore Consulting Services →
        </Link>
      </div>
    </Section>
  );
}

// ============================================================
// CTA
// ============================================================

function CTA() {
  return (
    <Section variant="alt">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className="text-3xl md:text-4xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
        >
          Ready to navigate the sea of data?
        </h2>
        <p
          className="mt-4 text-lg"
          style={{ color: "var(--color-text-muted)" }}
        >
          Get in touch to discuss how InfoTrie can help you make better
          data-driven decisions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg px-8 py-4 text-sm font-semibold transition-all"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-text-dark)",
            }}
          >
            Contact Us
          </Link>
          <Link
            href="/docs"
            className="rounded-lg border px-8 py-4 text-sm font-semibold transition-all"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            View Documentation
          </Link>
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
      <Metrics />
      <Products />
      <DataGrid />
      <Consulting />
      <CTA />
    </>
  );
}
