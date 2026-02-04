import type { Metadata } from "next";
import Image from "next/image";
import {
  LeadCaptureForm,
  FormField,
} from "@/components/LeadCaptureForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The 2025 Alternative Data Playbook | Free Guide",
  description:
    "Download our comprehensive guide on alternative data for institutional investors. Learn use cases, ROI frameworks, and vendor evaluation criteria.",
};

const formFields: FormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Smith",
    required: true,
  },
  {
    name: "email",
    label: "Work Email",
    type: "email",
    placeholder: "john@company.com",
    required: true,
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Acme Capital",
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { value: "portfolio-manager", label: "Portfolio Manager" },
      { value: "quant-analyst", label: "Quantitative Analyst" },
      { value: "data-scientist", label: "Data Scientist" },
      { value: "cio-cto", label: "CIO / CTO" },
      { value: "research", label: "Research Analyst" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "aum",
    label: "AUM Range",
    type: "select",
    options: [
      { value: "under-100m", label: "Under $100M" },
      { value: "100m-500m", label: "$100M - $500M" },
      { value: "500m-1b", label: "$500M - $1B" },
      { value: "1b-10b", label: "$1B - $10B" },
      { value: "over-10b", label: "Over $10B" },
    ],
  },
];

const benefits = [
  {
    icon: "📊",
    title: "Data Type Overview",
    description: "Comprehensive breakdown of 15+ alternative data categories",
  },
  {
    icon: "💰",
    title: "ROI Framework",
    description: "Proven methodologies to measure alternative data alpha",
  },
  {
    icon: "✅",
    title: "Vendor Checklist",
    description: "20-point evaluation criteria for data providers",
  },
  {
    icon: "📈",
    title: "Case Studies",
    description: "Real-world examples from leading hedge funds",
  },
];

const tableOfContents = [
  "Introduction to Alternative Data",
  "Types of Alternative Data Sources",
  "Data Quality Assessment Framework",
  "Integration Best Practices",
  "Compliance & Legal Considerations",
  "ROI Measurement Methodology",
  "Vendor Evaluation Checklist",
  "Future Trends & Predictions",
];

export default function AlternativeDataGuidePage() {
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
                  Free Guide
                </span>
              </div>

              <h1
                className="text-4xl leading-tight md:text-5xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                The 2025 Alternative Data{" "}
                <span className="text-gradient">Playbook</span>
              </h1>

              <p
                className="mt-6 text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                A comprehensive guide for institutional investors looking to
                gain an edge with alternative data. Learn how leading funds
                source, evaluate, and integrate alternative datasets.
              </p>

              {/* Benefits Grid */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div className="mb-2 text-2xl">{benefit.icon}</div>
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div
                className="mt-8 flex items-center gap-6 border-t pt-8"
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
                  Trusted by <strong style={{ color: "var(--color-text)" }}>500+</strong>{" "}
                  institutional investors worldwide
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
                Download Your Free Copy
              </h2>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Get instant access to the 45-page guide.
              </p>

              <LeadCaptureForm
                fields={formFields}
                submitLabel="Download Free Guide"
                leadMagnet="alternative-data-playbook-2025"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents Section */}
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
                What You&apos;ll Learn
              </h2>
              <p
                className="mt-4 text-lg"
                style={{ color: "var(--color-text-muted)" }}
              >
                45 pages of actionable insights from industry experts.
              </p>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                Table of Contents
              </h3>
              <ol className="space-y-3">
                {tableOfContents.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 text-sm"
                    style={{ color: "var(--color-text)" }}
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: "var(--color-accent-soft)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
