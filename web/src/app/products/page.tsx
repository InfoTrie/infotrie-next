import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { products } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore InfoTrie's suite of data intelligence products: FinSentS, DocuTrie, and iFeed API.",
};

export default function ProductsPage() {
  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          title="Our Products"
          subtitle="Three pillars of data intelligence — from collection to analysis to insight."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group rounded-2xl border p-8 transition-all hover:border-[var(--color-accent)]"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="mb-4 text-5xl">{product.icon}</div>
              <h3
                className="text-2xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                {product.name}
              </h3>
              <p className="mt-1 text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                {product.tagline}
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {product.description}
              </p>
              <ul className="mt-6 space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                    <span style={{ color: "var(--color-accent)" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-block text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
