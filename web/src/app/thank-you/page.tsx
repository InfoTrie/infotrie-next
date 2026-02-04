import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thank You | InfoTrie",
  description: "Thank you for your interest in InfoTrie.",
};

const nextSteps = [
  {
    icon: "📧",
    title: "Check Your Email",
    description: "We've sent your download link and additional resources.",
  },
  {
    icon: "📚",
    title: "Explore Documentation",
    description: "Learn more about our APIs and data products.",
    link: "/docs",
    linkText: "View Docs",
  },
  {
    icon: "💬",
    title: "Talk to an Expert",
    description: "Have questions? Our team is ready to help.",
    link: "/contact",
    linkText: "Contact Us",
  },
];

const popularResources = [
  {
    title: "FinSentS Platform",
    description: "Real-time sentiment analysis for 100K+ assets",
    link: "/products/finsents",
    icon: "📊",
  },
  {
    title: "E-Commerce Analytics",
    description: "Marketplace intelligence from 10+ platforms",
    link: "/data/ecommerce",
    icon: "🛒",
  },
  {
    title: "API Documentation",
    description: "Technical guides and integration examples",
    link: "/docs",
    icon: "📖",
  },
];

export default function ThankYouPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(0, 212, 170, 0.12) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center md:py-32">
          {/* Success Icon */}
          <div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
            style={{
              background: "var(--color-accent-soft)",
            }}
          >
            ✓
          </div>

          <h1
            className="text-4xl leading-tight md:text-5xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            Thank You!
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Your request has been received. Check your email for your download
            link and additional resources.
          </p>

          {/* Logo */}
          <div className="mt-8 flex justify-center">
            <div className="relative h-12 w-12">
              <Image
                src={siteConfig.logos.main}
                alt="InfoTrie"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section
        className="py-20"
        style={{ background: "var(--color-secondary)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <h2
            className="text-center text-3xl md:text-4xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            What&apos;s Next?
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {nextSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl p-8 text-center"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="mb-4 text-4xl">{step.icon}</div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {step.description}
                </p>
                {step.link && (
                  <Link
                    href={step.link}
                    className="mt-4 inline-block text-sm font-semibold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {step.linkText} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Resources */}
      <section className="py-20" style={{ background: "var(--color-primary)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <h2
            className="text-center text-3xl md:text-4xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            Explore More Resources
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-center text-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            Discover our full suite of data products and services.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {popularResources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.link}
                className="group rounded-xl p-6 transition-all duration-300"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="mb-4 text-3xl">{resource.icon}</div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {resource.title}
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {resource.description}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                  style={{ color: "var(--color-accent)" }}
                >
                  Learn more <span>→</span>
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="btn-secondary rounded-lg px-8 py-4 text-sm"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
