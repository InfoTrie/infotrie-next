"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import {
  ChartLine,
  MagnifyingGlass,
  ArrowLeft,
  Database,
  Globe,
  Buildings,
  Funnel,
  CaretDown,
  CaretUp,
  SortAscending,
} from "@/lib/icons";

interface StockRecord {
  id: number;
  company_id: number;
  symbol_code: string;
  symbol_name: string;
  exchange: string;
  exchange_code: string;
  mic: string;
  operating_mic: string;
  oprt_sgmt: string;
  oprt_sgmt_1: string;
  symbol_type: string;
  country_name: string;
  isin: string;
  cusip: string;
  exchange_name: string;
  session_end_local: string;
  session_end_est: string;
  batch_no: string;
  exchange_code_investing: string;
  symbol_map_inv: string;
  region: string;
  sedol: string;
  currency: string;
  concat: string;
  source: string;
  symbol_map_ft: string;
  symbol_map_cnbc: string;
  symbol_map_exchange: string;
  symbol_map_eodh: string;
  symbol_map_bb: string;
  symbol_map_rt: string;
}

const stockData: StockRecord[] = [
  {
    id: 1,
    company_id: 2000001,
    symbol_code: "AIA",
    symbol_name: "Auckland International Airport Ltd",
    exchange: "XNZE",
    exchange_code: "NZ",
    mic: "XNZE",
    operating_mic: "XNZE",
    oprt_sgmt: "OPRT",
    oprt_sgmt_1: "ACTIVE",
    symbol_type: "Common Stock",
    country_name: "New Zealand",
    isin: "NZAIAE0002S6",
    cusip: "-",
    exchange_name: "New Zealand Exchange",
    session_end_local: "16:45:00",
    session_end_est: "00:45:00",
    batch_no: "Batch_00.45_1",
    exchange_code_investing: "NZSE",
    symbol_map_inv: "NZSE:AIA",
    region: "APAC",
    sedol: "BKX3XG2",
    currency: "NZD",
    concat: "NZAIAE0002S6XNZE",
    source: "investing",
    symbol_map_ft: "-",
    symbol_map_cnbc: "-",
    symbol_map_exchange: "-",
    symbol_map_eodh: "-",
    symbol_map_bb: "AIA:NZ",
    symbol_map_rt: "AIA.NZ",
  },
  {
    id: 2,
    company_id: 2000002,
    symbol_code: "AIR",
    symbol_name: "Air New Zealand Ltd",
    exchange: "XNZE",
    exchange_code: "NZ",
    mic: "XNZE",
    operating_mic: "XNZE",
    oprt_sgmt: "OPRT",
    oprt_sgmt_1: "ACTIVE",
    symbol_type: "Common Stock",
    country_name: "New Zealand",
    isin: "NZAIRE0001S2",
    cusip: "-",
    exchange_name: "New Zealand Exchange",
    session_end_local: "16:45:00",
    session_end_est: "00:45:00",
    batch_no: "Batch_00.45_1",
    exchange_code_investing: "NZSE",
    symbol_map_inv: "NZSE:AIR",
    region: "APAC",
    sedol: "6426484",
    currency: "NZD",
    concat: "NZAIRE0001S2XNZE",
    source: "investing",
    symbol_map_ft: "-",
    symbol_map_cnbc: "-",
    symbol_map_exchange: "-",
    symbol_map_eodh: "-",
    symbol_map_bb: "AIR:NZ",
    symbol_map_rt: "AIR.NZ",
  },
];

const columns: { key: keyof StockRecord; label: string }[] = [
  { key: "id", label: "#" },
  { key: "company_id", label: "Company ID" },
  { key: "symbol_code", label: "Symbol Code" },
  { key: "symbol_name", label: "Symbol Name" },
  { key: "exchange", label: "Exchange" },
  { key: "exchange_code", label: "Exchange Code" },
  { key: "mic", label: "MIC" },
  { key: "operating_mic", label: "Operating MIC" },
  { key: "oprt_sgmt", label: "OPRT/SGMT" },
  { key: "oprt_sgmt_1", label: "OPRT/SGMT.1" },
  { key: "symbol_type", label: "Symbol Type" },
  { key: "country_name", label: "Country Name" },
  { key: "isin", label: "ISIN" },
  { key: "cusip", label: "CUSIP" },
  { key: "exchange_name", label: "Exchange Name" },
  { key: "session_end_local", label: "Session End (Local)" },
  { key: "session_end_est", label: "Session End (EST)" },
  { key: "batch_no", label: "Batch No" },
  { key: "exchange_code_investing", label: "Exchange Code (Investing)" },
  { key: "symbol_map_inv", label: "Symbol Map (INV)" },
  { key: "region", label: "Region" },
  { key: "sedol", label: "SEDOL" },
  { key: "currency", label: "Currency" },
  { key: "concat", label: "Concat" },
  { key: "source", label: "Source" },
  { key: "symbol_map_ft", label: "Symbol Map (FT)" },
  { key: "symbol_map_cnbc", label: "Symbol Map (CNBC)" },
  { key: "symbol_map_exchange", label: "Symbol Map (Exchange)" },
  { key: "symbol_map_eodh", label: "Symbol Map (EODH)" },
  { key: "symbol_map_bb", label: "Symbol Map (BB)" },
  { key: "symbol_map_rt", label: "Symbol Map (RT)" },
];

const ESSENTIAL_COLUMNS: ReadonlySet<keyof StockRecord> = new Set([
  "id",
  "symbol_code",
  "symbol_name",
  "exchange",
  "country_name",
  "currency",
]);

const MONO_FIELDS: ReadonlySet<keyof StockRecord> = new Set([
  "isin",
  "sedol",
  "cusip",
  "concat",
]);

const keyStats = [
  { value: "31", label: "Data Fields" },
  { value: "Global", label: "Exchange Coverage" },
  { value: "Multi", label: "Source Mapping" },
  { value: "Real-time", label: "Session Tracking" },
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
        <Link
          href="/data"
          className="mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          <ArrowLeft size={16} weight="bold" />
          Back to Data Categories
        </Link>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
              style={{
                borderColor: "var(--color-accent)",
                color: "var(--color-accent)",
              }}
            >
              <ChartLine size={16} weight="duotone" />
              Stock Data
            </div>
            <h1
              className="mb-6 text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              Stock Symbol
              <br />
              <span style={{ color: "var(--color-accent)" }}>Dashboard</span>
            </h1>
            <p
              className="mb-8 max-w-xl text-lg leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Comprehensive stock symbol data with exchange mappings, session
              times, and multi-source symbol identifiers across global markets.
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

function StockTable() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof StockRecord>("id");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [visibleColumns, setVisibleColumns] = useState<Set<keyof StockRecord>>(
    () => new Set(columns.map((c) => c.key))
  );
  const [showColumnFilter, setShowColumnFilter] = useState(false);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = stockData.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(q))
    );
    return filtered.sort((a, b) => {
      const aVal = String(a[sortKey]);
      const bVal = String(b[sortKey]);
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [search, sortKey, sortDir]);

  const handleSort = (key: keyof StockRecord) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleColumn = (key: keyof StockRecord) => {
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
    <Section id="stock-data">
      <SectionHeader
        title="Stock Symbol Data"
        subtitle="Browse and search stock symbol records with full field visibility"
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
            placeholder="Search across all fields..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            style={{ color: "var(--color-text)" }}
          />
        </div>

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
                onClick={() =>
                  setVisibleColumns(new Set(ESSENTIAL_COLUMNS))
                }
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
        <table className="w-full text-sm" style={{ minWidth: 800 }}>
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
                  {activeColumns.map((col) => (
                    <td
                      key={col.key}
                      className="whitespace-nowrap px-4 py-3"
                      style={{
                        color: "var(--color-text)",
                        fontFamily: MONO_FIELDS.has(col.key)
                          ? "var(--font-mono)"
                          : undefined,
                      }}
                    >
                      {String(row[col.key])}
                    </td>
                  ))}
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
          Showing {filteredData.length} of {stockData.length} records
        </span>
        <span>{activeColumns.length} of {columns.length} columns visible</span>
      </div>
    </Section>
  );
}

const dataCoverage: {
  title: string;
  description: string;
  icon: typeof Globe;
}[] = [
  {
    title: "Exchange Identifiers",
    description:
      "MIC codes, operating MIC, exchange codes, and exchange names for precise venue identification.",
    icon: Buildings,
  },
  {
    title: "Symbol Mappings",
    description:
      "Cross-referenced symbol identifiers across Investing.com, FT, CNBC, Bloomberg, Reuters, and EODH.",
    icon: Database,
  },
  {
    title: "Geographic Coverage",
    description:
      "Global stock symbols with country, region, currency, and ISIN/CUSIP/SEDOL identifiers.",
    icon: Globe,
  },
  {
    title: "Session Tracking",
    description:
      "Local and EST session end times with batch scheduling information for each exchange.",
    icon: SortAscending,
  },
];

function DataCoverage() {
  return (
    <Section variant="alt">
      <SectionHeader
        title="Data Coverage"
        subtitle="Comprehensive stock symbol metadata for global equity markets"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dataCoverage.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-xl border p-6"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <IconComponent
                size={28}
                weight="duotone"
                className="mb-4"
                style={{ color: "var(--color-accent)" }}
              />
              <h3
                className="mb-2 text-lg"
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
    <Section>
      <SectionHeader
        title="Field Reference"
        subtitle="Complete list of all 31 data fields available in the stock symbol dataset"
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

export default function StockDashboardPage() {
  return (
    <>
      <Hero />
      <StockTable />
      <DataCoverage />
      <FieldReference />
    </>
  );
}
