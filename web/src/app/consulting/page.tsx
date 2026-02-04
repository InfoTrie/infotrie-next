import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { consultingServices } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Consulting",
  description: "InfoTrie Consulting — global innovation consultancy and Agile software development for financial IT.",
};

export default function ConsultingPage() {
  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          title="Consulting"
          subtitle="A global innovation consultancy dedicated to helping organizations embrace tech as a force for change."
        />

        {/* Services */}
        <div className="grid gap-8 md:grid-cols-2">
          {consultingServices.map((svc) => (
            <div
              key={svc.title}
              className="rounded-xl border p-8"
              style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
            >
              <h3
                className="text-xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                {svc.title}
              </h3>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {svc.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h2
            className="text-2xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            Why InfoTrie Consulting?
          </h2>
          <div
            className="mt-6 space-y-4 leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            <p>
              With more than 15 years of real-world experience in developing and operating
              complex treasury systems projects, InfoTrie provides independent and objective
              advisory services. We work closely with clients to identify their unique
              challenges and develop tailored solutions.
            </p>
            <p>
              We have onshore and offshore delivery capabilities which enable us to deliver
              high-value complex work through complete outsourced solutions. Our consultants
              bring deep industry knowledge in financial technology, trading systems, and
              data-driven decision making.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="alt">
        <div className="text-center">
          <h2
            className="text-3xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            Let&apos;s discuss your project
          </h2>
          <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
            We provide consultants with the skill-sets required for your projects.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg px-8 py-4 text-sm font-semibold"
            style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
          >
            Contact Us
          </Link>
        </div>
      </Section>
    </div>
  );
}
