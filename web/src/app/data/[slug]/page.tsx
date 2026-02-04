import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { dataCategories } from "@/lib/site-config";

export function generateStaticParams() {
  return dataCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = dataCategories.find((c) => c.slug === slug);
  if (!cat) return {};
  return { title: cat.name, description: cat.short };
}

export default async function DataCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = dataCategories.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <div className="pt-24">
      <Section>
        <div className="mx-auto max-w-3xl">
          <Link href="/data" className="mb-8 inline-block text-sm" style={{ color: "var(--color-accent)" }}>
            ← Back to Data Solutions
          </Link>
          <div className="mb-6 text-6xl">{cat.icon}</div>
          <h1
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            {cat.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {cat.short}
          </p>

          {/* 
            TODO: Add detailed content for this data category.
            Content should be migrated from the corresponding WordPress page.
            Include: detailed description, coverage, data format, delivery methods,
            use cases, and relevant data sources.
          */}
          <div
            className="mt-12 rounded-2xl border p-8"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          >
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              📝 <strong style={{ color: "var(--color-text)" }}>Content placeholder</strong> — 
              Detailed content for this data category will be migrated from the WordPress site. 
              Edit this file at <code className="font-mono text-xs" style={{ color: "var(--color-accent)" }}>
              src/app/data/[slug]/page.tsx</code> or create individual page files per category.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-lg px-8 py-3.5 text-sm font-semibold"
              style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
            >
              Request Sample Data
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
