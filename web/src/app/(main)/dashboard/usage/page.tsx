"use client";

import { useState } from "react";
import {
  ChartLine,
  Lightning,
  Clock,
  Warning,
} from "@phosphor-icons/react";

// ============================================================
// Mock data
// ============================================================

const periods = ["24h", "7d", "30d", "90d"] as const;
type Period = (typeof periods)[number];

const summaryByPeriod: Record<
  Period,
  { requests: string; errors: string; avgLatency: string; p99Latency: string }
> = {
  "24h": {
    requests: "12,847",
    errors: "23",
    avgLatency: "45ms",
    p99Latency: "182ms",
  },
  "7d": {
    requests: "87,234",
    errors: "156",
    avgLatency: "48ms",
    p99Latency: "195ms",
  },
  "30d": {
    requests: "342,891",
    errors: "612",
    avgLatency: "46ms",
    p99Latency: "188ms",
  },
  "90d": {
    requests: "1,024,567",
    errors: "1,847",
    avgLatency: "47ms",
    p99Latency: "191ms",
  },
};

const hourlyData = [
  { hour: "00:00", requests: 312, errors: 1, latency: 42 },
  { hour: "01:00", requests: 245, errors: 0, latency: 38 },
  { hour: "02:00", requests: 198, errors: 0, latency: 35 },
  { hour: "03:00", requests: 167, errors: 1, latency: 33 },
  { hour: "04:00", requests: 203, errors: 0, latency: 36 },
  { hour: "05:00", requests: 289, errors: 0, latency: 39 },
  { hour: "06:00", requests: 456, errors: 2, latency: 44 },
  { hour: "07:00", requests: 634, errors: 1, latency: 48 },
  { hour: "08:00", requests: 821, errors: 3, latency: 52 },
  { hour: "09:00", requests: 945, errors: 2, latency: 55 },
  { hour: "10:00", requests: 878, errors: 1, latency: 51 },
  { hour: "11:00", requests: 756, errors: 2, latency: 49 },
  { hour: "12:00", requests: 698, errors: 1, latency: 46 },
  { hour: "13:00", requests: 732, errors: 0, latency: 47 },
  { hour: "14:00", requests: 845, errors: 2, latency: 50 },
  { hour: "15:00", requests: 912, errors: 3, latency: 54 },
  { hour: "16:00", requests: 867, errors: 1, latency: 52 },
  { hour: "17:00", requests: 743, errors: 2, latency: 48 },
  { hour: "18:00", requests: 621, errors: 1, latency: 45 },
  { hour: "19:00", requests: 534, errors: 0, latency: 43 },
  { hour: "20:00", requests: 467, errors: 1, latency: 41 },
  { hour: "21:00", requests: 389, errors: 0, latency: 39 },
  { hour: "22:00", requests: 345, errors: 1, latency: 37 },
  { hour: "23:00", requests: 298, errors: 0, latency: 36 },
];

const endpointBreakdown = [
  { path: "/v1/sentiment/{ticker}", requests: 4521, pct: 35.2, avgMs: 42 },
  { path: "/v1/news/feed", requests: 3187, pct: 24.8, avgMs: 67 },
  { path: "/v1/eod/{ticker}", requests: 2344, pct: 18.2, avgMs: 31 },
  { path: "/v1/fundamentals/{ticker}", requests: 1689, pct: 13.1, avgMs: 55 },
  { path: "/v1/corporate-actions", requests: 734, pct: 5.7, avgMs: 48 },
  { path: "/v1/webhooks/subscribe", requests: 372, pct: 2.9, avgMs: 89 },
];

const statusCodes = [
  { code: "200 OK", count: 12547, pct: 97.7, color: "var(--color-success)" },
  { code: "304 Not Modified", count: 154, pct: 1.2, color: "#6366f1" },
  { code: "400 Bad Request", count: 89, pct: 0.7, color: "var(--color-warning)" },
  { code: "404 Not Found", count: 34, pct: 0.3, color: "#f59e0b" },
  { code: "429 Rate Limited", count: 18, pct: 0.1, color: "var(--color-error)" },
  { code: "500 Server Error", count: 5, pct: 0.04, color: "var(--color-error)" },
];

const rateLimitStatus = {
  used: 8547,
  limit: 10000,
  resets: "32 min",
};

// ============================================================
// Bar chart component (pure CSS)
// ============================================================

function MiniBarChart({
  data,
  maxValue,
}: {
  data: { label: string; value: number }[];
  maxValue: number;
}) {
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 120 }}>
      {data.map((d, i) => (
        <div key={i} className="group relative flex-1">
          <div
            className="w-full rounded-t transition-all duration-200"
            style={{
              height: `${(d.value / maxValue) * 100}%`,
              background: "var(--color-accent)",
              opacity: 0.7,
              minHeight: 2,
            }}
          />
          {/* Tooltip */}
          <div
            className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded-lg px-2.5 py-1.5 text-[10px] shadow-lg group-hover:block"
            style={{
              background: "var(--color-text)",
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            <strong>{d.value.toLocaleString()}</strong> req
            <br />
            {d.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full"
      style={{ background: "var(--color-tertiary)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${pct}%`,
          background: color || "var(--color-accent)",
        }}
      />
    </div>
  );
}

// ============================================================
// Page
// ============================================================

export default function UsagePage() {
  const [period, setPeriod] = useState<Period>("24h");
  const summary = summaryByPeriod[period];

  const maxRequests = Math.max(...hourlyData.map((d) => d.requests));

  const ratePct = (rateLimitStatus.used / rateLimitStatus.limit) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Usage Analytics
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Monitor API request volume, latency, errors, and rate limits.
          </p>
        </div>

        {/* Period selector */}
        <div
          className="flex rounded-lg p-1"
          style={{ background: "var(--color-tertiary)" }}
        >
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="rounded-md px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                background:
                  period === p ? "var(--color-surface)" : "transparent",
                color:
                  period === p
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                boxShadow:
                  period === p
                    ? "0 1px 3px rgba(0,0,0,0.08)"
                    : "none",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {([
          { icon: Lightning, color: "var(--color-accent)", label: "Total Requests", value: summary.requests },
          { icon: Warning, color: "var(--color-error)", label: "Errors", value: summary.errors },
          { icon: Clock, color: "var(--color-info)", label: "Avg Latency", value: summary.avgLatency },
          { icon: ChartLine, color: "var(--color-warning)", label: "P99 Latency", value: summary.p99Latency },
        ] as const).map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card p-5">
              <div className="flex items-center gap-2">
                <Icon size={16} weight="duotone" style={{ color: card.color }} />
                <span
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {card.label}
                </span>
              </div>
              <p
                className="mt-2 text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart + Rate limit */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Request chart */}
        <div className="card p-5 lg:col-span-2">
          <h3
            className="mb-1 text-sm font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Requests Over Time
          </h3>
          <p
            className="mb-4 text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Hourly request volume (last 24 hours)
          </p>
          <MiniBarChart
            data={hourlyData.map((d) => ({
              label: d.hour,
              value: d.requests,
            }))}
            maxValue={maxRequests}
          />
          <div
            className="mt-2 flex justify-between text-[10px]"
            style={{ color: "var(--color-text-light)" }}
          >
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:00</span>
          </div>
        </div>

        {/* Rate limit */}
        <div className="card p-5">
          <h3
            className="mb-1 text-sm font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Rate Limit
          </h3>
          <p
            className="mb-4 text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Current hourly window
          </p>

          <div className="flex items-end justify-center gap-1 py-4">
            <span
              className="text-4xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color:
                  ratePct > 90
                    ? "var(--color-error)"
                    : ratePct > 75
                      ? "var(--color-warning)"
                      : "var(--color-text)",
              }}
            >
              {ratePct.toFixed(1)}%
            </span>
            <span
              className="mb-1 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              used
            </span>
          </div>

          <ProgressBar
            value={rateLimitStatus.used}
            max={rateLimitStatus.limit}
            color={
              ratePct > 90
                ? "var(--color-error)"
                : ratePct > 75
                  ? "var(--color-warning)"
                  : "var(--color-accent)"
            }
          />

          <div
            className="mt-3 flex justify-between text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span>
              {rateLimitStatus.used.toLocaleString()} /{" "}
              {rateLimitStatus.limit.toLocaleString()}
            </span>
            <span>Resets in {rateLimitStatus.resets}</span>
          </div>

          {ratePct > 75 && (
            <div
              className="mt-4 flex items-start gap-2 rounded-lg p-3"
              style={{
                background:
                  ratePct > 90
                    ? "var(--color-error-soft)"
                    : "var(--color-warning-soft)",
              }}
            >
              <Warning
                size={14}
                weight="fill"
                style={{
                  color: ratePct > 90 ? "var(--color-error)" : "var(--color-warning)",
                }}
                className="mt-0.5 shrink-0"
              />
              <p
                className="text-[11px]"
                style={{
                  color: ratePct > 90 ? "var(--color-error)" : "var(--color-warning)",
                }}
              >
                {ratePct > 90
                  ? "Critical: Approaching rate limit. Requests may be throttled."
                  : "Warning: High usage. Consider upgrading your plan."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Endpoint breakdown + Status codes */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Endpoint breakdown */}
        <div className="card overflow-hidden">
          <div className="p-5 pb-3">
            <h3
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Requests by Endpoint
            </h3>
          </div>
          <div
            className="divide-y"
            style={
              {
                "--tw-divide-color": "var(--color-border-light)",
              } as React.CSSProperties
            }
          >
            {endpointBreakdown.map((ep) => (
              <div
                key={ep.path}
                className="flex items-center gap-4 px-5 py-3"
              >
                <div className="min-w-0 flex-1">
                  <code
                    className="block truncate text-xs"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {ep.path}
                  </code>
                  <div className="mt-1.5">
                    <ProgressBar
                      value={ep.pct}
                      max={100}
                    />
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold">
                    {ep.requests.toLocaleString()}
                  </p>
                  <p
                    className="text-[11px]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {ep.pct}% · {ep.avgMs}ms
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status codes */}
        <div className="card overflow-hidden">
          <div className="p-5 pb-3">
            <h3
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Response Status Codes
            </h3>
          </div>
          <div
            className="divide-y"
            style={
              {
                "--tw-divide-color": "var(--color-border-light)",
              } as React.CSSProperties
            }
          >
            {statusCodes.map((sc) => (
              <div
                key={sc.code}
                className="flex items-center gap-4 px-5 py-3"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: sc.color }}
                />
                <span
                  className="flex-1 text-sm font-medium"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {sc.code}
                </span>
                <span className="text-sm font-semibold">
                  {sc.count.toLocaleString()}
                </span>
                <span
                  className="w-12 text-right text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {sc.pct}%
                </span>
              </div>
            ))}
          </div>

          {/* Visual bar for status distribution */}
          <div className="px-5 py-4">
            <div className="flex h-3 overflow-hidden rounded-full">
              {statusCodes.map((sc) => (
                <div
                  key={sc.code}
                  style={{
                    width: `${sc.pct}%`,
                    background: sc.color,
                    minWidth: sc.pct > 0 ? 3 : 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
