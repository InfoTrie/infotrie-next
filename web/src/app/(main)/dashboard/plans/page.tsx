"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Lightning,
  Star,
  Buildings,
  CreditCard,
  ArrowRight,
  Envelope,
  CheckCircle,
  Crown,
  Handshake,
  Warning,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

// ============================================================
// Types
// ============================================================

type BillingCycle = "monthly" | "annual";

type PlanTier = "starter" | "professional" | "enterprise" | "bespoke";

type Plan = {
  id: PlanTier;
  name: string;
  description: string;
  icon: typeof Lightning;
  monthlyPrice: number | null;
  annualPrice: number | null;
  stripePriceId?: string;
  features: { label: string; included: boolean }[];
  limits: {
    requestsPerHour: string;
    apiKeys: string;
    dataHistory: string;
    support: string;
    webhooks: string;
    sla: string;
  };
  highlighted?: boolean;
  cta: string;
  ctaVariant: "primary" | "secondary" | "enterprise";
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For individual developers and small projects getting started with financial data.",
    icon: Lightning,
    monthlyPrice: 49,
    annualPrice: 39,
    stripePriceId: "price_starter_monthly",
    features: [
      { label: "Sentiment Analysis API", included: true },
      { label: "News Feed API", included: true },
      { label: "End of Day Prices", included: true },
      { label: "Fundamentals API", included: false },
      { label: "Corporate Actions API", included: false },
      { label: "Webhook Subscriptions", included: false },
      { label: "SEC & Regulatory Filings", included: false },
      { label: "Custom Data Pipelines", included: false },
    ],
    limits: {
      requestsPerHour: "1,000",
      apiKeys: "2",
      dataHistory: "1 year",
      support: "Email",
      webhooks: "None",
      sla: "99.5%",
    },
    cta: "Start Free Trial",
    ctaVariant: "secondary",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For teams and businesses that need comprehensive data coverage and higher throughput.",
    icon: Star,
    monthlyPrice: 299,
    annualPrice: 249,
    stripePriceId: "price_pro_monthly",
    highlighted: true,
    features: [
      { label: "Sentiment Analysis API", included: true },
      { label: "News Feed API", included: true },
      { label: "End of Day Prices", included: true },
      { label: "Fundamentals API", included: true },
      { label: "Corporate Actions API", included: true },
      { label: "Webhook Subscriptions", included: true },
      { label: "SEC & Regulatory Filings", included: false },
      { label: "Custom Data Pipelines", included: false },
    ],
    limits: {
      requestsPerHour: "10,000",
      apiKeys: "5",
      dataHistory: "5 years",
      support: "Priority Email",
      webhooks: "10 endpoints",
      sla: "99.9%",
    },
    cta: "Subscribe Now",
    ctaVariant: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations requiring full API access, dedicated infrastructure, and premium support.",
    icon: Buildings,
    monthlyPrice: 999,
    annualPrice: 849,
    stripePriceId: "price_enterprise_monthly",
    features: [
      { label: "Sentiment Analysis API", included: true },
      { label: "News Feed API", included: true },
      { label: "End of Day Prices", included: true },
      { label: "Fundamentals API", included: true },
      { label: "Corporate Actions API", included: true },
      { label: "Webhook Subscriptions", included: true },
      { label: "SEC & Regulatory Filings", included: true },
      { label: "Custom Data Pipelines", included: false },
    ],
    limits: {
      requestsPerHour: "100,000",
      apiKeys: "20",
      dataHistory: "Full (2012+)",
      support: "Dedicated Account Manager",
      webhooks: "Unlimited",
      sla: "99.95%",
    },
    cta: "Subscribe Now",
    ctaVariant: "primary",
  },
  {
    id: "bespoke",
    name: "Bespoke",
    description: "Fully customized solution for large institutions — tailored data pipelines, on-premise deployment, and white-glove service.",
    icon: Handshake,
    monthlyPrice: null,
    annualPrice: null,
    features: [
      { label: "Sentiment Analysis API", included: true },
      { label: "News Feed API", included: true },
      { label: "End of Day Prices", included: true },
      { label: "Fundamentals API", included: true },
      { label: "Corporate Actions API", included: true },
      { label: "Webhook Subscriptions", included: true },
      { label: "SEC & Regulatory Filings", included: true },
      { label: "Custom Data Pipelines", included: true },
    ],
    limits: {
      requestsPerHour: "Custom",
      apiKeys: "Unlimited",
      dataHistory: "Full (2012+)",
      support: "White-Glove / On-Site",
      webhooks: "Unlimited + Custom",
      sla: "99.99% + Custom SLA",
    },
    cta: "Contact Sales",
    ctaVariant: "enterprise",
  },
];

// Mock current subscription
const currentSubscription = {
  planId: "professional" as PlanTier,
  status: "active" as const,
  billingCycle: "monthly" as BillingCycle,
  currentPeriodEnd: "2026-05-07",
  cancelAtPeriodEnd: false,
  stripeCustomerId: "cus_abc123",
  paymentMethod: {
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2027,
  },
  invoices: [
    { id: "inv_001", date: "2026-04-01", amount: 299, status: "paid" as const },
    { id: "inv_002", date: "2026-03-01", amount: 299, status: "paid" as const },
    { id: "inv_003", date: "2026-02-01", amount: 299, status: "paid" as const },
    { id: "inv_004", date: "2026-01-01", amount: 299, status: "paid" as const },
  ],
};

// ============================================================
// Components
// ============================================================

function PlanCard({
  plan,
  billingCycle,
  isCurrent,
  onSelect,
}: {
  plan: Plan;
  billingCycle: BillingCycle;
  isCurrent: boolean;
  onSelect: (plan: Plan) => void;
}) {
  const Icon = plan.icon;
  const price =
    billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  const isBespoke = plan.id === "bespoke";

  return (
    <div
      className="card relative flex flex-col overflow-hidden"
      style={{
        borderColor: plan.highlighted
          ? "var(--color-accent)"
          : isCurrent
            ? "var(--color-success)"
            : undefined,
        boxShadow: plan.highlighted
          ? "0 0 0 1px var(--color-accent), 0 8px 32px rgba(185, 28, 28, 0.1)"
          : undefined,
      }}
    >
      {plan.highlighted && (
        <div
          className="px-4 py-1.5 text-center text-[11px] font-bold uppercase tracking-wider"
          style={{
            background: "var(--color-accent)",
            color: "white",
          }}
        >
          Most Popular
        </div>
      )}

      {isCurrent && !plan.highlighted && (
        <div
          className="px-4 py-1.5 text-center text-[11px] font-bold uppercase tracking-wider"
          style={{
            background: "var(--color-success)",
            color: "white",
          }}
        >
          Current Plan
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{
              background: isBespoke
                ? "linear-gradient(135deg, var(--color-accent-soft), rgba(220, 38, 38, 0.12))"
                : "var(--color-accent-soft)",
            }}
          >
            <Icon
              size={20}
              weight="duotone"
              style={{ color: "var(--color-accent)" }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              {plan.name}
            </h3>
          </div>
        </div>

        {/* Price */}
        <div className="mt-5">
          {price !== null ? (
            <div className="flex items-baseline gap-1">
              <span
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ${price}
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                / month
              </span>
            </div>
          ) : (
            <div>
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Custom Pricing
              </span>
            </div>
          )}
          {billingCycle === "annual" && price !== null && (
            <p
              className="mt-1 text-xs"
              style={{ color: "var(--color-success)" }}
            >
              Save ${((plan.monthlyPrice! - plan.annualPrice!) * 12).toLocaleString()}/year
            </p>
          )}
        </div>

        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {plan.description}
        </p>

        {/* Limits */}
        <div
          className="mt-5 space-y-2 rounded-lg p-4"
          style={{ background: "var(--color-tertiary)" }}
        >
          {Object.entries(plan.limits).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-xs">
              <span style={{ color: "var(--color-text-muted)" }}>
                {key === "requestsPerHour"
                  ? "Requests/hour"
                  : key === "apiKeys"
                    ? "API Keys"
                    : key === "dataHistory"
                      ? "Data History"
                      : key === "support"
                        ? "Support"
                        : key === "webhooks"
                          ? "Webhooks"
                          : "Uptime SLA"}
              </span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-5 flex-1 space-y-2">
          {plan.features.map((f) => (
            <div key={f.label} className="flex items-center gap-2">
              {f.included ? (
                <Check
                  size={16}
                  weight="bold"
                  style={{ color: "var(--color-success)" }}
                />
              ) : (
                <X
                  size={16}
                  weight="bold"
                  style={{ color: "var(--color-text-light)" }}
                />
              )}
              <span
                className="text-sm"
                style={{
                  color: f.included
                    ? "var(--color-text-secondary)"
                    : "var(--color-text-light)",
                }}
              >
                {f.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6">
          {isCurrent ? (
            <div
              className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold"
              style={{
                background: "var(--color-success-soft)",
                color: "var(--color-success)",
              }}
            >
              <CheckCircle size={16} weight="fill" />
              Current Plan
            </div>
          ) : plan.ctaVariant === "enterprise" ? (
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
                color: "white",
              }}
            >
              <Envelope size={16} weight="bold" />
              {plan.cta}
            </Link>
          ) : (
            <button
              onClick={() => onSelect(plan)}
              className={
                plan.ctaVariant === "primary"
                  ? "btn-primary w-full py-2.5 text-sm"
                  : "btn-secondary w-full py-2.5 text-sm"
              }
            >
              {plan.cta}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SubscriptionOverview() {
  const plan = plans.find((p) => p.id === currentSubscription.planId)!;
  const Icon = plan.icon;
  const [showInvoices, setShowInvoices] = useState(false);

  return (
    <div className="card overflow-hidden">
      <div
        className="flex items-center gap-3 border-b px-5 py-4"
        style={{
          background: "var(--color-surface-elevated)",
          borderColor: "var(--color-border-light)",
        }}
      >
        <CreditCard
          size={18}
          weight="duotone"
          style={{ color: "var(--color-accent)" }}
        />
        <h2 className="text-sm font-semibold">Current Subscription</h2>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: "var(--color-accent-soft)" }}
            >
              <Icon
                size={22}
                weight="duotone"
                style={{ color: "var(--color-accent)" }}
              />
            </div>
            <div>
              <p className="font-semibold">{plan.name} Plan</p>
              <p
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                ${currentSubscription.billingCycle === "monthly"
                  ? plan.monthlyPrice
                  : plan.annualPrice}
                /month · Billed {currentSubscription.billingCycle}
              </p>
            </div>
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
            style={{
              background: "var(--color-success-soft)",
              color: "var(--color-success)",
            }}
          >
            {currentSubscription.status}
          </span>
        </div>

        {/* Billing details */}
        <div
          className="mt-5 grid gap-4 rounded-lg p-4 sm:grid-cols-3"
          style={{ background: "var(--color-tertiary)" }}
        >
          <div>
            <p
              className="text-[11px] font-medium uppercase tracking-wide"
              style={{ color: "var(--color-text-light)" }}
            >
              Next billing date
            </p>
            <p className="mt-1 text-sm font-semibold">
              {currentSubscription.currentPeriodEnd}
            </p>
          </div>
          <div>
            <p
              className="text-[11px] font-medium uppercase tracking-wide"
              style={{ color: "var(--color-text-light)" }}
            >
              Payment method
            </p>
            <p className="mt-1 text-sm font-semibold">
              {currentSubscription.paymentMethod.brand.toUpperCase()} ····{" "}
              {currentSubscription.paymentMethod.last4}
            </p>
          </div>
          <div>
            <p
              className="text-[11px] font-medium uppercase tracking-wide"
              style={{ color: "var(--color-text-light)" }}
            >
              Expires
            </p>
            <p className="mt-1 text-sm font-semibold">
              {String(currentSubscription.paymentMethod.expMonth).padStart(2, "0")}/
              {currentSubscription.paymentMethod.expYear}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn-secondary px-4 py-2 text-xs">
            <CreditCard size={14} weight="bold" className="mr-1.5 inline-block" />
            Update Payment Method
          </button>
          <button
            className="rounded-lg px-4 py-2 text-xs font-semibold transition-colors"
            style={{ color: "var(--color-error)" }}
          >
            Cancel Subscription
          </button>
        </div>

        {/* Invoice history */}
        <div className="mt-5">
          <button
            onClick={() => setShowInvoices(!showInvoices)}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            {showInvoices ? <CaretUp size={14} /> : <CaretDown size={14} />}
            Invoice History
          </button>

          {showInvoices && (
            <div
              className="mt-3 divide-y overflow-hidden rounded-lg border"
              style={{
                borderColor: "var(--color-border-light)",
                "--tw-divide-color": "var(--color-border-light)",
              } as React.CSSProperties}
            >
              {currentSubscription.invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center gap-4 px-4 py-3"
                >
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {inv.id}
                  </span>
                  <span className="flex-1 text-sm">{inv.date}</span>
                  <span className="text-sm font-semibold">
                    ${inv.amount.toLocaleString()}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                    style={{
                      background: "var(--color-success-soft)",
                      color: "var(--color-success)",
                    }}
                  >
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BespokeSection() {
  return (
    <div
      className="card overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--color-accent-soft), rgba(220, 38, 38, 0.04))",
      }}
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Crown
                size={28}
                weight="duotone"
                style={{ color: "var(--color-accent)" }}
              />
              <h3
                className="text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Need a Bespoke Solution?
              </h3>
            </div>
            <p
              className="mt-3 max-w-xl text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              For hedge funds, asset managers, and large institutions — we build
              fully customized data pipelines with dedicated infrastructure,
              on-premise deployment options, and white-glove support from our
              Singapore, India, and European offices.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                "Custom Data Pipelines",
                "On-Premise Deployment",
                "Dedicated Infrastructure",
                "Custom SLA (99.99%+)",
                "White-Glove Onboarding",
                "Multi-Region Delivery",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <Check
                    size={12}
                    weight="bold"
                    style={{ color: "var(--color-accent)" }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <Link
              href="/contact"
              className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm"
            >
              <Envelope size={16} weight="bold" />
              Contact Sales
            </Link>
            <p
              className="text-center text-[11px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              Typically responds within 24h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Page
// ============================================================

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [upgradeTarget, setUpgradeTarget] = useState<Plan | null>(null);

  const handleSelectPlan = (plan: Plan) => {
    setUpgradeTarget(plan);
  };

  const confirmUpgrade = () => {
    // TODO: Integrate with Stripe Checkout
    // await fetch('/api/stripe/create-checkout-session', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     priceId: upgradeTarget.stripePriceId,
    //     billingCycle,
    //   }),
    // });
    setUpgradeTarget(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Subscription Plans
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Choose the plan that fits your data needs. Powered by Stripe for
          secure billing.
        </p>
      </div>

      {/* Current subscription */}
      <SubscriptionOverview />

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4">
        <span
          className="text-sm font-medium"
          style={{
            color:
              billingCycle === "monthly"
                ? "var(--color-text)"
                : "var(--color-text-muted)",
          }}
        >
          Monthly
        </span>
        <button
          onClick={() =>
            setBillingCycle((prev) =>
              prev === "monthly" ? "annual" : "monthly"
            )
          }
          className="relative h-7 w-14 rounded-full transition-colors duration-200"
          style={{
            background:
              billingCycle === "annual"
                ? "var(--color-accent)"
                : "var(--color-border)",
          }}
        >
          <span
            className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200"
            style={{
              transform:
                billingCycle === "annual"
                  ? "translateX(30px)"
                  : "translateX(2px)",
            }}
          />
        </button>
        <span
          className="text-sm font-medium"
          style={{
            color:
              billingCycle === "annual"
                ? "var(--color-text)"
                : "var(--color-text-muted)",
          }}
        >
          Annual
        </span>
        {billingCycle === "annual" && (
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
            style={{
              background: "var(--color-success-soft)",
              color: "var(--color-success)",
            }}
          >
            Save up to 17%
          </span>
        )}
      </div>

      {/* Plans grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            isCurrent={plan.id === currentSubscription.planId}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>

      {/* Bespoke CTA */}
      <BespokeSection />

      {/* Stripe trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-4">
        {[
          "Secure payments via Stripe",
          "PCI DSS Level 1 Compliant",
          "Cancel anytime",
          "Upgrade or downgrade instantly",
        ].map((badge) => (
          <span
            key={badge}
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "var(--color-text-light)" }}
          >
            <Check size={14} weight="bold" style={{ color: "var(--color-success)" }} />
            {badge}
          </span>
        ))}
      </div>

      {/* Upgrade confirmation modal */}
      {upgradeTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => {
            if (e.target === e.currentTarget) setUpgradeTarget(null);
          }}
        >
          <div
            className="mx-4 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fade-in-up"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3
              className="text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Confirm Plan Change
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              You are switching from{" "}
              <strong>
                {plans.find((p) => p.id === currentSubscription.planId)?.name}
              </strong>{" "}
              to <strong>{upgradeTarget.name}</strong>.
            </p>

            <div
              className="mt-4 rounded-lg p-4"
              style={{ background: "var(--color-tertiary)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{upgradeTarget.name} Plan</span>
                <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  $
                  {billingCycle === "monthly"
                    ? upgradeTarget.monthlyPrice
                    : upgradeTarget.annualPrice}
                  /mo
                </span>
              </div>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                Billed {billingCycle}
                {billingCycle === "annual" &&
                  ` ($${((upgradeTarget.annualPrice ?? 0) * 12).toLocaleString()}/year)`}
              </p>
            </div>

            <div
              className="mt-4 flex items-start gap-2 rounded-lg p-3"
              style={{
                background: "var(--color-info-soft)",
                border: "1px solid rgba(37, 99, 235, 0.12)",
              }}
            >
              <Warning
                size={16}
                weight="fill"
                style={{ color: "var(--color-info)" }}
                className="mt-0.5 shrink-0"
              />
              <p className="text-xs" style={{ color: "var(--color-info)" }}>
                You will be redirected to Stripe Checkout to complete your
                payment. Prorated charges apply for mid-cycle upgrades.
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setUpgradeTarget(null)}
                className="btn-secondary flex-1 py-2.5 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpgrade}
                className="btn-primary flex items-center justify-center gap-2 flex-1 py-2.5 text-sm"
              >
                <ArrowRight size={16} weight="bold" />
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
