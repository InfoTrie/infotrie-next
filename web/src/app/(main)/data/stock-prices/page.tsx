"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import {
  TrendUp,
  MagnifyingGlass,
  ArrowLeft,
  ChartLine,
  Globe,
  Clock,
  Database,
  Lightning,
  Funnel,
  CaretDown,
  CaretUp,
  Calendar,
  CurrencyDollar,
  ChartBar,
  ArrowsClockwise,
} from "@/lib/icons";

interface DailyPriceRecord {
  id: number;
  symbol_code: string;
  symbol_name: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjusted_close: number;
  volume: number;
  change: number;
  change_pct: number;
  previous_close: number;
  fifty_two_week_high: number;
  fifty_two_week_low: number;
  market_cap: string;
  pe_ratio: number | null;
  dividend_yield: number | null;
  exchange: string;
  currency: string;
  source: string;
  source_symbol: string;
  fetch_timestamp: string;
  batch_id: string;
}

const SOURCES = ["investing", "ft", "cnbc", "bloomberg", "reuters", "eodh"] as const;
type Source = (typeof SOURCES)[number];

const SOURCE_LABELS: Record<Source, string> = {
  investing: "Investing.com",
  ft: "Financial Times",
  cnbc: "CNBC",
  bloomberg: "Bloomberg",
  reuters: "Reuters",
  eodh: "EOD Historical",
};

const priceData: DailyPriceRecord[] = [
  {
    id: 1,
    symbol_code: "AIA",
    symbol_name: "Auckland International Airport Ltd",
    date: "2026-04-07",
    open: 7.45,
    high: 7.62,
    low: 7.40,
    close: 7.58,
    adjusted_close: 7.58,
    volume: 1_243_800,
    change: 0.13,
    change_pct: 1.74,
    previous_close: 7.45,
    fifty_two_week_high: 8.92,
    fifty_two_week_low: 6.81,
    market_cap: "11.2B",
    pe_ratio: 42.5,
    dividend_yield: 2.1,
    exchange: "XNZE",
    currency: "NZD",
    source: "investing",
    source_symbol: "NZSE:AIA",
    fetch_timestamp: "2026-04-07T00:45:12Z",
    batch_id: "Batch_00.45_1",
  },
  {
    id: 2,
    symbol_code: "AIA",
    symbol_name: "Auckland International Airport Ltd",
    date: "2026-04-07",
    open: 7.44,
    high: 7.61,
    low: 7.39,
    close: 7.57,
    adjusted_close: 7.57,
    volume: 1_243_800,
    change: 0.12,
    change_pct: 1.61,
    previous_close: 7.45,
    fifty_two_week_high: 8.92,
    fifty_two_week_low: 6.81,
    market_cap: "11.2B",
    pe_ratio: 42.5,
    dividend_yield: 2.1,
    exchange: "XNZE",
    currency: "NZD",
    source: "eodh",
    source_symbol: "AIA.NZ",
    fetch_timestamp: "2026-04-07T01:02:34Z",
    batch_id: "Batch_00.45_1",
  },
  {
    id: 3,
    symbol_code: "AIA",
    symbol_name: "Auckland International Airport Ltd",
    date: "2026-04-07",
    open: 7.45,
    high: 7.63,
    low: 7.41,
    close: 7.59,
    adjusted_close: 7.59,
    volume: 1_250_100,
    change: 0.14,
    change_pct: 1.88,
    previous_close: 7.45,
    fifty_two_week_high: 8.92,
    fifty_two_week_low: 6.81,
    market_cap: "11.2B",
    pe_ratio: 42.5,
    dividend_yield: 2.1,
    exchange: "XNZE",
    currency: "NZD",
    source: "bloomberg",
    source_symbol: "AIA:NZ",
    fetch_timestamp: "2026-04-07T01:15:08Z",
    batch_id: "Batch_00.45_1",
  },
  {
    id: 4,
    symbol_code: "AIR",
    symbol_name: "Air New Zealand Ltd",
    date: "2026-04-07",
    open: 0.575,
    high: 0.585,
    low: 0.57,
    close: 0.58,
    adjusted_close: 0.58,
    volume: 3_456_200,
    change: 0.005,
    change_pct: 0.87,
    previous_close: 0.575,
    fifty_two_week_high: 0.74,
    fifty_two_week_low: 0.48,
    market_cap: "1.95B",
    pe_ratio: 12.8,
    dividend_yield: null,
    exchange: "XNZE",
    currency: "NZD",
    source: "investing",
    source_symbol: "NZSE:AIR",
    fetch_timestamp: "2026-04-07T00:45:12Z",
    batch_id: "Batch_00.45_1",
  },
  {
    id: 5,
    symbol_code: "AIR",
    symbol_name: "Air New Zealand Ltd",
    date: "2026-04-07",
    open: 0.574,
    high: 0.586,
    low: 0.569,
    close: 0.581,
    adjusted_close: 0.581,
    volume: 3_456_200,
    change: 0.006,
    change_pct: 1.04,
    previous_close: 0.575,
    fifty_two_week_high: 0.74,
    fifty_two_week_low: 0.48,
    market_cap: "1.95B",
    pe_ratio: 12.8,
    dividend_yield: null,
    exchange: "XNZE",
    currency: "NZD",
    source: "eodh",
    source_symbol: "AIR.NZ",
    fetch_timestamp: "2026-04-07T01:02:34Z",
    batch_id: "Batch_00.45_1",
  },
  {
    id: 6,
    symbol_code: "AIR",
    symbol_name: "Air New Zealand Ltd",
    date: "2026-04-07",
    open: 0.576,
    high: 0.585,
    low: 0.571,
    close: 0.58,
    adjusted_close: 0.58,
    volume: 3_460_000,
    change: 0.005,
    change_pct: 0.87,
    previous_close: 0.575,
    fifty_two_week_high: 0.74,
    fifty_two_week_low: 0.48,
    market_cap: "1.95B",
    pe_ratio: 12.8,
    dividend_yield: null,
    exchange: "XNZE",
    currency: "NZD",
    source: "bloomberg",
    source_symbol: "AIR:NZ",
    fetch_timestamp: "2026-04-07T01:15:08Z",
    batch_id: "Batch_00.45_1",
  },
];

const columns: { key: keyof DailyPriceRecord; label: string }[] = [
  { key: "id", label: "#" },
  { key: "symbol_code", label: "Symbol" },
  { key: "symbol_name", label: "Name" },
  { key: "date", label: "Date" },
  { key: "open", label: "Open" },
  { key: "high", label: "High" },
  { key: "low", label: "Low" },
  { key: "close", label: "Close" },
  { key: "adjusted_close", label: "Adj Close" },
  { key: "volume", label: "Volume" },
  { key: "change", label: "Change" },
  { key: "change_pct", label: "Change %" },
  { key: "previous_close", label: "Prev Close" },
  { key: "fifty_two_week_high", label: "52W High" },
  { key: "fifty_two_week_low", label: "52W Low" },
  { key: "market_cap", label: "Market Cap" },
  { key: "pe_ratio", label: "P/E Ratio" },
  { key: "dividend_yield", label: "Div Yield %" },
  { key: "exchange", label: "Exchange" },
  { key: "currency", label: "Currency" },
  { key: "source", label: "Source" },
  { key: "source_symbol", label: "Source Symbol" },
  { key: "fetch_timestamp", label: "Fetched At" },
  { key: "batch_id", label: "Batch ID" },
];

const ESSENTIAL_COLUMNS: ReadonlySet<keyof DailyPriceRecord> = new Set([
  "symbol_code",
  "date",
  "open",
  "high",
  "low",
  "close",
  "volume",
  "change_pct",
  "source",
]);

const NUMERIC_FIELDS: ReadonlySet<keyof DailyPriceRecord> = new Set([
  "open",
  "high",
  "low",
  "close",
  "adjusted_close",
  "volume",
  "change",
  "change_pct",
  "previous_close",
  "fifty_two_week_high",
  "fifty_two_week_low",
  "pe_ratio",
  "dividend_yield",
]);

const keyStats = [
  { value: "24", label: "Price Fields" },
  { value: "6", label: "Data Sources" },
  { value: "Daily", label: "Update Frequency" },
  { value: "Global", label: "Market Coverage" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden pt-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(185, 28, 28, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(185, 28, 28, 0.04) 0%, transparent 50%)",
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/data"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--color-accent)" }}
          >
            <ArrowLeft size={16} weight="bold" />
            Data Categories
          </Link>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <Link
            href="/data/stocks"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--color-accent)" }}
          >
            Stock Symbols
          </Link>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
              style={{
                borderColor: "var(--color-accent)",
                color: "var(--color-accent)",
              }}
            >
              <TrendUp size={16} weight="duotone" />
              Daily Prices
            </div>
            <h1
              className="mb-6 text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              Stock Price
              <br />
              <span style={{ color: "var(--color-accent)" }}>
                Daily Feed
              </span>
            </h1>
            <p
              className="mb-8 max-w-xl text-lg leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Daily stock price data aggregated from multiple sources including
              Investing.com, Financial Times, CNBC, Bloomberg, Reuters, and EOD
              Historical Data. Prices are pulled and reconciled on a daily basis.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border p-6 text-center"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div
                  className="mb-1 text-3xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-accent)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type SortDirection = "asc" | "desc";

function formatCell(key: keyof DailyPriceRecord, value: unknown): string {
  if (value === null || value === undefined) return "-";
  if (key === "volume") return Number(value).toLocaleString();
  if (key === "change_pct") return `${Number(value).toFixed(2)}%`;
  if (key === "dividend_yield") return `${Number(value).toFixed(1)}%`;
  if (key === "fetch_timestamp") {
    return new Date(String(value)).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
  if (NUMERIC_FIELDS.has(key) && typeof value === "number") {
    return value.toFixed(value < 1 ? 3 : 2);
  }
  return String(value);
}

function PriceTable() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof DailyPriceRecord>("id");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [sourceFilter, setSourceFilter] = useState<Source | "all">("all");
  const [visibleColumns, setVisibleColumns] = useState<
    Set<keyof DailyPriceRecord>
  >(() => new Set(columns.map((c) => c.key)));
  const [showColumnFilter, setShowColumnFilter] = useState(false);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = priceData.filter((row) => {
      if (sourceFilter !== "all" && row.source !== sourceFilter) return false;
      if (!q) return true;
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(q)
      );
    });
    return filtered.sort((a, b) => {
      const aRaw = a[sortKey];
      const bRaw = b[sortKey];
      if (typeof aRaw === "number" && typeof bRaw === "number") {
        return sortDir === "asc" ? aRaw - bRaw : bRaw - aRaw;
      }
      const cmp = String(aRaw ?? "").localeCompare(String(bRaw ?? ""), undefined, {
        numeric: true,
      });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [search, sortKey, sortDir, sourceFilter]);

  const handleSort = (key: keyof DailyPriceRecord) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleColumn = (key: keyof DailyPriceRecord) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const activeColumns = columns.filter((c) => visibleColumns.has(c.key));

  return (
    <Section id="price-data">
      <SectionHeader
        title="Daily Price Data"
        subtitle="Multi-source stock prices pulled daily with OHLCV, fundamentals, and source metadata"
      />

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div
          className="flex flex-1 items-center gap-2 rounded-lg border px-4 py-2"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
            minWidth: 260,
          }}
        >
          <MagnifyingGlass
            size={18}
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            type="text"
            placeholder="Search by symbol, name, source..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            style={{ color: "var(--color-text)" }}
          />
        </div>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value as Source | "all")}
          className="rounded-lg border px-4 py-2 text-sm outline-none"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text)",
          }}
        >
          <option value="all">All Sources</option>
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              {SOURCE_LABELS[s]}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowColumnFilter((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors hover:opacity-80"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text)",
          }}
        >
          <Funnel size={16} weight="duotone" />
          Columns ({activeColumns.length}/{columns.length})
        </button>
      </div>

      {showColumnFilter && (
        <div
          className="mb-6 rounded-lg border p-4"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Toggle Columns
            </span>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setVisibleColumns(new Set(columns.map((c) => c.key)))
                }
                className="text-xs transition-colors hover:opacity-80"
                style={{ color: "var(--color-accent)" }}
              >
                Show All
              </button>
              <span style={{ color: "var(--color-border)" }}>|</span>
              <button
                onClick={() => setVisibleColumns(new Set(ESSENTIAL_COLUMNS))}
                className="text-xs transition-colors hover:opacity-80"
                style={{ color: "var(--color-accent)" }}
              >
                Essentials Only
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {columns.map((col) => (
              <button
                key={col.key}
                onClick={() => toggleColumn(col.key)}
                className="rounded-md border px-3 py-1 text-xs transition-colors"
                style={{
                  borderColor: visibleColumns.has(col.key)
                    ? "var(--color-accent)"
                    : "var(--color-border)",
                  background: visibleColumns.has(col.key)
                    ? "var(--color-accent)"
                    : "transparent",
                  color: visibleColumns.has(col.key)
                    ? "#fff"
                    : "var(--color-text-muted)",
                }}
              >
                {col.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className="overflow-x-auto rounded-xl border"
        style={{ borderColor: "var(--color-border)" }}
      >
        <table className="w-full text-sm" style={{ minWidth: 900 }}>
          <thead>
            <tr
              style={{
                background: "var(--color-secondary)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {activeColumns.map((col) => (
                <th
                  key={col.key}
                  className="cursor-pointer whitespace-nowrap px-4 py-3 text-left font-medium transition-colors hover:opacity-80"
                  style={{ color: "var(--color-text)" }}
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key &&
                      (sortDir === "asc" ? (
                        <CaretUp size={12} weight="bold" />
                      ) : (
                        <CaretDown size={12} weight="bold" />
                      ))}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={activeColumns.length}
                  className="px-4 py-12 text-center"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  No records match your search.
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-[var(--color-secondary)]"
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {activeColumns.map((col) => {
                    const val = row[col.key];
                    const isChange =
                      col.key === "change" || col.key === "change_pct";
                    const changeColor =
                      isChange && typeof val === "number"
                        ? val > 0
                          ? "#16a34a"
                          : val < 0
                            ? "#dc2626"
                            : undefined
                        : undefined;

                    return (
                      <td
                        key={col.key}
                        className="whitespace-nowrap px-4 py-3"
                        style={{
                          color: changeColor ?? "var(--color-text)",
                          fontFamily: NUMERIC_FIELDS.has(col.key)
                            ? "var(--font-mono)"
                            : undefined,
                          textAlign: NUMERIC_FIELDS.has(col.key)
                            ? "right"
                            : "left",
                        }}
                      >
                        {isChange && typeof val === "number" && val > 0
                          ? "+"
                          : ""}
                        {formatCell(col.key, val)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div
        className="mt-4 flex items-center justify-between text-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        <span>
          Showing {filteredData.length} of {priceData.length} records
          {sourceFilter !== "all" && ` (filtered: ${SOURCE_LABELS[sourceFilter]})`}
        </span>
        <span>
          {activeColumns.length} of {columns.length} columns visible
        </span>
      </div>
    </Section>
  );
}

const dataSources: {
  name: string;
  key: Source;
  description: string;
  icon: typeof Globe;
}[] = [
  {
    name: "Investing.com",
    key: "investing",
    description:
      "Real-time and EOD prices via Investing.com feeds with broad global exchange coverage.",
    icon: Globe,
  },
  {
    name: "Financial Times",
    key: "ft",
    description:
      "Market data from FT Markets covering equities, funds, and indices worldwide.",
    icon: ChartLine,
  },
  {
    name: "CNBC",
    key: "cnbc",
    description:
      "CNBC quote data with pre/post market prices and intraday snapshots.",
    icon: ChartBar,
  },
  {
    name: "Bloomberg",
    key: "bloomberg",
    description:
      "Bloomberg terminal-grade daily pricing data with corporate actions adjustments.",
    icon: Database,
  },
  {
    name: "Reuters",
    key: "reuters",
    description:
      "Refinitiv/Reuters pricing feeds with institutional-quality OHLCV data.",
    icon: Lightning,
  },
  {
    name: "EOD Historical",
    key: "eodh",
    description:
      "End-of-day historical data with splits and dividend adjustments across 60+ exchanges.",
    icon: Clock,
  },
];

function DataSources() {
  return (
    <Section variant="alt">
      <SectionHeader
        title="Data Sources"
        subtitle="Prices are pulled daily from six independent sources for cross-validation and coverage"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dataSources.map((src) => {
          const IconComponent = src.icon;
          return (
            <div
              key={src.key}
              className="rounded-xl border p-6"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <IconComponent
                  size={24}
                  weight="duotone"
                  style={{ color: "var(--color-accent)" }}
                />
                <h3
                  className="text-lg"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text)",
                  }}
                >
                  {src.name}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {src.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const pipelineSteps: {
  step: number;
  title: string;
  description: string;
  icon: typeof Globe;
}[] = [
  {
    step: 1,
    title: "Scheduled Fetch",
    description:
      "Batch jobs trigger after each exchange session closes, pulling EOD prices from all configured sources.",
    icon: Calendar,
  },
  {
    step: 2,
    title: "Multi-Source Pull",
    description:
      "Prices are fetched in parallel from Investing.com, FT, CNBC, Bloomberg, Reuters, and EODH using mapped symbols.",
    icon: ArrowsClockwise,
  },
  {
    step: 3,
    title: "Normalization",
    description:
      "Raw data is normalized to a common schema with consistent field names, currency, and timestamp formats.",
    icon: Database,
  },
  {
    step: 4,
    title: "Storage & Serving",
    description:
      "Normalized records are stored with full source lineage and made available via the dashboard and API.",
    icon: CurrencyDollar,
  },
];

function Pipeline() {
  return (
    <Section>
      <SectionHeader
        title="Daily Pipeline"
        subtitle="How stock price data flows from source exchanges to this dashboard"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {pipelineSteps.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.step}
              className="relative rounded-xl border p-6"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="mb-3 flex items-center gap-3"
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                  style={{
                    background: "var(--color-accent)",
                    color: "#fff",
                  }}
                >
                  {item.step}
                </div>
                <IconComponent
                  size={22}
                  weight="duotone"
                  style={{ color: "var(--color-accent)" }}
                />
              </div>
              <h3
                className="mb-2 text-base font-medium"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function FieldReference() {
  return (
    <Section variant="alt">
      <SectionHeader
        title="Field Reference"
        subtitle="All 24 fields available in the daily stock price dataset"
      />
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {columns.map((col) => (
          <div
            key={col.key}
            className="flex items-center gap-3 rounded-lg border px-4 py-3"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            <div
              className="h-2 w-2 flex-shrink-0 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            <div>
              <div
                className="text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                {col.label}
              </div>
              <div
                className="text-xs"
                style={{
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {col.key}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default function StockPricesPage() {
  return (
    <>
      <Hero />
      <PriceTable />
      <DataSources />
      <Pipeline />
      <FieldReference />
    </>
  );
}
