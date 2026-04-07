"use client";

import { useState } from "react";
import {
  Play,
  Copy,
  CheckCircle,
  Clock,
  CaretDown,
  Info,
} from "@phosphor-icons/react";

// ============================================================
// Endpoint definitions
// ============================================================

type Param = {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
  options?: string[];
};

type Endpoint = {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  name: string;
  description: string;
  category: string;
  params: Param[];
  exampleResponse: string;
};

const endpoints: Endpoint[] = [
  {
    id: "sentiment-ticker",
    method: "GET",
    path: "/v1/sentiment/{ticker}",
    name: "Get Sentiment Score",
    description:
      "Retrieve real-time sentiment analysis score for a specific ticker symbol, computed from 2,000+ news and social media sources.",
    category: "Sentiment",
    params: [
      {
        name: "ticker",
        type: "path",
        required: true,
        description: "Stock ticker symbol (e.g. AAPL, MSFT)",
      },
      {
        name: "period",
        type: "query",
        required: false,
        description: "Time period for sentiment aggregation",
        default: "1d",
        options: ["1h", "6h", "1d", "7d", "30d"],
      },
      {
        name: "sources",
        type: "query",
        required: false,
        description: "Filter by source type",
        options: ["news", "social", "all"],
        default: "all",
      },
    ],
    exampleResponse: JSON.stringify(
      {
        ticker: "AAPL",
        sentiment: {
          score: 0.72,
          label: "bullish",
          confidence: 0.89,
        },
        volume: {
          total_mentions: 1247,
          news: 423,
          social: 824,
        },
        period: "1d",
        timestamp: "2026-04-06T10:30:00Z",
      },
      null,
      2
    ),
  },
  {
    id: "news-feed",
    method: "GET",
    path: "/v1/news/feed",
    name: "News Feed",
    description:
      "Stream curated financial news articles from 2,000+ global business news outlets with entity tagging and sentiment labels.",
    category: "News",
    params: [
      {
        name: "tickers",
        type: "query",
        required: false,
        description: "Comma-separated ticker symbols to filter",
      },
      {
        name: "limit",
        type: "query",
        required: false,
        description: "Number of articles to return (max 100)",
        default: "20",
      },
      {
        name: "language",
        type: "query",
        required: false,
        description: "Language filter (ISO 639-1)",
        default: "en",
        options: ["en", "fr", "de", "es", "zh", "ja"],
      },
      {
        name: "from",
        type: "query",
        required: false,
        description: "Start date (ISO 8601)",
      },
    ],
    exampleResponse: JSON.stringify(
      {
        data: [
          {
            id: "n_8f2a1b3c",
            title: "Apple Reports Record Q1 Revenue Driven by Services Growth",
            source: "Reuters",
            published_at: "2026-04-06T09:15:00Z",
            url: "https://example.com/article",
            tickers: ["AAPL"],
            sentiment: { score: 0.81, label: "bullish" },
            language: "en",
          },
        ],
        meta: { total: 847, limit: 20, offset: 0 },
      },
      null,
      2
    ),
  },
  {
    id: "eod-ticker",
    method: "GET",
    path: "/v1/eod/{ticker}",
    name: "End of Day Prices",
    description:
      "Historical end-of-day stock prices including OHLCV data, adjusted prices, and corporate action adjustments.",
    category: "Market Data",
    params: [
      {
        name: "ticker",
        type: "path",
        required: true,
        description: "Stock ticker symbol",
      },
      {
        name: "from",
        type: "query",
        required: false,
        description: "Start date (YYYY-MM-DD)",
      },
      {
        name: "to",
        type: "query",
        required: false,
        description: "End date (YYYY-MM-DD)",
      },
      {
        name: "adjusted",
        type: "query",
        required: false,
        description: "Include adjusted prices",
        default: "true",
        options: ["true", "false"],
      },
    ],
    exampleResponse: JSON.stringify(
      {
        ticker: "AAPL",
        data: [
          {
            date: "2026-04-04",
            open: 198.42,
            high: 201.15,
            low: 197.89,
            close: 200.67,
            adj_close: 200.67,
            volume: 52341890,
          },
        ],
        currency: "USD",
        exchange: "NASDAQ",
      },
      null,
      2
    ),
  },
  {
    id: "fundamentals-ticker",
    method: "GET",
    path: "/v1/fundamentals/{ticker}",
    name: "Fundamentals",
    description:
      "Company fundamental data — financial statements, balance sheets, cash flows, key ratios, and company profile.",
    category: "Fundamentals",
    params: [
      {
        name: "ticker",
        type: "path",
        required: true,
        description: "Stock ticker symbol",
      },
      {
        name: "statement",
        type: "query",
        required: false,
        description: "Financial statement type",
        options: ["income", "balance", "cashflow", "ratios", "profile"],
        default: "profile",
      },
      {
        name: "period",
        type: "query",
        required: false,
        description: "Reporting period",
        options: ["annual", "quarterly"],
        default: "annual",
      },
    ],
    exampleResponse: JSON.stringify(
      {
        ticker: "AAPL",
        profile: {
          name: "Apple Inc.",
          sector: "Technology",
          industry: "Consumer Electronics",
          market_cap: 3120000000000,
          employees: 164000,
          description: "Apple Inc. designs, manufactures, and markets smartphones...",
        },
      },
      null,
      2
    ),
  },
  {
    id: "corporate-actions",
    method: "GET",
    path: "/v1/corporate-actions",
    name: "Corporate Actions",
    description:
      "Dividends, stock splits, M&A events, IPOs, and other corporate actions across 156 countries.",
    category: "Corporate",
    params: [
      {
        name: "ticker",
        type: "query",
        required: false,
        description: "Filter by ticker symbol",
      },
      {
        name: "type",
        type: "query",
        required: false,
        description: "Action type filter",
        options: ["dividend", "split", "merger", "ipo", "buyback"],
      },
      {
        name: "from",
        type: "query",
        required: false,
        description: "Start date (YYYY-MM-DD)",
      },
      {
        name: "country",
        type: "query",
        required: false,
        description: "Country ISO code (e.g. US, SG, IN)",
      },
    ],
    exampleResponse: JSON.stringify(
      {
        data: [
          {
            ticker: "AAPL",
            type: "dividend",
            ex_date: "2026-04-10",
            amount: 0.25,
            currency: "USD",
            frequency: "quarterly",
          },
        ],
        meta: { total: 12, limit: 20, offset: 0 },
      },
      null,
      2
    ),
  },
  {
    id: "webhooks-subscribe",
    method: "POST",
    path: "/v1/webhooks/subscribe",
    name: "Subscribe Webhook",
    description:
      "Register a webhook endpoint to receive real-time push notifications for sentiment alerts, price movements, and news events.",
    category: "Webhooks",
    params: [
      {
        name: "url",
        type: "body",
        required: true,
        description: "Your HTTPS webhook endpoint URL",
      },
      {
        name: "events",
        type: "body",
        required: true,
        description: "Event types to subscribe to",
        options: [
          "sentiment.alert",
          "news.published",
          "price.movement",
          "corporate.action",
        ],
      },
      {
        name: "tickers",
        type: "body",
        required: false,
        description: "Filter events by ticker symbols",
      },
    ],
    exampleResponse: JSON.stringify(
      {
        id: "wh_a1b2c3d4",
        url: "https://your-app.com/webhook",
        events: ["sentiment.alert", "news.published"],
        tickers: ["AAPL", "MSFT"],
        status: "active",
        secret: "whsec_abc123...",
        created_at: "2026-04-06T10:30:00Z",
      },
      null,
      2
    ),
  },
];

const categories = [...new Set(endpoints.map((e) => e.category))];

const methodColors: Record<string, { bg: string; color: string }> = {
  GET: { bg: "var(--color-success-soft)", color: "var(--color-success)" },
  POST: { bg: "var(--color-info-soft)", color: "var(--color-info)" },
  PUT: { bg: "var(--color-warning-soft)", color: "var(--color-warning)" },
  DELETE: { bg: "var(--color-error-soft)", color: "var(--color-error)" },
};

// ============================================================
// Page
// ============================================================

export default function ApiExplorerPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(
    endpoints[0]
  );
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const selectEndpoint = (ep: Endpoint) => {
    setSelectedEndpoint(ep);
    setParamValues({});
    setResponse(null);
    setResponseTime(null);
  };

  const executeRequest = () => {
    setLoading(true);
    setResponse(null);
    // Simulate API call
    const delay = Math.floor(Math.random() * 80) + 20;
    setTimeout(() => {
      setResponse(selectedEndpoint.exampleResponse);
      setResponseTime(delay);
      setLoading(false);
    }, delay + 200);
  };

  const buildCurlCommand = () => {
    let path = selectedEndpoint.path;
    const queryParams: string[] = [];

    selectedEndpoint.params.forEach((p) => {
      const val = paramValues[p.name] || p.default || "";
      if (!val) return;
      if (p.type === "path") {
        path = path.replace(`{${p.name}}`, val);
      } else if (p.type === "query") {
        queryParams.push(`${p.name}=${val}`);
      }
    });

    const url = `https://api.infotrie.com${path}${
      queryParams.length ? "?" + queryParams.join("&") : ""
    }`;

    if (selectedEndpoint.method === "POST") {
      const bodyParams: Record<string, string> = {};
      selectedEndpoint.params
        .filter((p) => p.type === "body")
        .forEach((p) => {
          if (paramValues[p.name]) bodyParams[p.name] = paramValues[p.name];
        });
      return `curl -X POST "${url}" \\\n  -H "Authorization: Bearer itk_live_YOUR_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(bodyParams, null, 2)}'`;
    }

    return `curl "${url}" \\\n  -H "Authorization: Bearer itk_live_YOUR_KEY"`;
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(buildCurlCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredEndpoints = filterCategory
    ? endpoints.filter((e) => e.category === filterCategory)
    : endpoints;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          API Explorer
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Test iFeed API endpoints interactively. Select an endpoint, configure
          parameters, and see live responses.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Endpoint list */}
        <div className="space-y-3">
          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilterCategory(null)}
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                background: !filterCategory
                  ? "var(--color-accent)"
                  : "var(--color-tertiary)",
                color: !filterCategory
                  ? "white"
                  : "var(--color-text-secondary)",
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                style={{
                  background:
                    filterCategory === cat
                      ? "var(--color-accent)"
                      : "var(--color-tertiary)",
                  color:
                    filterCategory === cat
                      ? "white"
                      : "var(--color-text-secondary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Endpoints */}
          <div className="space-y-1.5">
            {filteredEndpoints.map((ep) => {
              const mc = methodColors[ep.method];
              const isSelected = selectedEndpoint.id === ep.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => selectEndpoint(ep)}
                  className="w-full rounded-xl p-3 text-left transition-all"
                  style={{
                    background: isSelected
                      ? "var(--color-accent-soft)"
                      : "var(--color-surface)",
                    border: `1px solid ${
                      isSelected
                        ? "var(--color-accent)"
                        : "var(--color-border)"
                    }`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                      style={{
                        background: mc.bg,
                        color: mc.color,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {ep.method}
                    </span>
                    <span className="text-sm font-semibold">{ep.name}</span>
                  </div>
                  <code
                    className="mt-1.5 block truncate text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {ep.path}
                  </code>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-5">
          {/* Endpoint info */}
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <span
                className="rounded px-2 py-1 text-xs font-bold"
                style={{
                  ...methodColors[selectedEndpoint.method],
                  fontFamily: "var(--font-mono)",
                }}
              >
                {selectedEndpoint.method}
              </span>
              <code className="text-sm font-semibold">
                {selectedEndpoint.path}
              </code>
            </div>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {selectedEndpoint.description}
            </p>
          </div>

          {/* Parameters */}
          <div className="card p-5">
            <h3 className="mb-4 text-sm font-semibold">Parameters</h3>
            <div className="space-y-4">
              {selectedEndpoint.params.map((param) => (
                <div key={param.name}>
                  <div className="mb-1.5 flex items-center gap-2">
                    <label className="text-sm font-medium">{param.name}</label>
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px]"
                      style={{
                        background: "var(--color-tertiary)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {param.type}
                    </span>
                    {param.required && (
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: "var(--color-error)" }}
                      >
                        required
                      </span>
                    )}
                  </div>
                  <p
                    className="mb-1.5 text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {param.description}
                  </p>
                  {param.options ? (
                    <div className="relative">
                      <select
                        value={paramValues[param.name] || param.default || ""}
                        onChange={(e) =>
                          setParamValues((prev) => ({
                            ...prev,
                            [param.name]: e.target.value,
                          }))
                        }
                        className="w-full appearance-none rounded-lg border px-3 py-2 pr-8 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                        style={{
                          borderColor: "var(--color-border)",
                          background: "var(--color-surface)",
                        }}
                      >
                        {param.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <CaretDown
                        size={14}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color: "var(--color-text-muted)" }}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={paramValues[param.name] || ""}
                      onChange={(e) =>
                        setParamValues((prev) => ({
                          ...prev,
                          [param.name]: e.target.value,
                        }))
                      }
                      placeholder={param.default || `Enter ${param.name}...`}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                      style={{
                        borderColor: "var(--color-border)",
                        background: "var(--color-surface)",
                        fontFamily:
                          param.type === "path"
                            ? "var(--font-mono)"
                            : "inherit",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={executeRequest}
              disabled={loading}
              className="btn-primary mt-5 flex w-full items-center justify-center gap-2 py-2.5 text-sm"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              <Play size={16} weight="fill" />
              {loading ? "Executing..." : "Send Request"}
            </button>
          </div>

          {/* cURL command */}
          <div className="card overflow-hidden">
            <div
              className="flex items-center justify-between border-b px-4 py-2.5"
              style={{
                background: "var(--color-surface-elevated)",
                borderColor: "var(--color-border-light)",
              }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--color-text-muted)" }}
              >
                cURL
              </span>
              <button
                onClick={copyCurl}
                className="flex items-center gap-1 text-xs font-medium transition-colors"
                style={{
                  color: copied
                    ? "var(--color-success)"
                    : "var(--color-text-muted)",
                }}
              >
                {copied ? (
                  <CheckCircle size={14} weight="fill" />
                ) : (
                  <Copy size={14} />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre
              className="overflow-x-auto p-4 text-xs leading-relaxed"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-secondary)",
                background: "var(--color-tertiary)",
              }}
            >
              {buildCurlCommand()}
            </pre>
          </div>

          {/* Response */}
          {(response || loading) && (
            <div className="card overflow-hidden">
              <div
                className="flex items-center justify-between border-b px-4 py-2.5"
                style={{
                  background: "var(--color-surface-elevated)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Response
                  </span>
                  {response && (
                    <>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{
                          background: "var(--color-success-soft)",
                          color: "var(--color-success)",
                        }}
                      >
                        200 OK
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-light)" }}>
                        <Clock size={12} />
                        {responseTime}ms
                      </span>
                    </>
                  )}
                </div>
              </div>
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <div
                    className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
                    style={{ borderColor: "var(--color-accent)", borderTopColor: "transparent" }}
                  />
                </div>
              ) : (
                <pre
                  className="overflow-x-auto p-4 text-xs leading-relaxed"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-text-secondary)",
                    background: "var(--color-tertiary)",
                    maxHeight: "400px",
                  }}
                >
                  {response}
                </pre>
              )}
            </div>
          )}

          {/* Info box */}
          <div
            className="flex items-start gap-3 rounded-xl p-4"
            style={{
              background: "var(--color-info-soft)",
              border: "1px solid rgba(37, 99, 235, 0.12)",
            }}
          >
            <Info
              size={18}
              weight="fill"
              style={{ color: "var(--color-info)" }}
              className="mt-0.5 shrink-0"
            />
            <p className="text-xs" style={{ color: "var(--color-info)" }}>
              Responses shown here are example data. Connect your API key in{" "}
              <strong>Settings</strong> to send live requests to the iFeed API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
