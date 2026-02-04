"use client";

import { useState } from "react";
import Image from "next/image";
import { LeadCaptureForm, FormField } from "@/components/LeadCaptureForm";
import { siteConfig } from "@/lib/site-config";
import {
  Timer,
  CurrencyDollar,
  Target,
  Rocket,
} from "@phosphor-icons/react";

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
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { value: "cto", label: "CTO / VP Engineering" },
      { value: "data-engineer", label: "Data Engineer" },
      { value: "architect", label: "Solutions Architect" },
      { value: "product", label: "Product Manager" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "currentStack",
    label: "Current Data Stack",
    type: "textarea",
    placeholder: "e.g., Snowflake, Databricks, Python, etc.",
  },
  {
    name: "dataVolume",
    label: "Expected Data Volume",
    type: "select",
    options: [
      { value: "small", label: "< 1 TB / month" },
      { value: "medium", label: "1-10 TB / month" },
      { value: "large", label: "10-100 TB / month" },
      { value: "enterprise", label: "> 100 TB / month" },
    ],
  },
];

const calculatorInputs = [
  { id: "assets", label: "Number of Assets to Track", defaultValue: 1000 },
  { id: "datapoints", label: "Data Points per Day", defaultValue: 10000 },
  { id: "analysts", label: "Number of Analysts", defaultValue: 5 },
  { id: "hourlyRate", label: "Avg. Analyst Hourly Rate ($)", defaultValue: 75 },
];

const benefits = [
  {
    icon: Timer,
    title: "Time Savings",
    description: "Reduce data collection time by 80%",
  },
  {
    icon: CurrencyDollar,
    title: "Cost Reduction",
    description: "Lower infrastructure costs by 50%",
  },
  {
    icon: Target,
    title: "Data Quality",
    description: "99.9% accuracy with automated validation",
  },
  {
    icon: Rocket,
    title: "Time to Market",
    description: "Deploy in weeks, not months",
  },
];

export default function DataRoiCalculatorPage() {
  const [values, setValues] = useState<Record<string, number>>({
    assets: 1000,
    datapoints: 10000,
    analysts: 5,
    hourlyRate: 75,
  });

  const [showResults, setShowResults] = useState(false);

  // Simple ROI calculation
  const manualHoursPerMonth = (values.assets * values.datapoints * 0.001) / 100;
  const manualCostPerMonth = manualHoursPerMonth * values.hourlyRate * values.analysts;
  const infotrieCostEstimate = values.assets * 0.5; // Simplified pricing
  const monthlySavings = Math.max(0, manualCostPerMonth - infotrieCostEstimate);
  const annualSavings = monthlySavings * 12;
  const roi = infotrieCostEstimate > 0 ? ((monthlySavings / infotrieCostEstimate) * 100).toFixed(0) : 0;

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(0, 212, 170, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(78, 205, 196, 0.08) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-4 flex items-center gap-3">
            <div className="accent-line" />
            <span
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Interactive Tool
            </span>
          </div>

          <h1
            className="text-4xl leading-tight md:text-5xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            Data Integration{" "}
            <span className="text-gradient">ROI Calculator</span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Calculate your potential savings by switching from manual data
            collection to InfoTrie&apos;s automated data pipelines.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Calculator */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h2
                className="mb-6 text-xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                Your Data Requirements
              </h2>

              <div className="space-y-6">
                {calculatorInputs.map((input) => (
                  <div key={input.id}>
                    <label
                      className="mb-2 block text-sm font-medium"
                      style={{ color: "var(--color-text)" }}
                    >
                      {input.label}
                    </label>
                    <input
                      type="number"
                      value={values[input.id]}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          [input.id]: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="w-full rounded-lg px-4 py-3 text-sm"
                      style={{
                        background: "var(--color-surface-elevated)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text)",
                      }}
                    />
                  </div>
                ))}

                <button
                  onClick={() => setShowResults(true)}
                  className="btn-primary w-full rounded-lg px-6 py-4 text-sm"
                >
                  Calculate Savings
                </button>
              </div>

              {/* Results */}
              {showResults && (
                <div
                  className="mt-8 rounded-xl p-6"
                  style={{
                    background: "var(--color-accent-soft)",
                    border: "1px solid var(--color-accent)",
                  }}
                >
                  <h3
                    className="mb-4 text-lg font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    Your Estimated Savings
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-accent)" }}
                      >
                        ${monthlySavings.toLocaleString()}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Monthly Savings
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-accent)" }}
                      >
                        ${annualSavings.toLocaleString()}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Annual Savings
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-gold)" }}
                      >
                        {roi}%
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Estimated ROI
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-gold)" }}
                      >
                        {Math.round(manualHoursPerMonth * values.analysts)}h
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Hours Saved/Month
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
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
                Get Your Custom Report
              </h2>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Receive a detailed ROI analysis + free 30-min consultation.
              </p>

              <LeadCaptureForm
                fields={formFields}
                submitLabel="Get Custom Report"
                leadMagnet="data-roi-calculator"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why Companies Switch to InfoTrie
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl p-6 text-center"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg"
                  style={{ background: "var(--color-accent-soft)" }}
                >
                  <benefit.icon
                    size={32}
                    weight="duotone"
                    style={{ color: "var(--color-accent)" }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-4">
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
                Trusted by data teams at{" "}
                <strong style={{ color: "var(--color-text)" }}>
                  leading financial institutions
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
