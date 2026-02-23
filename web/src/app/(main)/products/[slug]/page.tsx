import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { products } from "@/lib/site-config";

// Generate static paths for all products
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div className="pt-24">
      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/products"
            className="mb-8 inline-block text-sm"
            style={{ color: "var(--color-accent)" }}
          >
            ← Back to Products
          </Link>
          <div className="mb-6 text-6xl">{product.icon}</div>
          <h1
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            {product.name}
          </h1>
          <p className="mt-2 text-lg font-medium" style={{ color: "var(--color-accent)" }}>
            {product.tagline}
          </p>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {product.description}
          </p>

          {/* Features */}
          <div className="mt-12">
            <h2
              className="mb-6 text-2xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
            >
              Key Features
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.features.map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-3 rounded-xl border p-5"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <span className="mt-0.5" style={{ color: "var(--color-accent)" }}>✓</span>
                  <span style={{ color: "var(--color-text)" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="mt-16 rounded-2xl border p-8 text-center"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <h3
              className="text-2xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
            >
              Interested in {product.name}?
            </h3>
            <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
              Get in touch for a demo or custom pricing.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-lg px-8 py-3.5 text-sm font-semibold"
              style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
