"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Key,
  Plug,
  ChartLine,
  Lightning,
  ArrowRight,
  CheckCircle,
  Clock,
  Warning,
  Globe,
  Database,
  TrendUp,
  Copy,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";

// ============================================================
// Mock data — replace with real API calls
// ============================================================

const stats = [
  {
    label: "API Requests Today",
    value: "12,847",
    change: "+14.2%",
    trend: "up" as const,
    icon: Lightning,
  },
  {
    label: "Active API Keys",
    value: "3",
    change: "0",
    trend: "neutral" as const,
    icon: Key,
  },
  {
    label: "Avg Response Time",
    value: "45ms",
    change: "-8.3%",
    trend: "up" as const,
    icon: Clock,
  },
  {
    label: "Uptime (30d)",
    value: "99.97%",
    change: "+0.02%",
    trend: "up" as const,
    icon: Globe,
  },
];

const recentActivity = [
  {
    type: "success" as const,
    message: "GET /v1/sentiment/AAPL — 200 OK",
    time: "2 min ago",
  },
  {
    type: "success" as const,
    message: "GET /v1/news/feed?limit=50 — 200 OK",
    time: "5 min ago",
  },
  {
    type: "warning" as const,
    message: "Rate limit warning — 85% of hourly quota",
    time: "12 min ago",
  },
  {
    type: "success" as const,
    message: "POST /v1/webhooks/subscribe — 201 Created",
    time: "28 min ago",
  },
  {
    type: "error" as const,
    message: "GET /v1/eod/INVALID — 404 Not Found",
    time: "1 hr ago",
  },
  {
    type: "success" as const,
    message: "GET /v1/fundamentals/MSFT — 200 OK",
    time: "1 hr ago",
  },
];

const quickLinks = [
  {
    label: "Manage API Keys",
    description: "Create, rotate, or revoke API keys",
    href: "/dashboard/api-keys",
    icon: Key,
  },
  {
    label: "API Explorer",
    description: "Test endpoints interactively",
    href: "/dashboard/explorer",
    icon: Plug,
  },
  {
    label: "Usage Analytics",
    description: "Monitor requests, latency & errors",
    href: "/dashboard/usage",
    icon: ChartLine,
  },
];

const endpoints = [
  { method: "GET", path: "/v1/sentiment/{ticker}", status: "operational" },
  { method: "GET", path: "/v1/news/feed", status: "operational" },
  { method: "GET", path: "/v1/eod/{ticker}", status: "operational" },
  { method: "GET", path: "/v1/fundamentals/{ticker}", status: "operational" },
  { method: "POST", path: "/v1/webhooks/subscribe", status: "operational" },
  { method: "GET", path: "/v1/corporate-actions", status: "degraded" },
];

// ============================================================
// Components
// ============================================================

function StatCard({
  stat,
}: {
  stat: (typeof stats)[0];
}) {
  const Icon = stat.icon;
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: "var(--color-text-muted)" }}
          >
            {stat.label}
          </p>
          <p
            className="mt-2 text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {stat.value}
          </p>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: "var(--color-accent-soft)" }}
        >
          <Icon size={20} weight="duotone" style={{ color: "var(--color-accent)" }} />
        </div>
      </div>
      {stat.change !== "0" && (
        <div className="mt-3 flex items-center gap-1">
          <TrendUp
            size={14}
            weight="bold"
            style={{
              color:
                stat.trend === "up"
                  ? "#16a34a"
                  : "#dc2626",
              transform: stat.trend === "up" ? "none" : "rotate(180deg)",
            }}
          />
          <span
            className="text-xs font-semibold"
            style={{
              color: stat.trend === "up" ? "#16a34a" : "#dc2626",
            }}
          >
            {stat.change}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--color-text-light)" }}
          >
            vs yesterday
          </span>
        </div>
      )}
    </div>
  );
}

function ActiveKeyPreview() {
  const [visible, setVisible] = useState(false);
  const apiKey = "itk_live_a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5";

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-text-muted)" }}
        >
          Primary API Key
        </p>
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
          style={{
            background: "rgba(22, 163, 74, 0.1)",
            color: "#16a34a",
          }}
        >
          Active
        </span>
      </div>
      <div
        className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
        style={{
          background: "var(--color-tertiary)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <code className="flex-1 truncate text-sm">
          {visible ? apiKey : "itk_live_••••••••••••••••••••••••"}
        </code>
        <button
          onClick={() => setVisible(!visible)}
          className="shrink-0 p-1 transition-colors"
          style={{ color: "var(--color-text-muted)" }}
          title={visible ? "Hide" : "Reveal"}
        >
          {visible ? <EyeSlash size={16} /> : <Eye size={16} />}
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(apiKey)}
          className="shrink-0 p-1 transition-colors"
          style={{ color: "var(--color-text-muted)" }}
          title="Copy"
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Page
// ============================================================

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1
          className="text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Dashboard
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Monitor your iFeed API usage, manage keys, and explore endpoints.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Two-column: Quick links + API key */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick links */}
        <div className="space-y-3 lg:col-span-2">
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Quick Actions
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="card hover-lift flex flex-col gap-3 p-5"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: "var(--color-accent-soft)" }}
                  >
                    <Icon
                      size={20}
                      weight="duotone"
                      style={{ color: "var(--color-accent)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{link.label}</p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="mt-auto"
                    style={{ color: "var(--color-accent)" }}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* API Key preview */}
        <div className="space-y-3">
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            API Key
          </h2>
          <ActiveKeyPreview />
        </div>
      </div>

      {/* Two-column: Activity + Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <div>
          <h2
            className="mb-3 text-lg font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Recent Activity
          </h2>
          <div
            className="card divide-y overflow-hidden"
            style={
              { "--tw-divide-color": "var(--color-border-light)" } as React.CSSProperties
            }
          >
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                {item.type === "success" && (
                  <CheckCircle
                    size={18}
                    weight="fill"
                    style={{ color: "#16a34a" }}
                  />
                )}
                {item.type === "warning" && (
                  <Warning
                    size={18}
                    weight="fill"
                    style={{ color: "#d97706" }}
                  />
                )}
                {item.type === "error" && (
                  <Warning
                    size={18}
                    weight="fill"
                    style={{ color: "#dc2626" }}
                  />
                )}
                <p className="flex-1 truncate text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                  {item.message}
                </p>
                <span
                  className="shrink-0 text-xs"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Endpoint status */}
        <div>
          <h2
            className="mb-3 text-lg font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Endpoint Status
          </h2>
          <div
            className="card divide-y overflow-hidden"
            style={
              { "--tw-divide-color": "var(--color-border-light)" } as React.CSSProperties
            }
          >
            {endpoints.map((ep, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <span
                  className="rounded px-1.5 py-0.5 text-[11px] font-bold"
                  style={{
                    background:
                      ep.method === "GET"
                        ? "rgba(22, 163, 74, 0.1)"
                        : "rgba(37, 99, 235, 0.1)",
                    color:
                      ep.method === "GET" ? "#16a34a" : "#2563eb",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {ep.method}
                </span>
                <code
                  className="flex-1 truncate text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {ep.path}
                </code>
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background:
                        ep.status === "operational"
                          ? "#16a34a"
                          : "#d97706",
                    }}
                  />
                  <span
                    className="text-xs capitalize"
                    style={{
                      color:
                        ep.status === "operational"
                          ? "#16a34a"
                          : "#d97706",
                    }}
                  >
                    {ep.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data coverage banner */}
      <div
        className="card flex items-center gap-4 p-6"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-soft), rgba(220, 38, 38, 0.04))",
        }}
      >
        <Database
          size={32}
          weight="duotone"
          style={{ color: "var(--color-accent)" }}
        />
        <div className="flex-1">
          <p className="font-semibold">Data Coverage</p>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            100,000+ companies across 60+ countries — Sentiment, Fundamentals, EOD, News & more.
          </p>
        </div>
        <Link
          href="/dashboard/explorer"
          className="btn-primary shrink-0 px-5 py-2.5 text-sm"
        >
          Explore API
        </Link>
      </div>
    </div>
  );
}
