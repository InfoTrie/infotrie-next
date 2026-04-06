"use client";

import { useState } from "react";
import {
  Key,
  Plus,
  Copy,
  Trash,
  Eye,
  EyeSlash,
  CheckCircle,
  Clock,
  Warning,
  X,
} from "@phosphor-icons/react";

// ============================================================
// Types & mock data
// ============================================================

type ApiKey = {
  id: string;
  name: string;
  prefix: string;
  fullKey: string;
  created: string;
  lastUsed: string;
  status: "active" | "expired" | "revoked";
  permissions: string[];
  rateLimit: string;
  requestsToday: number;
};

const initialKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production — Main",
    prefix: "itk_live_a3f8",
    fullKey: "itk_live_a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5",
    created: "2025-11-15",
    lastUsed: "2 minutes ago",
    status: "active",
    permissions: ["sentiment", "news", "eod", "fundamentals", "corporate-actions"],
    rateLimit: "10,000/hr",
    requestsToday: 12847,
  },
  {
    id: "2",
    name: "Staging Environment",
    prefix: "itk_test_7d2e",
    fullKey: "itk_test_7d2ef1a9c3b8e4d6f7a0b1c2d3e4f5a6",
    created: "2026-01-08",
    lastUsed: "3 hours ago",
    status: "active",
    permissions: ["sentiment", "news"],
    rateLimit: "1,000/hr",
    requestsToday: 342,
  },
  {
    id: "3",
    name: "Legacy Integration",
    prefix: "itk_live_9c1a",
    fullKey: "itk_live_9c1ab4d7e2f5a8c3d6e9f0a1b2c3d4e5",
    created: "2024-06-22",
    lastUsed: "45 days ago",
    status: "expired",
    permissions: ["eod"],
    rateLimit: "500/hr",
    requestsToday: 0,
  },
];

// ============================================================
// Components
// ============================================================

function StatusBadge({ status }: { status: ApiKey["status"] }) {
  const styles = {
    active: { bg: "rgba(22, 163, 74, 0.1)", color: "#16a34a" },
    expired: { bg: "rgba(217, 119, 6, 0.1)", color: "#d97706" },
    revoked: { bg: "rgba(220, 38, 38, 0.1)", color: "#dc2626" },
  };
  const s = styles[status];
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
      style={{ background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}

function PermissionTag({ label }: { label: string }) {
  return (
    <span
      className="rounded-md px-2 py-0.5 text-[11px] font-medium"
      style={{
        background: "var(--color-tertiary)",
        color: "var(--color-text-secondary)",
      }}
    >
      {label}
    </span>
  );
}

function CreateKeyModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (name: string, permissions: string[]) => void;
}) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const allPermissions = [
    "sentiment",
    "news",
    "eod",
    "fundamentals",
    "corporate-actions",
    "sec-filings",
    "webhooks",
  ];

  const toggle = (p: string) =>
    setSelected((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="mx-4 w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-fade-in-up"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3
            className="text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Create API Key
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Key Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Production — Main"
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
              }}
            />
          </div>

          {/* Permissions */}
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Permissions
            </label>
            <div className="flex flex-wrap gap-2">
              {allPermissions.map((p) => (
                <button
                  key={p}
                  onClick={() => toggle(p)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                  style={{
                    background: selected.includes(p)
                      ? "var(--color-accent)"
                      : "var(--color-tertiary)",
                    color: selected.includes(p)
                      ? "white"
                      : "var(--color-text-secondary)",
                    border: `1px solid ${
                      selected.includes(p)
                        ? "var(--color-accent)"
                        : "var(--color-border)"
                    }`,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Rate limit info */}
          <div
            className="rounded-lg p-3"
            style={{ background: "var(--color-tertiary)" }}
          >
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Default rate limit: <strong>1,000 requests/hour</strong>. Contact
              support to increase limits for production keys.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="btn-secondary flex-1 py-2.5 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (name && selected.length > 0) {
                  onCreate(name, selected);
                }
              }}
              className="btn-primary flex-1 py-2.5 text-sm"
              disabled={!name || selected.length === 0}
              style={{
                opacity: !name || selected.length === 0 ? 0.5 : 1,
              }}
            >
              Create Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Page
// ============================================================

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [showCreate, setShowCreate] = useState(false);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    setRevealedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyKey = (key: ApiKey) => {
    navigator.clipboard.writeText(key.fullKey);
    setCopiedId(key.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const revokeKey = (id: string) => {
    setKeys((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, status: "revoked" as const } : k
      )
    );
  };

  const createKey = (name: string, permissions: string[]) => {
    const newKey: ApiKey = {
      id: String(Date.now()),
      name,
      prefix: `itk_live_${Math.random().toString(36).slice(2, 6)}`,
      fullKey: `itk_live_${Array.from({ length: 32 }, () =>
        Math.random().toString(36).charAt(2)
      ).join("")}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      status: "active",
      permissions,
      rateLimit: "1,000/hr",
      requestsToday: 0,
    };
    setKeys((prev) => [newKey, ...prev]);
    setShowCreate(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            API Keys
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Create and manage your iFeed API authentication keys.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
        >
          <Plus size={16} weight="bold" />
          Create Key
        </button>
      </div>

      {/* Security notice */}
      <div
        className="flex items-start gap-3 rounded-xl p-4"
        style={{
          background: "rgba(217, 119, 6, 0.06)",
          border: "1px solid rgba(217, 119, 6, 0.15)",
        }}
      >
        <Warning
          size={20}
          weight="fill"
          style={{ color: "#d97706" }}
          className="mt-0.5 shrink-0"
        />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#92400e" }}>
            Keep your API keys secure
          </p>
          <p className="mt-0.5 text-xs" style={{ color: "#a16207" }}>
            Never share keys in public repositories or client-side code. Use
            environment variables and rotate keys regularly.
          </p>
        </div>
      </div>

      {/* Keys list */}
      <div className="space-y-4">
        {keys.map((key) => (
          <div
            key={key.id}
            className="card overflow-hidden"
            style={{
              opacity: key.status === "revoked" ? 0.6 : 1,
            }}
          >
            <div className="p-5">
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: "var(--color-accent-soft)" }}
                  >
                    <Key
                      size={18}
                      weight="duotone"
                      style={{ color: "var(--color-accent)" }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{key.name}</p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Created {key.created}
                    </p>
                  </div>
                </div>
                <StatusBadge status={key.status} />
              </div>

              {/* Key value */}
              <div
                className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2"
                style={{
                  background: "var(--color-tertiary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <code className="flex-1 truncate text-sm">
                  {revealedKeys.has(key.id)
                    ? key.fullKey
                    : `${key.prefix}${"•".repeat(28)}`}
                </code>
                <button
                  onClick={() => toggleReveal(key.id)}
                  className="shrink-0 rounded p-1 transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                  title={revealedKeys.has(key.id) ? "Hide" : "Reveal"}
                >
                  {revealedKeys.has(key.id) ? (
                    <EyeSlash size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
                <button
                  onClick={() => copyKey(key)}
                  className="shrink-0 rounded p-1 transition-colors"
                  style={{
                    color:
                      copiedId === key.id
                        ? "#16a34a"
                        : "var(--color-text-muted)",
                  }}
                  title="Copy"
                >
                  {copiedId === key.id ? (
                    <CheckCircle size={16} weight="fill" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Clock
                    size={14}
                    style={{ color: "var(--color-text-light)" }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Last used: {key.lastUsed}
                  </span>
                </div>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-light)" }}
                >
                  |
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Rate limit: <strong>{key.rateLimit}</strong>
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-light)" }}
                >
                  |
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Today: <strong>{key.requestsToday.toLocaleString()}</strong>{" "}
                  requests
                </span>
              </div>

              {/* Permissions */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {key.permissions.map((p) => (
                  <PermissionTag key={p} label={p} />
                ))}
              </div>
            </div>

            {/* Actions bar */}
            {key.status === "active" && (
              <div
                className="flex items-center justify-end gap-2 border-t px-5 py-3"
                style={{
                  background: "var(--color-surface-elevated)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                <button
                  onClick={() => revokeKey(key.id)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{ color: "#dc2626" }}
                >
                  <Trash size={14} />
                  Revoke
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create modal */}
      {showCreate && (
        <CreateKeyModal
          onClose={() => setShowCreate(false)}
          onCreate={createKey}
        />
      )}
    </div>
  );
}
