"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Key,
  Plug,
  ChartLine,
  Gear,
  CaretLeft,
} from "@phosphor-icons/react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: House },
  { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
  { href: "/dashboard/explorer", label: "API Explorer", icon: Plug },
  { href: "/dashboard/usage", label: "Usage", icon: ChartLine },
  { href: "/dashboard/settings", label: "Settings", icon: Gear },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className="flex min-h-screen"
      style={{ paddingTop: "var(--header-height)" }}
    >
      {/* Sidebar */}
      <aside
        className="sticky top-[var(--header-height)] hidden h-[calc(100vh-var(--header-height))] w-64 shrink-0 flex-col border-r lg:flex"
        style={{
          background: "var(--color-surface-elevated)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex flex-col gap-1 p-4">
          <Link
            href="/"
            className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            <CaretLeft size={14} />
            Back to site
          </Link>

          <p
            className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: "var(--color-text-light)" }}
          >
            Dashboard
          </p>

          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive
                    ? "var(--color-accent-soft)"
                    : "transparent",
                  color: isActive
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                }}
              >
                <Icon size={20} weight={isActive ? "fill" : "duotone"} />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Sidebar footer */}
        <div
          className="mt-auto border-t p-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div
            className="rounded-lg p-3"
            style={{ background: "var(--color-accent-soft)" }}
          >
            <p
              className="text-xs font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              iFeed API
            </p>
            <p
              className="mt-1 text-[11px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              Low-latency data API with 99.9% uptime SLA
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile nav */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex border-t lg:hidden"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors"
              style={{
                color: isActive
                  ? "var(--color-accent)"
                  : "var(--color-text-muted)",
              }}
            >
              <Icon size={20} weight={isActive ? "fill" : "duotone"} />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 pb-20 lg:pb-0">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
