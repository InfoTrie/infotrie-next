"use client";

import { useState } from "react";
import {
  Gear,
  Bell,
  Lock,
  Globe,
  CheckCircle,
  Envelope,
} from "@phosphor-icons/react";

// ============================================================
// Settings page
// ============================================================

type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

const initialNotifications: NotificationSetting[] = [
  {
    id: "rate-limit",
    label: "Rate limit warnings",
    description: "Get notified when usage exceeds 75% of your hourly limit",
    enabled: true,
  },
  {
    id: "error-spike",
    label: "Error rate alerts",
    description: "Alert when error rate exceeds 5% over 15-minute window",
    enabled: true,
  },
  {
    id: "key-expiry",
    label: "API key expiration",
    description: "Reminder 7 days before an API key expires",
    enabled: true,
  },
  {
    id: "weekly-report",
    label: "Weekly usage report",
    description: "Receive a weekly summary of API usage and performance",
    enabled: false,
  },
  {
    id: "maintenance",
    label: "Scheduled maintenance",
    description: "Notifications about planned maintenance windows",
    enabled: true,
  },
  {
    id: "changelog",
    label: "API changelog",
    description: "Updates when new endpoints or features are released",
    enabled: false,
  },
];

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200"
      style={{
        background: enabled ? "var(--color-accent)" : "var(--color-border)",
      }}
    >
      <span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{
          transform: enabled ? "translateX(22px)" : "translateX(2px)",
        }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [defaultFormat, setDefaultFormat] = useState<"json" | "csv" | "xml">("json");
  const [timezone, setTimezone] = useState("UTC");
  const [saved, setSaved] = useState(false);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Settings
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Configure your iFeed API dashboard preferences and notifications.
        </p>
      </div>

      {/* General settings */}
      <div className="card overflow-hidden">
        <div
          className="flex items-center gap-3 border-b px-5 py-4"
          style={{
            background: "var(--color-surface-elevated)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <Gear
            size={18}
            weight="duotone"
            style={{ color: "var(--color-accent)" }}
          />
          <h2 className="text-sm font-semibold">General</h2>
        </div>
        <div className="space-y-5 p-5">
          {/* Default response format */}
          <div className="grid gap-1.5 sm:grid-cols-[200px_1fr]">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Default response format
            </label>
            <div className="flex gap-2">
              {(["json", "csv", "xml"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setDefaultFormat(fmt)}
                  className="rounded-lg px-4 py-2 text-xs font-medium uppercase transition-all"
                  style={{
                    background:
                      defaultFormat === fmt
                        ? "var(--color-accent)"
                        : "var(--color-tertiary)",
                    color:
                      defaultFormat === fmt
                        ? "white"
                        : "var(--color-text-secondary)",
                    border: `1px solid ${
                      defaultFormat === fmt
                        ? "var(--color-accent)"
                        : "var(--color-border)"
                    }`,
                  }}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Timezone */}
          <div className="grid gap-1.5 sm:grid-cols-[200px_1fr]">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="max-w-xs rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
              }}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern (ET)</option>
              <option value="America/Chicago">Central (CT)</option>
              <option value="America/Los_Angeles">Pacific (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Singapore">Singapore (SGT)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
              <option value="Asia/Hong_Kong">Hong Kong (HKT)</option>
              <option value="Asia/Kolkata">India (IST)</option>
            </select>
          </div>

          {/* Webhook URL */}
          <div className="grid gap-1.5 sm:grid-cols-[200px_1fr]">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Webhook URL
            </label>
            <div>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-app.com/webhooks/infotrie"
                className="w-full max-w-lg rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface)",
                }}
              />
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-text-light)" }}
              >
                Events and alerts will be POSTed to this URL
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card overflow-hidden">
        <div
          className="flex items-center gap-3 border-b px-5 py-4"
          style={{
            background: "var(--color-surface-elevated)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <Bell
            size={18}
            weight="duotone"
            style={{ color: "var(--color-accent)" }}
          />
          <h2 className="text-sm font-semibold">Notifications</h2>
        </div>
        <div
          className="divide-y"
          style={
            {
              "--tw-divide-color": "var(--color-border-light)",
            } as React.CSSProperties
          }
        >
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-center gap-4 px-5 py-4"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{notif.label}</p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {notif.description}
                </p>
              </div>
              <Toggle
                enabled={notif.enabled}
                onToggle={() => toggleNotification(notif.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="card overflow-hidden">
        <div
          className="flex items-center gap-3 border-b px-5 py-4"
          style={{
            background: "var(--color-surface-elevated)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <Lock
            size={18}
            weight="duotone"
            style={{ color: "var(--color-accent)" }}
          />
          <h2 className="text-sm font-semibold">Security</h2>
        </div>
        <div className="space-y-4 p-5">
          {/* IP Allowlist */}
          <div className="grid gap-1.5 sm:grid-cols-[200px_1fr]">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              IP Allowlist
            </label>
            <div>
              <textarea
                placeholder="Enter one IP address or CIDR range per line&#10;e.g. 203.0.113.0/24"
                rows={3}
                className="w-full max-w-lg rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface)",
                  fontFamily: "var(--font-mono)",
                  resize: "vertical",
                }}
              />
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-text-light)" }}
              >
                Leave empty to allow all IPs. Supports CIDR notation.
              </p>
            </div>
          </div>

          {/* CORS origins */}
          <div className="grid gap-1.5 sm:grid-cols-[200px_1fr]">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Allowed Origins (CORS)
            </label>
            <div>
              <input
                type="text"
                placeholder="https://your-app.com, https://staging.your-app.com"
                className="w-full max-w-lg rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface)",
                }}
              />
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-text-light)" }}
              >
                Comma-separated list of allowed origins for browser requests
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan info */}
      <div
        className="card flex items-center gap-4 p-5"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-soft), rgba(220, 38, 38, 0.04))",
        }}
      >
        <Globe
          size={28}
          weight="duotone"
          style={{ color: "var(--color-accent)" }}
        />
        <div className="flex-1">
          <p className="text-sm font-semibold">Professional Plan</p>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            10,000 requests/hour · 5 API keys · All endpoints · Webhook support
          </p>
        </div>
        <button className="btn-secondary px-4 py-2 text-xs">
          <Envelope
            size={14}
            weight="bold"
            className="mr-1.5 inline-block"
          />
          Contact Sales
        </button>
      </div>

      {/* Save button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span
            className="flex items-center gap-1.5 text-sm font-medium animate-fade-in"
            style={{ color: "var(--color-success)" }}
          >
            <CheckCircle size={16} weight="fill" />
            Settings saved
          </span>
        )}
        <button
          onClick={handleSave}
          className="btn-primary px-6 py-2.5 text-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
