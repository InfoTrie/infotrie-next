import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { dataCategories } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Data Solutions",
  description: "Explore InfoTrie's comprehensive data offerings across alternative, financial, and corporate data.",
};

export default function DataPage() {
  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          title="Data Solutions"
          subtitle="Comprehensive coverage across alternative, financial, and corporate data — delivered via our robust iFeed API."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dataCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/data/${cat.slug}`}
              className="rounded-xl border p-8 transition-all hover:border-[var(--color-accent)]"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="mb-4 text-4xl">{cat.icon}</div>
              <h3
                className="text-lg"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                {cat.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {cat.short}
              </p>
              <span className="mt-4 inline-block text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
