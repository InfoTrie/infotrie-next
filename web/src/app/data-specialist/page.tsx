import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "Data Specialist",
  description: "InfoTrie — your trusted data specialist. Like a fisherman with modern tools, we fetch the data you need.",
};

export default function DataSpecialistPage() {
  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          title="Data Specialist"
          subtitle="Discover a sea of insights with a trusted partner."
        />

        <div className="mx-auto max-w-3xl space-y-8 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          <p className="text-lg">
            InfoTrie has been a data specialist for more than 10 years. You can see us as a
            fisherman equipped with modern tools and traditional fishing gear, able to fetch
            for you the fish you want.
          </p>

          <p>
            We use the right tool to get you the data you need. We have the ability to
            gather bulk insights through a wide net, or precise, targeted data collections.
          </p>

          <div
            className="rounded-2xl border p-8"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          >
            <h3
              className="mb-4 text-xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
            >
              How we work
            </h3>
            <ul className="space-y-3">
              {[
                "Customers want the right fish to feed their appetite",
                "With different types of needs, depending on their hunger & taste",
                "Data is concealed, unstructured and heterogeneous — the glut makes reading a difficult task",
                "InfoTrie via iFeed API goes fishing with the right line, hook, or net",
                "iFeed API transforms unstructured data into structured and meaningful insights",
                "Fish can be delivered in real-time or at the frequency you need — daily, weekly, or real-time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: "var(--color-accent)" }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            There are as many different types of fish in the ocean as there are types of
            alternative and smart data. Our job is to identify, capture, and deliver exactly
            what you need — no more, no less.
          </p>
        </div>
      </Section>

      <Section variant="alt">
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block rounded-lg px-8 py-4 text-sm font-semibold"
            style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
          >
            Tell us what data you need →
          </Link>
        </div>
      </Section>
    </div>
  );
}
